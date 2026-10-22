import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { getDb, normalizeProduct, PRIMARY_IMAGE, type CatalogProduct } from '@/lib/db'
import AdminProducts from '@/components/admin/AdminProducts'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Inventory Admin', robots: { index: false, follow: false } }

export default async function AdminPage() {
  const admin = await getCurrentAdmin()
  if (!admin) redirect('/admin/login')
  const [rows] = await getDb().query<CatalogProduct[]>(`SELECT p.*, ${PRIMARY_IMAGE} FROM products p ORDER BY p.updated_at DESC`)
  return <AdminProducts initialProducts={rows.map(normalizeProduct)} adminEmail={admin.email} />
}
