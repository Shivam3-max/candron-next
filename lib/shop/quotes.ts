// Quotes: built in /admin/quotes, sent to the buyer as a private link, accepted and paid online
// (in full or by deposit), or turned into a net-terms Stripe invoice.
import { randomBytes } from 'node:crypto'
import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import { ACTIVE_HOLDS, getDb, isDatabaseConfigured } from '@/lib/db'
import { isMailConfigured, sendMail } from '@/lib/mailer'
import { SITE } from '@/lib/seo'
import { formatMoney, type PaymentTerms } from '@/lib/shop/order-status'
import { getShopSettings, shopIsOpen } from '@/lib/shop/settings'
import {
  abandonOrder, addEvent, depositOf, inTransaction, insertOrder, issueInvoice, openCheckout, ShopError, takeStock,
  tokenMatches, validateAddress, type OrderDraft,
} from '@/lib/shop/orders'

export type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'expired' | 'cancelled'

export type QuoteRecord = RowDataPacket & {
  id: number; quote_number: string; access_token: string; status: QuoteStatus; currency: string
  customer_name: string; company: string; email: string; phone: string; fulfilment: 'delivery' | 'pickup'
  ship_line1: string; ship_line2: string; ship_city: string; ship_region: string; ship_postal: string; ship_country: string
  freight: string; freight_note: string; payment_terms: PaymentTerms; deposit_percent: string; net_days: number
  valid_until: Date | string | null; message: string | null; internal_notes: string | null; request_id: number | null; order_id: number | null
  created_by: string; sent_at: Date | null; accepted_at: Date | null; created_at: Date
}
export type QuoteItemRecord = RowDataPacket & { id: number; product_id: number | null; sku: string; name: string; description: string; unit_price: string; quantity: number; line_total: string }

export interface QuoteInput {
  currency: 'CAD' | 'USD'
  customer_name: string; company: string; email: string; phone: string
  fulfilment: 'delivery' | 'pickup'
  ship: { line1: string; line2: string; city: string; region: string; postal: string; country: string }
  items: { product_id: number | null; sku: string; name: string; description: string; unit_price: number; quantity: number }[]
  freight: number; freight_note: string
  payment_terms: PaymentTerms; deposit_percent: number; net_days: number
  valid_until: string | null
  message: string; internal_notes: string
  request_id: number | null
}

const text = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max)
const round2 = (n: number) => Math.round(n * 100) / 100
const today = () => new Date().toISOString().slice(0, 10)
const dateOnly = (d: Date | string | null) => (d ? (d instanceof Date ? d.toISOString() : String(d)).slice(0, 10) : null)

export function parseQuoteInput(b: Record<string, unknown>): QuoteInput {
  const ship = (b.ship && typeof b.ship === 'object' ? b.ship : {}) as Record<string, unknown>
  const items = (Array.isArray(b.items) ? b.items : []).slice(0, 60).map((x: Record<string, unknown>) => ({
    product_id: Number(x.product_id) > 0 ? Number(x.product_id) : null,
    sku: text(x.sku, 100), name: text(x.name, 255), description: text(x.description, 500),
    unit_price: round2(Number(x.unit_price)), quantity: Math.floor(Number(x.quantity)),
  })).filter(i => i.name)
  for (const i of items) {
    if (!Number.isFinite(i.unit_price) || i.unit_price < 0) throw new ShopError(`Enter a price for “${i.name}”.`)
    if (!(i.quantity >= 1 && i.quantity <= 9999)) throw new ShopError(`Enter a quantity for “${i.name}”.`)
  }
  const terms: PaymentTerms = b.payment_terms === 'deposit' || b.payment_terms === 'net' ? b.payment_terms : 'pay_now'
  const valid = text(b.valid_until, 10)
  const input: QuoteInput = {
    currency: b.currency === 'USD' ? 'USD' : 'CAD',
    customer_name: text(b.customer_name, 160), company: text(b.company, 160), email: text(b.email, 254).toLowerCase(), phone: text(b.phone, 40),
    fulfilment: b.fulfilment === 'pickup' ? 'pickup' : 'delivery',
    ship: {
      line1: text(ship.line1, 200), line2: text(ship.line2, 200), city: text(ship.city, 120), region: text(ship.region, 4).toUpperCase(),
      postal: text(ship.postal, 20), country: text(ship.country, 2).toUpperCase() || 'CA',
    },
    items,
    freight: Math.max(0, round2(Number(b.freight) || 0)), freight_note: text(b.freight_note, 255) || 'Freight',
    payment_terms: terms,
    deposit_percent: Math.min(100, Math.max(1, round2(Number(b.deposit_percent) || 25))),
    net_days: Math.min(120, Math.max(1, Math.round(Number(b.net_days) || 30))),
    valid_until: /^\d{4}-\d{2}-\d{2}$/.test(valid) ? valid : null,
    message: text(b.message, 5000), internal_notes: text(b.internal_notes, 5000),
    request_id: Number(b.request_id) > 0 ? Number(b.request_id) : null,
  }
  return input
}

