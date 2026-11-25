import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { isOwner, listAdmins } from '@/lib/admin-users'
import AdminUsers from '@/components/admin/AdminUsers'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Admin users', robots: { index: false, follow: false } }

export default async function AdminUsersPage() {
  const admin = await getCurrentAdmin()
  if (!admin) redirect('/admin/login')
  const admins = await listAdmins()
  return <AdminUsers initial={JSON.parse(JSON.stringify(admins))} adminEmail={admin.email} canManage={isOwner(admin.email)} />
}
