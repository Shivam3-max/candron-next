import mysql from 'mysql2/promise'
import { readFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

const DEPLOYMENT_TASK_KEY = 'candron-catalog-seed-v1'

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
  await connection.query('ALTER TABLE product_images MODIFY image_data MEDIUMBLOB NULL')
}

async function loadSeed() {
  const raw = await readFile(new URL('../database/catalog-seed.json', import.meta.url), 'utf8')
  const payload = JSON.parse(raw)
  if (!Array.isArray(payload.products)) throw new Error('database/catalog-seed.json must contain a products array')
  return payload.products
}

export async function seedCatalog(connection, { updateExisting = false } = {}) {
  await ensureCatalogImageSchema(connection)
  const products = await loadSeed()
  let productsAdded = 0
  let productsUpdated = 0
  let imagesAdded = 0
  let remoteImagesRemoved = 0

  for (const product of products) {
    const values = [
      product.slug,
      product.sku,
      product.name,
      product.short_description || '',
      product.description || '',
      product.category,
      product.condition_name || 'New',
      product.kva,
      product.input_voltage || '',
      product.output_voltage || '',
      product.phase || '',
      product.special_type || '',
      product.price_min,
      product.price_max,
      product.currency || 'USD',
      Number(product.stock_quantity || 0),
      product.lead_time || '',
      JSON.stringify(product.specs || {}),
      product.is_featured ? 1 : 0,
      product.is_active === false ? 0 : 1,
    ]

    const [existing] = await connection.execute('SELECT id FROM products WHERE slug=? LIMIT 1', [product.slug])
    let productId = existing[0]?.id
    if (!productId) {
      const [result] = await connection.execute(
        `INSERT INTO products
         (slug,sku,name,short_description,description,category,condition_name,kva,input_voltage,output_voltage,phase,special_type,price_min,price_max,currency,stock_quantity,lead_time,specs_json,is_featured,is_active)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        values,
      )
      productId = result.insertId
      productsAdded += 1
    } else if (updateExisting) {
      await connection.execute(
        `UPDATE products SET
         slug=?,sku=?,name=?,short_description=?,description=?,category=?,condition_name=?,kva=?,input_voltage=?,output_voltage=?,phase=?,special_type=?,price_min=?,price_max=?,currency=?,stock_quantity=?,lead_time=?,specs_json=?,is_featured=?,is_active=?
         WHERE id=?`,
        [...values, productId],
      )
      productsUpdated += 1
    }

    const [removed] = await connection.execute(
      `DELETE FROM product_images
       WHERE product_id=? AND external_url REGEXP '^https?://'`,
      [productId],
    )
    remoteImagesRemoved += Number(removed.affectedRows || 0)

    const [localImage] = await connection.execute(
      'SELECT id FROM product_images WHERE product_id=? AND external_url=? LIMIT 1',
      [productId, product.image],
    )
    if (!localImage.length) {
      const [remaining] = await connection.execute('SELECT COUNT(*) total FROM product_images WHERE product_id=?', [productId])
      const sortOrder = Number(remaining[0]?.total || 0) ? 100 : 0
      await connection.execute(
        'INSERT INTO product_images (product_id,file_name,mime_type,image_data,external_url,sort_order) VALUES (?,?,?,NULL,?,?)',
        [productId, product.image.split('/').pop() || `${product.slug}.jpg`, 'image/local', product.image, sortOrder],
      )
      imagesAdded += 1
    }
  }

  return { seedProducts: products.length, productsAdded, productsUpdated, imagesAdded, remoteImagesRemoved }
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
    const once = process.argv.includes('--once')
    if (once) {
      await connection.query(`CREATE TABLE IF NOT EXISTS deployment_tasks (
        task_key VARCHAR(190) NOT NULL,
        result_json JSON NULL,
        completed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (task_key)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`)
      const [lockRows] = await connection.execute('SELECT GET_LOCK(?, 60) acquired', [`candron-${DEPLOYMENT_TASK_KEY}`])
      if (Number(lockRows[0]?.acquired) !== 1) throw new Error('Could not acquire the one-time catalog seed lock.')
      try {
        const [completed] = await connection.execute('SELECT completed_at FROM deployment_tasks WHERE task_key=? LIMIT 1', [DEPLOYMENT_TASK_KEY])
        if (completed.length) {
          console.log(`Catalog seed skipped: ${DEPLOYMENT_TASK_KEY} already completed at ${completed[0].completed_at}.`)
          return
        }
        const result = await seedCatalog(connection, { updateExisting: false })
        await connection.execute('INSERT INTO deployment_tasks (task_key,result_json) VALUES (?,?)', [DEPLOYMENT_TASK_KEY, JSON.stringify(result)])
        console.log(`One-time local catalog seed complete: ${result.seedProducts} available, ${result.productsAdded} added, ${result.imagesAdded} local images linked, ${result.remoteImagesRemoved} remote image links removed.`)
      } finally {
        await connection.execute('SELECT RELEASE_LOCK(?)', [`candron-${DEPLOYMENT_TASK_KEY}`])
      }
      return
    }
    const result = await seedCatalog(connection, { updateExisting: process.argv.includes('--update') })
    console.log(`Local catalog seed complete: ${result.seedProducts} available, ${result.productsAdded} added, ${result.productsUpdated} updated, ${result.imagesAdded} local images linked, ${result.remoteImagesRemoved} remote image links removed.`)
  } finally {
    await connection.end()
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await run()
