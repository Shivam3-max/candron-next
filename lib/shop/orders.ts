// Orders: checkout creation, Stripe webhook handling and admin actions.
// Orders become "paid" only from a verified Stripe webhook, never from the browser redirect.
import { randomBytes, timingSafeEqual } from 'node:crypto'
import type Stripe from 'stripe'
import type { PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import { getDb } from '@/lib/db'
import { priceCart, type CartRequestItem } from '@/lib/shop/catalog'
import { calculateFreight } from '@/lib/shop/freight'
import { formatPostal, isCountry, isPostalCode, isRegion } from '@/lib/shop/regions'
import { getShopSettings, shopIsOpen, stripeLiveMode, type ShopSettings } from '@/lib/shop/settings'
import { fromCents, stripe, toCents } from '@/lib/shop/stripe'
import { sendOrderEmails } from '@/lib/shop/email'
import type { OrderStatus } from '@/lib/shop/order-status'

export class ShopError extends Error {}

/** Minutes a buyer has on the Stripe page (Stripe's minimum is 30); stock holds outlive it slightly. */
const SESSION_MINUTES = 31
const HOLD_MINUTES = 35

export interface CheckoutInput {
  items: CartRequestItem[]
  name: string; company: string; email: string; phone: string; poNumber: string; notes: string
  fulfilment: 'delivery' | 'pickup'
  address: { line1: string; line2: string; city: string; region: string; postal: string; country: string }
  acceptTerms: boolean
}

const text = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max)

export function parseCheckoutInput(body: Record<string, unknown>): CheckoutInput {
  const a = (body.address && typeof body.address === 'object' ? body.address : {}) as Record<string, unknown>
  const input: CheckoutInput = {
    items: Array.isArray(body.items) ? (body.items as CartRequestItem[]) : [],
    name: text(body.name, 160), company: text(body.company, 160), email: text(body.email, 254).toLowerCase(),
    phone: text(body.phone, 40), poNumber: text(body.poNumber, 60), notes: text(body.notes, 2000),
    fulfilment: body.fulfilment === 'pickup' ? 'pickup' : 'delivery',
    address: {
      line1: text(a.line1, 200), line2: text(a.line2, 200), city: text(a.city, 120),
      region: text(a.region, 4).toUpperCase(), postal: text(a.postal, 20), country: text(a.country, 2).toUpperCase(),
    },
    acceptTerms: body.acceptTerms === true,
  }
  if (!input.name) throw new ShopError('Please enter your name.')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) throw new ShopError('Please enter a valid email address.')
  if (!input.phone) throw new ShopError('Please enter a phone number so the carrier can book delivery.')
  if (!input.acceptTerms) throw new ShopError('Please accept the terms of sale.')
  if (input.fulfilment === 'delivery') {
    const { line1, city, region, postal, country } = input.address
    if (!isCountry(country)) throw new ShopError('Please choose a country.')
    if (!line1 || !city) throw new ShopError('Please enter the delivery street address and city.')
    if (!isRegion(country, region)) throw new ShopError('Please choose a province or state.')
    if (!isPostalCode(country, postal)) throw new ShopError(country === 'CA' ? 'Please enter a valid postal code (e.g. M5V 2T6).' : 'Please enter a valid ZIP code.')
    input.address.postal = formatPostal(country, postal)
  }
  return input
}

/** Card is offered up to the admin's card limit; bank debit always when enabled. */
export function paymentMethodsFor(settings: ShopSettings, currency: string, amountBeforeTax: number) {
  const methods: Stripe.Checkout.SessionCreateParams.AllowedPaymentMethodType[] = []
  // "card" also covers Apple Pay / Google Pay; Link is Stripe's saved-card wallet
  if (settings.cardLimit === null || amountBeforeTax <= settings.cardLimit) methods.push('card', 'link')
  if (settings.bankDebit) methods.push(currency === 'CAD' ? 'acss_debit' : 'us_bank_account')
  return methods
}

