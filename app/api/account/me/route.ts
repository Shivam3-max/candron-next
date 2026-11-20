import { NextResponse } from 'next/server'
import { getCurrentCustomer, listAddresses } from '@/lib/shop/customers'

export const dynamic = 'force-dynamic'

/** Signed-in customer's details and saved addresses (checkout prefill); { customer: null } when signed out. */
export async function GET() {
  const c = await getCurrentCustomer()
  if (!c) return NextResponse.json({ customer: null })
  return NextResponse.json({
    customer: { email: c.email, name: c.name, company: c.company, phone: c.phone, taxExempt: c.tax_exempt_status },
    addresses: await listAddresses(c.id),
  })
}
