import { NextResponse } from 'next/server'
import type { ResultSetHeader } from 'mysql2/promise'
import { getCurrentAdmin } from '@/lib/admin-auth';import { getDb } from '@/lib/db';import { parseProductInput,productColumns,productErrorMessage,productValues } from '@/lib/product-input'
export const dynamic='force-dynamic'
export async function POST(request:Request){if(!await getCurrentAdmin())return NextResponse.json({error:'Unauthorized'},{status:401});try{const input=parseProductInput(await request.json());const [result]=await getDb().execute<ResultSetHeader>(`INSERT INTO products (${productColumns.join(',')}) VALUES (${productColumns.map(()=>'?').join(',')})`,productValues(input));return NextResponse.json({id:result.insertId,slug:input.slug},{status:201})}catch(error){return NextResponse.json({error:productErrorMessage(error,'Unable to create product.')},{status:400})}}
