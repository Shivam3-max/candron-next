// Orders: checkout creation (cart, reserve-with-deposit, quotes), Stripe invoices,
// webhook handling and admin actions.
// Orders become "paid" only from a verified Stripe webhook, never from the browser redirect.
import { randomBytes, timingSafeEqual } from 'node:crypto'
import type Stripe from 'stripe'
import type { PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import { getDb } from '@/lib/db'
import { priceCart, type CartRequestItem, type PurchaseMode } from '@/lib/shop/catalog'
import { calculateFreight, type FreightResult } from '@/lib/shop/freight'
import { formatPostal, isCountry, isPostalCode, isRegion } from '@/lib/shop/regions'
import { getShopSettings, shopIsOpen, stripeLiveMode, type ShopSettings } from '@/lib/shop/settings'
import { fromCents, stripe, toCents } from '@/lib/shop/stripe'
import { sendOrderEmails } from '@/lib/shop/email'
import type { OrderStatus, PaymentTerms } from '@/lib/shop/order-status'

export class ShopError extends Error {}

/** Minutes a buyer has on the Stripe page (Stripe's minimum is 30); stock holds outlive it slightly. */
const SESSION_MINUTES = 31
const HOLD_MINUTES = 35
const FREIGHT_LATER = 'Freight quoted separately'

const text = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max)
const round2 = (n: number) => Math.round(n * 100) / 100

export interface Address { line1: string; line2: string; city: string; region: string; postal: string; country: string }

export interface CheckoutInput {
  items: CartRequestItem[]
  /** "buy" = cart; "reserve" = deposit for a single listing */
  mode: PurchaseMode
  name: string; company: string; email: string; phone: string; poNumber: string; notes: string
  fulfilment: 'delivery' | 'pickup'
  address: Address
  acceptTerms: boolean
}

export function validateAddress(address: Address) {
  const { line1, city, region, postal, country } = address
  if (!isCountry(country)) throw new ShopError('Please choose a country.')
  if (!line1 || !city) throw new ShopError('Please enter the delivery street address and city.')
  if (!isRegion(country, region)) throw new ShopError('Please choose a province or state.')
  if (!isPostalCode(country, postal)) throw new ShopError(country === 'CA' ? 'Please enter a valid postal code (e.g. M5V 2T6).' : 'Please enter a valid ZIP code.')
  return { ...address, postal: formatPostal(country, postal) }
}

