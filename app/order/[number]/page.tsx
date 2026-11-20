import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PHONE } from '@/lib/inventory'
import { loadOrderForCustomer } from '@/lib/shop/orders'
import { formatMoney, ORDER_STATUSES, statusLabel, statusTone, type OrderStatus } from '@/lib/shop/order-status'
import { regionName } from '@/lib/shop/regions'
import OrderPaidTracker from '@/components/shop/OrderPaidTracker'

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
  const step = STEPS.indexOf(status === 'payment_processing' ? 'paid' : status)
  const freightText = order.freight_note === 'Freight quoted separately' ? 'Quoted separately' : formatMoney(Number(order.freight), cur)

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
            {STEPS.map((s, i) => <li key={s} className={i <= step ? 'done' : ''}>{s === 'paid' && status === 'payment_processing' ? 'Payment processing' : statusLabel(s)}</li>)}
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
          <div className="shop-summary-row"><span>{order.freight_note || 'Freight'}</span><strong>{freightText}</strong></div>
          <div className="shop-summary-row"><span>Tax</span><strong>{formatMoney(Number(order.tax), cur)}</strong></div>
          <div className="shop-summary-row shop-total"><span>Total ({cur})</span><strong>{formatMoney(Number(order.total), cur)}</strong></div>
          {Number(order.amount_refunded) > 0 && <div className="shop-summary-row"><span>Refunded</span><strong>−{formatMoney(Number(order.amount_refunded), cur)}</strong></div>}
        </div>

        <div className="shop-card shop-two">
          <div>
            <h2>{order.fulfilment === 'pickup' ? 'Pickup' : 'Delivery address'}</h2>
            {order.fulfilment === 'pickup'
              ? <p>We’ll call you to book a pickup time once the order is ready.</p>
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
