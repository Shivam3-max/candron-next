import mysql from 'mysql2/promise'
import { pathToFileURL } from 'node:url'

const DEFAULT_FEED = 'https://store.maddox.com/collections/all-products/products.json?limit=250'
const DEPLOYMENT_TASK_KEY = 'reference-catalog-v1'

const required = (name) => {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

const decodeEntities = (value) => value
  .replace(/&nbsp;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))

const htmlToText = (html = '') => decodeEntities(html
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<\s*br\s*\/?\s*>/gi, '\n')
  .replace(/<\/(p|h[1-6]|li|tr|blockquote)>/gi, '\n')
  .replace(/<li[^>]*>/gi, '• ')
  .replace(/<[^>]+>/g, ' '))
  .replace(/[ \t]+/g, ' ')
  .replace(/\n\s*\n+/g, '\n\n')
  .trim()

const optionValues = (product, name) => product.options?.find((option) => option.name.toLowerCase() === name.toLowerCase())?.values || []
const tagValues = (product, prefix) => (product.tags || []).filter((tag) => tag.toLowerCase().startsWith(`${prefix}:`)).map((tag) => tag.slice(prefix.length + 1))
const firstNumber = (values) => {
  for (const value of values) {
    const match = String(value).match(/\d+(?:\.\d+)?/)
    if (match) return Number(match[0])
  }
  return null
}

function categoryFor(product) {
  const text = `${product.title} ${(product.tags || []).join(' ')}`.toLowerCase()
  if (text.includes('mini power center')) return 'Mini Power Centers'
  if (text.includes('encapsulated')) return 'Encapsulated Transformers'
  if (text.includes('autotransformer')) return 'Autotransformers'
  if (text.includes('drive isolation')) return 'Drive-Isolation Transformers'
  if (text.includes('solar')) return 'Solar Transformers'
  return 'Low Voltage Dry-Type Transformers'
}

function imageFileName(url, index) {
  try {
    return decodeURIComponent(new URL(url).pathname.split('/').pop() || `product-${index + 1}.jpg`).slice(0, 255)
  } catch {
    return `product-${index + 1}.jpg`
  }
}

export async function ensureCatalogImageSchema(connection) {
  const [externalColumns] = await connection.execute(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'product_images' AND COLUMN_NAME = 'external_url'`,
  )
  if (!externalColumns.length) await connection.query('ALTER TABLE product_images ADD COLUMN external_url VARCHAR(2048) NULL AFTER image_data')
  await connection.query('ALTER TABLE product_images MODIFY image_data MEDIUMBLOB NULL')
}

export async function importReferenceCatalog(connection, { updateExisting = false } = {}) {
  await ensureCatalogImageSchema(connection)
  const feedUrl = process.env.REFERENCE_CATALOG_URL || DEFAULT_FEED
  const response = await fetch(feedUrl, { headers: { 'User-Agent': 'CANDRON-Catalog-Importer/1.0', Accept: 'application/json' } })
  if (!response.ok) throw new Error(`Catalog feed returned ${response.status}`)
  const payload = await response.json()
  const products = Array.isArray(payload.products) ? payload.products : []
  let productsAdded = 0
  let productsUpdated = 0
  let imagesAdded = 0

  for (const product of products) {
    const variants = Array.isArray(product.variants) ? product.variants : []
    const availableVariants = variants.filter((variant) => variant.available !== false)
    const prices = variants.map((variant) => Number(variant.price)).filter(Number.isFinite)
    const sizes = optionValues(product, 'Size')
    const conditions = optionValues(product, 'Condition')
    const winding = optionValues(product, 'Winding Material')
    const inputVoltages = tagValues(product, 'input')
    const outputVoltages = tagValues(product, 'output')
    const specialTypes = tagValues(product, 'type')
    const description = htmlToText(product.body_html || '')
    const shortDescription = (description.split('\n').find((line) => line.length > 45) || description || product.title).slice(0, 500)
    const sku = String(variants.find((variant) => variant.sku)?.sku || `REF-${product.id}`).slice(0, 100)
    const specs = {
      'Available Sizes': sizes.join(', '),
      'Available Conditions': conditions.join(', '),
      'Winding Materials': winding.join(', '),
      'Available Configurations': String(availableVariants.length),
    }
    for (const key of Object.keys(specs)) if (!specs[key]) delete specs[key]
    const values = [
      product.handle,
      sku,
      product.title,
      shortDescription,
      description.slice(0, 60000),
      categoryFor(product),
      conditions.length === 1 && conditions[0].toLowerCase().includes('used') ? 'Used' : 'New',
      firstNumber(sizes),
      inputVoltages.join(', '),
      outputVoltages.join(', '),
      /(^|\s)1-phase/i.test(product.title) ? 'Single' : 'Three',
      specialTypes.join(', '),
      prices.length ? Math.min(...prices) : null,
      prices.length ? Math.max(...prices) : null,
      'USD',
      availableVariants.length,
      'Contact for current availability',
      JSON.stringify(specs),
      0,
      1,
    ]

    const [existing] = await connection.execute('SELECT id FROM products WHERE slug=? LIMIT 1', [product.handle])
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

    const [imageCount] = await connection.execute('SELECT COUNT(*) total FROM product_images WHERE product_id=?', [productId])
    if (Number(imageCount[0]?.total || 0) === 0) {
      const images = Array.isArray(product.images) ? product.images : []
      for (const [index, image] of images.entries()) {
        if (!image.src) continue
        await connection.execute(
          'INSERT INTO product_images (product_id,file_name,mime_type,image_data,external_url,sort_order) VALUES (?,?,?,NULL,?,?)',
          [productId, imageFileName(image.src, index), 'image/remote', image.src, index],
        )
        imagesAdded += 1
      }
    }
  }

  return { sourceProducts: products.length, productsAdded, productsUpdated, imagesAdded }
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
      if (Number(lockRows[0]?.acquired) !== 1) throw new Error('Could not acquire the one-time catalog import lock.')
      try {
        const [completed] = await connection.execute('SELECT completed_at FROM deployment_tasks WHERE task_key=? LIMIT 1', [DEPLOYMENT_TASK_KEY])
        if (completed.length) {
          console.log(`Catalog import skipped: ${DEPLOYMENT_TASK_KEY} already completed at ${completed[0].completed_at}.`)
          return
        }
        const result = await importReferenceCatalog(connection, { updateExisting: false })
        await connection.execute('INSERT INTO deployment_tasks (task_key,result_json) VALUES (?,?)', [DEPLOYMENT_TASK_KEY, JSON.stringify(result)])
        console.log(`One-time catalog import complete: ${result.sourceProducts} found, ${result.productsAdded} added, ${result.imagesAdded} images linked.`)
      } finally {
        await connection.execute('SELECT RELEASE_LOCK(?)', [`candron-${DEPLOYMENT_TASK_KEY}`])
      }
      return
    }
    const result = await importReferenceCatalog(connection, { updateExisting: process.argv.includes('--update') })
    console.log(`Catalog import complete: ${result.sourceProducts} found, ${result.productsAdded} added, ${result.productsUpdated} updated, ${result.imagesAdded} images linked.`)
  } finally {
    await connection.end()
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await run()
