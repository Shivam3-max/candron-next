// Order emails to the buyer and the CANDRON team (same SMTP mailer as the contact form).
import { isMailConfigured, sendMail, teamAddress } from '@/lib/mailer'
import { SITE } from '@/lib/seo'
import { getShopSettings } from '@/lib/shop/settings'
import { formatMoney, ORDER_STATUSES } from '@/lib/shop/order-status'
import { regionName } from '@/lib/shop/regions'
import { loadOrder } from '@/lib/shop/orders'

export type OrderEmailKind = 'paid' | 'processing' | 'failed' | 'shipped' | 'cancelled' | 'refunded' | 'deposit' | 'invoiced'

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[c]!)

function layout(title: string, body: string) {
  return `<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#05091F">
    <div style="background:#05091F;padding:24px 32px;border-radius:8px 8px 0 0">
      <p style="margin:0;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.55)">CANDRON Energy Inc.</p>
      <h1 style="margin:8px 0 0;font-size:20px;color:#fff">${title}</h1>
    </div>
    <div style="padding:28px 32px;background:#fff;border:1px solid #e8ecf5;border-top:none;border-radius:0 0 8px 8px;font-size:14px;line-height:1.65">${body}
      <p style="margin:24px 0 0;font-size:12px;color:#6b7a99">Questions? Call <a href="tel:+16476162595" style="color:#0047FF">+1 (647) 616-2595</a> or reply to this email.<br>CANDRON Energy Inc. · Toronto, Ontario, Canada · <a href="${SITE}" style="color:#6b7a99">candron.com</a></p>
    </div></div>`
}

