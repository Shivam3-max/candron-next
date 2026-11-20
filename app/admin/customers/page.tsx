import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { adminListCustomers } from '@/lib/shop/customers'
import AdminCustomers from '@/components/admin/AdminCustomers'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Customers Admin', robots: { index: false, follow: false } }

export default async function AdminCustomersPage() {
  const admin = await getCurrentAdmin()
  if (!admin) redirect('/admin/login')
  const customers = await adminListCustomers()
  return <AdminCustomers initial={JSON.parse(JSON.stringify(customers.map(({ session_nonce: _n, ...c }) => { void _n; return c })))} adminEmail={admin.email} />
}
