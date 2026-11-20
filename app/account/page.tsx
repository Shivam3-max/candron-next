import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getCurrentCustomer, listAddresses, listCustomerOrders, listCustomerQuotes, listDocuments } from '@/lib/shop/customers'
import AccountView from '@/components/shop/AccountView'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Your account', robots: { index: false, follow: false } }

export default async function AccountPage() {
  const c = await getCurrentCustomer()
  if (!c) redirect('/account/login')
  const [orders, quotes, addresses, documents] = await Promise.all([listCustomerOrders(c), listCustomerQuotes(c), listAddresses(c.id), listDocuments(c.id)])
  const plain = <T,>(v: T): T => JSON.parse(JSON.stringify(v))
  return (
    <section className="shop-page">
      <div className="container">
        <AccountView
          customer={{ email: c.email, name: c.name, company: c.company, phone: c.phone, taxExempt: c.tax_exempt_status, taxNote: c.tax_exempt_note }}
          orders={plain(orders.map(o => ({ id: o.id, number: o.order_number, link: `/order/${o.order_number}?t=${o.access_token}`, status: o.status, currency: o.currency, total: Number(o.total), created: new Date(o.created_at).toISOString(), items: o.items ?? '' })))}
          quotes={plain(quotes.map(q => ({ number: q.quote_number, link: `/quote/${q.quote_number}?t=${q.access_token}`, status: q.status, currency: q.currency, total: Number(q.total), validUntil: q.valid_until ? String(q.valid_until instanceof Date ? q.valid_until.toISOString() : q.valid_until).slice(0, 10) : null, created: new Date(q.created_at).toISOString() })))}
          addresses={plain(addresses)}
          documents={plain(documents.map(d => ({ id: d.id, name: d.file_name, created: new Date(d.created_at).toISOString(), note: d.note })))}
        />
      </div>
    </section>
  )
}
