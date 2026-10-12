import mysql from 'mysql2/promise'
import { readFile } from 'node:fs/promises'
import { randomBytes, scryptSync } from 'node:crypto'
import { ensureCatalogImageSchema } from './seed-catalog.mjs'

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
  const email = required('ADMIN_EMAIL').toLowerCase().trim()
  const password = required('ADMIN_PASSWORD')
  if (password.length < 12) throw new Error('ADMIN_PASSWORD must contain at least 12 characters')
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, 64).toString('hex')
  await connection.execute(
    `INSERT INTO admins (email, password_hash, password_salt) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), password_salt = VALUES(password_salt)`,
    [email, hash, salt],
  )
  console.log(`Database initialized. Administrator ready: ${email}`)
} finally {
  await connection.end()
}