/** Extra checks before a quote can be sent to a buyer. */
function assertSendable(q: QuoteInput) {
  if (!q.customer_name) throw new ShopError('Add the customer’s name.')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(q.email)) throw new ShopError('Add a valid customer email.')
  if (!q.items.length) throw new ShopError('Add at least one line.')
  if (q.fulfilment === 'delivery') {
    try { q.ship = validateAddress(q.ship) } catch (e) { throw new ShopError(`Delivery address: ${(e as Error).message}`) }
  }
  if (q.valid_until && q.valid_until < today()) throw new ShopError('“Valid until” is in the past.')
}

const COLS = ['currency', 'customer_name', 'company', 'email', 'phone', 'fulfilment', 'ship_line1', 'ship_line2', 'ship_city', 'ship_region',
  'ship_postal', 'ship_country', 'freight', 'freight_note', 'payment_terms', 'deposit_percent', 'net_days', 'valid_until', 'message', 'internal_notes', 'request_id'] as const
const colValues = (q: QuoteInput) => [q.currency, q.customer_name, q.company, q.email, q.phone, q.fulfilment, q.ship.line1, q.ship.line2, q.ship.city,
  q.ship.region, q.ship.postal, q.ship.country, q.freight, q.freight_note, q.payment_terms, q.deposit_percent, q.net_days, q.valid_until,
  q.message || null, q.internal_notes || null, q.request_id]

/** Creates or updates a draft/sent quote (accepted, expired and cancelled quotes are read-only). */
export async function saveQuote(id: number | null, q: QuoteInput, admin: string, opts: { send?: boolean } = {}) {
  if (opts.send) assertSendable(q)
  const quoteId = await inTransaction(async conn => {
    let qid = id
    if (qid) {
      const [rows] = await conn.execute<QuoteRecord[]>('SELECT id, status FROM quotes WHERE id=? FOR UPDATE', [qid])
      if (!rows[0]) throw new ShopError('Quote not found.')
      if (!['draft', 'sent'].includes(rows[0].status)) throw new ShopError(`This quote is ${rows[0].status} and can’t be edited. Duplicate it instead.`)
      await conn.execute(`UPDATE quotes SET ${COLS.map(c => `${c}=?`).join(', ')} WHERE id=?`, [...colValues(q), qid])
      await conn.execute('DELETE FROM quote_items WHERE quote_id=?', [qid])
    } else {
      const [res] = await conn.execute<ResultSetHeader>(
        `INSERT INTO quotes (access_token, created_by, created_at, ${COLS.join(', ')}) VALUES (?, ?, UTC_TIMESTAMP(), ${COLS.map(() => '?').join(', ')})`,
        [randomBytes(32).toString('base64url'), admin, ...colValues(q)],
      )
      qid = res.insertId
      await conn.execute('UPDATE quotes SET quote_number=? WHERE id=?', [`Q-${new Date().getUTCFullYear()}-${String(qid).padStart(5, '0')}`, qid])
    }
    for (const [i, it] of q.items.entries()) {
      await conn.execute(
        'INSERT INTO quote_items (quote_id, product_id, sku, name, description, unit_price, quantity, line_total, sort_order) VALUES (?,?,?,?,?,?,?,?,?)',
        [qid, it.product_id, it.sku, it.name, it.description, it.unit_price, it.quantity, round2(it.unit_price * it.quantity), i],
      )
    }
    if (q.request_id) await conn.execute("UPDATE quote_requests SET status='quoted', quote_id=? WHERE id=?", [qid, q.request_id])
    if (opts.send) await conn.execute("UPDATE quotes SET status='sent', sent_at=UTC_TIMESTAMP() WHERE id=?", [qid])
    return qid!
  })
  const emailed = opts.send ? await emailQuote(quoteId) : false
  return { id: quoteId, emailed }
}

