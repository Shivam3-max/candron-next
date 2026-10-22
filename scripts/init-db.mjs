import mysql from 'mysql2/promise'
import { readFile } from 'node:fs/promises'
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'
import { ensureCatalogImageSchema } from './seed-catalog.mjs'
import { ensureInventorySchema } from './migrate-inventory.mjs'


const required = (name) => {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

const connection = await mysql.createConnection({
  host: required('DB_HOST'),
  port: Number(process.env.DB_PORT || 3306),
  user: required('DB_USER'),
  password: process.env.DB_PASSWORD ?? '',
  database: required('DB_NAME'),
  multipleStatements: true,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : undefined,
})

try {
  const schema = await readFile(new URL('../database/schema.sql', import.meta.url), 'utf8')
  await connection.query(schema)
  await ensureCatalogImageSchema(connection)
  await ensureInventorySchema(connection)
  // Seeded catalog photos showed another manufacturer's nameplate; only admin uploads (image_data) are kept
  const [seedImages] = await connection.execute('DELETE FROM product_images WHERE image_data IS NULL')
  if (seedImages.affectedRows) console.log(`Removed ${seedImages.affectedRows} seeded catalog image link(s); upload product photos in Admin.`)
  const [nonceColumn] = await connection.execute(
    `SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'admins' AND COLUMN_NAME = 'session_nonce'`,
  )
  if (!nonceColumn.length) await connection.query("ALTER TABLE admins ADD COLUMN session_nonce CHAR(32) NOT NULL DEFAULT '' AFTER password_salt")

  const email = required('ADMIN_EMAIL').toLowerCase().trim()
  const password = required('ADMIN_PASSWORD')
  if (password.length < 12) throw new Error('ADMIN_PASSWORD must contain at least 12 characters')

  // This runs on every server start: only rewrite the hash (and rotate the
  // session nonce, signing everyone out) when the password actually changed.
  const [existing] = await connection.execute('SELECT password_hash, password_salt, session_nonce FROM admins WHERE email = ? LIMIT 1', [email])
  const current = existing[0]
  const storedHash = current ? Buffer.from(current.password_hash, 'hex') : null
  const unchanged = storedHash?.length === 64
    && timingSafeEqual(scryptSync(password, current.password_salt, 64), storedHash)
  if (!unchanged) {
    const salt = randomBytes(16).toString('hex')
    const hash = scryptSync(password, salt, 64).toString('hex')
    await connection.execute(
      `INSERT INTO admins (email, password_hash, password_salt, session_nonce) VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), password_salt = VALUES(password_salt), session_nonce = VALUES(session_nonce)`,
      [email, hash, salt, randomBytes(16).toString('hex')],
    )
  } else if (!current.session_nonce) {
    await connection.execute('UPDATE admins SET session_nonce = ? WHERE email = ?', [randomBytes(16).toString('hex'), email])
  }

  // ADMIN_EMAIL is the single source of truth; a previous administrator must not keep access
  const [removed] = await connection.execute('DELETE FROM admins WHERE email <> ?', [email])
  if (removed.affectedRows) console.log(`Removed ${removed.affectedRows} administrator account(s) that no longer match ADMIN_EMAIL.`)
  console.log(`Database initialized. Administrator ready: ${email}`)
} finally {
  await connection.end()
}
