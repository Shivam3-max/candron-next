import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PHONE } from '@/lib/inventory'
import { loadOrderForCustomer } from '@/lib/shop/orders'
import { formatMoney, ORDER_STATUSES, statusLabel, statusTone, type OrderStatus } from '@/lib/shop/order-status'
import { regionName } from '@/lib/shop/regions'
import OrderPaidTracker from '@/components/shop/OrderPaidTracker'
import { FREIGHT_LATER } from '@/lib/shop/freight'
import { getShopSettings } from '@/lib/shop/settings'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Your order', robots: { index: false, follow: false } }

type Props = { params: Promise<{ number: string }>; searchParams: Promise<{ t?: string; paid?: string }> }

const STEPS: OrderStatus[] = ['paid', 'processing', 'ready_to_ship', 'shipped', 'delivered']

export default async function OrderPage({ params, searchParams }: Props) {
  const [{ number }, { t, paid }] = await Promise.all([params, searchParams])
  const found = t ? await loadOrderForCustomer(number, t) : null
  if (!found) notFound()
  const { order, items } = found
  const cur = order.currency
  const status = order.status
  const settings = await getShopSettings()
  const step = STEPS.indexOf(['payment_processing', 'deposit_paid', 'invoiced', 'awaiting_offline'].includes(status) ? 'paid' : status)
  const firstStep = status === 'payment_processing' ? 'Payment processing' : status === 'deposit_paid' ? 'Deposit paid' : status === 'invoiced' ? 'Invoice sent' : status === 'awaiting_offline' ? 'Awaiting payment' : null
  const staged = order.payment_terms !== 'pay_now'
  const day = (d: Date | string | null) => (d ? String(d instanceof Date ? d.toISOString() : d).slice(0, 10) : null)
  const due = day(order.invoice_due)
  const freightLater = order.freight_note === FREIGHT_LATER
  const freightText = order.fulfilment === 'pickup' ? 'No charge' : freightLater ? (order.freight_status === 'paid' ? 'Paid' : 'Invoiced separately') : formatMoney(Number(order.freight), cur)
  const yard = order.fulfilment === 'pickup' ? settings.pickup.yards.find(y => y.id === order.pickup_yard) : null
  const accounting = settings.accountingEmail.split(',')[0]?.trim()

  return (
    <section className="shop-page">
      <div className="container shop-narrow">
        <OrderPaidTracker
          waiting={paid === '1' && status === 'pending_payment'}
          purchase={status === 'paid' || status === 'payment_processing' ? {
            transaction_id: order.order_number, currency: cur, value: Number(order.total), tax: Number(order.tax), shipping: Number(order.freight),
            items: items.map(i => ({ item_id: i.sku, item_name: i.name, price: Number(i.unit_price), quantity: i.quantity })),
          } : null}
        />
        <div className="shop-head">
          <div className="label">Order {order.order_number}</div>
          <h1>{status === 'pending_payment' && paid === '1' ? 'Confirming your payment…' : status === 'paid' ? 'Thank you, your order is confirmed' : statusLabel(status)}</h1>
          <p>{status === 'pending_payment' && paid === '1' ? 'This usually takes a few seconds. The page updates by itself.' : ORDER_STATUSES[status]?.customer}</p>
        </div>

        <div className={`shop-status shop-tone-${statusTone(status)}`}>
          <span className="shop-status-pill">{statusLabel(status)}</span>
          {order.tracking_number && <span>Tracking: <strong>{order.tracking_carrier ? `${order.tracking_carrier} · ` : ''}{order.tracking_number}</strong></span>}
        </div>

        {step >= 0 && (
          <ol className="shop-steps" aria-label="Order progress">
            {STEPS.map((s, i) => <li key={s} className={i <= step ? 'done' : ''}>{s === 'paid' && firstStep ? firstStep : statusLabel(s)}</li>)}
          </ol>
        )}

        <div className="shop-card">
          <h2>Items</h2>
          <ul className="shop-mini-lines">
            {items.map(i => (
              <li key={i.id}>
                <span>{i.slug ? <Link href={`/inventory/${i.slug}`}>{i.name}</Link> : i.name} <small>{i.sku} × {i.quantity}</small></span>
                <strong>{formatMoney(Number(i.line_total), cur)}</strong>
              </li>
            ))}
          </ul>
          <div className="shop-summary-row"><span>Subtotal</span><strong>{formatMoney(Number(order.subtotal), cur)}</strong></div>
          <div className="shop-summary-row"><span>{order.fulfilment === 'pickup' ? 'Pickup / own carrier' : freightLater ? 'Freight' : order.freight_note || 'Freight'}</span><strong>{freightText}</strong></div>
          {order.payment_terms === 'offline' && order.status !== 'paid' ? (
            <>
              <div className="shop-summary-row shop-total"><span>Total before tax ({cur})</span><strong>{formatMoney(Number(order.subtotal) + Number(order.freight), cur)}</strong></div>
              <p className="shop-fine">Tax is added on the invoice from our accounting team.</p>
            </>
          ) : staged && order.status !== 'paid' ? (
            <>
              {order.payment_terms === 'deposit' && <div className="shop-summary-row"><span>Deposit (before tax)</span><strong>{formatMoney(Number(order.deposit_amount), cur)}</strong></div>}
              <div className="shop-summary-row"><span>Paid so far (incl. tax)</span><strong>{formatMoney(Number(order.amount_paid), cur)}</strong></div>
              <p className="shop-fine">Tax on the {order.payment_terms === 'deposit' ? 'balance' : 'order'} is added to the invoice.</p>
            </>
          ) : (
            <>
              <div className="shop-summary-row"><span>Tax</span><strong>{formatMoney(Number(order.tax), cur)}</strong></div>
              <div className="shop-summary-row shop-total"><span>Total ({cur})</span><strong>{formatMoney(Number(order.total), cur)}</strong></div>
            </>
          )}
          {Number(order.amount_refunded) > 0 && <div className="shop-summary-row"><span>Refunded</span><strong>−{formatMoney(Number(order.amount_refunded), cur)}</strong></div>}
        </div>

        {status === 'awaiting_offline' && (
          <div className="shop-card shop-offline">
            <strong>Payment by EFT, bank draft or cheque</strong>
            <p>Orders over {formatMoney(settings.onlineLimit ?? 0, 'CAD')} before tax are paid through our accounting team. They’ll send your invoice (with tax) and payment details{accounting ? <>; you can also email <a href={`mailto:${accounting}`}>{accounting}</a></> : null}.{order.hold_until ? ` We’re holding the equipment for you until ${day(order.hold_until)}.` : ''}</p>
          </div>
        )}

        {order.freight_status === 'invoiced' && order.freight_invoice_url && (
          <div className="shop-card shop-invoice">
            <div>
              <h2>Freight invoice ready</h2>
              <p>Your order ships as soon as freight is paid. Pay online by bank debit or card.</p>
            </div>
            <a href={order.freight_invoice_url} className="btn btn-primary" target="_blank" rel="noreferrer">View and pay freight invoice</a>
          </div>
        )}

        {order.payment_terms === 'pay_now' && order.invoice_url && ['paid', 'processing', 'ready_to_ship', 'shipped', 'delivered'].includes(status) && (
          <p className="shop-fine"><a href={order.invoice_url} target="_blank" rel="noreferrer">View your invoice ↗</a></p>
        )}

        {status === 'invoiced' && order.invoice_url && (
          <div className="shop-card shop-invoice">
            <div>
              <h2>Invoice ready</h2>
              <p>Pay online by bank debit or card{due ? ` by ${due}` : ''}. Stripe has also emailed you the invoice.</p>
            </div>
            <a href={order.invoice_url} className="btn btn-primary" target="_blank" rel="noreferrer">View and pay invoice</a>
          </div>
        )}

        <div className="shop-card shop-two">
          <div>
            <h2>{order.fulfilment === 'pickup' ? `Pickup${yard ? ` · ${yard.name} yard` : ''}` : 'Delivery address'}</h2>
            {order.fulfilment === 'pickup'
              ? <p>Collect it yourself or send your own carrier. We’ll call you with the exact location and to book a time once the order is ready.{settings.pickup.hours ? <><br /><small>{settings.pickup.hours}</small></> : null}</p>
              : <p>{order.ship_line1}{order.ship_line2 && <><br />{order.ship_line2}</>}<br />{order.ship_city}, {regionName(order.ship_country, order.ship_region)} {order.ship_postal}<br />{order.ship_country === 'CA' ? 'Canada' : 'United States'}</p>}
          </div>
          <div>
            <h2>Contact</h2>
            <p>{order.customer_name}{order.company && <><br />{order.company}</>}<br />{order.email}<br />{order.phone}{order.po_number && <><br />PO {order.po_number}</>}</p>
          </div>
        </div>

        <p className="shop-fine">Questions about this order? Call <a href={PHONE.href}>{PHONE.label}</a> or reply to your confirmation email, quoting {order.order_number}.</p>
      </div>
    </section>
  )
}