export async function cancelQuote(id: number) {
  const [res] = await getDb().execute<ResultSetHeader>("UPDATE quotes SET status='cancelled' WHERE id=? AND status IN ('draft','sent')", [id])
  if (!res.affectedRows) throw new ShopError('Only draft or sent quotes can be cancelled.')
}

export async function loadQuote(where: { id?: number; number?: string }) {
  const db = getDb()
  const [rows] = await db.execute<QuoteRecord[]>(`SELECT * FROM quotes WHERE ${where.id ? 'id=?' : 'quote_number=?'} LIMIT 1`, [where.id ?? where.number ?? ''])
  const quote = rows[0]
  if (!quote) return null
  // Quotes past their date read as expired (no background job needed)
  if (quote.status === 'sent' && quote.valid_until && dateOnly(quote.valid_until)! < today()) {
    await db.execute("UPDATE quotes SET status='expired' WHERE id=? AND status='sent'", [quote.id])
    quote.status = 'expired'
  }
  const [items] = await db.execute<QuoteItemRecord[]>('SELECT * FROM quote_items WHERE quote_id=? ORDER BY sort_order, id', [quote.id])
  const subtotal = round2(items.reduce((s, i) => s + Number(i.line_total), 0))
  const total = round2(subtotal + Number(quote.freight))
  return {
    quote, items, subtotal, total,
    deposit: quote.payment_terms === 'deposit' ? depositOf(total, Number(quote.deposit_percent)) : null,
  }
}

export async function loadQuoteForCustomer(number: string, token: string) {
  if (!/^Q-\d{4}-\d{5,}$/.test(number) || !/^[A-Za-z0-9_-]{43}$/.test(token)) return null
  const found = await loadQuote({ number })
  if (!found || found.quote.status === 'draft' || !tokenMatches(found.quote.access_token, token)) return null
  return found
}

export type QuoteListRow = RowDataPacket & { id: number; quote_number: string; status: QuoteStatus; currency: string; customer_name: string; company: string; email: string; payment_terms: PaymentTerms; valid_until: string | null; created_at: Date; total: string; order_id: number | null }

export async function listQuotes() {
  await getDb().execute("UPDATE quotes SET status='expired' WHERE status='sent' AND valid_until IS NOT NULL AND valid_until < UTC_DATE()")
  const [rows] = await getDb().query<QuoteListRow[]>(
    `SELECT q.id, q.quote_number, q.status, q.currency, q.customer_name, q.company, q.email, q.payment_terms, q.valid_until, q.created_at, q.order_id,
            q.freight + COALESCE((SELECT SUM(line_total) FROM quote_items i WHERE i.quote_id=q.id), 0) total
     FROM quotes q ORDER BY q.id DESC LIMIT 300`,
  )
  return rows
}

// ── Quote requests (from the product-page form) ─────────────────────────

export type QuoteRequestRow = RowDataPacket & { id: number; product_id: number | null; sku: string; product_name: string; quantity: number; name: string; company: string; email: string; phone: string; message: string | null; status: string; quote_id: number | null; created_at: Date; price: string | null; currency: string | null }