export function parseCheckoutInput(body: Record<string, unknown>): CheckoutInput {
  const a = (body.address && typeof body.address === 'object' ? body.address : {}) as Record<string, unknown>
  const input: CheckoutInput = {
    items: Array.isArray(body.items) ? (body.items as CartRequestItem[]) : [],
    mode: body.mode === 'reserve' ? 'reserve' : 'buy',
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
  if (input.mode === 'reserve' && input.items.length !== 1) throw new ShopError('Reserve one listing at a time.')
  if (input.fulfilment === 'delivery') input.address = validateAddress(input.address)
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

/** Deposit (before tax) on an amount, rounded to the cent. */
export const depositOf = (amount: number, percent: number) => round2(amount * percent / 100)

/** Prices the cart (or a reservation) and freight for the checkout page (no order is created). */
export async function quoteCheckout(items: CartRequestItem[], fulfilment: 'delivery' | 'pickup', address: { country: string; region: string; postal: string } | null, mode: PurchaseMode = 'buy') {
  const settings = await getShopSettings()
  const cart = await priceCart(items, { mode })
  const freight: FreightResult | null = mode === 'reserve'
    ? { ok: true, amount: 0, label: FREIGHT_LATER, billedLater: true }
    : address || fulfilment === 'pickup'
      ? calculateFreight(settings, fulfilment, address ?? { country: '', region: '', postal: '' }, cart.lines.filter(l => !l.error))
      : null
  const depositPercent = mode === 'reserve' ? (cart.lines[0]?.depositPercent ?? settings.deposit.percent) : null
  const deposit = depositPercent ? depositOf(cart.subtotal, depositPercent) : null
  const amount = deposit ?? cart.subtotal + (freight?.ok ? freight.amount : 0)
  return {
    ...cart,
    mode,
    freight,
    deposit: deposit === null ? null : { percent: depositPercent!, amount: deposit },
    methods: paymentMethodsFor(settings, cart.currency, amount),
    cardLimit: settings.cardLimit,
    automaticTax: settings.automaticTax,
    pickup: settings.pickup.enabled ? { label: settings.pickup.label, city: settings.pickup.city, region: settings.pickup.region } : null,
    shipCountries: settings.shipCountries,
  }
}

export async function addEvent(conn: PoolConnection | ReturnType<typeof getDb>, orderId: number, event: string, note = '', actor = 'system') {
  await conn.execute('INSERT INTO order_events (order_id, event, note, actor, created_at) VALUES (?,?,?,?,UTC_TIMESTAMP())', [orderId, event, note.slice(0, 500), actor.slice(0, 190)])
}

export async function inTransaction<T>(fn: (conn: PoolConnection) => Promise<T>) {
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

// ── Building blocks shared by cart checkout, reservations and quotes ──────

export interface OrderLine { productId: number | null; sku: string; name: string; slug: string; unitPrice: number; quantity: number }
export interface OrderDraft {
  currency: string
  lines: OrderLine[]
  freight: number
  freightNote: string
  contact: { name: string; company: string; email: string; phone: string; poNumber: string; notes: string }
  fulfilment: 'delivery' | 'pickup'
  ship: Address
  paymentTerms: PaymentTerms
  depositAmount: number
  quoteId: number | null
  /** Hold stock for the Stripe page (true) or take it now (false, e.g. net-terms invoices) */
  hold: boolean
}

/** Inserts the order, its lines and stock holds inside the caller's transaction. */
export async function insertOrder(conn: PoolConnection, d: OrderDraft, actor: string) {
  const token = randomBytes(32).toString('base64url')
  const lines = d.lines.map(l => ({ ...l, lineTotal: round2(l.unitPrice * l.quantity) }))
  const subtotal = round2(lines.reduce((s, l) => s + l.lineTotal, 0))
  const [res] = await conn.execute<ResultSetHeader>(
    `INSERT INTO orders (access_token, status, currency, subtotal, freight, freight_note, total, customer_name, company, email, phone, po_number,
       customer_notes, fulfilment, ship_line1, ship_line2, ship_city, ship_region, ship_postal, ship_country, live_mode,
       quote_id, payment_terms, deposit_amount, created_at)
     VALUES (?, 'pending_payment', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, UTC_TIMESTAMP())`,
    [token, d.currency, subtotal, d.freight, d.freightNote, round2(subtotal + d.freight), d.contact.name, d.contact.company, d.contact.email,
      d.contact.phone, d.contact.poNumber, d.contact.notes || null, d.fulfilment, d.ship.line1, d.ship.line2, d.ship.city, d.ship.region,
      d.ship.postal, d.ship.country, stripeLiveMode() ? 1 : 0, d.quoteId, d.paymentTerms, d.depositAmount],
  )
  const orderId = res.insertId
  const orderNumber = `CE-${new Date().getUTCFullYear()}-${String(orderId).padStart(5, '0')}`
  await conn.execute('UPDATE orders SET order_number=? WHERE id=?', [orderNumber, orderId])
  for (const l of lines) {
    await conn.execute(
      'INSERT INTO order_items (order_id, product_id, sku, name, slug, unit_price, quantity, line_total) VALUES (?,?,?,?,?,?,?,?)',
      [orderId, l.productId, l.sku, l.name, l.slug, l.unitPrice, l.quantity, l.lineTotal],
    )
    if (d.hold && l.productId) {
      await conn.execute(
        `INSERT INTO stock_holds (order_id, product_id, quantity, expires_at) VALUES (?,?,?, DATE_ADD(UTC_TIMESTAMP(), INTERVAL ${HOLD_MINUTES} MINUTE))`,
        [orderId, l.productId, l.quantity],
      )
    }
  }
  await addEvent(conn, orderId, 'created', `${d.quoteId ? 'Quote accepted' : 'Checkout started'} (${d.paymentTerms === 'pay_now' ? 'pay in full' : d.paymentTerms}, ${d.fulfilment})`, actor)
  return { orderId, orderNumber, token, subtotal }
}

/** Address Stripe Tax uses: the delivery address, or our pickup yard. */
function taxAddress(d: { fulfilment: string; ship: Address }, settings: ShopSettings): Stripe.AddressParam {
  if (d.fulfilment === 'pickup') {
    const p = settings.pickup
    return { line1: p.line1, city: p.city, state: p.region, postal_code: p.postal, country: p.country }
  }
  const a = d.ship
  return { line1: a.line1, line2: a.line2 || undefined, city: a.city, state: a.region, postal_code: a.postal, country: a.country }
}

async function createStripeCustomer(d: { contact: OrderDraft['contact']; fulfilment: string; ship: Address }, settings: ShopSettings, orderNumber: string) {
  const address = taxAddress(d, settings)
  const name = d.contact.company || d.contact.name
  return stripe().customers.create({
    email: d.contact.email, name, phone: d.contact.phone, address,
    shipping: { name, phone: d.contact.phone, address },
    metadata: { order_number: orderNumber, contact_name: d.contact.name },
  })
}

/** Opens Stripe Checkout for an order: the full order, or just the deposit. Returns the payment page URL. */
export async function openCheckout(args: {
  orderId: number; orderNumber: string; token: string; draft: OrderDraft; settings: ShopSettings; origin: string; cancelPath: string
}) {
  const { orderId, orderNumber, token, draft, settings, origin } = args
  const s = stripe()
  const customer = await createStripeCustomer(draft, settings, orderNumber)
  const currency = draft.currency.toLowerCase()
  const subtotal = round2(draft.lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0))
  const isDeposit = draft.paymentTerms === 'deposit'
  const chargeNow = isDeposit ? draft.depositAmount : subtotal + draft.freight
  const methods = paymentMethodsFor(settings, draft.currency, chargeNow)
  if (!methods.length) throw new ShopError('This amount is above our online payment limit. Please request an invoice instead.')
  const meta = { order_id: String(orderId), order_number: orderNumber, kind: isDeposit ? 'deposit' : 'order' }
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = isDeposit
    ? [{
        quantity: 1,
        price_data: {
          currency, unit_amount: toCents(draft.depositAmount), tax_behavior: 'exclusive',
          product_data: {
            name: `Deposit for order ${orderNumber}`,
            description: draft.lines.map(l => `${l.quantity} × ${l.name}`).join('; ').slice(0, 480),
            tax_code: 'txcd_99999999',
          },
        },
      }]
    : draft.lines.map(l => ({
        quantity: l.quantity,
        price_data: {
          currency, unit_amount: toCents(l.unitPrice), tax_behavior: 'exclusive' as const,
          product_data: { name: l.name, description: l.sku ? `Item ${l.sku}` : undefined, tax_code: 'txcd_99999999', metadata: { sku: l.sku, product_id: String(l.productId ?? '') } },
        },
      }))
  const session = await s.checkout.sessions.create({
    mode: 'payment',
    customer: customer.id,
    client_reference_id: String(orderId),
    metadata: meta,
    payment_intent_data: { description: `CANDRON order ${orderNumber}${isDeposit ? ' (deposit)' : ''}`, metadata: meta },
    // Filters the methods switched on in Stripe → Settings → Payment methods
    allowed_payment_method_types: methods,
    payment_method_options: {
      ...(methods.includes('acss_debit') && {
        acss_debit: { currency: 'cad', verification_method: 'automatic', mandate_options: { payment_schedule: 'sporadic', transaction_type: 'business' } },
      }),
      ...(methods.includes('us_bank_account') && { us_bank_account: { verification_method: 'automatic' } }),
    },
    line_items: lineItems,
    ...(!isDeposit && {
      shipping_options: [{
        shipping_rate_data: {
          type: 'fixed_amount', display_name: (draft.freightNote || 'Freight').slice(0, 100),
          fixed_amount: { amount: toCents(draft.freight), currency }, tax_behavior: 'exclusive', tax_code: 'txcd_92010001',
        },
      }],
    }),
    automatic_tax: { enabled: settings.automaticTax },
    ...((isDeposit || draft.freightNote === FREIGHT_LATER) && {
      custom_text: { submit: { message: isDeposit ? 'This is the deposit. The balance and freight are invoiced before the equipment ships.' : 'Freight is quoted separately and invoiced before shipping.' } },
    }),
    expires_at: Math.floor(Date.now() / 1000) + SESSION_MINUTES * 60,
    locale: 'en',
    success_url: `${origin}/order/${orderNumber}?t=${token}&paid=1`,
    cancel_url: `${origin}${args.cancelPath}`,
  }, { idempotencyKey: `checkout-${orderId}` })
  await getDb().execute('UPDATE orders SET stripe_session_id=?, stripe_customer_id=? WHERE id=?', [session.id, customer.id, orderId])
  if (!session.url) throw new Error('Stripe returned no checkout URL')
  return session.url
}

/** Marks an order whose Stripe page couldn't be opened as cancelled and frees its holds. */
export async function abandonOrder(orderId: number, error: unknown) {
  console.error('[shop] Stripe checkout failed', error instanceof Error ? error.message : error)
  await getDb().execute("UPDATE orders SET status='cancelled' WHERE id=? AND status='pending_payment'", [orderId])
  await getDb().execute('DELETE FROM stock_holds WHERE order_id=?', [orderId])
  await addEvent(getDb(), orderId, 'checkout_failed', error instanceof Error ? error.message.slice(0, 300) : 'Stripe error')
}

/** Cart checkout ("buy") or a single-listing reservation ("reserve", deposit only). */
export async function createCheckout(input: CheckoutInput, origin: string) {
  if (!(await shopIsOpen())) throw new ShopError('Online ordering is not available right now. Please request a quote.')
  const settings = await getShopSettings()
  const created = await inTransaction(async conn => {
    const priced = await priceCart(input.items, { conn, lock: true, mode: input.mode })
    const blocked = priced.lines.find(l => l.error)
    if (!priced.lines.length) throw new ShopError('Your cart is empty.')
    if (priced.errors.length) throw new ShopError(priced.errors[0])
    if (blocked) throw new ShopError(`${blocked.name}: ${blocked.error}`)
    let freight: FreightResult
    let depositAmount = 0
    if (input.mode === 'reserve') {
      freight = { ok: true, amount: 0, label: FREIGHT_LATER, billedLater: true }
      depositAmount = depositOf(priced.subtotal, priced.lines[0].depositPercent ?? settings.deposit.percent)
    } else {
      const addr = input.fulfilment === 'pickup' ? { country: settings.pickup.country, region: settings.pickup.region, postal: settings.pickup.postal } : input.address
      freight = calculateFreight(settings, input.fulfilment, addr, priced.lines)
      if (!freight.ok) throw new ShopError(freight.error)
    }
    const draft: OrderDraft = {
      currency: priced.currency,
      lines: priced.lines.map(l => ({ productId: l.id, sku: l.sku, name: l.name, slug: l.slug, unitPrice: l.unitPrice, quantity: l.quantity })),
      freight: freight.ok ? freight.amount : 0,
      freightNote: freight.ok && freight.billedLater ? FREIGHT_LATER : freight.ok ? freight.label : 'Freight',
      contact: { name: input.name, company: input.company, email: input.email, phone: input.phone, poNumber: input.poNumber, notes: input.notes },
      fulfilment: input.fulfilment,
      ship: input.fulfilment === 'pickup' ? { line1: '', line2: '', city: '', region: '', postal: '', country: settings.pickup.country } : input.address,
      paymentTerms: input.mode === 'reserve' ? 'deposit' : 'pay_now',
      depositAmount,
      quoteId: null,
      hold: true,
    }
    if (!paymentMethodsFor(settings, draft.currency, input.mode === 'reserve' ? depositAmount : priced.subtotal + draft.freight).length) {
      throw new ShopError('This order is above our online payment limit. Please request a quote and we’ll invoice you.')
    }
    return { ...(await insertOrder(conn, draft, input.email)), draft }
  })
  try {
    const url = await openCheckout({ ...created, settings, origin, cancelPath: input.mode === 'reserve' ? `/inventory/${created.draft.lines[0].slug}?cancelled=${created.orderNumber}` : `/cart?cancelled=${created.orderNumber}` })
    return { url, orderNumber: created.orderNumber }
  } catch (error) {
    await abandonOrder(created.orderId, error)
    if (error instanceof ShopError) throw error
    throw new ShopError('We couldn’t open the payment page. Please try again, or call us to place the order.')
  }
}

// ── Stripe invoices (deposit balances and net terms) ──────────────────────

type InvoiceOrderRow = RowDataPacket & {
  id: number; order_number: string; access_token: string; status: OrderStatus; currency: string; subtotal: string; freight: string; freight_note: string
  deposit_amount: string; payment_terms: PaymentTerms; customer_name: string; company: string; email: string; phone: string; po_number: string
  fulfilment: 'delivery' | 'pickup'; ship_line1: string; ship_line2: string; ship_city: string; ship_region: string; ship_postal: string; ship_country: string
  stripe_customer_id: string | null; stripe_invoice_id: string | null
}

/**
 * Issues a Stripe invoice: "balance" = order value + freight − deposit (deposit orders);
 * "net" = the whole order (net-terms quotes). Stripe emails the invoice; buyers pay by card or bank debit.
 */
export async function issueInvoice(orderId: number, kind: 'balance' | 'net', opts: { daysUntilDue: number; freight?: number | null; actor: string }) {
  const settings = await getShopSettings()
  const [rows] = await getDb().execute<InvoiceOrderRow[]>('SELECT * FROM orders WHERE id=?', [orderId])
  const order = rows[0]
  if (!order) throw new ShopError('Order not found.')
  if (order.stripe_invoice_id && order.status === 'invoiced') throw new ShopError('An invoice is already open for this order.')
  if (kind === 'balance' && order.status !== 'deposit_paid') throw new ShopError('A balance invoice can only be sent once the deposit is paid.')
  // A new freight figure is only saved once Stripe has issued the invoice (see below)
  const freightChanged = opts.freight !== undefined && opts.freight !== null
  if (freightChanged) {
    if (!(opts.freight! >= 0)) throw new ShopError('Freight must be zero or more.')
    order.freight = String(round2(opts.freight!))
    if (order.freight_note === FREIGHT_LATER) order.freight_note = 'Freight'
  }
  const [items] = await getDb().execute<OrderItemRecord[]>('SELECT * FROM order_items WHERE order_id=? ORDER BY id', [orderId])
  const freight = Number(order.freight)
  const goods = Number(order.subtotal)
  const amount = kind === 'balance' ? round2(goods + freight - Number(order.deposit_amount)) : round2(goods + freight)
  if (!(amount > 0)) throw new ShopError('Nothing left to invoice.')
  const methods = paymentMethodsFor(settings, order.currency, amount).filter(m => m !== 'link') as Stripe.InvoiceCreateParams.PaymentSettings.PaymentMethodType[]
  if (!methods.length) throw new ShopError('Turn on bank debit (or raise the card limit) in Shop settings so the invoice can be paid online.')
  const s = stripe()
  const draft = {
    contact: { name: order.customer_name, company: order.company, email: order.email, phone: order.phone, poNumber: order.po_number, notes: '' },
    fulfilment: order.fulfilment,
    ship: { line1: order.ship_line1, line2: order.ship_line2, city: order.ship_city, region: order.ship_region, postal: order.ship_postal, country: order.ship_country },
  }
  const customerId = order.stripe_customer_id || (await createStripeCustomer(draft, settings, order.order_number)).id
  const currency = order.currency.toLowerCase()
  const meta = { order_id: String(order.id), order_number: order.order_number, kind }
  const invoice = await s.invoices.create({
    customer: customerId,
    collection_method: 'send_invoice',
    days_until_due: Math.max(1, Math.min(120, Math.round(opts.daysUntilDue))),
    currency,
    automatic_tax: { enabled: settings.automaticTax },
    pending_invoice_items_behavior: 'exclude',
    description: `CANDRON order ${order.order_number}${order.po_number ? ` · PO ${order.po_number}` : ''}`,
    metadata: meta,
    payment_settings: {
      payment_method_types: methods,
      ...(methods.includes('acss_debit') && {
        payment_method_options: { acss_debit: { verification_method: 'automatic', mandate_options: { transaction_type: 'business' } } },
      }),
    },
  }, { idempotencyKey: `invoice-${order.id}-${kind}-${toCents(amount)}` })
  const add = (description: string, cents: number, taxCode: string) => s.invoiceItems.create({
    customer: customerId, invoice: invoice.id!, currency, amount: cents, description, tax_behavior: 'exclusive', tax_code: taxCode,
  })
  if (kind === 'net') {
    for (const i of items) await add(`${i.name}${i.sku ? ` (${i.sku})` : ''} × ${i.quantity}`, toCents(Number(i.line_total)), 'txcd_99999999')
    if (freight > 0) await add(order.freight_note || 'Freight', toCents(freight), 'txcd_92010001')
  } else {
    await add(`Balance for order ${order.order_number}: ${items.map(i => `${i.quantity} × ${i.name}`).join('; ')}`.slice(0, 500), toCents(goods - Number(order.deposit_amount)), 'txcd_99999999')
    if (freight > 0) await add(order.freight_note && order.freight_note !== FREIGHT_LATER ? order.freight_note : 'Freight', toCents(freight), 'txcd_92010001')
  }
  const finalized = await s.invoices.finalizeInvoice(invoice.id!)
  await s.invoices.sendInvoice(finalized.id!).catch(error => console.warn('[shop] Stripe could not email the invoice', error instanceof Error ? error.message : error))
  const due = finalized.due_date ? new Date(finalized.due_date * 1000).toISOString().slice(0, 10) : null
  await getDb().execute(
    "UPDATE orders SET status='invoiced', stripe_invoice_id=?, invoice_url=?, invoice_due=?, stripe_customer_id=?, freight=?, freight_note=?, total=subtotal+?+tax WHERE id=?",
    [finalized.id, finalized.hosted_invoice_url ?? '', due, customerId, freight, order.freight_note, freight, order.id],
  )
  await addEvent(getDb(), order.id, 'invoiced', `${kind === 'balance' ? 'Balance' : 'Net-terms'} invoice ${finalized.number ?? finalized.id} for ${amount.toFixed(2)} ${order.currency} before tax${due ? `, due ${due}` : ''}`, opts.actor)
  return { emailed: await sendOrderEmails(order.id, 'invoiced'), invoiceUrl: finalized.hosted_invoice_url ?? '' }
}

// ── Webhook handling ─────────────────────────────────────────────────────

type OrderRow = RowDataPacket & { id: number; status: OrderStatus; stock_released: number; total: string; payment_terms: PaymentTerms; quote_id: number | null; subtotal: string; freight: string; tax: string; amount_paid: string }
const ORDER_ROW = 'id, status, stock_released, total, payment_terms, quote_id, subtotal, freight, tax, amount_paid'

async function lockOrder(conn: PoolConnection, session: Stripe.Checkout.Session) {
  const id = Number(session.metadata?.order_id || session.client_reference_id)
  const [rows] = await conn.execute<OrderRow[]>(`SELECT ${ORDER_ROW} FROM orders WHERE id=? AND stripe_session_id=? FOR UPDATE`, [id, session.id])
  return rows[0] ?? null
}

/** Moves held (or ordered) units out of stock; one-off listings show Sold (or Reserved for deposits) when they run out. */
export async function takeStock(conn: PoolConnection, orderId: number, reserved = false) {
  const [items] = await conn.execute<(RowDataPacket & { product_id: number | null; quantity: number })[]>('SELECT product_id, quantity FROM order_items WHERE order_id=?', [orderId])
  for (const it of items) {
    if (!it.product_id) continue
    await conn.execute(
      `UPDATE products SET status=IF(stock_quantity<=?, '${reserved ? 'Reserved' : 'Sold'}', status), stock_quantity=GREATEST(stock_quantity-?,0) WHERE id=?`,
      [it.quantity, it.quantity, it.product_id],
    )
  }
  await conn.execute('DELETE FROM stock_holds WHERE order_id=?', [orderId])
}

/** Puts the units back (failed payment or cancelled order). */
async function returnStock(conn: PoolConnection, orderId: number) {
  const [items] = await conn.execute<(RowDataPacket & { product_id: number | null; quantity: number })[]>('SELECT product_id, quantity FROM order_items WHERE order_id=?', [orderId])
  for (const it of items) {
    if (!it.product_id) continue
    await conn.execute("UPDATE products SET stock_quantity=stock_quantity+?, status=IF(status IN ('Sold','Reserved'),'Available',status) WHERE id=?", [it.quantity, it.product_id])
  }
  await conn.execute('UPDATE orders SET stock_released=1 WHERE id=?', [orderId])
}

/** Paid deposit units stay reserved; once the order is fully paid they count as sold. */
async function markReservedAsSold(conn: PoolConnection, orderId: number) {
  await conn.execute(
    "UPDATE products p JOIN order_items i ON i.product_id=p.id SET p.status='Sold' WHERE i.order_id=? AND p.status='Reserved' AND p.stock_quantity=0",
    [orderId],
  )
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

const settledStatus = (o: OrderRow): OrderStatus => (o.payment_terms === 'deposit' ? 'deposit_paid' : 'paid')

async function onSessionCompleted(session: Stripe.Checkout.Session) {
  const pi = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id ?? null
  const method = await describePayment(pi)
  const paid = session.payment_status === 'paid'
  const result = await inTransaction(async conn => {
    const order = await lockOrder(conn, session)
    if (!order || order.status !== 'pending_payment') return null
    const isDeposit = order.payment_terms === 'deposit'
    await takeStock(conn, order.id, isDeposit)
    const tax = fromCents(session.total_details?.amount_tax)
    if (isDeposit) {
      // Order value and freight stay as ordered; tax so far is the deposit's tax
      await conn.execute(
        `UPDATE orders SET status=?, tax=?, total=subtotal+freight+?, amount_paid=?, stripe_payment_intent=?, payment_method=?,
           paid_at=${paid ? 'UTC_TIMESTAMP()' : 'NULL'} WHERE id=?`,
        [paid ? 'deposit_paid' : 'payment_processing', tax, tax, paid ? fromCents(session.amount_total) : 0, pi, method, order.id],
      )
    } else {
      await conn.execute(
        `UPDATE orders SET status=?, subtotal=?, freight=?, tax=?, total=?, amount_paid=?, stripe_payment_intent=?, payment_method=?,
           paid_at=${paid ? 'UTC_TIMESTAMP()' : 'NULL'} WHERE id=?`,
        [paid ? 'paid' : 'payment_processing', fromCents(session.amount_subtotal), fromCents(session.shipping_cost?.amount_subtotal),
          tax, fromCents(session.amount_total), paid ? fromCents(session.amount_total) : 0, pi, method, order.id],
      )
    }
    if (order.quote_id) await conn.execute("UPDATE quotes SET status='accepted', accepted_at=UTC_TIMESTAMP(), order_id=? WHERE id=?", [order.id, order.quote_id])
    await addEvent(conn, order.id, paid ? (isDeposit ? 'deposit_paid' : 'paid') : 'payment_processing', method)
    return { id: order.id, isDeposit }
  })
  if (result) await sendOrderEmails(result.id, !paid ? 'processing' : result.isDeposit ? 'deposit' : 'paid')
}

async function onAsyncPayment(session: Stripe.Checkout.Session, succeeded: boolean) {
  const result = await inTransaction(async conn => {
    const order = await lockOrder(conn, session)
    if (!order || order.status !== 'payment_processing') return null
    if (succeeded) {
      await conn.execute('UPDATE orders SET status=?, amount_paid=?, paid_at=UTC_TIMESTAMP() WHERE id=?', [settledStatus(order), fromCents(session.amount_total), order.id])
    } else {
      if (!order.stock_released) await returnStock(conn, order.id)
      await conn.execute("UPDATE orders SET status='payment_failed' WHERE id=?", [order.id])
    }
    await addEvent(conn, order.id, succeeded ? settledStatus(order) : 'payment_failed', succeeded ? 'Bank payment cleared' : 'Bank payment failed')
    return { id: order.id, isDeposit: order.payment_terms === 'deposit' }
  })
  if (result) await sendOrderEmails(result.id, !succeeded ? 'failed' : result.isDeposit ? 'deposit' : 'paid')
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

/** Records a paid invoice (from the webhook, or straight away when an admin marks it paid offline). */
export async function applyInvoicePaid(invoice: Stripe.Invoice, actor = 'stripe') {
  const orderId = Number(invoice.metadata?.order_id)
  if (!orderId) return
  const changed = await inTransaction(async conn => {
    const [rows] = await conn.execute<OrderRow[]>(`SELECT ${ORDER_ROW} FROM orders WHERE id=? AND stripe_invoice_id=? FOR UPDATE`, [orderId, invoice.id])
    const order = rows[0]
    if (!order || order.status === 'cancelled' || order.status === 'refunded') return false
    const [done] = await conn.execute<RowDataPacket[]>("SELECT 1 FROM order_events WHERE order_id=? AND event='invoice_paid' AND note LIKE ?", [orderId, `${invoice.id}%`])
    if (done.length) return false
    const invoiceTax = fromCents((invoice.total ?? 0) - (invoice.total_excluding_tax ?? invoice.total ?? 0))
    const tax = round2(Number(order.tax) + invoiceTax)
    const next = order.status === 'invoiced' ? 'paid' : order.status // net-terms orders may already have shipped
    await conn.execute(
      'UPDATE orders SET status=?, tax=?, total=subtotal+freight+?, amount_paid=amount_paid+?, paid_at=UTC_TIMESTAMP() WHERE id=?',
      [next, tax, tax, fromCents(invoice.amount_paid), order.id],
    )
    await markReservedAsSold(conn, order.id)
    await addEvent(conn, order.id, 'invoice_paid', `${invoice.id} · ${fromCents(invoice.amount_paid).toFixed(2)}`, actor)
    return true
  })
  if (changed) await sendOrderEmails(orderId, 'paid')
}

async function onInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const orderId = Number(invoice.metadata?.order_id)
  if (orderId) await addEvent(getDb(), orderId, 'invoice_payment_failed', `${invoice.id} · the buyer’s payment attempt failed`)
}

async function onChargeRefunded(charge: Stripe.Charge) {
  const pi = typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id
  if (!pi) return
  await inTransaction(async conn => {
    const [rows] = await conn.execute<OrderRow[]>(`SELECT ${ORDER_ROW} FROM orders WHERE stripe_payment_intent=? FOR UPDATE`, [pi])
    const order = rows[0]
    if (!order) return
    const refunded = fromCents(charge.amount_refunded)
    const full = refunded >= Number(order.amount_paid) && Number(order.amount_paid) > 0
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
    case 'invoice.paid': await applyInvoicePaid(event.data.object); break
    case 'invoice.payment_failed': await onInvoicePaymentFailed(event.data.object); break
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
  quote_id: number | null; payment_terms: PaymentTerms; deposit_amount: string; amount_paid: string
  stripe_invoice_id: string | null; invoice_url: string; invoice_due: Date | string | null
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
  customer_name: string; company: string; email: string; fulfilment: string; live_mode: number; created_at: Date; items: number; payment_terms: PaymentTerms
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
            o.live_mode, o.created_at, o.payment_terms, (SELECT COALESCE(SUM(quantity),0) FROM order_items i WHERE i.order_id=o.id) items
     FROM orders o ${where.length ? `WHERE ${where.join(' AND ')}` : ''} ORDER BY o.id DESC LIMIT 300`,
    values,
  )
  return rows
}

/** Constant-time check of a link token against the stored one. */
export const tokenMatches = (stored: string, given: string) => {
  const a = Buffer.from(stored), b = Buffer.from(given)
  return a.length === b.length && timingSafeEqual(a, b)
}

/** Public order lookup: the access token from the confirmation link is required. */
export async function loadOrderForCustomer(number: string, token: string) {
  if (!/^CE-\d{4}-\d{5,}$/.test(number) || !/^[A-Za-z0-9_-]{43}$/.test(token)) return null
  const found = await loadOrder({ number })
  return found && tokenMatches(found.order.access_token, token) ? found : null
}

// ── Admin actions ────────────────────────────────────────────────────────

const RESTOCKABLE: OrderStatus[] = ['paid', 'payment_processing', 'processing', 'ready_to_ship', 'deposit_paid', 'invoiced']

export async function updateOrder(orderId: number, admin: string, patch: { status?: string; trackingCarrier?: string; trackingNumber?: string; adminNotes?: string; note?: string }) {
  let emailKind: 'shipped' | 'cancelled' | null = null
  let voidInvoice: string | null = null
  await inTransaction(async conn => {
    const [rows] = await conn.execute<(OrderRow & { stripe_invoice_id: string | null })[]>(`SELECT ${ORDER_ROW}, stripe_invoice_id FROM orders WHERE id=? FOR UPDATE`, [orderId])
    const order = rows[0]
    if (!order) throw new ShopError('Order not found.')
    const sets: string[] = [], values: (string | number)[] = []
    if (patch.trackingCarrier !== undefined) { sets.push('tracking_carrier=?'); values.push(text(patch.trackingCarrier, 80)) }
    if (patch.trackingNumber !== undefined) { sets.push('tracking_number=?'); values.push(text(patch.trackingNumber, 120)) }
    if (patch.adminNotes !== undefined) { sets.push('admin_notes=?'); values.push(text(patch.adminNotes, 5000)) }
    const next = patch.status as OrderStatus | undefined
    if (next && next !== order.status) {
      const allowed: OrderStatus[] = ['processing', 'ready_to_ship', 'shipped', 'delivered', 'cancelled']
      const fromAllowed: OrderStatus[] = ['paid', 'processing', 'ready_to_ship', 'shipped', 'delivered', 'payment_processing', 'deposit_paid', 'invoiced']
      if (!allowed.includes(next) || !fromAllowed.includes(order.status)) throw new ShopError(`Can’t change an order from “${order.status}” to “${next}”.`)
      if (order.status === 'payment_processing' && next !== 'cancelled') throw new ShopError('Wait for the bank payment to clear before moving this order on.')
      sets.push('status=?'); values.push(next)
      if (next === 'shipped') { sets.push('shipped_at=UTC_TIMESTAMP()'); emailKind = 'shipped' }
      if (next === 'cancelled') {
        if (!order.stock_released && RESTOCKABLE.includes(order.status)) await returnStock(conn, order.id)
        if (order.status === 'invoiced' && order.stripe_invoice_id) voidInvoice = order.stripe_invoice_id
        emailKind = 'cancelled'
      }
      await addEvent(conn, order.id, `status:${next}`, patch.note ?? '', admin)
    } else if (patch.note) {
      await addEvent(conn, order.id, 'note', patch.note, admin)
    }
    if (sets.length) await conn.execute(`UPDATE orders SET ${sets.join(', ')} WHERE id=?`, [...values, order.id])
  })
  if (voidInvoice) {
    await stripe().invoices.voidInvoice(voidInvoice)
      .then(() => addEvent(getDb(), orderId, 'invoice_voided', voidInvoice!, admin))
      .catch(error => addEvent(getDb(), orderId, 'invoice_void_failed', `Void ${voidInvoice} in Stripe: ${error instanceof Error ? error.message : error}`.slice(0, 500), admin))
  }
  return { emailed: emailKind ? await sendOrderEmails(orderId, emailKind) : false }
}

/** An invoice paid by wire transfer or cheque: marks it paid in Stripe (out of band) and on the order. */
export async function markInvoicePaidOffline(orderId: number, admin: string, note: string) {
  const found = await loadOrder({ id: orderId })
  if (!found) throw new ShopError('Order not found.')
  if (!found.order.stripe_invoice_id || found.order.status !== 'invoiced') throw new ShopError('This order has no open invoice.')
  const invoice = await stripe().invoices.pay(found.order.stripe_invoice_id, { paid_out_of_band: true })
  await applyInvoicePaid(invoice, admin)
  if (note) await addEvent(getDb(), orderId, 'note', `Paid offline: ${note}`, admin)
}

/**
 * Refunds the order's checkout payment through Stripe (full remaining amount when amount is null).
 * Invoice payments (balances, net terms) are refunded from the invoice in the Stripe dashboard.
 */
export async function refundOrder(orderId: number, admin: string, amount: number | null, reason: string) {
  const found = await loadOrder({ id: orderId })
  if (!found) throw new ShopError('Order not found.')
  const { order } = found
  if (!order.stripe_payment_intent) throw new ShopError('This order was paid by invoice. Refund it from the invoice in the Stripe dashboard.')
  const pi = await stripe().paymentIntents.retrieve(order.stripe_payment_intent, { expand: ['latest_charge'] })
  const charge = pi.latest_charge && typeof pi.latest_charge === 'object' ? pi.latest_charge : null
  const remaining = fromCents((charge?.amount ?? pi.amount_received ?? 0) - (charge?.amount_refunded ?? 0))
  const value = amount === null ? remaining : round2(amount)
  if (!(value > 0) || value > remaining) throw new ShopError(`Refund must be between 0.01 and ${remaining.toFixed(2)} (the checkout payment still refundable).`)
  const refund = await stripe().refunds.create(
    { payment_intent: order.stripe_payment_intent, amount: toCents(value), metadata: { order_number: order.order_number, admin } },
    { idempotencyKey: `refund-${order.id}-${toCents(Number(order.amount_refunded))}-${toCents(value)}` },
  )
  const total = round2(Number(order.amount_refunded) + value)
  const full = total >= Number(order.amount_paid) && Number(order.amount_paid) > 0
  await getDb().execute(`UPDATE orders SET amount_refunded=?${full ? ", status='refunded'" : ''} WHERE id=?`, [total, order.id])
  await addEvent(getDb(), order.id, 'refund', `${value.toFixed(2)} ${order.currency}${reason ? ` · ${reason.slice(0, 200)}` : ''} (${refund.status})`, admin)
  return { emailed: await sendOrderEmails(order.id, 'refunded', value) }
}

export const isShopError = (e: unknown): e is ShopError => e instanceof ShopError
