import mysql, { type Pool, type RowDataPacket } from 'mysql2/promise'
import type { SpecRow } from '@/lib/inventory'

declare global {
  // eslint-disable-next-line no-var
  var __candronMysqlPool: Pool | undefined
}

function required(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

export function isDatabaseConfigured() {
  return Boolean(process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME)
}

export function getDb(): Pool {
  if (!global.__candronMysqlPool) {
    global.__candronMysqlPool = mysql.createPool({
      host: required('DB_HOST'),
      port: Number(process.env.DB_PORT || 3306),
      user: required('DB_USER'),
      password: process.env.DB_PASSWORD ?? '',
      database: required('DB_NAME'),
      waitForConnections: true,
      connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT || 5000),
      connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 8),
      queueLimit: 0,
      charset: 'utf8mb4',
      timezone: 'Z',
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : undefined,
    })
  }
  return global.__candronMysqlPool
}

type Json = string | null | unknown

export type CatalogProduct = RowDataPacket & {
  id: number
  slug: string
  sku: string
  name: string
  short_description: string
  description: string
  category: string
  condition_name: string
  status: string
  manufacturer: string
  year_built: number | null
  kva: string | null
  rating_unit: string
  input_voltage: string
  output_voltage: string
  phase: string
  frequency: string
  winding: string
  cooling: string
  special_type: string
  price_min: string | null
  price_max: string | null
  show_price: number
  currency: string
  stock_quantity: number
  location: string
  lead_time: string
  warranty: string
  dim_height: string | null
  dim_width: string | null
  dim_depth: string | null
  dim_unit: string
  weight: string | null
  weight_unit: string
  highlights_json: Json
  documents_json: Json
  specs_json: Json
  is_featured: number
  is_active: number
  primary_image_id: number | null
  created_at: Date
  updated_at: Date
}

const parse = <T,>(value: Json, fallback: T): T => {
  if (value === null || value === undefined || value === '') return fallback
  if (typeof value !== 'string') return value as T
  try { return JSON.parse(value) as T } catch { return fallback }
}
const num = (value: string | null) => (value === null || value === undefined ? null : Number(value))

/** Older rows stored specs as a flat {label: value} object; current rows use grouped SpecRow[]. */
function toSpecRows(value: Json): SpecRow[] {
  const raw = parse<unknown>(value, [])
  if (Array.isArray(raw)) {
    return raw
      .filter((r): r is SpecRow => !!r && typeof r === 'object' && 'label' in r && 'value' in r)
      .map(r => ({ group: String(r.group || 'Specifications'), label: String(r.label), value: String(r.value) }))
      .filter(r => r.label && r.value)
  }
  if (raw && typeof raw === 'object') {
    return Object.entries(raw as Record<string, unknown>).map(([label, v]) => ({ group: 'Specifications', label, value: String(v) }))
  }
  return []
}

export function normalizeProduct(row: CatalogProduct) {
  const { highlights_json, documents_json, specs_json, ...rest } = row
  return {
    ...rest,
    kva: num(row.kva),
    price_min: num(row.price_min),
    price_max: num(row.price_max),
    dim_height: num(row.dim_height),
    dim_width: num(row.dim_width),
    dim_depth: num(row.dim_depth),
    weight: num(row.weight),
    show_price: Boolean(row.show_price ?? 1),
    is_featured: Boolean(row.is_featured),
    is_active: Boolean(row.is_active),
    highlights: parse<string[]>(highlights_json, []).filter(Boolean).map(String),
    documents: parse<{ label: string; url: string }[]>(documents_json, []).filter(d => d && d.url),
    specs: toSpecRows(specs_json),
    image: row.primary_image_id ? `/api/media/${row.primary_image_id}` : null,
  }
}

export type InventoryProduct = ReturnType<typeof normalizeProduct>

const PRIMARY_IMAGE = '(SELECT pi.id FROM product_images pi WHERE pi.product_id=p.id ORDER BY pi.sort_order,pi.id LIMIT 1) primary_image_id'

/** Public product lookup with its ordered images and a few related items from the same category. */
export async function getPublicProduct(slug: string) {
  if (!isDatabaseConfigured()) return null
  try {
    const db = getDb()
    const [rows] = await db.execute<CatalogProduct[]>(`SELECT p.*, ${PRIMARY_IMAGE} FROM products p WHERE p.slug=? AND p.is_active=1 LIMIT 1`, [slug])
    if (!rows[0]) return null
    const product = normalizeProduct(rows[0])
    const [images] = await db.execute<(RowDataPacket & { id: number })[]>('SELECT id FROM product_images WHERE product_id=? ORDER BY sort_order,id', [product.id])
    const [related] = await db.execute<CatalogProduct[]>(
      `SELECT p.*, ${PRIMARY_IMAGE} FROM products p WHERE p.is_active=1 AND p.id<>? ORDER BY (p.category=?) DESC, p.is_featured DESC, p.updated_at DESC LIMIT 3`,
      [product.id, product.category],
    )
    return { product: { ...product, images: images.map(i => `/api/media/${i.id}`) }, related: related.map(normalizeProduct) }
  } catch (error) {
    console.warn('[inventory] Database unavailable while loading a product.', error instanceof Error ? error.message : error)
    return null
  }
}

export { PRIMARY_IMAGE }
