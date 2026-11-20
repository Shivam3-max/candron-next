import { NextResponse } from 'next/server'
import { isDatabaseConfigured } from '@/lib/db'
import { clientIp, rateLimited, siteOrigin } from '@/lib/rate-limit'
import { AccountError, requestLoginLink } from '@/lib/shop/customers'

export const dynamic = 'force-dynamic'

/** Emails a one-time sign-in link. The response is the same whether or not the account existed. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({})) as { email?: string; next?: string; website?: string }
  const email = String(body.email ?? '').trim().toLowerCase()
  if (rateLimited(`login-ip:${clientIp(req)}`, 10, 15 * 60_000) || rateLimited(`login-email:${email}`, 3, 15 * 60_000)) {
    return NextResponse.json({ error: 'Too many sign-in requests. Please wait a few minutes.' }, { status: 429 })
  }
  if (body.website) return NextResponse.json({ ok: true }) // honeypot
  if (!isDatabaseConfigured()) return NextResponse.json({ error: 'Accounts are unavailable right now.' }, { status: 503 })
  try {
    await requestLoginLink(email, siteOrigin(req), String(body.next ?? '/account'))
    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof AccountError) return NextResponse.json({ error: error.message }, { status: 400 })
    console.error('[account] login link failed', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'Could not send the sign-in email. Please try again.' }, { status: 500 })
  }
}
