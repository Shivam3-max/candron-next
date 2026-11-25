import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { getDb, normalizeProduct, PRIMARY_IMAGE, type CatalogProduct } from '@/lib/db'
import AdminProducts from '@/components/admin/AdminProducts'
import { getShopSettings } from '@/lib/shop/settings'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Inventory Admin', robots: { index: false, follow: false } }

export default async function AdminPage() {
  const admin = await getCurrentAdmin()
  if (!admin) redirect('/admin/login')
  const [[rows], settings] = await Promise.all([
    getDb().query<CatalogProduct[]>(`SELECT p.*, ${PRIMARY_IMAGE} FROM products p ORDER BY p.updated_at DESC`),
    getShopSettings(),
  ])
  const yards = settings.pickup.yards.map(y => ({ id: y.id, name: y.name }))
  return <AdminProducts initialProducts={rows.map(normalizeProduct)} adminEmail={admin.email} yards={yards} />
}
