import { NextResponse } from 'next/server'
import { getCurrentCustomer, reorderItems } from '@/lib/shop/customers'
import { priceCart } from '@/lib/shop/catalog'

export const dynamic = 'force-dynamic'

/** "Order again": a past order's inventory lines re-priced today, for the browser to put in the cart. */
export async function GET(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const c = await getCurrentCustomer()
  if (!c) return NextResponse.json({ error: 'Please sign in again.' }, { status: 401 })
  const items = await reorderItems(c, Number((await ctx.params).id))
  if (!items.length) return NextResponse.json({ error: 'Nothing from this order can be re-ordered online. Please request a quote.' }, { status: 400 })
  const priced = await priceCart(items)
  return NextResponse.json({ lines: priced.lines })
}
