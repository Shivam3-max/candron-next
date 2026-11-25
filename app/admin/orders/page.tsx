import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { listOrders, runDailyTasks } from '@/lib/shop/orders'
import { getShopSettings, stripeConfigured, stripeLiveMode } from '@/lib/shop/settings'
import AdminOrders from '@/components/admin/AdminOrders'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Orders Admin', robots: { index: false, follow: false } }

export default async function AdminOrdersPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const admin = await getCurrentAdmin()
  if (!admin) redirect('/admin/login')
  const { id } = await searchParams
  // Fallback for the daily cron: reminders and forfeit flags run at most once a day
  await runDailyTasks().catch(error => console.warn('[admin] daily tasks failed', error instanceof Error ? error.message : error))
  const [orders, settings] = await Promise.all([listOrders(), getShopSettings()])
  return (
    <AdminOrders
      initialOrders={JSON.parse(JSON.stringify(orders))}
      initialId={id ? Number(id) : null}
      adminEmail={admin.email}
      stripe={{ configured: stripeConfigured(), live: stripeLiveMode() }}
      yards={Object.fromEntries(settings.pickup.yards.map(y => [y.id, y.name]))}
    />
  )
}
