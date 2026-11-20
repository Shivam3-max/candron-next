import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { isShopError } from '@/lib/shop/orders'
import { cancelQuote, loadQuote, parseQuoteInput, resendQuote, saveQuote } from '@/lib/shop/quotes'

export const dynamic = 'force-dynamic'
type Ctx = { params: Promise<{ id: string }> }

export async function GET(_: Request, ctx: Ctx) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const found = await loadQuote({ id: Number((await ctx.params).id) })
  if (!found) return NextResponse.json({ error: 'Quote not found.' }, { status: 404 })
  const { access_token, ...quote } = found.quote
  return NextResponse.json({ ...found, quote, link: `/quote/${quote.quote_number}?t=${access_token}` })
}

export async function PUT(req: Request, ctx: Ctx) {
  const admin = await getCurrentAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json() as Record<string, unknown>
    const result = await saveQuote(Number((await ctx.params).id), parseQuoteInput(body), admin.email, { send: body.send === true })
    return NextResponse.json(result)
  } catch (error) {
    if (isShopError(error)) return NextResponse.json({ error: error.message }, { status: 400 })
    console.error('[admin] quote save failed', error)
    return NextResponse.json({ error: 'Could not save the quote.' }, { status: 500 })
  }
}

/** { action: "cancel" | "resend" } */
export async function PATCH(req: Request, ctx: Ctx) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const id = Number((await ctx.params).id)
  const { action } = await req.json().catch(() => ({})) as { action?: string }
  try {
    if (action === 'cancel') { await cancelQuote(id); return NextResponse.json({ ok: true }) }
    if (action === 'resend') return NextResponse.json({ ok: true, emailed: await resendQuote(id) })
    return NextResponse.json({ error: 'Unknown action.' }, { status: 400 })
  } catch (error) {
    if (isShopError(error)) return NextResponse.json({ error: error.message }, { status: 400 })
    throw error
  }
}
