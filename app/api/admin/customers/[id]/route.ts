import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { AccountError, adminLoadCustomer, adminSetCustomerNotes, adminSetTaxExemption, type TaxExemptStatus } from '@/lib/shop/customers'

export const dynamic = 'force-dynamic'
type Ctx = { params: Promise<{ id: string }> }

export async function GET(_: Request, ctx: Ctx) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const found = await adminLoadCustomer(Number((await ctx.params).id))
  if (!found) return NextResponse.json({ error: 'Customer not found.' }, { status: 404 })
  const { session_nonce: _n, ...customer } = found.customer
  void _n
  return NextResponse.json({ ...found, customer, orders: found.orders.map(({ access_token: _t, ...o }) => { void _t; return o }) })
}

/** { taxExempt?: status, note?: string, adminNotes?: string } */
export async function PATCH(req: Request, ctx: Ctx) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const id = Number((await ctx.params).id)
  const body = await req.json().catch(() => ({})) as { taxExempt?: string; note?: string; adminNotes?: string }
  let emailed = false
  try {
    if (body.taxExempt) {
      if (!['none', 'pending', 'approved', 'rejected'].includes(body.taxExempt)) return NextResponse.json({ error: 'Invalid status.' }, { status: 400 })
      emailed = await adminSetTaxExemption(id, body.taxExempt as TaxExemptStatus, body.note ?? '')
    }
    if (body.adminNotes !== undefined) await adminSetCustomerNotes(id, body.adminNotes)
    return NextResponse.json({ ok: true, emailed })
  } catch (error) {
    if (error instanceof AccountError) return NextResponse.json({ error: error.message }, { status: 400 })
    throw error
  }
}
