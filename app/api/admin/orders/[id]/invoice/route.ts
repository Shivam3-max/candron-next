import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/admin-auth'
import {
  extendHold, forfeitDeposit, isShopError, issueInvoice, markInvoicePaidOffline, parseFreightCharges, recordOfflinePayment, sendFreightInvoice,
} from '@/lib/shop/orders'

export const dynamic = 'force-dynamic'

/**
 * { action: "balance", freight?, days? }                  → balance invoice for a deposit order (Stripe)
 * { action: "mark_paid", note? }                         → open invoice paid by EFT / cheque outside Stripe
 * { action: "freight", freight, offloading?, brokerage?, days? } → freight invoice (CANDRON freight)
 * { action: "freight_paid", note? }                      → freight invoice paid outside Stripe
 * { action: "offline_paid", amount, reference? }         → order over the online limit: payment received
 * { action: "extend_hold", days }                        → keep an offline order's stock held longer
 * { action: "forfeit", note? }                           → confirm a deposit forfeit (keeps deposit, releases stock)
 */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const id = Number((await ctx.params).id)
  const body = await req.json().catch(() => ({})) as Record<string, unknown>
  const note = String(body.note ?? '').slice(0, 300)
  try {
    switch (body.action) {
      case 'balance': {
        const freight = body.freight === '' || body.freight === null || body.freight === undefined ? null : Number(body.freight)
        if (freight !== null && !Number.isFinite(freight)) return NextResponse.json({ error: 'Enter a valid freight amount.' }, { status: 400 })
        return NextResponse.json({ ok: true, ...(await issueInvoice(id, 'balance', { daysUntilDue: Number(body.days) || 30, freight, actor: admin.email })) })
      }
      case 'mark_paid':
        await markInvoicePaidOffline(id, admin.email, note)
        return NextResponse.json({ ok: true })
      case 'freight':
        return NextResponse.json({ ok: true, ...(await sendFreightInvoice(id, parseFreightCharges(body), { daysUntilDue: Number(body.days) || 7, actor: admin.email })) })
      case 'freight_paid':
        await markInvoicePaidOffline(id, admin.email, note, 'freight')
        return NextResponse.json({ ok: true })
      case 'offline_paid':
        return NextResponse.json({ ok: true, ...(await recordOfflinePayment(id, admin.email, Number(body.amount), String(body.reference ?? '').slice(0, 60))) })
      case 'extend_hold':
        return NextResponse.json({ ok: true, until: (await extendHold(id, admin.email, Number(body.days) || 5)).toISOString() })
      case 'forfeit':
        return NextResponse.json({ ok: true, ...(await forfeitDeposit(id, admin.email, note)) })
      default:
        return NextResponse.json({ error: 'Unknown action.' }, { status: 400 })
    }
  } catch (error) {
    if (isShopError(error)) return NextResponse.json({ error: error.message }, { status: 400 })
    const message = error instanceof Error ? error.message : 'Stripe error'
    console.error('[admin] order action failed', message)
    return NextResponse.json({ error: `Stripe: ${message}` }, { status: 502 })
  }
}
