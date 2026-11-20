import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { getShopSettings, stripeConfigured, stripeLiveMode } from '@/lib/shop/settings'
import AdminShopSettings from '@/components/admin/AdminShopSettings'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Shop settings', robots: { index: false, follow: false } }

export default async function AdminShopPage() {
  const admin = await getCurrentAdmin()
  if (!admin) redirect('/admin/login')
  return (
    <AdminShopSettings
      initial={await getShopSettings()}
      adminEmail={admin.email}
      stripe={{ configured: stripeConfigured(), live: stripeLiveMode() }}
    />
  )
}
