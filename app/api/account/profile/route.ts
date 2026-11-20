import { NextResponse } from 'next/server'
import { getCurrentCustomer, updateProfile } from '@/lib/shop/customers'

export const dynamic = 'force-dynamic'

export async function PUT(req: Request) {
  const c = await getCurrentCustomer()
  if (!c) return NextResponse.json({ error: 'Please sign in again.' }, { status: 401 })
  await updateProfile(c.id, await req.json().catch(() => ({})))
  return NextResponse.json({ ok: true })
}
