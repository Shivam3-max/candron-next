import { NextResponse } from 'next/server'
import { clientIp, rateLimited } from '@/lib/rate-limit'
import { AccountError, addTaxDocument, getCurrentCustomer, listDocuments } from '@/lib/shop/customers'

export const dynamic = 'force-dynamic'

/** Upload a tax-exemption certificate (PDF/JPG/PNG, 5 MB). The account goes to "pending review". */
export async function POST(req: Request) {
  const c = await getCurrentCustomer()
  if (!c) return NextResponse.json({ error: 'Please sign in again.' }, { status: 401 })
  if (rateLimited(`doc:${clientIp(req)}`, 10, 60 * 60_000)) return NextResponse.json({ error: 'Too many uploads. Please try later.' }, { status: 429 })
  const form = await req.formData().catch(() => null)
  const file = form?.get('file')
  if (!(file instanceof File) || !file.size) return NextResponse.json({ error: 'Choose a file to upload.' }, { status: 400 })
  try {
    await addTaxDocument(c.id, file, String(form?.get('note') ?? ''))
    const documents = (await listDocuments(c.id)).map(d => ({ id: d.id, name: d.file_name, created: new Date(d.created_at).toISOString(), note: d.note }))
    return NextResponse.json({ ok: true, documents })
  } catch (error) {
    if (error instanceof AccountError) return NextResponse.json({ error: error.message }, { status: 400 })
    throw error
  }
}
