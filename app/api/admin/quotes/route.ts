import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { isShopError } from '@/lib/shop/orders'
import { listQuoteRequests, listQuotes, parseQuoteInput, saveQuote } from '@/lib/shop/quotes'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const all = new URL(req.url).searchParams.get('closed') === '1'
  const [quotes, requests] = await Promise.all([listQuotes(), listQuoteRequests(all)])
  return NextResponse.json({ quotes, requests })
}

export async function POST(req: Request) {
  const admin = await getCurrentAdmin()
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json() as Record<string, unknown>
    const result = await saveQuote(null, parseQuoteInput(body), admin.email, { send: body.send === true })
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    if (isShopError(error)) return NextResponse.json({ error: error.message }, { status: 400 })
    console.error('[admin] quote create failed', error)
    return NextResponse.json({ error: 'Could not save the quote.' }, { status: 500 })
  }
}
