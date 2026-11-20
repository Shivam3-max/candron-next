import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { isShopError, loadOrder, updateOrder } from '@/lib/shop/orders'
import { dashboardPaymentUrl } from '@/lib/shop/stripe'

export const dynamic = 'force-dynamic'
type Ctx = { params: Promise<{ id: string }> }

export async function GET(_: Request, ctx: Ctx) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const found = await loadOrder({ id: Number((await ctx.params).id) })
  if (!found) return NextResponse.json({ error: 'Order not found.' }, { status: 404 })
  const { access_token: _token, ...order } = found.order
  void _token
  return NextResponse.json({
    order, items: found.items, events: found.events,
    stripeUrl: order.stripe_payment_intent ? dashboardPaymentUrl(order.stripe_payment_intent, Boolean(order.live_mode)) : null,
  })
}

export async function PATCH(req: Request, ctx: Ctx) {
  const admin = await getCurrentAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json().catch(() => ({})) as Record<string, unknown>
  const pick = (k: string) => (typeof body[k] === 'string' ? (body[k] as string) : undefined)
  try {
    const { emailed } = await updateOrder(Number((await ctx.params).id), admin.email, {
      status: pick('status'), trackingCarrier: pick('trackingCarrier'), trackingNumber: pick('trackingNumber'),
      adminNotes: pick('adminNotes'), note: pick('note'),
    })
    return NextResponse.json({ ok: true, emailed })
  } catch (error) {
    if (isShopError(error)) return NextResponse.json({ error: error.message }, { status: 400 })
    console.error('[admin] order update failed', error)
    return NextResponse.json({ error: 'Could not update the order.' }, { status: 500 })
  }
}