/** Prices the cart and freight for the checkout page (no order is created). */
export async function quoteCheckout(items: CartRequestItem[], fulfilment: 'delivery' | 'pickup', address: { country: string; region: string; postal: string } | null) {
  const settings = await getShopSettings()
  const cart = await priceCart(items)
  const freight = address || fulfilment === 'pickup'
    ? calculateFreight(settings, fulfilment, address ?? { country: '', region: '', postal: '' }, cart.lines.filter(l => !l.error))
    : null
  const amount = cart.subtotal + (freight?.ok ? freight.amount : 0)
  const methods = paymentMethodsFor(settings, cart.currency, amount)
  return {
    ...cart,
    freight,
    methods,
    cardLimit: settings.cardLimit,
    automaticTax: settings.automaticTax,
    pickup: settings.pickup.enabled ? { label: settings.pickup.label, city: settings.pickup.city, region: settings.pickup.region } : null,
    shipCountries: settings.shipCountries,
  }
}

async function addEvent(conn: PoolConnection | ReturnType<typeof getDb>, orderId: number, event: string, note = '', actor = 'system') {
  await conn.execute('INSERT INTO order_events (order_id, event, note, actor, created_at) VALUES (?,?,?,?,UTC_TIMESTAMP())', [orderId, event, note.slice(0, 500), actor.slice(0, 190)])
}

