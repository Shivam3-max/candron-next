import { NextResponse } from 'next/server'
import { clientIp, rateLimited, siteOrigin } from '@/lib/rate-limit'
import { isShopError } from '@/lib/shop/orders'
import { acceptQuote } from '@/lib/shop/quotes'

export const dynamic = 'force-dynamic'

/** Buyer accepts a quote from its private link: returns the Stripe payment page or the order page. */
export async function POST(req: Request) {
  if (rateLimited(`quote-accept:${clientIp(req)}`, 10, 10 * 60_000)) return NextResponse.json({ error: 'Too many attempts. Please wait a few minutes.' }, { status: 429 })
  const body = await req.json().catch(() => ({})) as Record<string, unknown>
  try {
    const { url } = await acceptQuote(String(body.number ?? ''), String(body.token ?? ''), {
      poNumber: String(body.poNumber ?? '').trim(), acceptTerms: body.acceptTerms === true,
    }, siteOrigin(req))
    return NextResponse.json({ url })
  } catch (error) {
    if (isShopError(error)) return NextResponse.json({ error: error.message }, { status: 400 })
    console.error('[quotes] accept failed', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'Something went wrong. Please try again or reply to the quote email.' }, { status: 500 })
  }
}