/** Stores a product quote request so it can be turned into a quote. Never throws (the email still goes out). */
export async function recordQuoteRequest(r: { sku: string; productName: string; quantity: number; name: string; company: string; email: string; phone: string; message: string }) {
  if (!isDatabaseConfigured() || !r.sku) return
  try {
    const [p] = await getDb().execute<(RowDataPacket & { id: number; name: string })[]>('SELECT id, name FROM products WHERE sku=? LIMIT 1', [r.sku])
    await getDb().execute(
      'INSERT INTO quote_requests (product_id, sku, product_name, quantity, name, company, email, phone, message, created_at) VALUES (?,?,?,?,?,?,?,?,?,UTC_TIMESTAMP())',
      [p[0]?.id ?? null, r.sku.slice(0, 100), (p[0]?.name ?? r.productName).slice(0, 255), Math.min(9999, Math.max(1, Math.floor(r.quantity) || 1)),
        r.name.slice(0, 160), r.company.slice(0, 160), r.email.slice(0, 254), r.phone.slice(0, 40), r.message.slice(0, 5000)],
    )
  } catch (error) {
    console.warn('[quotes] Could not store quote request', error instanceof Error ? error.message : error)
  }
}

export async function listQuoteRequests(includeClosed = false) {
  const [rows] = await getDb().query<QuoteRequestRow[]>(
    `SELECT r.*, p.price_min price, p.currency FROM quote_requests r LEFT JOIN products p ON p.id=r.product_id
     ${includeClosed ? '' : "WHERE r.status='new'"} ORDER BY r.id DESC LIMIT 200`,
  )
  return rows
}

export async function setQuoteRequestStatus(id: number, status: 'new' | 'closed') {
  await getDb().execute('UPDATE quote_requests SET status=? WHERE id=?', [status, id])
}

// ── Sending and accepting ────────────────────────────────────────────────

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[c]!)

async function emailQuote(id: number) {
  if (!isMailConfigured()) { console.warn(`[quotes] SMTP not configured; quote ${id} not emailed.`); return false }
  try {
    const found = await loadQuote({ id })
    if (!found) return false
    const { quote: q, items, subtotal, total, deposit } = found
    const cur = q.currency
    const link = `${SITE}/quote/${q.quote_number}?t=${q.access_token}`
    const rows = items.map(i => `<tr><td style="padding:8px 0;border-bottom:1px solid #eef1f7">${esc(i.name)}${i.description ? `<br><span style="color:#6b7a99;font-size:12px">${esc(i.description)}</span>` : ''}</td><td style="padding:8px 0;border-bottom:1px solid #eef1f7;text-align:right;white-space:nowrap">${i.quantity} × ${formatMoney(Number(i.unit_price), cur)}</td></tr>`).join('')
    const terms = q.payment_terms === 'deposit' ? `${Number(q.deposit_percent)}% deposit (${formatMoney(deposit ?? 0, cur)} + tax) to reserve, balance invoiced before shipping`
      : q.payment_terms === 'net' ? `Invoice, net ${q.net_days} days` : 'Pay in full online by card or bank debit'
    await sendMail({
      to: q.email,
      subject: `Your quote ${q.quote_number} from CANDRON`,
      html: `<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#05091F">
        <div style="background:#05091F;padding:24px 32px;border-radius:8px 8px 0 0"><p style="margin:0;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.55)">CANDRON Energy Inc.</p><h1 style="margin:8px 0 0;font-size:20px;color:#fff">Your quote ${q.quote_number}</h1></div>
        <div style="padding:28px 32px;background:#fff;border:1px solid #e8ecf5;border-top:none;border-radius:0 0 8px 8px;font-size:14px;line-height:1.65">
          <p style="margin:0 0 12px">Hi ${esc(q.customer_name)},</p>
          <p style="margin:0 0 12px">Thank you for your enquiry. Here is your quote${q.valid_until ? `, valid until <strong>${dateOnly(q.valid_until)}</strong>` : ''}.</p>
          ${q.message ? `<p style="margin:0 0 12px;white-space:pre-wrap">${esc(q.message)}</p>` : ''}
          <table style="width:100%;border-collapse:collapse;margin:16px 0">${rows}
            <tr><td style="padding:4px 0;color:#33415F">Subtotal</td><td style="text-align:right">${formatMoney(subtotal, cur)}</td></tr>
            <tr><td style="padding:4px 0;color:#33415F">${esc(q.freight_note || 'Freight')}</td><td style="text-align:right">${formatMoney(Number(q.freight), cur)}</td></tr>
            <tr><td style="padding:4px 0;font-weight:700">Total before tax (${cur})</td><td style="text-align:right;font-weight:700">${formatMoney(total, cur)}</td></tr></table>
          <p style="margin:0 0 12px"><strong>Payment:</strong> ${terms}. Applicable taxes are added at payment.</p>
          <p style="margin:20px 0 0"><a href="${link}" style="display:inline-block;background:#0047FF;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:700">View and accept quote</a></p>
          <p style="margin:24px 0 0;font-size:12px;color:#6b7a99">You can also find this quote in your account: <a href="${SITE}/account" style="color:#0047FF">candron.com/account</a> (sign in with this email).</p>
          <p style="margin:8px 0 0;font-size:12px;color:#6b7a99">Questions? Call <a href="tel:+16476162595" style="color:#0047FF">+1 (647) 616-2595</a> or reply to this email.<br>CANDRON Energy Inc. · Toronto, Ontario, Canada</p>
        </div></div>`,
    })
    return true
  } catch (error) {
    console.error(`[quotes] quote ${id} email failed`, error instanceof Error ? error.message : error)
    return false
  }
}