/** Creates the order, holds its stock and returns the Stripe Checkout URL. */
export async function createCheckout(input: CheckoutInput, origin: string) {
  if (!(await shopIsOpen())) throw new ShopError('Online ordering is not available right now. Please request a quote.')
  const settings = await getShopSettings()
  const conn = await getDb().getConnection()
  let orderId = 0, orderNumber = '', token = ''
  let priced: Awaited<ReturnType<typeof priceCart>>
  let freight: ReturnType<typeof calculateFreight>
  try {
    await conn.beginTransaction()
    priced = await priceCart(input.items, { conn, lock: true })
    const blocked = priced.lines.find(l => l.error)
    if (!priced.lines.length) throw new ShopError('Your cart is empty.')
    if (priced.errors.length) throw new ShopError(priced.errors[0])
    if (blocked) throw new ShopError(`${blocked.name}: ${blocked.error}`)
    const addr = input.fulfilment === 'pickup' ? { country: settings.pickup.country, region: settings.pickup.region, postal: settings.pickup.postal } : input.address
    freight = calculateFreight(settings, input.fulfilment, addr, priced.lines)
    if (!freight.ok) throw new ShopError(freight.error)
    if (!paymentMethodsFor(settings, priced.currency, priced.subtotal + freight.amount).length) {
      throw new ShopError('This order is above our online payment limit. Please request a quote and we’ll invoice you.')
    }
    token = randomBytes(32).toString('base64url')
    const ship = input.fulfilment === 'pickup' ? { line1: '', line2: '', city: '', region: '', postal: '', country: settings.pickup.country } : input.address
    const [res] = await conn.execute<ResultSetHeader>(
      `INSERT INTO orders (access_token, status, currency, subtotal, freight, freight_note, total, customer_name, company, email, phone, po_number,
         customer_notes, fulfilment, ship_line1, ship_line2, ship_city, ship_region, ship_postal, ship_country, live_mode, created_at)
       VALUES (?, 'pending_payment', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, UTC_TIMESTAMP())`,
      [token, priced.currency, priced.subtotal, freight.amount, freight.billedLater ? 'Freight quoted separately' : freight.label,
        priced.subtotal + freight.amount, input.name, input.company, input.email, input.phone, input.poNumber, input.notes || null,
        input.fulfilment, ship.line1, ship.line2, ship.city, ship.region, ship.postal, ship.country, stripeLiveMode() ? 1 : 0],
    )
    orderId = res.insertId
    orderNumber = `CE-${new Date().getUTCFullYear()}-${String(orderId).padStart(5, '0')}`
    await conn.execute('UPDATE orders SET order_number=? WHERE id=?', [orderNumber, orderId])
    for (const l of priced.lines) {
      await conn.execute(
        'INSERT INTO order_items (order_id, product_id, sku, name, slug, unit_price, quantity, line_total) VALUES (?,?,?,?,?,?,?,?)',
        [orderId, l.id, l.sku, l.name, l.slug, l.unitPrice, l.quantity, l.lineTotal],
      )
      await conn.execute(
        `INSERT INTO stock_holds (order_id, product_id, quantity, expires_at) VALUES (?,?,?, DATE_ADD(UTC_TIMESTAMP(), INTERVAL ${HOLD_MINUTES} MINUTE))`,
        [orderId, l.id, l.quantity],
      )
    }
    await addEvent(conn, orderId, 'created', `Checkout started (${input.fulfilment})`, input.email)
    await conn.commit()
  } catch (error) {
    await conn.rollback().catch(() => {})
    throw error
  } finally {
    conn.release()
  }

  try {
    const pickup = settings.pickup
    const taxAddress = input.fulfilment === 'pickup'
      ? { line1: pickup.line1, city: pickup.city, state: pickup.region, postal_code: pickup.postal, country: pickup.country }
      : { line1: input.address.line1, line2: input.address.line2 || undefined, city: input.address.city, state: input.address.region, postal_code: input.address.postal, country: input.address.country }
    const s = stripe()
    const customer = await s.customers.create({
      email: input.email, name: input.company || input.name, phone: input.phone,
      address: taxAddress, shipping: { name: input.company || input.name, phone: input.phone, address: taxAddress },
      metadata: { order_number: orderNumber, contact_name: input.name },
    })
    const currency = priced.currency.toLowerCase()
    const methods = paymentMethodsFor(settings, priced.currency, priced.subtotal + freight.amount)
    const meta = { order_id: String(orderId), order_number: orderNumber }
    const session = await s.checkout.sessions.create({
      mode: 'payment',
      customer: customer.id,
      client_reference_id: String(orderId),
      metadata: meta,
      payment_intent_data: { description: `CANDRON order ${orderNumber}`, metadata: meta },
      // Filters the methods switched on in Stripe → Settings → Payment methods
      allowed_payment_method_types: methods,
      payment_method_options: {
        ...(methods.includes('acss_debit') && {
          acss_debit: { currency: 'cad', verification_method: 'automatic', mandate_options: { payment_schedule: 'sporadic', transaction_type: 'business' } },
        }),
        ...(methods.includes('us_bank_account') && { us_bank_account: { verification_method: 'automatic' } }),
      },
      line_items: priced.lines.map(l => ({
        quantity: l.quantity,
        price_data: {
          currency, unit_amount: toCents(l.unitPrice), tax_behavior: 'exclusive' as const,
          product_data: { name: l.name, description: `Item ${l.sku}`, tax_code: 'txcd_99999999', metadata: { sku: l.sku, product_id: String(l.id) } },
        },
      })),
      shipping_options: [{
        shipping_rate_data: {
          type: 'fixed_amount', display_name: freight.ok ? freight.label.slice(0, 100) : 'Freight',
          fixed_amount: { amount: toCents(freight.ok ? freight.amount : 0), currency },
          tax_behavior: 'exclusive', tax_code: 'txcd_92010001',
        },
      }],
      automatic_tax: { enabled: settings.automaticTax },
      ...(freight.ok && freight.billedLater && { custom_text: { submit: { message: 'Freight is quoted separately and invoiced before shipping.' } } }),
      expires_at: Math.floor(Date.now() / 1000) + SESSION_MINUTES * 60,
      locale: 'en',
      success_url: `${origin}/order/${orderNumber}?t=${token}&paid=1`,
      cancel_url: `${origin}/cart?cancelled=${orderNumber}`,
    }, { idempotencyKey: `checkout-${orderId}` })
    await getDb().execute('UPDATE orders SET stripe_session_id=?, stripe_customer_id=? WHERE id=?', [session.id, customer.id, orderId])
    if (!session.url) throw new Error('Stripe returned no checkout URL')
    return { url: session.url, orderNumber }
  } catch (error) {
    console.error('[shop] Stripe checkout failed', error instanceof Error ? error.message : error)
    await getDb().execute("UPDATE orders SET status='cancelled' WHERE id=? AND status='pending_payment'", [orderId])
    await getDb().execute('DELETE FROM stock_holds WHERE order_id=?', [orderId])
    await addEvent(getDb(), orderId, 'checkout_failed', error instanceof Error ? error.message.slice(0, 300) : 'Stripe error')
    throw new ShopError('We couldn’t open the payment page. Please try again, or call us to place the order.')
  }
}

