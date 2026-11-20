import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { listOrders } from '@/lib/shop/orders'
import { stripeConfigured, stripeLiveMode } from '@/lib/shop/settings'
import AdminOrders from '@/components/admin/AdminOrders'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Orders Admin', robots: { index: false, follow: false } }

export default async function AdminOrdersPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const admin = await getCurrentAdmin()
  if (!admin) redirect('/admin/login')
  const { id } = await searchParams
  const orders = await listOrders()
  return (
    <AdminOrders
      initialOrders={JSON.parse(JSON.stringify(orders))}
      initialId={id ? Number(id) : null}
      adminEmail={admin.email}
      stripe={{ configured: stripeConfigured(), live: stripeLiveMode() }}
    />
  )
}
