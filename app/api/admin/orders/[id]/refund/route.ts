import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { isShopError, refundOrder } from '@/lib/shop/orders'

export const dynamic = 'force-dynamic'

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json().catch(() => ({})) as Record<string, unknown>
  const amount = body.amount === null || body.amount === undefined || body.amount === '' ? null : Number(body.amount)
  if (amount !== null && !Number.isFinite(amount)) return NextResponse.json({ error: 'Enter a valid amount.' }, { status: 400 })
  try {
    const { emailed } = await refundOrder(Number((await ctx.params).id), admin.email, amount, String(body.reason ?? ''))
    return NextResponse.json({ ok: true, emailed })
  } catch (error) {
    if (isShopError(error)) return NextResponse.json({ error: error.message }, { status: 400 })
    const message = error instanceof Error ? error.message : 'Refund failed.'
    console.error('[admin] refund failed', message)
    return NextResponse.json({ error: `Stripe refused the refund: ${message}` }, { status: 502 })
  }
}