// ── Webhook handling ─────────────────────────────────────────────────────

type OrderRow = RowDataPacket & { id: number; status: OrderStatus; stock_released: number; total: string }

async function lockOrder(conn: PoolConnection, session: Stripe.Checkout.Session) {
  const id = Number(session.metadata?.order_id || session.client_reference_id)
  const [rows] = await conn.execute<OrderRow[]>('SELECT id, status, stock_released, total FROM orders WHERE id=? AND stripe_session_id=? FOR UPDATE', [id, session.id])
  return rows[0] ?? null
}

/** Moves held units into sold stock (marks one-off listings Sold when they run out). */
async function takeStock(conn: PoolConnection, orderId: number) {
  const [items] = await conn.execute<(RowDataPacket & { product_id: number | null; quantity: number })[]>('SELECT product_id, quantity FROM order_items WHERE order_id=?', [orderId])
  for (const it of items) {
    if (!it.product_id) continue
    await conn.execute(
      "UPDATE products SET status=IF(stock_quantity<=? AND purchase_mode='buy','Sold',status), stock_quantity=GREATEST(stock_quantity-?,0) WHERE id=?",
      [it.quantity, it.quantity, it.product_id],
    )
  }
  await conn.execute('DELETE FROM stock_holds WHERE order_id=?', [orderId])
}

/** Puts the units back (failed bank payment or cancelled order). */
async function returnStock(conn: PoolConnection, orderId: number) {
  const [items] = await conn.execute<(RowDataPacket & { product_id: number | null; quantity: number })[]>('SELECT product_id, quantity FROM order_items WHERE order_id=?', [orderId])
  for (const it of items) {
    if (!it.product_id) continue
    await conn.execute("UPDATE products SET stock_quantity=stock_quantity+?, status=IF(status='Sold','Available',status) WHERE id=?", [it.quantity, it.product_id])
  }
  await conn.execute('UPDATE orders SET stock_released=1 WHERE id=?', [orderId])
}

async function describePayment(paymentIntentId: string | null) {
  if (!paymentIntentId) return ''
  try {
    const pi = await stripe().paymentIntents.retrieve(paymentIntentId, { expand: ['payment_method'] })
    const pm = pi.payment_method && typeof pi.payment_method === 'object' ? pi.payment_method : null
    if (pm?.type === 'card' && pm.card) return `${pm.card.brand.toUpperCase()} •••• ${pm.card.last4}`
    if (pm?.type === 'acss_debit') return `Bank debit${pm.acss_debit?.last4 ? ` •••• ${pm.acss_debit.last4}` : ''}`
    if (pm?.type === 'us_bank_account') return `US bank account${pm.us_bank_account?.last4 ? ` •••• ${pm.us_bank_account.last4}` : ''}`
    return pm?.type ?? ''
  } catch { return '' }
}

async function inTransaction<T>(fn: (conn: PoolConnection) => Promise<T>) {
  const conn = await getDb().getConnection()
  try {
    await conn.beginTransaction()
    const result = await fn(conn)
    await conn.commit()
    return result
  } catch (error) {
    await conn.rollback().catch(() => {})
    throw error
  } finally {
    conn.release()
  }
}

