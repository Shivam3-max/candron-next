import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { adminListCustomers } from '@/lib/shop/customers'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const url = new URL(req.url)
  const customers = await adminListCustomers(url.searchParams.get('q')?.trim().slice(0, 100) ?? '', url.searchParams.get('status') ?? '')
  return NextResponse.json({ customers: customers.map(({ session_nonce: _n, ...c }) => { void _n; return c }) })
}
