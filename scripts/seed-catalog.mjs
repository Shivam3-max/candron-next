import mysql from 'mysql2/promise'
import { readdir, readFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { ensureInventorySchema } from './migrate-inventory.mjs'

// v2 replaces the original catalog import: it removes the legacy imported listings and
// adds CANDRON's own demo item. Products added through /admin are never touched.
const DEPLOYMENT_TASK_KEY = 'candron-catalog-reset-v2'

// Slugs of the legacy imported listings (third-party catalogue content, now withdrawn).
const LEGACY_SLUGS = [
  '3-phase-480v-delta-208-y-120', '3-phase-208v-delta-480-y-277-step-up', '3-phase-240v-delta-480-y-277-step-up',
  '3-phase-auto-600-480-400-240-208v', '3-phase-480v-delta-240v-delta-120', '1-phase-240x480-120-240',
  '3-phase-auto-600-480v-or-480-380v', '1-phase-240x480v-pri-120-240v-sec-encapsulated-transformer',
  '3-phase-240v-delta-208-y-120', '3-phase-480v-delta-400-y-231', '3-phase-480v-delta-380-y-220',
  '3-phase-208-d-480-y-277-step-up', '3-phase-480v-delta-480-y-277-isolation', '3-phase-208v-delta-380-y-219-step-up',
  '3-phase-208v-delta-400-y-231-step-up', '1-phase-208-120-240', '3-phase-480-y-277-208-y-120-solar',
  '3-phase-240v-delta-380-y-219-step-up', '3-phase-480-d-480-y-277-drive-isolation', '3-phase-240v-delta-400-y-231-step-up',
  '3-phase-480v-delta-416-y-240', '3-phase-480-d-240-y-139-drive-isolation', '3-phase-600v-delta-480-y-277',
  '3-phase-480-pri-208y-120-sec-encapsulated', '3-phase-208v-delta-240-d-120-step-up', 'mini-power-center-480v-120-240',
  '208v-delta-208-y-120-isolation-transformer', '3-phase-208v-delta-416-y-240-step-up', '3-phase-600v-delta-208-y-120',
  '3-phase-460-d-230-y-133-drive-isolation', '3-phase-460-d-460-y-266-drive-isolation', '3-phase-240v-delta-416-y-240-step-up',
]

const COLUMNS = [
  'slug', 'sku', 'name', 'short_description', 'description', 'category', 'condition_name', 'status', 'manufacturer',
  'year_built', 'kva', 'rating_unit', 'input_voltage', 'output_voltage', 'phase', 'frequency', 'winding', 'cooling',
  'special_type', 'price_min', 'price_max', 'show_price', 'currency', 'stock_quantity', 'location', 'lead_time',
  'warranty', 'dim_height', 'dim_width', 'dim_depth', 'dim_unit', 'weight', 'weight_unit', 'highlights_json',
  'documents_json', 'specs_json', 'is_featured', 'is_active',
]

const required = (name) => {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

export async function ensureCatalogImageSchema(connection) {
  const [externalColumns] = await connection.execute(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'product_images' AND COLUMN_NAME = 'external_url'`,
  )
  if (!externalColumns.length) await connection.query('ALTER TABLE product_images ADD COLUMN external_url VARCHAR(2048) NULL AFTER image_data')
  // Only alter when needed: this runs on every server start and the table holds image blobs
  const [dataColumn] = await connection.execute(
    `SELECT IS_NULLABLE FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'product_images' AND COLUMN_NAME = 'image_data'`,
  )
  if (dataColumn[0]?.IS_NULLABLE !== 'YES') await connection.query('ALTER TABLE product_images MODIFY image_data MEDIUMBLOB NULL')
}

// Stock lists in database/stock/*.json are added once each (task candron-stock-<batch>), so a
// listing an admin later deletes doesn't come back on the next deploy.
async function loadStockBatches() {
  const dir = new URL('../database/stock/', import.meta.url)
  const files = (await readdir(dir).catch(() => [])).filter(f => f.endsWith('.json')).sort()
  return Promise.all(files.map(async file => {
    const payload = JSON.parse(await readFile(new URL(file, dir), 'utf8'))
    if (!payload.batch || !Array.isArray(payload.products)) throw new Error(`database/stock/${file} needs "batch" and "products"`)
    if (payload.updates !== undefined && !Array.isArray(payload.updates)) throw new Error(`database/stock/${file} "updates" must be an array`)
    return { batch: payload.batch, products: payload.products, updates: payload.updates || [] }
  }))
}

async function loadSeed() {
  const raw = await readFile(new URL('../database/catalog-seed.json', import.meta.url), 'utf8')
  const payload = JSON.parse(raw)
  if (!Array.isArray(payload.products)) throw new Error('database/catalog-seed.json must contain a products array')
  return payload.products
}

const rowValues = (p) => [
  p.slug, p.sku, p.name, p.short_description || '', p.description || '', p.category, p.condition_name || 'New',
  p.status || 'Available', p.manufacturer ?? 'CANDRON', p.year_built ?? null, p.kva ?? null, p.rating_unit || 'kVA',
  p.input_voltage || '', p.output_voltage || '', p.phase || '', p.frequency || '', p.winding || '', p.cooling || '',
  p.special_type || '', p.price_min ?? null, p.price_max ?? null, p.show_price === false ? 0 : 1, p.currency || 'CAD',
  Number(p.stock_quantity || 0), p.location || '', p.lead_time || '', p.warranty || '', p.dim_height ?? null,
  p.dim_width ?? null, p.dim_depth ?? null, p.dim_unit || 'in', p.weight ?? null, p.weight_unit || 'lb',
  JSON.stringify(p.highlights || []), JSON.stringify(p.documents || []), JSON.stringify(p.specs || []),
  p.is_featured ? 1 : 0, p.is_active === false ? 0 : 1,
]

/** Remove the withdrawn legacy listings (and their images, via ON DELETE CASCADE). */
export async function removeLegacyListings(connection) {
  const placeholders = LEGACY_SLUGS.map(() => '?').join(',')
  const [result] = await connection.execute(`DELETE FROM products WHERE slug IN (${placeholders})`, LEGACY_SLUGS)
  return Number(result.affectedRows || 0)
}

/** Insert seed products that are not already present (matched by slug). Never overwrites admin edits. */
export async function seedCatalog(connection, products) {
  await ensureCatalogImageSchema(connection)
  await ensureInventorySchema(connection)
  products ??= await loadSeed()
  let added = 0
  for (const product of products) {
    const [existing] = await connection.execute('SELECT id FROM products WHERE slug=? OR sku=? LIMIT 1', [product.slug, product.sku])
    if (existing.length) continue
    const [result] = await connection.execute(
      `INSERT INTO products (${COLUMNS.join(',')}) VALUES (${COLUMNS.map(() => '?').join(',')})`,
      rowValues(product),
    )
    await insertImages(connection, result.insertId, product.images || [])
    added += 1
  }
  return { seedProducts: products.length, added }
}

// Seed photos are stored like admin uploads (image_data): the media route serves uploads only.
// "/path" is under public/; anything else is relative to database/stock/ (stock batch photos).
async function insertImages(connection, productId, images) {
  for (const [i, path] of images.entries()) {
    const file = path.startsWith('/') ? new URL(`../public${path}`, import.meta.url) : new URL(`../database/stock/${path}`, import.meta.url)
    const data = await readFile(file)
    const mime = path.endsWith('.png') ? 'image/png' : path.endsWith('.webp') ? 'image/webp' : 'image/jpeg'
    await connection.execute(
      'INSERT INTO product_images (product_id,file_name,mime_type,image_data,external_url,sort_order) VALUES (?,?,?,?,NULL,?)',
      [productId, path.split('/').pop(), mime, data, i],
    )
  }
}

const UPDATABLE = new Set(COLUMNS.filter(c => !['slug', 'sku'].includes(c)).map(c => c.replace(/_json$/, '')))

/**
 * Corrections to listings added by an earlier stock batch, matched by item code. Runs once with its batch;
 * photos are only added to a listing that has none, so photos managed in /admin are never duplicated.
 */
export async function applyStockUpdates(connection, updates) {
  let updated = 0, photos = 0
  for (const { sku, set = {}, images = [] } of updates) {
    const [rows] = await connection.execute('SELECT id FROM products WHERE sku=? LIMIT 1', [sku])
    if (!rows.length) continue // deleted in /admin: leave it gone
    const id = rows[0].id
    const keys = Object.keys(set)
    const bad = keys.filter(k => !UPDATABLE.has(k))
    if (bad.length) throw new Error(`Stock update for ${sku} has unknown field(s): ${bad.join(', ')}`)
    if (keys.length) {
      const cols = keys.map(k => (['highlights', 'documents', 'specs'].includes(k) ? `${k}_json` : k))
      const values = keys.map(k => (['highlights', 'documents', 'specs'].includes(k) ? JSON.stringify(set[k]) : set[k]))
      await connection.execute(`UPDATE products SET ${cols.map(c => `${c}=?`).join(',')} WHERE id=?`, [...values, id])
    }
    const [[{ n }]] = await connection.execute('SELECT COUNT(*) n FROM product_images WHERE product_id=? AND image_data IS NOT NULL', [id])
    if (images.length && Number(n) === 0) {
      await insertImages(connection, id, images)
      photos += images.length
    }
    updated += 1
  }
  return { updated, photos }
}

// Runs a deploy task at most once per database; the lock stops two deploys racing.
async function runOnce(connection, taskKey, task) {
  const [lockRows] = await connection.execute('SELECT GET_LOCK(?, 60) acquired', [taskKey])
  if (Number(lockRows[0]?.acquired) !== 1) throw new Error(`Could not acquire the ${taskKey} lock.`)
  try {
    const [done] = await connection.execute('SELECT completed_at FROM deployment_tasks WHERE task_key=? LIMIT 1', [taskKey])
    if (done.length) {
      console.log(`${taskKey} skipped: already completed at ${done[0].completed_at}.`)
      return
    }
    const result = await task()
    await connection.execute('INSERT INTO deployment_tasks (task_key,result_json) VALUES (?,?)', [taskKey, JSON.stringify(result)])
  } finally {
    await connection.execute('SELECT RELEASE_LOCK(?)', [taskKey])
  }
}

async function run() {
  const connection = await mysql.createConnection({
    host: required('DB_HOST'),
    port: Number(process.env.DB_PORT || 3306),
    user: required('DB_USER'),
    password: process.env.DB_PASSWORD ?? '',
    database: required('DB_NAME'),
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : undefined,
  })
  try {
    if (!process.argv.includes('--once')) {
      const removed = await removeLegacyListings(connection)
      const result = await seedCatalog(connection)
      console.log(`Catalog: ${removed} legacy listing(s) removed, ${result.added} of ${result.seedProducts} seed product(s) added.`)
      for (const { batch, products, updates } of await loadStockBatches()) {
        const stock = await seedCatalog(connection, products)
        const upd = await applyStockUpdates(connection, updates)
        console.log(`Stock ${batch}: ${stock.added} of ${stock.seedProducts} product(s) added, ${upd.updated} updated.`)
      }
      return
    }
    await connection.query(`CREATE TABLE IF NOT EXISTS deployment_tasks (
      task_key VARCHAR(190) NOT NULL,
      result_json JSON NULL,
      completed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (task_key)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`)
    await runOnce(connection, DEPLOYMENT_TASK_KEY, async () => {
      const removed = await removeLegacyListings(connection)
      const result = await seedCatalog(connection)
      console.log(`Catalog reset complete: ${removed} legacy listing(s) removed, ${result.added} demo product(s) added.`)
      return { removed, ...result }
    })
    for (const { batch, products, updates } of await loadStockBatches()) {
      await runOnce(connection, `candron-stock-${batch}`, async () => {
        const result = await seedCatalog(connection, products)
        const upd = await applyStockUpdates(connection, updates)
        console.log(`Stock ${batch}: ${result.added} of ${result.seedProducts} product(s) added, ${upd.updated} listing(s) updated (${upd.photos} photos).`)
        return { ...result, ...upd }
      })
    }
  } finally {
    await connection.end()
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await run()
