import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { isShopError, issueInvoice, markInvoicePaidOffline } from '@/lib/shop/orders'

export const dynamic = 'force-dynamic'

/**
 * { action: "balance", freight?: number, days?: number }  → send the balance invoice for a deposit order
 * { action: "mark_paid", note?: string }                  → invoice paid by wire / cheque outside Stripe
 */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const id = Number((await ctx.params).id)
  const body = await req.json().catch(() => ({})) as Record<string, unknown>
  try {
    if (body.action === 'balance') {
      const freight = body.freight === '' || body.freight === null || body.freight === undefined ? null : Number(body.freight)
      if (freight !== null && !Number.isFinite(freight)) return NextResponse.json({ error: 'Enter a valid freight amount.' }, { status: 400 })
      const result = await issueInvoice(id, 'balance', { daysUntilDue: Number(body.days) || 14, freight, actor: admin.email })
      return NextResponse.json({ ok: true, ...result })
    }
    if (body.action === 'mark_paid') {
      await markInvoicePaidOffline(id, admin.email, String(body.note ?? '').slice(0, 300))
      return NextResponse.json({ ok: true })
    }
    return NextResponse.json({ error: 'Unknown action.' }, { status: 400 })
  } catch (error) {
    if (isShopError(error)) return NextResponse.json({ error: error.message }, { status: 400 })
    const message = error instanceof Error ? error.message : 'Stripe error'
    console.error('[admin] invoice action failed', message)
    return NextResponse.json({ error: `Stripe: ${message}` }, { status: 502 })
  }
}
