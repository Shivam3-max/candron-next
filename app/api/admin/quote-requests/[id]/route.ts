import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { setQuoteRequestStatus } from '@/lib/shop/quotes'

export const dynamic = 'force-dynamic'

/** { status: "closed" | "new" } */
export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { status } = await req.json().catch(() => ({})) as { status?: string }
  if (status !== 'closed' && status !== 'new') return NextResponse.json({ error: 'Invalid status.' }, { status: 400 })
  await setQuoteRequestStatus(Number((await ctx.params).id), status)
  return NextResponse.json({ ok: true })
}
