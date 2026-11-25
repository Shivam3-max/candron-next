// Order emails to the buyer and the CANDRON team (same SMTP mailer as the contact form).
// Orders go to the sales inbox, payments to accounting (Shop settings → Notifications).
import { isMailConfigured, sendMail, teamAddress } from '@/lib/mailer'
import { SITE } from '@/lib/seo'
import { getShopSettings } from '@/lib/shop/settings'
import { formatMoney, ORDER_STATUSES } from '@/lib/shop/order-status'
import { regionName } from '@/lib/shop/regions'
import { FREIGHT_LATER } from '@/lib/shop/freight'
import { loadOrder } from '@/lib/shop/orders'
import type { RowDataPacket } from 'mysql2/promise'
import { getDb } from '@/lib/db'

export type OrderEmailKind =
  | 'paid' | 'processing' | 'failed' | 'shipped' | 'cancelled' | 'refunded' | 'deposit' | 'invoiced'
  | 'offline' | 'freight' | 'freight_paid' | 'balance_reminder' | 'forfeit_due' | 'forfeited'

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[c]!)
const day = (d: Date | string | null) => (d ? (d instanceof Date ? d.toISOString() : String(d)).slice(0, 10) : '')
const list = (v: string) => v.split(',').map(s => s.trim()).filter(Boolean)

function layout(title: string, body: string) {
  return `<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#05091F">
    <div style="background:#05091F;padding:24px 32px;border-radius:8px 8px 0 0">
      <p style="margin:0;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.55)">CANDRON Energy Inc.</p>
      <h1 style="margin:8px 0 0;font-size:20px;color:#fff">${title}</h1>
    </div>
    <div style="padding:28px 32px;background:#fff;border:1px solid #e8ecf5;border-top:none;border-radius:0 0 8px 8px;font-size:14px;line-height:1.65">${body}
      <p style="margin:24px 0 0;font-size:12px;color:#6b7a99">All your orders, quotes and invoices: <a href="${SITE}/account" style="color:#0047FF">candron.com/account</a> (sign in with this email).</p>
      <p style="margin:8px 0 0;font-size:12px;color:#6b7a99">Questions? Call <a href="tel:+16476162595" style="color:#0047FF">+1 (647) 616-2595</a> or reply to this email.<br>CANDRON Energy Inc. · Ontario, Canada · <a href="${SITE}" style="color:#6b7a99">candron.com</a></p>
    </div></div>`
}

type Team = 'sales' | 'accounting' | 'both'
/** Which team inbox hears about each event: orders go to sales, money to accounting. */
const TEAM: Partial<Record<OrderEmailKind, { team: Team; label: (terms: string) => string }>> = {
  paid: { team: 'both', label: t => (t === 'pay_now' ? 'New paid order' : 'Order paid in full') },
  processing: { team: 'both', label: () => 'New order (bank payment processing)' },
  failed: { team: 'both', label: () => 'Payment failed' },
  deposit: { team: 'both', label: () => 'Deposit paid (send the balance invoice before shipping)' },
  offline: { team: 'both', label: () => 'Order over the online limit: arrange payment' },
  refunded: { team: 'accounting', label: () => 'Refund issued' },
  freight_paid: { team: 'both', label: () => 'Freight paid: ready to ship' },
  forfeit_due: { team: 'both', label: () => 'Deposit balance overdue: confirm forfeit' },
}