async function onSessionCompleted(session: Stripe.Checkout.Session) {
  const pi = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id ?? null
  const method = await describePayment(pi)
  const paid = session.payment_status === 'paid'
  const orderId = await inTransaction(async conn => {
    const order = await lockOrder(conn, session)
    if (!order || order.status !== 'pending_payment') return null
    await takeStock(conn, order.id)
    await conn.execute(
      `UPDATE orders SET status=?, subtotal=?, freight=?, tax=?, total=?, stripe_payment_intent=?, payment_method=?,
         paid_at=${paid ? 'UTC_TIMESTAMP()' : 'NULL'} WHERE id=?`,
      [paid ? 'paid' : 'payment_processing', fromCents(session.amount_subtotal), fromCents(session.shipping_cost?.amount_subtotal),
        fromCents(session.total_details?.amount_tax), fromCents(session.amount_total), pi, method, order.id],
    )
    await addEvent(conn, order.id, paid ? 'paid' : 'payment_processing', method)
    return order.id
  })
  if (orderId) await sendOrderEmails(orderId, paid ? 'paid' : 'processing')
}

async function onAsyncPayment(session: Stripe.Checkout.Session, succeeded: boolean) {
  const orderId = await inTransaction(async conn => {
    const order = await lockOrder(conn, session)
    if (!order || order.status !== 'payment_processing') return null
    if (succeeded) {
      await conn.execute("UPDATE orders SET status='paid', paid_at=UTC_TIMESTAMP() WHERE id=?", [order.id])
    } else {
      if (!order.stock_released) await returnStock(conn, order.id)
      await conn.execute("UPDATE orders SET status='payment_failed' WHERE id=?", [order.id])
    }
    await addEvent(conn, order.id, succeeded ? 'paid' : 'payment_failed', succeeded ? 'Bank payment cleared' : 'Bank payment failed')
    return order.id
  })
  if (orderId) await sendOrderEmails(orderId, succeeded ? 'paid' : 'failed')
}

async function onSessionExpired(session: Stripe.Checkout.Session) {
  await inTransaction(async conn => {
    const order = await lockOrder(conn, session)
    if (!order || order.status !== 'pending_payment') return
    await conn.execute('DELETE FROM stock_holds WHERE order_id=?', [order.id])
    await conn.execute("UPDATE orders SET status='expired' WHERE id=?", [order.id])
    await addEvent(conn, order.id, 'expired', 'Payment page expired; held stock released')
  })
}

async function onChargeRefunded(charge: Stripe.Charge) {
  const pi = typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id
  if (!pi) return
  await inTransaction(async conn => {
    const [rows] = await conn.execute<OrderRow[]>('SELECT id, status, stock_released, total FROM orders WHERE stripe_payment_intent=? FOR UPDATE', [pi])
    const order = rows[0]
    if (!order) return
    const refunded = fromCents(charge.amount_refunded)
    const full = charge.refunded || refunded >= Number(order.total)
    await conn.execute(`UPDATE orders SET amount_refunded=?${full ? ", status='refunded'" : ''} WHERE id=?`, [refunded, order.id])
    await addEvent(conn, order.id, 'refund_recorded', `Total refunded ${refunded.toFixed(2)}`, 'stripe')
  })
}

/** Handles a verified Stripe event once (Stripe may deliver the same event more than once). */
export async function handleStripeEvent(event: Stripe.Event) {
  const [seen] = await getDb().execute<RowDataPacket[]>('SELECT 1 FROM stripe_events WHERE event_id=?', [event.id])
  if (seen.length) return 'duplicate'
  switch (event.type) {
    case 'checkout.session.completed': await onSessionCompleted(event.data.object); break
    case 'checkout.session.async_payment_succeeded': await onAsyncPayment(event.data.object, true); break
    case 'checkout.session.async_payment_failed': await onAsyncPayment(event.data.object, false); break
    case 'checkout.session.expired': await onSessionExpired(event.data.object); break
    case 'charge.refunded': await onChargeRefunded(event.data.object); break
    default: return 'ignored'
  }
  await getDb().execute('INSERT IGNORE INTO stripe_events (event_id, event_type, received_at) VALUES (?,?,UTC_TIMESTAMP())', [event.id, event.type])
  return 'handled'
}

// ── Reading orders ───────────────────────────────────────────────────────

