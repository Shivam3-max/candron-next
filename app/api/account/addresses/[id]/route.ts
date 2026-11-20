import { NextResponse } from 'next/server'
import { AccountError, deleteAddress, getCurrentCustomer, listAddresses, parseAddress, saveAddress } from '@/lib/shop/customers'

export const dynamic = 'force-dynamic'
type Ctx = { params: Promise<{ id: string }> }

export async function PUT(req: Request, ctx: Ctx) {
  const c = await getCurrentCustomer()
  if (!c) return NextResponse.json({ error: 'Please sign in again.' }, { status: 401 })
  try {
    await saveAddress(c.id, parseAddress(await req.json().catch(() => ({}))), Number((await ctx.params).id))
    return NextResponse.json({ addresses: await listAddresses(c.id) })
  } catch (error) {
    if (error instanceof AccountError) return NextResponse.json({ error: error.message }, { status: 400 })
    throw error
  }
}

export async function DELETE(_: Request, ctx: Ctx) {
  const c = await getCurrentCustomer()
  if (!c) return NextResponse.json({ error: 'Please sign in again.' }, { status: 401 })
  await deleteAddress(c.id, Number((await ctx.params).id))
  return NextResponse.json({ addresses: await listAddresses(c.id) })
}
