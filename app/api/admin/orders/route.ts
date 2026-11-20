import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { listOrders } from '@/lib/shop/orders'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const url = new URL(req.url)
  const orders = await listOrders({
    status: url.searchParams.get('status') || undefined,
    q: url.searchParams.get('q')?.trim().slice(0, 100) || undefined,
    includeAbandoned: url.searchParams.get('all') === '1',
  })
  return NextResponse.json({ orders })
}