export type OrderRecord = RowDataPacket & {
  id: number; order_number: string; access_token: string; status: OrderStatus; currency: string
  subtotal: string; freight: string; freight_note: string; tax: string; total: string; amount_refunded: string
  customer_name: string; company: string; email: string; phone: string; po_number: string; customer_notes: string | null
  fulfilment: 'delivery' | 'pickup'; ship_line1: string; ship_line2: string; ship_city: string; ship_region: string; ship_postal: string; ship_country: string
  tracking_carrier: string; tracking_number: string; admin_notes: string | null; payment_method: string
  stripe_payment_intent: string | null; live_mode: number; stock_released: number
  paid_at: Date | null; shipped_at: Date | null; created_at: Date
}
export type OrderItemRecord = RowDataPacket & { id: number; product_id: number | null; sku: string; name: string; slug: string; unit_price: string; quantity: number; line_total: string }
export type OrderEventRecord = RowDataPacket & { id: number; event: string; note: string; actor: string; created_at: Date }

export async function loadOrder(where: { id?: number; number?: string }) {
  const db = getDb()
  const [rows] = await db.execute<OrderRecord[]>(
    `SELECT * FROM orders WHERE ${where.id ? 'id=?' : 'order_number=?'} LIMIT 1`, [where.id ?? where.number ?? ''],
  )
  const order = rows[0]
  if (!order) return null
  const [items] = await db.execute<OrderItemRecord[]>('SELECT * FROM order_items WHERE order_id=? ORDER BY id', [order.id])
  const [events] = await db.execute<OrderEventRecord[]>('SELECT * FROM order_events WHERE order_id=? ORDER BY id', [order.id])
  return { order, items, events }
}

export type OrderListRow = RowDataPacket & {
  id: number; order_number: string; status: OrderStatus; currency: string; total: string; amount_refunded: string
  customer_name: string; company: string; email: string; fulfilment: string; live_mode: number; created_at: Date; items: number
}

/** Admin order list. Abandoned checkouts (awaiting payment / expired) are hidden unless asked for. */
export async function listOrders(opts: { status?: string; q?: string; includeAbandoned?: boolean } = {}) {
  const where: string[] = [], values: string[] = []
  if (opts.status) { where.push('o.status=?'); values.push(opts.status) }
  else if (!opts.includeAbandoned) where.push("o.status NOT IN ('pending_payment','expired')")
  if (opts.q) {
    where.push('(o.order_number LIKE ? OR o.email LIKE ? OR o.customer_name LIKE ? OR o.company LIKE ? OR o.po_number LIKE ?)')
    const like = `%${opts.q.replace(/[%_\\]/g, '')}%`
    values.push(like, like, like, like, like)
  }
  const [rows] = await getDb().query<OrderListRow[]>(
    `SELECT o.id, o.order_number, o.status, o.currency, o.total, o.amount_refunded, o.customer_name, o.company, o.email, o.fulfilment,
            o.live_mode, o.created_at, (SELECT COALESCE(SUM(quantity),0) FROM order_items i WHERE i.order_id=o.id) items
     FROM orders o ${where.length ? `WHERE ${where.join(' AND ')}` : ''} ORDER BY o.id DESC LIMIT 300`,
    values,
  )
  return rows
}

/** Public order lookup: the access token from the confirmation link is required. */
export async function loadOrderForCustomer(number: string, token: string) {
  if (!/^CE-\d{4}-\d{5,}$/.test(number) || !/^[A-Za-z0-9_-]{43}$/.test(token)) return null
  const found = await loadOrder({ number })
  if (!found) return null
  const a = Buffer.from(found.order.access_token), b = Buffer.from(token)
  return a.length === b.length && timingSafeEqual(a, b) ? found : null
}

// ── Admin actions ────────────────────────────────────────────────────────

const RESTOCKABLE: OrderStatus[] = ['paid', 'payment_processing', 'processing', 'ready_to_ship']