export const resendQuote = (id: number) => emailQuote(id)

/**
 * Buyer accepts a sent quote. Pay-in-full and deposit quotes open Stripe Checkout (inventory lines are
 * held while they pay); net-terms quotes reserve the stock and issue a Stripe invoice straight away.
 */
export async function acceptQuote(number: string, token: string, opts: { poNumber: string; acceptTerms: boolean }, origin: string) {
  if (!opts.acceptTerms) throw new ShopError('Please accept the terms of sale.')
  if (!(await shopIsOpen())) throw new ShopError('Online acceptance is paused. Please reply to the quote email and we’ll take it from there.')
  const found = await loadQuoteForCustomer(number, token)
  if (!found) throw new ShopError('Quote not found.')
  if (found.quote.status !== 'sent') throw new ShopError(found.quote.status === 'expired' ? 'This quote has expired. Please contact us for an updated quote.' : `This quote is ${found.quote.status}.`)
  const settings = await getShopSettings()
  const created = await inTransaction(async conn => {
    const [locked] = await conn.execute<QuoteRecord[]>('SELECT * FROM quotes WHERE id=? FOR UPDATE', [found.quote.id])
    const q = locked[0]
    if (!q || q.status !== 'sent') throw new ShopError('This quote is no longer open.')
    // One live order per quote: an unfinished Stripe page still holds its stock
    if (q.order_id) {
      const [prev] = await conn.execute<(RowDataPacket & { status: string })[]>('SELECT status FROM orders WHERE id=?', [q.order_id])
      if (prev[0] && !['expired', 'cancelled', 'payment_failed'].includes(prev[0].status)) {
        if (prev[0].status !== 'pending_payment') throw new ShopError('This quote has already been accepted.')
        // The buyer left an earlier payment page: retire that attempt and its stock holds
        await conn.execute("UPDATE orders SET status='cancelled' WHERE id=?", [q.order_id])
        await conn.execute('DELETE FROM stock_holds WHERE order_id=?', [q.order_id])
      }
    }
    // Inventory lines must still be in stock
    for (const it of found.items) {
      if (!it.product_id) continue
      await conn.execute('SELECT id FROM products WHERE id=? FOR UPDATE', [it.product_id])
      const [p] = await conn.execute<(RowDataPacket & { available: number; status: string; slug: string })[]>(
        `SELECT GREATEST(p.stock_quantity - ${ACTIVE_HOLDS}, 0) available, p.status, p.slug FROM products p WHERE p.id=?`, [it.product_id],
      )
      if (!p[0] || Number(p[0].available) < it.quantity) throw new ShopError(`${it.name} is no longer available in that quantity. Please contact us.`)
    }
    const [slugs] = await conn.execute<(RowDataPacket & { id: number; slug: string })[]>(
      `SELECT id, slug FROM products WHERE id IN (${found.items.map(i => i.product_id ?? 0).join(',') || 0})`,
    )
    const draft: OrderDraft = {
      currency: q.currency,
      lines: found.items.map(i => ({ productId: i.product_id, sku: i.sku, name: i.name, slug: slugs.find(s => s.id === i.product_id)?.slug ?? '', unitPrice: Number(i.unit_price), quantity: i.quantity })),
      freight: Number(q.freight), freightNote: q.freight_note || 'Freight',
      contact: { name: q.customer_name, company: q.company, email: q.email, phone: q.phone, poNumber: opts.poNumber.slice(0, 60), notes: '' },
      fulfilment: q.fulfilment,
      ship: { line1: q.ship_line1, line2: q.ship_line2, city: q.ship_city, region: q.ship_region, postal: q.ship_postal, country: q.ship_country },
      paymentTerms: q.payment_terms,
      depositAmount: q.payment_terms === 'deposit' ? depositOf(found.total, Number(q.deposit_percent)) : 0,
      quoteId: q.id,
      hold: q.payment_terms !== 'net',
    }
    const order = await insertOrder(conn, draft, q.email)
    if (q.payment_terms === 'net') {
      await takeStock(conn, order.orderId, true)
      await conn.execute("UPDATE quotes SET status='accepted', accepted_at=UTC_TIMESTAMP(), order_id=? WHERE id=?", [order.orderId, q.id])
    } else {
      await conn.execute('UPDATE quotes SET order_id=? WHERE id=?', [order.orderId, q.id])
    }
    return { ...order, draft, terms: q.payment_terms, netDays: q.net_days }
  })

  if (created.terms === 'net') {
    try {
      await issueInvoice(created.orderId, 'net', { daysUntilDue: created.netDays, actor: created.draft.contact.email })
    } catch (error) {
      // Invoice failed: undo the acceptance so the buyer (or the team) can try again
      await inTransaction(async conn => {
        await conn.execute("UPDATE products p JOIN order_items i ON i.product_id=p.id SET p.stock_quantity=p.stock_quantity+i.quantity, p.status=IF(p.status IN ('Sold','Reserved'),'Available',p.status) WHERE i.order_id=?", [created.orderId])
        await conn.execute("UPDATE orders SET status='cancelled', stock_released=1 WHERE id=?", [created.orderId])
        await conn.execute("UPDATE quotes SET status='sent', accepted_at=NULL WHERE id=?", [created.draft.quoteId])
      })
      await addEvent(getDb(), created.orderId, 'invoice_failed', error instanceof Error ? error.message.slice(0, 300) : 'Stripe error')
      console.error('[quotes] net-terms invoice failed', error instanceof Error ? error.message : error)
      throw new ShopError(error instanceof ShopError ? error.message : 'We couldn’t issue the invoice right now. Please try again or reply to the quote email.')
    }
    return { url: `/order/${created.orderNumber}?t=${created.token}` }
  }
  try {
    const url = await openCheckout({ ...created, settings, origin, cancelPath: `/quote/${number}?t=${token}` })
    return { url }
  } catch (error) {
    await abandonOrder(created.orderId, error)
    if (error instanceof ShopError) throw error
    throw new ShopError('We couldn’t open the payment page. Please try again, or reply to the quote email.')
  }
}