/** Returns true when the buyer's email was sent. */
export async function sendOrderEmails(orderId: number, kind: OrderEmailKind, refundAmount?: number): Promise<boolean> {
  if (!isMailConfigured()) { console.warn(`[shop] SMTP not configured; ${kind} email for order ${orderId} not sent.`); return false }
  try {
    const found = await loadOrder({ id: orderId })
    if (!found) return false
    const { order, items } = found
    const cur = order.currency
    const link = `${SITE}/order/${order.order_number}?t=${order.access_token}`
    const rows = items.map(i => `<tr><td style="padding:8px 0;border-bottom:1px solid #eef1f7">${esc(i.name)}<br><span style="color:#6b7a99;font-size:12px">${esc(i.sku)} · qty ${i.quantity}</span></td><td style="padding:8px 0;border-bottom:1px solid #eef1f7;text-align:right;white-space:nowrap">${formatMoney(Number(i.line_total), cur)}</td></tr>`).join('')
    const totalRow = (label: string, v: string, bold = false) => `<tr><td style="padding:4px 0;${bold ? 'font-weight:700' : 'color:#33415F'}">${label}</td><td style="padding:4px 0;text-align:right;${bold ? 'font-weight:700' : ''}">${v}</td></tr>`
    const summary = `<table style="width:100%;border-collapse:collapse;margin:16px 0">${rows}
      ${totalRow('Subtotal', formatMoney(Number(order.subtotal), cur))}
      ${totalRow(esc(order.freight_note || 'Freight'), order.freight_note === 'Freight quoted separately' ? 'Quoted separately' : formatMoney(Number(order.freight), cur))}
      ${order.payment_terms === 'pay_now' || order.status === 'paid' ? `${totalRow('Tax', formatMoney(Number(order.tax), cur))}
      ${totalRow(`Total (${cur})`, formatMoney(Number(order.total), cur), true)}` : ''}
      ${order.payment_terms === 'deposit' ? totalRow('Deposit (before tax)', formatMoney(Number(order.deposit_amount), cur)) : ''}
      ${Number(order.amount_paid) > 0 && order.payment_terms !== 'pay_now' ? totalRow('Paid so far (incl. tax)', formatMoney(Number(order.amount_paid), cur), true) : ''}
      ${order.status === 'deposit_paid' ? totalRow('Balance (before tax and freight)', formatMoney(Number(order.subtotal) - Number(order.deposit_amount), cur)) : ''}</table>`
    const invoiceButton = order.invoice_url
      ? `<p style="margin:16px 0 0"><a href="${esc(order.invoice_url)}" style="display:inline-block;background:#22B566;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:700">View and pay invoice</a>${order.invoice_due ? `<br><span style="font-size:12px;color:#6b7a99">Due ${esc(String(order.invoice_due).slice(0, 10))}</span>` : ''}</p>`
      : ''
    const where = order.fulfilment === 'pickup'
      ? '<p style="margin:0 0 12px"><strong>Pickup.</strong> We’ll contact you to arrange a pickup time.</p>'
      : `<p style="margin:0 0 12px"><strong>Deliver to:</strong> ${esc([order.ship_line1, order.ship_line2, order.ship_city, regionName(order.ship_country, order.ship_region), order.ship_postal, order.ship_country].filter(Boolean).join(', '))}</p>`
    const button = `<p style="margin:20px 0 0"><a href="${link}" style="display:inline-block;background:#0047FF;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:700">View your order</a></p>`
    const hello = `<p style="margin:0 0 12px">Hi ${esc(order.customer_name)},</p>`

    const customer: Record<OrderEmailKind, { subject: string; title: string; intro: string }> = {
      paid: { subject: `Order ${order.order_number} confirmed`, title: 'Thank you — your order is confirmed', intro: 'We’ve received your payment. Our team will confirm the shipping date (or pickup time) shortly.' },
      processing: { subject: `Order ${order.order_number} received`, title: 'We received your order', intro: ORDER_STATUSES.payment_processing.customer },
      failed: { subject: `Payment issue with order ${order.order_number}`, title: 'Your payment didn’t go through', intro: 'Your bank payment for this order was not completed, so the order is on hold. Please call us or reply to this email and we’ll help you complete it.' },
      shipped: { subject: `Order ${order.order_number} has shipped`, title: 'Your order is on its way', intro: order.tracking_number ? `Carrier: <strong>${esc(order.tracking_carrier || 'Freight carrier')}</strong> · Tracking / PRO number: <strong>${esc(order.tracking_number)}</strong>. Please inspect the equipment on delivery and note any damage on the bill of lading.` : 'Your order has left our yard. Please inspect the equipment on delivery and note any damage on the bill of lading.' },
      cancelled: { subject: `Order ${order.order_number} cancelled`, title: 'Your order was cancelled', intro: 'This order has been cancelled. If a payment was made, any refund will appear on your statement within 5–10 business days.' },
      refunded: { subject: `Refund for order ${order.order_number}`, title: 'We’ve issued a refund', intro: `We refunded ${formatMoney(refundAmount ?? 0, cur)} to your original payment method. It usually appears within 5–10 business days.` },
      deposit: { subject: `Deposit received for order ${order.order_number}`, title: 'Deposit received — the equipment is reserved for you', intro: 'Thank you. Your deposit is paid and the unit is held for you. We’ll confirm freight and send an invoice for the balance before it ships.' },
      invoiced: { subject: `Invoice for order ${order.order_number}`, title: 'Your invoice is ready', intro: `Your invoice for order ${order.order_number} is ready. You can pay it online by bank debit${order.payment_terms === 'net' ? '' : ' or card'} from the button below. Stripe has also emailed you a copy.` },
    }
    const c = customer[kind]
    await sendMail({ to: order.email, subject: c.subject, html: layout(c.title, `${hello}<p style="margin:0 0 12px">${c.intro}</p><p style="margin:0 0 4px;color:#6b7a99;font-size:12px">ORDER ${order.order_number}${order.po_number ? ` · PO ${esc(order.po_number)}` : ''}</p>${summary}${where}${kind === 'invoiced' ? invoiceButton : ''}${button}`) })

    if (kind === 'paid' || kind === 'processing' || kind === 'failed' || kind === 'deposit') {
      const settings = await getShopSettings()
      const team = settings.notifyEmail || teamAddress()
      const label = kind === 'paid' ? (order.payment_terms === 'pay_now' ? 'New paid order' : 'Order paid in full') : kind === 'deposit' ? 'Deposit paid (send balance invoice before shipping)' : kind === 'processing' ? 'New order (bank payment processing)' : 'Payment failed'
      const contact = `<p style="margin:0 0 12px"><strong>${esc(order.customer_name)}</strong>${order.company ? ` · ${esc(order.company)}` : ''}<br><a href="mailto:${esc(order.email)}">${esc(order.email)}</a> · ${esc(order.phone)}${order.po_number ? `<br>PO: ${esc(order.po_number)}` : ''}</p>${order.customer_notes ? `<p style="margin:0 0 12px;white-space:pre-wrap"><strong>Notes:</strong> ${esc(order.customer_notes)}</p>` : ''}`
      await sendMail({
        to: team.split(',').map(s => s.trim()).filter(Boolean), replyTo: order.email,
        subject: `${label}: ${order.order_number} · ${formatMoney(Number(order.total), cur)}${order.live_mode ? '' : ' [TEST]'}`,
        html: layout(`${label} · ${order.order_number}`, `${contact}${summary}${where}<p style="margin:0">Payment: ${esc(order.payment_method || '—')}</p><p style="margin:20px 0 0"><a href="${SITE}/admin/orders?id=${order.id}" style="color:#0047FF;font-weight:700">Open in admin →</a></p>`),
      })
    }
    return true
  } catch (error) {
    // Email problems must never fail the webhook (Stripe would retry and double-process)
    console.error(`[shop] ${kind} email for order ${orderId} failed`, error instanceof Error ? error.message : error)
    return false
  }
}
