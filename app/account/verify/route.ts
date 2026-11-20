import { NextResponse } from 'next/server'
import { siteOrigin } from '@/lib/rate-limit'
import { redeemLoginToken } from '@/lib/shop/customers'

export const dynamic = 'force-dynamic'

/** Sign-in link target: redeems the one-time token, sets the session cookie and continues. */
export async function GET(req: Request) {
  const url = new URL(req.url)
  const origin = siteOrigin(req)
  const next = url.searchParams.get('next') ?? '/account'
  const safeNext = /^\/(account|checkout|cart|order\/|quote\/)/.test(next) && !next.startsWith('//') ? next : '/account'
  const customer = await redeemLoginToken(url.searchParams.get('token') ?? '').catch(() => null)
  if (!customer) return NextResponse.redirect(`${origin}/account/login?expired=1`)
  return NextResponse.redirect(`${origin}${safeNext}`)
}
