import { NextResponse } from 'next/server'
import { AccountError, getCurrentCustomer, listAddresses, parseAddress, saveAddress } from '@/lib/shop/customers'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const c = await getCurrentCustomer()
  if (!c) return NextResponse.json({ error: 'Please sign in again.' }, { status: 401 })
  try {
    await saveAddress(c.id, parseAddress(await req.json().catch(() => ({}))))
    return NextResponse.json({ addresses: await listAddresses(c.id) })
  } catch (error) {
    if (error instanceof AccountError) return NextResponse.json({ error: error.message }, { status: 400 })
    throw error
  }
}
