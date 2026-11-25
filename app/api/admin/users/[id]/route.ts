import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { AdminUserError, listAdmins, removeAdmin } from '@/lib/admin-users'

export const dynamic = 'force-dynamic'

export async function DELETE(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    await removeAdmin(Number((await ctx.params).id), admin.email)
    return NextResponse.json({ ok: true, admins: await listAdmins() })
  } catch (error) {
    if (error instanceof AdminUserError) return NextResponse.json({ error: error.message }, { status: 400 })
    console.error('[admin] remove failed', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'Could not remove the admin.' }, { status: 500 })
  }
}
