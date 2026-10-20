import { NextRequest, NextResponse } from 'next/server'
import type { RowDataPacket } from 'mysql2/promise'
import { getDb, isDatabaseConfigured, normalizeProduct, PRIMARY_IMAGE, type CatalogProduct } from '@/lib/db'

export const dynamic = 'force-dynamic'

const SORTS: Record<string, string> = {
  featured: 'p.is_featured DESC, p.updated_at DESC',
  newest: 'p.created_at DESC',
  'rating-asc': 'p.kva IS NULL, p.kva ASC',
  'rating-desc': 'p.kva IS NULL, p.kva DESC',
  'price-asc': 'p.show_price=0, p.price_min IS NULL, p.price_min ASC',
  'price-desc': 'p.show_price=0, p.price_min IS NULL, p.price_min DESC',
  name: 'p.name ASC',
}

// query param → column; every filter is an exact match on one value
const FILTERS: Record<string, string> = {
  category: 'category', condition: 'condition_name', status: 'status', phase: 'phase',
  primary: 'input_voltage', secondary: 'output_voltage', rating: 'kva',
}

const EMPTY_FILTERS = Object.fromEntries(Object.values(FILTERS).map(c => [c, []]))

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const page = Math.max(1, Number(params.get('page')) || 1)
  const limit = Math.min(48, Math.max(6, Number(params.get('limit')) || 12))
  const empty = () => NextResponse.json({ products: [], total: 0, page, limit, filters: EMPTY_FILTERS, databaseAvailable: false })
  if (!isDatabaseConfigured()) return empty()

  try {
    const where = ['p.is_active = 1']
    const values: Array<string | number> = []
    for (const [query, column] of Object.entries(FILTERS)) {
      const value = params.get(query)
      if (value) { where.push(`p.${column} = ?`); values.push(value) }
    }
    if (params.get('inStock') === '1') where.push("p.stock_quantity > 0 AND p.status = 'Available'")
    const search = params.get('q')?.trim()
    if (search) {
      where.push('(p.name LIKE ? OR p.sku LIKE ? OR p.short_description LIKE ? OR p.category LIKE ? OR p.special_type LIKE ?)')
      values.push(...Array(5).fill(`%${search}%`))
    }
    const sqlWhere = `WHERE ${where.join(' AND ')}`
    const db = getDb()
    const [countRows] = await db.execute<(RowDataPacket & { total: number })[]>(`SELECT COUNT(*) total FROM products p ${sqlWhere}`, values)
    const [rows] = await db.query<CatalogProduct[]>(
      `SELECT p.*, ${PRIMARY_IMAGE} FROM products p ${sqlWhere} ORDER BY ${SORTS[params.get('sort') || 'featured'] || SORTS.featured} LIMIT ? OFFSET ?`,
      [...values, limit, (page - 1) * limit],
    )
    const filters: Record<string, unknown[]> = {}
    for (const column of Object.values(FILTERS)) {
      const [options] = await db.query<RowDataPacket[]>(
        `SELECT ${column} value, COUNT(*) count FROM products WHERE is_active=1 AND ${column} IS NOT NULL AND ${column}<>'' GROUP BY ${column} ORDER BY ${column}`,
      )
      filters[column] = options.map(o => ({ value: column === 'kva' ? Number(o.value) : o.value, count: Number(o.count) }))
    }
    return NextResponse.json({ products: rows.map(normalizeProduct), total: Number(countRows[0]?.total || 0), page, limit, filters, databaseAvailable: true })
  } catch (error) {
    console.warn('[catalog] Database unavailable; returning empty inventory.', error instanceof Error ? error.message : error)
    return empty()
  }
}
