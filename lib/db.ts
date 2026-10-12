import mysql, { type Pool, type RowDataPacket } from 'mysql2/promise'

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

export type CatalogProduct = RowDataPacket & {
  id: number
  slug: string
  sku: string
  name: string
  short_description: string
  description: string
  category: string
  condition_name: 'New' | 'Used' | 'Remanufactured'
  kva: string | null
  input_voltage: string
  output_voltage: string
  phase: string
  special_type: string
  price_min: string | null
  price_max: string | null
  currency: string
  stock_quantity: number
  lead_time: string
  specs_json: Record<string, string> | string | null
  is_featured: number
  is_active: number
  primary_image_id: number | null
  created_at: Date
  updated_at: Date
}

export function normalizeProduct(row: CatalogProduct) {
  let specs: Record<string, string> = {}
  if (row.specs_json) {
    try {
      specs = typeof row.specs_json === 'string' ? JSON.parse(row.specs_json) : row.specs_json
    } catch {
      specs = {}
    }
  }
  return {
    ...row,
    kva: row.kva === null ? null : Number(row.kva),
    price_min: row.price_min === null ? null : Number(row.price_min),
    price_max: row.price_max === null ? null : Number(row.price_max),
    is_featured: Boolean(row.is_featured),
    is_active: Boolean(row.is_active),
    specs,
    image: row.primary_image_id ? `/api/media/${row.primary_image_id}` : '/images/products/placeholder.svg',
  }
}
