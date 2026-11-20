import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import type { RowDataPacket } from 'mysql2/promise'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { getDb } from '@/lib/db'
import { listQuoteRequests, listQuotes } from '@/lib/shop/quotes'
import { getShopSettings, stripeConfigured } from '@/lib/shop/settings'
import AdminQuotes from '@/components/admin/AdminQuotes'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Quotes Admin', robots: { index: false, follow: false } }

export default async function AdminQuotesPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const admin = await getCurrentAdmin()
  if (!admin) redirect('/admin/login')
  const { id } = await searchParams
  const [quotes, requests, settings, [products]] = await Promise.all([
    listQuotes(), listQuoteRequests(), getShopSettings(),
    getDb().query<(RowDataPacket & { id: number; sku: string; name: string; price_min: string | null; currency: string; stock_quantity: number })[]>(
      'SELECT id, sku, name, price_min, currency, stock_quantity FROM products WHERE is_active=1 ORDER BY name LIMIT 2000',
    ),
  ])
  return (
    <AdminQuotes
      initialQuotes={JSON.parse(JSON.stringify(quotes))}
      initialRequests={JSON.parse(JSON.stringify(requests))}
      products={products.map(p => ({ id: p.id, sku: p.sku, name: p.name, price: p.price_min === null ? null : Number(p.price_min), currency: p.currency, stock: p.stock_quantity }))}
      initialId={id ? Number(id) : null}
      adminEmail={admin.email}
      defaults={{ depositPercent: settings.deposit.percent, pickup: settings.pickup.enabled }}
      stripeReady={stripeConfigured() && settings.enabled}
    />
  )
}
