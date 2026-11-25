import { NextResponse } from 'next/server'
import { isDatabaseConfigured } from '@/lib/db'
import { clientIp, rateLimited } from '@/lib/rate-limit'
import { quoteCheckout } from '@/lib/shop/orders'
import { shopIsOpen } from '@/lib/shop/settings'

export const dynamic = 'force-dynamic'

/** Re-prices the browser's cart from the database: freight, pickup yard, USD for US buyers and the online limit. */
export async function POST(req: Request) {
  if (rateLimited(`cart:${clientIp(req)}`, 120, 60_000)) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
  if (!isDatabaseConfigured()) return NextResponse.json({ error: 'Online ordering is unavailable.' }, { status: 503 })
  const body = await req.json().catch(() => ({})) as Record<string, unknown>
  const items = Array.isArray(body.items) ? body.items : []
  const fulfilment = body.fulfilment === 'pickup' ? 'pickup' : 'delivery'
  const a = body.address && typeof body.address === 'object' ? body.address as Record<string, unknown> : null
  const address = a && a.country && a.region ? { country: String(a.country).toUpperCase(), region: String(a.region).toUpperCase(), postal: String(a.postal ?? '') } : null
  const yard = String(body.yard ?? '').slice(0, 40)
  try {
    const [open, quote] = await Promise.all([shopIsOpen(), quoteCheckout(items, fulfilment, yard, address)])
    return NextResponse.json({ open, ...quote })
  } catch (error) {
    console.error('[shop] cart pricing failed', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'Could not load your cart. Please try again.' }, { status: 500 })
  }
}
