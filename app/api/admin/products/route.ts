import { NextResponse } from 'next/server'
import type { ResultSetHeader } from 'mysql2/promise'
import type { CatalogProduct } from '@/lib/db'
import { getCurrentAdmin } from '@/lib/admin-auth';import { getDb, normalizeProduct, PRIMARY_IMAGE } from '@/lib/db';import { parseProductInput,productColumns,productValues } from '@/lib/product-input'
export const dynamic='force-dynamic'
export async function GET(){if(!await getCurrentAdmin())return NextResponse.json({error:'Unauthorized'},{status:401});const [rows]=await getDb().query<CatalogProduct[]>(`SELECT p.*, ${PRIMARY_IMAGE} FROM products p ORDER BY p.updated_at DESC`);return NextResponse.json({products:rows.map(normalizeProduct)})}
export async function POST(request:Request){if(!await getCurrentAdmin())return NextResponse.json({error:'Unauthorized'},{status:401});try{const input=parseProductInput(await request.json());const [result]=await getDb().execute<ResultSetHeader>(`INSERT INTO products (${productColumns.join(',')}) VALUES (${productColumns.map(()=>'?').join(',')})`,productValues(input));return NextResponse.json({id:result.insertId,slug:input.slug},{status:201})}catch(error){const message=error instanceof Error?error.message:'Unable to create product.';return NextResponse.json({error:message.includes('Duplicate')?'That item code or URL slug is already used by another product.':message},{status:400})}}
