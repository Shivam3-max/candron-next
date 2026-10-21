import { NextRequest, NextResponse } from 'next/server'
import type { RowDataPacket } from 'mysql2/promise'
import { getDb, isDatabaseConfigured, normalizeProduct, type CatalogProduct } from '@/lib/db'

export const dynamic = 'force-dynamic'
const allowedSort: Record<string, string> = { newest:'p.created_at DESC','price-asc':'p.price_min IS NULL, p.price_min ASC','price-desc':'p.price_max IS NULL, p.price_max DESC',name:'p.name ASC',stock:'p.stock_quantity DESC, p.name ASC' }

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams, page = Math.max(1, Number(params.get('page')) || 1), limit = Math.min(48, Math.max(6, Number(params.get('limit')) || 12))
  const emptyCatalog = () => NextResponse.json({products:[],total:0,page,limit,filters:{category:[],condition_name:[],kva:[],input_voltage:[],output_voltage:[],phase:[],special_type:[]},databaseAvailable:false})
  if (!isDatabaseConfigured()) return emptyCatalog()
  try {
  const where = ['p.is_active = 1']; const values: Array<string | number> = []
  const exactFilters: Record<string,string> = { category:'p.category',condition:'p.condition_name',kva:'p.kva',inputVoltage:'p.input_voltage',outputVoltage:'p.output_voltage',phase:'p.phase',specialType:'p.special_type' }
  for (const [query,column] of Object.entries(exactFilters)) { const value=params.get(query); if(value){where.push(`${column} = ?`);values.push(value)} }
  const search=params.get('q')?.trim().slice(0,200); if(search){const like=`%${search.replace(/[\\%_]/g,'\\$&')}%`;where.push('(p.name LIKE ? OR p.sku LIKE ? OR p.short_description LIKE ?)');values.push(like,like,like)} // escape LIKE wildcards so "%" isn't match-all
  const sqlWhere=`WHERE ${where.join(' AND ')}`, db=getDb()
  const [countRows]=await db.execute<(RowDataPacket&{total:number})[]>(`SELECT COUNT(*) total FROM products p ${sqlWhere}`,values)
  const [rows]=await db.execute<CatalogProduct[]>(`SELECT p.*, (SELECT pi.id FROM product_images pi WHERE pi.product_id=p.id AND pi.image_data IS NOT NULL ORDER BY pi.sort_order,pi.id LIMIT 1) primary_image_id FROM products p ${sqlWhere} ORDER BY ${Object.hasOwn(allowedSort,params.get('sort')||'')?allowedSort[params.get('sort') as string]:allowedSort.newest} LIMIT ? OFFSET ?`,[...values,limit,(page-1)*limit])
  const filters: Record<string,unknown[]>={}
  for(const column of ['category','condition_name','kva','input_voltage','output_voltage','phase','special_type']){const [options]=await db.query<RowDataPacket[]>(`SELECT ${column} value, COUNT(*) count FROM products WHERE is_active=1 AND ${column} IS NOT NULL AND ${column}<>'' GROUP BY ${column} ORDER BY ${column}`);filters[column]=options}
  return NextResponse.json({products:rows.map(normalizeProduct),total:countRows[0]?.total||0,page,limit,filters,databaseAvailable:true})
  } catch (error) {
    console.warn('[catalog] Database unavailable; returning empty inventory.', error instanceof Error ? error.message : error)
    return emptyCatalog()
  }
}
