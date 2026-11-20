import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PHONE } from '@/lib/inventory'
import { loadQuoteForCustomer } from '@/lib/shop/quotes'
import { formatMoney } from '@/lib/shop/order-status'
import { regionName } from '@/lib/shop/regions'
import QuoteAccept from '@/components/shop/QuoteAccept'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Your quote', robots: { index: false, follow: false } }

type Props = { params: Promise<{ number: string }>; searchParams: Promise<{ t?: string }> }

export default async function QuotePage({ params, searchParams }: Props) {
  const [{ number }, { t }] = await Promise.all([params, searchParams])
  const found = t ? await loadQuoteForCustomer(number, t) : null
  if (!found) notFound()
  const { quote: q, items, subtotal, total, deposit } = found
  const cur = q.currency
  const valid = q.valid_until ? String(q.valid_until instanceof Date ? q.valid_until.toISOString() : q.valid_until).slice(0, 10) : null
  const terms = q.payment_terms === 'deposit'
    ? `${Number(q.deposit_percent)}% deposit (${formatMoney(deposit ?? 0, cur)} + tax) to reserve the equipment. The balance is invoiced before shipping.`
    : q.payment_terms === 'net' ? `Invoice payable within ${q.net_days} days (bank debit or card).` : 'Pay in full online by card or bank debit.'

  return (
    <section className="shop-page">
      <div className="container shop-narrow">
        <div className="shop-head">
          <div className="label">Quote {q.quote_number}</div>
          <h1>{q.status === 'accepted' ? 'Quote accepted' : q.status === 'expired' ? 'This quote has expired' : q.status === 'cancelled' ? 'This quote was withdrawn' : `Your quote from CANDRON`}</h1>
          <p>
            Prepared for {q.company || q.customer_name}{valid && q.status === 'sent' ? `, valid until ${valid}` : ''}.
            {q.status === 'expired' && <> Please <a href={PHONE.href}>call us</a> or reply to the email for an updated quote.</>}
          </p>
        </div>

        {q.message && <div className="shop-card shop-quote-message">{q.message}</div>}

        <div className="shop-card">
          <h2>Quotation</h2>
          <ul className="shop-mini-lines">
            {items.map(i => (
              <li key={i.id}>
                <span>{i.name} <small>{i.sku && `${i.sku} · `}{i.quantity} × {formatMoney(Number(i.unit_price), cur)}</small>{i.description && <em className="shop-line-desc">{i.description}</em>}</span>
                <strong>{formatMoney(Number(i.line_total), cur)}</strong>
              </li>
            ))}
          </ul>
          <div className="shop-summary-row"><span>Subtotal</span><strong>{formatMoney(subtotal, cur)}</strong></div>
          <div className="shop-summary-row"><span>{q.freight_note || 'Freight'}</span><strong>{formatMoney(Number(q.freight), cur)}</strong></div>
          <div className="shop-summary-row shop-total"><span>Total before tax ({cur})</span><strong>{formatMoney(total, cur)}</strong></div>
          <p className="shop-fine">Applicable taxes (GST/HST/PST/QST) are calculated at payment from the delivery address.</p>
        </div>

        <div className="shop-card shop-two">
          <div>
            <h2>{q.fulfilment === 'pickup' ? 'Pickup' : 'Deliver to'}</h2>
            {q.fulfilment === 'pickup'
              ? <p>Pickup from our Ontario yard; we’ll book a time with you.</p>
              : <p>{q.ship_line1}{q.ship_line2 && <><br />{q.ship_line2}</>}<br />{q.ship_city}, {regionName(q.ship_country, q.ship_region)} {q.ship_postal}<br />{q.ship_country === 'CA' ? 'Canada' : 'United States'}</p>}
          </div>
          <div>
            <h2>Payment terms</h2>
            <p>{terms}</p>
          </div>
        </div>

        {q.status === 'sent'
          ? <QuoteAccept number={q.quote_number} token={t!} terms={q.payment_terms} netDays={q.net_days} currency={cur} total={total} deposit={deposit} />
          : q.status === 'accepted' && <p className="shop-notice">This quote has been accepted. Check your email for the order confirmation, or call <a href={PHONE.href}>{PHONE.label}</a>.</p>}

        <p className="shop-fine">Questions? Call <a href={PHONE.href}>{PHONE.label}</a> or reply to the quote email, quoting {q.quote_number}. <Link href="/terms-and-conditions">Terms and conditions</Link></p>
      </div>
    </section>
  )
}
