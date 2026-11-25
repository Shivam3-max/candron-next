import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { AdminUserError, inviteAdmin, listAdmins } from '@/lib/admin-users'
import { siteOrigin } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json({ admins: await listAdmins() })
}

/** { email } → invite an admin (main administrator only). */
export async function POST(req: Request) {
  const admin = await getCurrentAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json().catch(() => ({})) as Record<string, unknown>
  try {
    await inviteAdmin(String(body.email ?? ''), admin.email, siteOrigin(req))
    return NextResponse.json({ ok: true, admins: await listAdmins() })
  } catch (error) {
    if (error instanceof AdminUserError) return NextResponse.json({ error: error.message }, { status: 400 })
    console.error('[admin] invite failed', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'Could not send the invitation.' }, { status: 500 })
  }
}