/** Returns true when the buyer's email was sent (for team-only events: the team's). */
export async function sendOrderEmails(orderId: number, kind: OrderEmailKind, refundAmount?: number): Promise<boolean> {
  if (!isMailConfigured()) { console.warn(`[shop] SMTP not configured; ${kind} email for order ${orderId} not sent.`); return false }
  try {
    const found = await loadOrder({ id: orderId })
    if (!found) return false
    const { order, items } = found
    const settings = await getShopSettings()
    const cur = order.currency
    const link = `${SITE}/order/${order.order_number}?t=${order.access_token}`
    const accounting = list(settings.accountingEmail)
    const accountingContact = accounting[0] ? `<a href="mailto:${esc(accounting[0])}" style="color:#0047FF">${esc(accounting[0])}</a>` : 'our accounting team'
    const rows = items.map(i => `<tr><td style="padding:8px 0;border-bottom:1px solid #eef1f7">${esc(i.name)}<br><span style="color:#6b7a99;font-size:12px">${esc(i.sku)} · qty ${i.quantity}</span></td><td style="padding:8px 0;border-bottom:1px solid #eef1f7;text-align:right;white-space:nowrap">${formatMoney(Number(i.line_total), cur)}</td></tr>`).join('')
    const totalRow = (label: string, v: string, bold = false) => `<tr><td style="padding:4px 0;${bold ? 'font-weight:700' : 'color:#33415F'}">${label}</td><td style="padding:4px 0;text-align:right;${bold ? 'font-weight:700' : ''}">${v}</td></tr>`
    const freightLater = order.freight_note === FREIGHT_LATER
    const offlineUnpaid = order.payment_terms === 'offline' && order.status !== 'paid'
    const settled = (order.payment_terms === 'pay_now' || order.status === 'paid') && !offlineUnpaid
    const summary = `<table style="width:100%;border-collapse:collapse;margin:16px 0">${rows}
      ${totalRow('Subtotal', formatMoney(Number(order.subtotal), cur))}
      ${order.fulfilment === 'pickup' ? '' : totalRow(esc(freightLater ? 'Freight' : order.freight_note || 'Freight'), freightLater ? 'Invoiced separately' : formatMoney(Number(order.freight), cur))}
      ${settled ? `${totalRow('Tax', formatMoney(Number(order.tax), cur))}${totalRow(`Total (${cur})`, formatMoney(Number(order.total), cur), true)}` : ''}
      ${offlineUnpaid ? totalRow(`Total before tax (${cur})`, formatMoney(Number(order.subtotal) + Number(order.freight), cur), true) : ''}
      ${order.payment_terms === 'deposit' ? totalRow('Deposit (before tax)', formatMoney(Number(order.deposit_amount), cur)) : ''}
      ${Number(order.amount_paid) > 0 && order.payment_terms !== 'pay_now' ? totalRow('Paid so far (incl. tax)', formatMoney(Number(order.amount_paid), cur), true) : ''}
      ${order.status === 'deposit_paid' ? totalRow('Balance (before tax)', formatMoney(Number(order.subtotal) + Number(order.freight) - Number(order.deposit_amount), cur)) : ''}</table>`
    const payButton = (url: string, label: string, due?: string) => url
      ? `<p style="margin:16px 0 0"><a href="${esc(url)}" style="display:inline-block;background:#22B566;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:700">${label}</a>${due ? `<br><span style="font-size:12px;color:#6b7a99">Due ${esc(due)}</span>` : ''}</p>`
      : ''
    const yard = order.fulfilment === 'pickup' ? settings.pickup.yards.find(y => y.id === order.pickup_yard) : null
    const where = order.fulfilment === 'pickup'
      ? `<p style="margin:0 0 12px"><strong>Pickup${yard ? ` from our ${esc(yard.name)} yard` : ''}.</strong> Collect it yourself or send your own carrier. We’ll contact you with the exact location and to book a time.${settings.pickup.hours ? ` Hours: ${esc(settings.pickup.hours)}` : ''}</p>`
      : `<p style="margin:0 0 12px"><strong>Deliver to:</strong> ${esc([order.ship_line1, order.ship_line2, order.ship_city, regionName(order.ship_country, order.ship_region), order.ship_postal, order.ship_country].filter(Boolean).join(', '))}${freightLater && order.freight_status !== 'paid' ? '<br><span style="color:#6b7a99;font-size:12px">We’ll quote freight (and offloading, if needed) and send a separate invoice before shipping.</span>' : ''}</p>`
    const button = `<p style="margin:20px 0 0"><a href="${link}" style="display:inline-block;background:#0047FF;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:700">View your order</a></p>`
    const hello = `<p style="margin:0 0 12px">Hi ${esc(order.customer_name)},</p>`
    const holdUntil = day(order.hold_until)
    const next = order.fulfilment === 'pickup' ? 'We’ll contact you to book the pickup.'
      : freightLater && order.freight_status !== 'paid' ? 'We’ll send the freight quote and invoice shortly; your order ships once freight is paid.'
        : 'Our team will confirm the shipping date shortly.'

    const customer: Partial<Record<OrderEmailKind, { subject: string; title: string; intro: string; extra?: string }>> = {
      paid: {
        subject: `Order ${order.order_number} confirmed`, title: 'Thank you — your order is confirmed',
        intro: `We’ve received your payment. ${next}${order.payment_terms === 'pay_now' && order.invoice_url ? ' Your invoice is linked below.' : ''}`,
        extra: order.payment_terms === 'pay_now' ? payButton(order.invoice_url, 'View invoice') : '',
      },
      processing: { subject: `Order ${order.order_number} received`, title: 'We received your order', intro: ORDER_STATUSES.payment_processing.customer },
      failed: { subject: `Payment issue with order ${order.order_number}`, title: 'Your payment didn’t go through', intro: 'Your bank payment for this order was not completed, so the order is on hold. Please call us or reply to this email and we’ll help you complete it.' },
      shipped: { subject: `Order ${order.order_number} has shipped`, title: 'Your order is on its way', intro: order.tracking_number ? `Carrier: <strong>${esc(order.tracking_carrier || 'Freight carrier')}</strong> · Tracking / PRO number: <strong>${esc(order.tracking_number)}</strong>. Please inspect the equipment on delivery and note any damage on the bill of lading.` : 'Your order has left our yard. Please inspect the equipment on delivery and note any damage on the bill of lading.' },
      cancelled: { subject: `Order ${order.order_number} cancelled`, title: 'Your order was cancelled', intro: 'This order has been cancelled. If a payment was made, any refund will appear on your statement within 5–10 business days.' },
      refunded: { subject: `Refund for order ${order.order_number}`, title: 'We’ve issued a refund', intro: `We refunded ${formatMoney(refundAmount ?? 0, cur)} to your original payment method. It usually appears within 5–10 business days.` },
      deposit: { subject: `Deposit received for order ${order.order_number}`, title: 'Deposit received — the equipment is reserved for you', intro: `Thank you. Your deposit is paid and the equipment is held for you. The balance is due within ${settings.deposit.balanceDays} days; we’ll send the invoice.` },
      invoiced: { subject: `Invoice for order ${order.order_number}`, title: 'Your invoice is ready', intro: `Your invoice for order ${order.order_number} is ready. You can pay it online by bank debit or card from the button below. Stripe has also emailed you a copy.`, extra: payButton(order.invoice_url, 'View and pay invoice', day(order.invoice_due)) },
      offline: {
        subject: `Order ${order.order_number} received`, title: 'We’ve received your order',
        intro: `Orders over ${formatMoney(settings.onlineLimit ?? 0, 'CAD')} before tax are paid by EFT, bank draft or cheque rather than online. Our accounting team will contact you shortly with an invoice (including tax) and payment details. You can also reach them at ${accountingContact}.${holdUntil ? ` We’re holding the equipment for you until <strong>${holdUntil}</strong>.` : ''}`,
      },
      freight: { subject: `Freight invoice for order ${order.order_number}`, title: 'Your freight invoice is ready', intro: 'Here is the invoice for freight (and offloading or brokerage, if needed). Your order ships as soon as it’s paid.', extra: payButton(order.freight_invoice_url, 'View and pay freight invoice') },
      freight_paid: { subject: `Freight paid for order ${order.order_number}`, title: 'Thank you — freight is paid', intro: 'We’ll confirm the shipping date shortly.' },
      balance_reminder: {
        subject: `Balance due for order ${order.order_number}`, title: 'Reminder: balance due',
        intro: `This is a reminder that the balance for order ${order.order_number} is due. ${order.invoice_url ? 'You can pay it from the invoice below.' : `Please contact ${accountingContact} to arrange payment.`} Under our terms of sale, the deposit on an order whose balance isn’t paid may be forfeited.`,
        extra: payButton(order.invoice_url, 'View and pay invoice', day(order.invoice_due)),
      },
      forfeited: { subject: `Order ${order.order_number} cancelled`, title: 'Your order was cancelled', intro: 'The balance for this order wasn’t paid, so the order has been cancelled and the deposit retained under our terms of sale. Please contact us if you have questions.' },
    }
    const c = customer[kind]
    if (c) {
      await sendMail({
        to: order.email,
        ...(kind === 'balance_reminder' && accounting.length ? { cc: accounting } : {}),
        subject: c.subject,
        html: layout(c.title, `${hello}<p style="margin:0 0 12px">${c.intro}</p><p style="margin:0 0 4px;color:#6b7a99;font-size:12px">ORDER ${order.order_number}${order.po_number ? ` · PO ${esc(order.po_number)}` : ''}</p>${summary}${where}${c.extra ?? ''}${button}`),
      })
    }

    const t = TEAM[kind]
    if (t) {
      const sales = list(settings.notifyEmail || teamAddress())
      const to = [...new Set([...(t.team !== 'accounting' ? sales : []), ...(t.team !== 'sales' ? accounting : [])])]
      const label = t.label(order.payment_terms)
      const contact = `<p style="margin:0 0 12px"><strong>${esc(order.customer_name)}</strong>${order.company ? ` · ${esc(order.company)}` : ''}<br><a href="mailto:${esc(order.email)}">${esc(order.email)}</a> · ${esc(order.phone)}${order.po_number ? `<br>PO: ${esc(order.po_number)}` : ''}</p>${order.customer_notes ? `<p style="margin:0 0 12px;white-space:pre-wrap"><strong>Notes:</strong> ${esc(order.customer_notes)}</p>` : ''}`
      const note = kind === 'offline' ? `<p style="margin:0 0 12px"><strong>Over the online limit.</strong> Send the buyer an invoice with tax and payment details. Stock is held until ${holdUntil || 'extended in admin'}. When the money arrives, open the order and use “Mark paid”.</p>`
        : kind === 'forfeit_due' ? `<p style="margin:0 0 12px"><strong>The balance is ${settings.deposit.forfeitDays}+ days overdue.</strong> Confirm the forfeit in admin (keeps the deposit and releases the stock), or agree new dates with the buyer.</p>`
          : kind === 'refunded' ? `<p style="margin:0 0 12px">Refunded ${formatMoney(refundAmount ?? 0, cur)}.</p>` : ''
      if (to.length) {
        await sendMail({
          to, replyTo: order.email,
          subject: `${label}: ${order.order_number} · ${formatMoney(Number(order.total), cur)}${order.live_mode ? '' : ' [TEST]'}`,
          html: layout(`${label} · ${order.order_number}`, `${note}${contact}${summary}${where}<p style="margin:0">Payment: ${esc(order.payment_method || '—')}</p><p style="margin:20px 0 0"><a href="${SITE}/admin/orders?id=${order.id}" style="color:#0047FF;font-weight:700">Open in admin →</a></p>`),
        })
      }
      if (!c) return true
    }
    return Boolean(c)
  } catch (error) {
    // Email problems must never fail the webhook (Stripe would retry and double-process)
    console.error(`[shop] ${kind} email for order ${orderId} failed`, error instanceof Error ? error.message : error)
    return false
  }
}

