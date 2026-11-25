import { NextResponse } from 'next/server'
import { createAdminSession } from '@/lib/admin-auth'
import { AdminUserError, redeemSetupLink } from '@/lib/admin-users'
import { clientIp, rateLimited } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

/** { token, password } → an invited admin sets their password and is signed in. */
export async function POST(req: Request) {
  if (rateLimited(`admin-setup:${clientIp(req)}`, 10, 15 * 60_000)) return NextResponse.json({ error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 })
  const body = await req.json().catch(() => ({})) as Record<string, unknown>
  try {
    const admin = await redeemSetupLink(String(body.token ?? ''), String(body.password ?? ''))
    if (!admin) return NextResponse.json({ error: 'This link is invalid, used or expired. Ask the main administrator to send a new one.' }, { status: 400 })
    await createAdminSession(admin.id, admin.nonce)
    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof AdminUserError) return NextResponse.json({ error: error.message }, { status: 400 })
    console.error('[admin] set password failed', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'Could not set the password.' }, { status: 500 })
  }
}
