import { NextResponse } from 'next/server'
import { clientIp, rateLimited, siteOrigin } from '@/lib/rate-limit'
import { createCheckout, isShopError, parseCheckoutInput } from '@/lib/shop/orders'

export const dynamic = 'force-dynamic'

/** Creates the order + Stripe Checkout Session and returns the hosted payment page URL. */
export async function POST(req: Request) {
  if (rateLimited(`checkout:${clientIp(req)}`, 10, 10 * 60_000)) {
    return NextResponse.json({ error: 'Too many checkout attempts. Please wait a few minutes or call us.' }, { status: 429 })
  }
  try {
    const body = await req.json().catch(() => ({})) as Record<string, unknown>
    if (body.website) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }) // honeypot
    const input = parseCheckoutInput(body)
    const { url, orderNumber } = await createCheckout(input, siteOrigin(req))
    return NextResponse.json({ url, orderNumber })
  } catch (error) {
    if (isShopError(error)) return NextResponse.json({ error: error.message }, { status: 400 })
    console.error('[shop] checkout failed', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'Something went wrong starting checkout. Please try again or call us.' }, { status: 500 })
  }
}