/**
 * One reminder for a buyer who left the Stripe page, sent only because they ticked
 * "email me a link to finish" at checkout (express consent). Returns true when sent.
 */
export async function sendCheckoutReminder(orderId: number): Promise<boolean> {
  if (!isMailConfigured()) return false
  try {
    const found = await loadOrder({ id: orderId })
    if (!found) return false
    const { order, items } = found
    let resume = `${SITE}/cart`
    if (order.quote_id) {
      const [q] = await getDb().execute<(RowDataPacket & { quote_number: string; access_token: string; status: string })[]>('SELECT quote_number, access_token, status FROM quotes WHERE id=?', [order.quote_id])
      if (q[0]?.status === 'sent') resume = `${SITE}/quote/${q[0].quote_number}?t=${q[0].access_token}`
    }
    const lines = items.map(i => `<li style="margin:0 0 6px">${i.slug ? `<a href="${SITE}/inventory/${esc(i.slug)}" style="color:#0047FF">${esc(i.name)}</a>` : esc(i.name)} × ${i.quantity}</li>`).join('')
    await sendMail({
      to: order.email,
      subject: 'Finish your CANDRON order',
      html: layout('Your order is waiting', `<p style="margin:0 0 12px">Hi ${esc(order.customer_name)},</p>
        <p style="margin:0 0 12px">You asked us to send a link if your payment wasn’t completed. Nothing was charged, and the units are no longer held, so availability may change.</p>
        <ul style="margin:0 0 16px;padding-left:18px">${lines}</ul>
        <p style="margin:0 0 12px"><a href="${resume}" style="display:inline-block;background:#0047FF;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:700">Pick up where you left off</a></p>
        <p style="margin:0;font-size:12px;color:#6b7a99">This is the only reminder we’ll send about this checkout.</p>`),
    })
    return true
  } catch (error) {
    console.error(`[shop] checkout reminder for order ${orderId} failed`, error instanceof Error ? error.message : error)
    return false
  }
}