export async function updateOrder(orderId: number, admin: string, patch: { status?: string; trackingCarrier?: string; trackingNumber?: string; adminNotes?: string; note?: string }) {
  let emailKind: 'shipped' | 'cancelled' | null = null
  await inTransaction(async conn => {
    const [rows] = await conn.execute<OrderRow[]>('SELECT id, status, stock_released, total FROM orders WHERE id=? FOR UPDATE', [orderId])
    const order = rows[0]
    if (!order) throw new ShopError('Order not found.')
    const sets: string[] = [], values: (string | number)[] = []
    if (patch.trackingCarrier !== undefined) { sets.push('tracking_carrier=?'); values.push(text(patch.trackingCarrier, 80)) }
    if (patch.trackingNumber !== undefined) { sets.push('tracking_number=?'); values.push(text(patch.trackingNumber, 120)) }
    if (patch.adminNotes !== undefined) { sets.push('admin_notes=?'); values.push(text(patch.adminNotes, 5000)) }
    const next = patch.status as OrderStatus | undefined
    if (next && next !== order.status) {
      const allowed: OrderStatus[] = ['paid', 'processing', 'ready_to_ship', 'shipped', 'delivered', 'cancelled']
      const fromAllowed: OrderStatus[] = ['paid', 'processing', 'ready_to_ship', 'shipped', 'delivered', 'payment_processing']
      if (!allowed.includes(next) || !fromAllowed.includes(order.status)) throw new ShopError(`Can’t change an order from “${order.status}” to “${next}”.`)
      if (next === 'paid' || (order.status === 'payment_processing' && next !== 'cancelled')) throw new ShopError('Paid status is set by Stripe when the payment clears.')
      sets.push('status=?'); values.push(next)
      if (next === 'shipped') { sets.push('shipped_at=UTC_TIMESTAMP()'); emailKind = 'shipped' }
      if (next === 'cancelled') {
        if (!order.stock_released && RESTOCKABLE.includes(order.status)) await returnStock(conn, order.id)
        emailKind = 'cancelled'
      }
      await addEvent(conn, order.id, `status:${next}`, patch.note ?? '', admin)
    } else if (patch.note) {
      await addEvent(conn, order.id, 'note', patch.note, admin)
    }
    if (sets.length) await conn.execute(`UPDATE orders SET ${sets.join(', ')} WHERE id=?`, [...values, order.id])
  })
  return { emailed: emailKind ? await sendOrderEmails(orderId, emailKind) : false }
}

/** Refunds through Stripe (full when amount is null). The charge.refunded webhook confirms the total. */
export async function refundOrder(orderId: number, admin: string, amount: number | null, reason: string) {
  const found = await loadOrder({ id: orderId })
  if (!found) throw new ShopError('Order not found.')
  const { order } = found
  if (!order.stripe_payment_intent) throw new ShopError('This order has no payment to refund.')
  const remaining = Math.round((Number(order.total) - Number(order.amount_refunded)) * 100) / 100
  const value = amount === null ? remaining : Math.round(amount * 100) / 100
  if (!(value > 0) || value > remaining) throw new ShopError(`Refund must be between 0.01 and ${remaining.toFixed(2)}.`)
  const refund = await stripe().refunds.create(
    { payment_intent: order.stripe_payment_intent, amount: toCents(value), metadata: { order_number: order.order_number, admin } },
    { idempotencyKey: `refund-${order.id}-${toCents(Number(order.amount_refunded))}-${toCents(value)}` },
  )
  const total = Math.round((Number(order.amount_refunded) + value) * 100) / 100
  const full = total >= Number(order.total)
  await getDb().execute(`UPDATE orders SET amount_refunded=?${full ? ", status='refunded'" : ''} WHERE id=?`, [total, order.id])
  await addEvent(getDb(), order.id, 'refund', `${value.toFixed(2)} ${order.currency}${reason ? ` · ${reason.slice(0, 200)}` : ''} (${refund.status})`, admin)
  return { emailed: await sendOrderEmails(order.id, 'refunded', value) }
}

export const isShopError = (e: unknown): e is ShopError => e instanceof ShopError
