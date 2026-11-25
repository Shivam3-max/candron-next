// Orders: cart checkout, quote orders, Stripe invoices (balances, net terms, freight),
// webhook handling and admin actions.
// Orders become "paid" only from a verified Stripe webhook (or an admin recording an offline payment),
// never from the browser redirect.
import { randomBytes, timingSafeEqual } from 'node:crypto'
import type Stripe from 'stripe'
import type { PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import { getDb } from '@/lib/db'
import { priceCart, type CartRequestItem, type PricedLine } from '@/lib/shop/catalog'
import { calculateFreight, FREIGHT_LATER, type FreightResult } from '@/lib/shop/freight'
import { toUsd, usdCadRate, usdFactor } from '@/lib/shop/fx'
import { formatPostal, isCountry, isPostalCode, isRegion } from '@/lib/shop/regions'
import { findYard, getShopSettings, overOnlineLimit, shopIsOpen, stripeLiveMode, type PickupYard, type ShopSettings } from '@/lib/shop/settings'
import { fromCents, stripe, toCents } from '@/lib/shop/stripe'
import { sendCheckoutReminder, sendOrderEmails } from '@/lib/shop/email'
import { isTaxExempt } from '@/lib/shop/customers'
import { isOrderNumber, orderNumberFor, type OrderStatus, type PaymentTerms } from '@/lib/shop/order-status'

export class ShopError extends Error {}

/** Minutes a buyer has on the Stripe page (Stripe's minimum is 30); stock holds outlive it slightly. */
const SESSION_MINUTES = 31
const HOLD_MINUTES = 35

const text = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max)
const round2 = (n: number) => Math.round(n * 100) / 100

export interface Address { line1: string; line2: string; city: string; region: string; postal: string; country: string }

export interface CheckoutInput {
  items: CartRequestItem[]
  name: string; company: string; email: string; phone: string; poNumber: string; notes: string
  /** delivery = CANDRON freight (quoted after the order); pickup = buyer collects or sends their own carrier */
  fulfilment: 'delivery' | 'pickup'
  yard: string
  /** Delivery address, or the buyer's billing address for pickups */
  address: Address
  acceptTerms: boolean
  /** Email me a link to finish if I leave the payment page (explicit opt-in) */
  reminder: boolean
  /** Signed-in buyers: keep this address in the account */
  saveAddress: boolean
}

export function validateAddress(address: Address, what = 'delivery') {
  const { line1, city, region, postal, country } = address
  if (!isCountry(country)) throw new ShopError('Please choose a country.')
  if (!line1 || !city) throw new ShopError(`Please enter the ${what} street address and city.`)
  if (!isRegion(country, region)) throw new ShopError('Please choose a province or state.')
  if (!isPostalCode(country, postal)) throw new ShopError(country === 'CA' ? 'Please enter a valid postal code (e.g. M5V 2T6).' : 'Please enter a valid ZIP code.')
  return { ...address, postal: formatPostal(country, postal) }
}

export function parseCheckoutInput(body: Record<string, unknown>): CheckoutInput {
  const a = (body.address && typeof body.address === 'object' ? body.address : {}) as Record<string, unknown>
  const input: CheckoutInput = {
    items: Array.isArray(body.items) ? (body.items as CartRequestItem[]) : [],
    name: text(body.name, 160), company: text(body.company, 160), email: text(body.email, 254).toLowerCase(),
    phone: text(body.phone, 40), poNumber: text(body.poNumber, 60), notes: text(body.notes, 2000),
    fulfilment: body.fulfilment === 'pickup' ? 'pickup' : 'delivery',
    yard: text(body.yard, 40),
    address: {
      line1: text(a.line1, 200), line2: text(a.line2, 200), city: text(a.city, 120),
      region: text(a.region, 4).toUpperCase(), postal: text(a.postal, 20), country: text(a.country, 2).toUpperCase(),
    },
    acceptTerms: body.acceptTerms === true,
    reminder: body.reminder === true,
    saveAddress: body.saveAddress === true,
  }
  if (!input.name) throw new ShopError('Please enter your name.')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) throw new ShopError('Please enter a valid email address.')
  if (!input.phone) throw new ShopError('Please enter a phone number so we can arrange delivery or pickup.')
  if (!input.acceptTerms) throw new ShopError('Please accept the terms of sale.')
  input.address = validateAddress(input.address, input.fulfilment === 'pickup' ? 'billing' : 'delivery')
  return input
}

/** Card (with Apple Pay / Google Pay / Link) and bank debit. Nothing above the online limit: accounting handles it. */
export function paymentMethodsFor(settings: ShopSettings, currency: string, amountCad: number) {
  const methods: Stripe.Checkout.SessionCreateParams.AllowedPaymentMethodType[] = []
  if (overOnlineLimit(settings, amountCad)) return methods
  methods.push('card', 'link')
  if (settings.bankDebit) methods.push(currency === 'CAD' ? 'acss_debit' : 'us_bank_account')
  return methods
}

/** Deposit (before tax) on an amount, rounded to the cent. */
export const depositOf = (amount: number, percent: number) => round2(amount * percent / 100)

/** Adds business days (Mon–Fri) to a date. */
export function addBusinessDays(from: Date, days: number) {
  const d = new Date(from)
  let left = days
  while (left > 0) {
    d.setUTCDate(d.getUTCDate() + 1)
    const wd = d.getUTCDay()
    if (wd !== 0 && wd !== 6) left -= 1
  }
  return d
}

// ── Pricing a checkout ───────────────────────────────────────────────────

type Priced = Awaited<ReturnType<typeof priceCart>>

/** The yard every item in the cart ships from, or null when they differ or have none. */
export function commonYard(settings: ShopSettings, lines: PricedLine[]): PickupYard | null {
  const ids = new Set(lines.map(l => l.yard))
  if (ids.size !== 1) return null
  return findYard(settings, [...ids][0])
}

interface CheckoutPlan {
  priced: Priced
  /** Lines and totals in the currency charged (USD for US buyers, else as listed) */
  currency: string
  lines: (PricedLine & { chargePrice: number; chargeTotal: number })[]
  subtotal: number
  freight: FreightResult | null
  /** Order value before tax in CAD (for the online limit) */
  amountCad: number
  offline: boolean
  yard: PickupYard | null
  fx: { cadPerUsd: number; date: string; factor: number } | null
  errors: string[]
}

/**
 * Prices a cart for an address: freight, pickup yard, currency (USD for US buyers when enabled)
 * and whether it's over the online limit. `address` may be partial (country/region/postal) for previews.
 */
async function planCheckout(
  settings: ShopSettings, priced: Priced, fulfilment: 'delivery' | 'pickup', yardId: string,
  address: { country: string; region: string; postal: string } | null,
): Promise<CheckoutPlan> {
  const errors = [...priced.errors]
  const ok = priced.lines.filter(l => !l.error)
  const yard = fulfilment === 'pickup' ? findYard(settings, yardId) : null
  if (fulfilment === 'pickup') {
    const shared = commonYard(settings, priced.lines)
    if (!shared) errors.push('Pickup is only available when every item is at the same yard. Choose CANDRON freight or order separately.')
    else if (!yard || yard.id !== shared.id) errors.push(`These items are collected from our ${shared.name} yard.`)
  }
  const freight = fulfilment === 'pickup' || address
    ? calculateFreight(settings, fulfilment, address ?? { country: '', region: '', postal: '' }, ok)
    : null

  // US buyers pay in USD: the day's Bank of Canada rate plus the margin
  let fx: CheckoutPlan['fx'] = null
  const wantsUsd = settings.usd.enabled && priced.currency === 'CAD' && address?.country === 'US'
  let rate: Awaited<ReturnType<typeof usdCadRate>> | null = null
  if (wantsUsd || priced.currency === 'USD') {
    try { rate = await usdCadRate() } catch { if (wantsUsd) errors.push('USD pricing is unavailable right now. Please try again shortly or request a quote.') }
  }
  if (wantsUsd && rate) fx = { cadPerUsd: rate.cadPerUsd, date: rate.date, factor: usdFactor(rate, settings.usd.marginPercent) }

  const lines = priced.lines.map(l => {
    const chargePrice = fx ? toUsd(l.unitPrice, fx.factor) : l.unitPrice
    return { ...l, chargePrice, chargeTotal: round2(chargePrice * l.quantity) }
  })
  const subtotal = round2(lines.reduce((s, l) => s + (l.error ? 0 : l.chargeTotal), 0))
  const freightCad = freight?.ok ? freight.amount : 0
  const listedValue = priced.subtotal + freightCad
  // USD-listed items: compare the limit in CAD at the bank rate
  const amountCad = priced.currency === 'USD' ? round2(listedValue * (rate?.cadPerUsd ?? 1)) : listedValue
  return {
    priced, currency: fx ? 'USD' : priced.currency, lines, subtotal,
    freight: freight?.ok && fx ? { ...freight, amount: toUsd(freight.amount, fx.factor) } : freight,
    amountCad, offline: overOnlineLimit(settings, amountCad), yard, fx, errors,
  }
}

/** Prices the cart and freight for the checkout page (no order is created). */
export async function quoteCheckout(items: CartRequestItem[], fulfilment: 'delivery' | 'pickup', yardId: string, address: { country: string; region: string; postal: string } | null) {
  const settings = await getShopSettings()
  const priced = await priceCart(items, { maxQuantity: settings.maxQuantity })
  const plan = await planCheckout(settings, priced, fulfilment, yardId, address)
  const shared = commonYard(settings, priced.lines)
  return {
    // available is capped at the online maximum so the cart's + button stops there
    lines: plan.lines.map(l => ({
      id: l.id, slug: l.slug, sku: l.sku, name: l.name, image: l.image, currency: plan.currency, quantity: l.quantity,
      available: Math.min(l.available, settings.maxQuantity), unitPrice: l.chargePrice, lineTotal: l.chargeTotal, error: l.error,
    })),
    currency: plan.currency, subtotal: plan.subtotal, errors: plan.errors,
    freight: plan.freight,
    offline: plan.offline,
    onlineLimit: settings.onlineLimit,
    holdDays: settings.offlineHoldDays,
    accountingEmail: settings.accountingEmail.split(',')[0]?.trim() || '',
    methods: plan.offline ? [] : paymentMethodsFor(settings, plan.currency, plan.amountCad),
    automaticTax: settings.automaticTax,
    pickup: shared ? { id: shared.id, name: shared.name, region: shared.region, country: shared.country, hours: settings.pickup.hours } : null,
    fx: plan.fx ? { cadPerUsd: plan.fx.cadPerUsd, date: plan.fx.date, margin: settings.usd.marginPercent } : null,
    maxQuantity: settings.maxQuantity,
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

// ── Building blocks shared by cart checkout and quotes ───────────────────

export interface OrderLine { productId: number | null; sku: string; name: string; slug: string; unitPrice: number; quantity: number }
export interface OrderDraft {
  currency: string
  lines: OrderLine[]
  freight: number
  freightNote: string
  contact: { name: string; company: string; email: string; phone: string; poNumber: string; notes: string }
  fulfilment: 'delivery' | 'pickup'
  /** Delivery address, or the buyer's billing address for pickups */
  ship: Address
  yard: string
  paymentTerms: PaymentTerms
  depositAmount: number
  quoteId: number | null
  /** Hold stock for the Stripe page; take it now (net terms); or hold until a date (offline payments) */
  hold: 'checkout' | 'none' | Date
  customerId?: number | null
  reminderOptIn?: boolean
  fxRate?: number | null
}

/** Inserts the order, its lines and stock holds inside the caller's transaction. */
export async function insertOrder(conn: PoolConnection, d: OrderDraft, actor: string) {
  const token = randomBytes(32).toString('base64url')
  const lines = d.lines.map(l => ({ ...l, lineTotal: round2(l.unitPrice * l.quantity) }))
  const subtotal = round2(lines.reduce((s, l) => s + l.lineTotal, 0))
  const offline = d.paymentTerms === 'offline'
  const holdUntil = d.hold instanceof Date ? d.hold : null
  const freightPending = d.fulfilment === 'delivery' && d.freightNote === FREIGHT_LATER
  const [res] = await conn.execute<ResultSetHeader>(
    `INSERT INTO orders (access_token, status, currency, subtotal, freight, freight_note, total, customer_name, company, email, phone, po_number,
       customer_notes, fulfilment, ship_line1, ship_line2, ship_city, ship_region, ship_postal, ship_country, live_mode,
       quote_id, payment_terms, deposit_amount, customer_id, reminder_opt_in, pickup_yard, fx_rate, hold_until, freight_status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, UTC_TIMESTAMP())`,
    [token, offline ? 'awaiting_offline' : 'pending_payment', d.currency, subtotal, d.freight, d.freightNote, round2(subtotal + d.freight),
      d.contact.name, d.contact.company, d.contact.email, d.contact.phone, d.contact.poNumber, d.contact.notes || null, d.fulfilment,
      d.ship.line1, d.ship.line2, d.ship.city, d.ship.region, d.ship.postal, d.ship.country, stripeLiveMode() ? 1 : 0,
      d.quoteId, d.paymentTerms, d.depositAmount, d.customerId ?? null, d.reminderOptIn ? 1 : 0, d.fulfilment === 'pickup' ? d.yard : '',
      d.fxRate ?? null, holdUntil, freightPending ? 'pending' : ''],
  )
  const orderId = res.insertId
  const orderNumber = orderNumberFor(orderId)
  await conn.execute('UPDATE orders SET order_number=? WHERE id=?', [orderNumber, orderId])
  for (const l of lines) {
    await conn.execute(
      'INSERT INTO order_items (order_id, product_id, sku, name, slug, unit_price, quantity, line_total) VALUES (?,?,?,?,?,?,?,?)',
      [orderId, l.productId, l.sku, l.name, l.slug, l.unitPrice, l.quantity, l.lineTotal],
    )
    if (d.hold !== 'none' && l.productId) {
      await conn.execute(
        holdUntil
          ? 'INSERT INTO stock_holds (order_id, product_id, quantity, expires_at) VALUES (?,?,?,?)'
          : `INSERT INTO stock_holds (order_id, product_id, quantity, expires_at) VALUES (?,?,?, DATE_ADD(UTC_TIMESTAMP(), INTERVAL ${HOLD_MINUTES} MINUTE))`,
        holdUntil ? [orderId, l.productId, l.quantity, holdUntil] : [orderId, l.productId, l.quantity],
      )
    }
  }
  const how = d.paymentTerms === 'pay_now' ? 'pay in full' : d.paymentTerms === 'offline' ? 'over the online limit, payment through accounting' : d.paymentTerms
  await addEvent(conn, orderId, 'created', `${d.quoteId ? 'Quote accepted' : offline ? 'Order submitted' : 'Checkout started'} (${how}, ${d.fulfilment}${d.fulfilment === 'pickup' && d.yard ? ` at ${d.yard}` : ''})`, actor)
  return { orderId, orderNumber, token, subtotal }
}

/**
 * Address Stripe Tax uses. Deliveries: the delivery address. Pickups at a Canadian yard: that yard.
 * Pickups at a US yard (Buffalo): the buyer's billing address, so Canadian buyers pay Canadian tax.
 */
function taxAddress(d: { fulfilment: string; ship: Address; yard: string }, settings: ShopSettings): Stripe.AddressParam {
  const yard = d.fulfilment === 'pickup' ? settings.pickup.yards.find(y => y.id === d.yard) : null
  if (yard && yard.country === 'CA') return { city: yard.name, state: yard.region, postal_code: yard.postal, country: yard.country }
  const a = d.ship
  return { line1: a.line1, line2: a.line2 || undefined, city: a.city, state: a.region, postal_code: a.postal, country: a.country }
}

/** Invoice details required on every invoice: tax registrations, PO, terms. */
function invoiceFields(settings: ShopSettings, poNumber: string) {
  const fields = [
    settings.invoice.gstHst && { name: 'GST/HST', value: settings.invoice.gstHst },
    settings.invoice.qst && { name: 'QST', value: settings.invoice.qst },
    settings.invoice.pst && { name: 'PST', value: settings.invoice.pst },
    poNumber && { name: 'PO number', value: poNumber },
  ].filter(Boolean) as { name: string; value: string }[]
  return fields.slice(0, 4).map(f => ({ name: f.name.slice(0, 40), value: f.value.slice(0, 140) }))
}

async function createStripeCustomer(d: { contact: OrderDraft['contact']; fulfilment: string; ship: Address; yard: string }, settings: ShopSettings, orderNumber: string) {
  const name = d.contact.company || d.contact.name
  const a = d.ship
  // Billing address = the buyer's; "shipping" = the address tax is based on (Stripe Tax uses it first)
  const billing: Stripe.AddressParam | undefined = a.line1
    ? { line1: a.line1, line2: a.line2 || undefined, city: a.city, state: a.region, postal_code: a.postal, country: a.country }
    : undefined
  // Buyers whose exemption certificate an admin approved are not charged sales tax by Stripe Tax
  const exempt = await isTaxExempt(d.contact.email).catch(() => false)
  return stripe().customers.create({
    email: d.contact.email, name, phone: d.contact.phone, address: billing ?? taxAddress(d, settings), tax_exempt: exempt ? 'exempt' : 'none',
    shipping: { name, phone: d.contact.phone, address: taxAddress(d, settings) },
    metadata: { order_number: orderNumber, contact_name: d.contact.name },
  })
}

const footerFor = (settings: ShopSettings, terms: string) =>
  [`Payment terms: ${terms}.`, settings.invoice.footer].filter(Boolean).join(' ').slice(0, 5000)

/** Opens Stripe Checkout for an order: the full order, or just the deposit. Returns the payment page URL. */
export async function openCheckout(args: {
  orderId: number; orderNumber: string; token: string; draft: OrderDraft; settings: ShopSettings; origin: string; cancelPath: string; amountCad: number
}) {
  const { orderId, orderNumber, token, draft, settings, origin } = args
  const s = stripe()
  const customer = await createStripeCustomer(draft, settings, orderNumber)
  const currency = draft.currency.toLowerCase()
  const isDeposit = draft.paymentTerms === 'deposit'
  const methods = paymentMethodsFor(settings, draft.currency, args.amountCad)
  if (!methods.length) throw new ShopError('This order is above our online payment limit. Our accounting team will arrange payment.')
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
  const freightLater = draft.freightNote === FREIGHT_LATER
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
    ...(!isDeposit && draft.freight > 0 && {
      shipping_options: [{
        shipping_rate_data: {
          type: 'fixed_amount', display_name: (draft.freightNote || 'Freight').slice(0, 100),
          fixed_amount: { amount: toCents(draft.freight), currency }, tax_behavior: 'exclusive', tax_code: 'txcd_92010001',
        },
      }],
    }),
    automatic_tax: { enabled: settings.automaticTax },
    // A PDF invoice for every order (company details, GST/HST number, terms), emailed with the receipt
    invoice_creation: {
      enabled: true,
      invoice_data: {
        description: `CANDRON order ${orderNumber}${draft.contact.poNumber ? ` · PO ${draft.contact.poNumber}` : ''}`,
        metadata: meta,
        custom_fields: invoiceFields(settings, draft.contact.poNumber),
        footer: footerFor(settings, isDeposit ? 'deposit due on receipt; balance invoiced separately' : 'due on receipt'),
      },
    },
    ...((isDeposit || freightLater || draft.fulfilment === 'pickup') && {
      custom_text: {
        submit: {
          message: isDeposit
            ? 'This is the deposit. The balance and freight are invoiced before the equipment ships.'
            : freightLater
              ? 'Freight (and offloading, if needed) is quoted after your order and invoiced before shipping.'
              : 'Pickup or your own carrier: we’ll contact you to book a time.',
        },
      },
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

/**
 * Cart checkout. Up to the online limit: Stripe Checkout (returns its URL).
 * Above it: the order is placed, stock is held for a few business days and accounting arranges payment
 * (returns the order page URL).
 */
export async function createCheckout(input: CheckoutInput, origin: string, customerId: number | null = null) {
  if (!(await shopIsOpen())) throw new ShopError('Online ordering is not available right now. Please request a quote.')
  const settings = await getShopSettings()
  const created = await inTransaction(async conn => {
    const priced = await priceCart(input.items, { conn, lock: true, maxQuantity: settings.maxQuantity })
    if (!priced.lines.length) throw new ShopError('Your cart is empty.')
    const blocked = priced.lines.find(l => l.error)
    if (blocked) throw new ShopError(`${blocked.name}: ${blocked.error}`)
    const plan = await planCheckout(settings, priced, input.fulfilment, input.yard, input.address)
    if (plan.errors.length) throw new ShopError(plan.errors[0])
    if (!plan.freight?.ok) throw new ShopError(plan.freight?.error ?? 'Please enter the delivery address.')
    const draft: OrderDraft = {
      currency: plan.currency,
      lines: plan.lines.map(l => ({ productId: l.id, sku: l.sku, name: l.name, slug: l.slug, unitPrice: l.chargePrice, quantity: l.quantity })),
      freight: plan.freight.amount,
      freightNote: plan.freight.billedLater ? FREIGHT_LATER : plan.freight.label,
      contact: { name: input.name, company: input.company, email: input.email, phone: input.phone, poNumber: input.poNumber, notes: input.notes },
      fulfilment: input.fulfilment,
      ship: input.address,
      yard: plan.yard?.id ?? '',
      paymentTerms: plan.offline ? 'offline' : 'pay_now',
      depositAmount: 0,
      quoteId: null,
      hold: plan.offline ? addBusinessDays(new Date(), settings.offlineHoldDays) : 'checkout',
      customerId,
      reminderOptIn: input.reminder && !plan.offline,
      fxRate: plan.fx?.factor ?? null,
    }
    const order = await insertOrder(conn, draft, input.email)
    if (plan.fx) await addEvent(conn, order.orderId, 'fx', `USD at Bank of Canada ${plan.fx.date} rate ${plan.fx.cadPerUsd} CAD/USD + ${settings.usd.marginPercent}%`)
    return { ...order, draft, offline: plan.offline, amountCad: plan.amountCad }
  })
  if (created.offline) {
    await sendOrderEmails(created.orderId, 'offline')
    return { url: `/order/${created.orderNumber}?t=${created.token}`, orderNumber: created.orderNumber, offline: true }
  }
  try {
    const url = await openCheckout({ ...created, settings, origin, cancelPath: `/cart?cancelled=${created.orderNumber}` })
    return { url, orderNumber: created.orderNumber, offline: false }
  } catch (error) {
    await abandonOrder(created.orderId, error)
    if (error instanceof ShopError) throw error
    throw new ShopError('We couldn’t open the payment page. Please try again, or call us to place the order.')
  }
}

// ── Stripe invoices (deposit balances, net terms, freight) ────────────────

type InvoiceOrderRow = RowDataPacket & {
  id: number; order_number: string; access_token: string; status: OrderStatus; currency: string; subtotal: string; freight: string; freight_note: string
  deposit_amount: string; payment_terms: PaymentTerms; customer_name: string; company: string; email: string; phone: string; po_number: string
  fulfilment: 'delivery' | 'pickup'; ship_line1: string; ship_line2: string; ship_city: string; ship_region: string; ship_postal: string; ship_country: string
  pickup_yard: string; fx_rate: string | null; freight_status: string
  stripe_customer_id: string | null; stripe_invoice_id: string | null; freight_invoice_id: string | null
}

const draftOf = (order: InvoiceOrderRow) => ({
  contact: { name: order.customer_name, company: order.company, email: order.email, phone: order.phone, poNumber: order.po_number, notes: '' },
  fulfilment: order.fulfilment,
  ship: { line1: order.ship_line1, line2: order.ship_line2, city: order.ship_city, region: order.ship_region, postal: order.ship_postal, country: order.ship_country },
  yard: order.pickup_yard,
})

/** CAD value of an amount in the order's currency (USD orders store the USD-per-CAD factor). */
const cadValue = (order: { currency: string; fx_rate: string | null }, amount: number) =>
  order.currency === 'USD' && order.fx_rate ? round2(amount / Number(order.fx_rate)) : amount

/** Creates, finalizes and emails a Stripe invoice with the given lines. */
async function sendStripeInvoice(order: InvoiceOrderRow, settings: ShopSettings, args: {
  kind: string; daysUntilDue: number; amountCad: number; lines: { description: string; amount: number; taxCode: string }[]; terms: string
}) {
  const methods = paymentMethodsFor(settings, order.currency, args.amountCad).filter(m => m !== 'link') as Stripe.InvoiceCreateParams.PaymentSettings.PaymentMethodType[]
  if (!methods.length) throw new ShopError('This amount is above the online payment limit. Arrange payment through accounting and record it with “Mark paid (offline)”.')
  const s = stripe()
  const customerId = order.stripe_customer_id || (await createStripeCustomer(draftOf(order), settings, order.order_number)).id
  const currency = order.currency.toLowerCase()
  const total = args.lines.reduce((sum, l) => sum + toCents(l.amount), 0)
  const invoice = await s.invoices.create({
    customer: customerId,
    collection_method: 'send_invoice',
    days_until_due: Math.max(1, Math.min(120, Math.round(args.daysUntilDue))),
    currency,
    automatic_tax: { enabled: settings.automaticTax },
    pending_invoice_items_behavior: 'exclude',
    description: `CANDRON order ${order.order_number}${order.po_number ? ` · PO ${order.po_number}` : ''}`,
    metadata: { order_id: String(order.id), order_number: order.order_number, kind: args.kind },
    custom_fields: invoiceFields(settings, order.po_number),
    footer: footerFor(settings, args.terms),
    payment_settings: {
      payment_method_types: methods,
      ...(methods.includes('acss_debit') && {
        payment_method_options: { acss_debit: { verification_method: 'automatic', mandate_options: { transaction_type: 'business' } } },
      }),
    },
  }, { idempotencyKey: `invoice-${order.id}-${args.kind}-${total}` })
  for (const l of args.lines) {
    if (l.amount <= 0) continue
    await s.invoiceItems.create({
      customer: customerId, invoice: invoice.id!, currency, amount: toCents(l.amount), description: l.description.slice(0, 500), tax_behavior: 'exclusive', tax_code: l.taxCode,
    })
  }
  const finalized = await s.invoices.finalizeInvoice(invoice.id!)
  await s.invoices.sendInvoice(finalized.id!).catch(error => console.warn('[shop] Stripe could not email the invoice', error instanceof Error ? error.message : error))
  return { finalized, customerId, due: finalized.due_date ? new Date(finalized.due_date * 1000).toISOString().slice(0, 10) : null }
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
  if (opts.freight !== undefined && opts.freight !== null) {
    if (!(opts.freight >= 0)) throw new ShopError('Freight must be zero or more.')
    order.freight = String(round2(opts.freight))
    if (order.freight_note === FREIGHT_LATER) order.freight_note = 'Freight'
  }
  const [items] = await getDb().execute<OrderItemRecord[]>('SELECT * FROM order_items WHERE order_id=? ORDER BY id', [orderId])
  const freight = Number(order.freight)
  const goods = Number(order.subtotal)
  const amount = kind === 'balance' ? round2(goods + freight - Number(order.deposit_amount)) : round2(goods + freight)
  if (!(amount > 0)) throw new ShopError('Nothing left to invoice.')
  const freightLabel = order.freight_note && order.freight_note !== FREIGHT_LATER ? order.freight_note : 'Freight'
  const lines = kind === 'net'
    ? [
        ...items.map(i => ({ description: `${i.name}${i.sku ? ` (${i.sku})` : ''} × ${i.quantity}`, amount: Number(i.line_total), taxCode: 'txcd_99999999' })),
        { description: freightLabel, amount: freight, taxCode: 'txcd_92010001' },
      ]
    : [
        { description: `Balance for order ${order.order_number}: ${items.map(i => `${i.quantity} × ${i.name}`).join('; ')}`, amount: round2(goods - Number(order.deposit_amount)), taxCode: 'txcd_99999999' },
        { description: freightLabel, amount: freight, taxCode: 'txcd_92010001' },
      ]
  const days = Math.max(1, Math.min(120, Math.round(opts.daysUntilDue)))
  const { finalized, customerId, due } = await sendStripeInvoice(order, settings, {
    kind, daysUntilDue: days, amountCad: cadValue(order, amount), lines, terms: `net ${days} days`,
  })
  await getDb().execute(
    "UPDATE orders SET status='invoiced', stripe_invoice_id=?, invoice_url=?, invoice_due=?, stripe_customer_id=?, freight=?, freight_note=?, total=subtotal+?+tax WHERE id=?",
    [finalized.id, finalized.hosted_invoice_url ?? '', due, customerId, freight, order.freight_note, freight, order.id],
  )
  await addEvent(getDb(), order.id, 'invoiced', `${kind === 'balance' ? 'Balance' : 'Net-terms'} invoice ${finalized.number ?? finalized.id} for ${amount.toFixed(2)} ${order.currency} before tax${due ? `, due ${due}` : ''}`, opts.actor)
  return { emailed: await sendOrderEmails(order.id, 'invoiced'), invoiceUrl: finalized.hosted_invoice_url ?? '' }
}

export interface FreightCharges { freight: number; offloading: number; brokerage: number }

export function parseFreightCharges(body: Record<string, unknown>): FreightCharges {
  const n = (v: unknown) => {
    const x = v === '' || v === null || v === undefined ? 0 : Number(v)
    if (!Number.isFinite(x) || x < 0 || x > 1e7) throw new ShopError('Freight amounts must be zero or more.')
    return round2(x)
  }
  const c = { freight: n(body.freight), offloading: n(body.offloading), brokerage: n(body.brokerage) }
  if (!(c.freight + c.offloading + c.brokerage > 0)) throw new ShopError('Enter the freight (and offloading or brokerage, if any).')
  return c
}

/**
 * CANDRON freight, billed after the order: a separate Stripe invoice for freight, offloading and
 * customs brokerage. Orders paid through accounting (over the online limit) record the charge only;
 * accounting invoices it and the team marks it paid.
 */
export async function sendFreightInvoice(orderId: number, charges: FreightCharges, opts: { daysUntilDue: number; actor: string }) {
  const settings = await getShopSettings()
  const [rows] = await getDb().execute<InvoiceOrderRow[]>('SELECT * FROM orders WHERE id=?', [orderId])
  const order = rows[0]
  if (!order) throw new ShopError('Order not found.')
  if (order.freight_status !== 'pending') throw new ShopError(order.freight_status ? `Freight is already ${order.freight_status}.` : 'This order has no freight to invoice.')
  if (['cancelled', 'refunded', 'expired', 'pending_payment', 'payment_failed'].includes(order.status)) throw new ShopError('This order isn’t active.')
  const total = round2(charges.freight + charges.offloading + charges.brokerage)
  const breakdown = [`freight ${charges.freight.toFixed(2)}`, charges.offloading && `offloading ${charges.offloading.toFixed(2)}`, charges.brokerage && `brokerage ${charges.brokerage.toFixed(2)}`].filter(Boolean).join(', ')
  if (order.payment_terms === 'offline' || overOnlineLimit(settings, cadValue(order, total))) {
    await getDb().execute("UPDATE orders SET freight_status='invoiced', freight=?, freight_note='Freight (invoiced by accounting)', total=subtotal+?+tax WHERE id=?", [total, total, order.id])
    await addEvent(getDb(), order.id, 'freight_recorded', `${breakdown} ${order.currency} before tax; accounting to invoice`, opts.actor)
    return { emailed: false, invoiceUrl: '', offline: true }
  }
  const { finalized, customerId } = await sendStripeInvoice(order, settings, {
    kind: 'freight', daysUntilDue: opts.daysUntilDue, amountCad: cadValue(order, total), terms: 'due on receipt; the order ships once freight is paid',
    lines: [
      { description: `Freight for order ${order.order_number}`, amount: charges.freight, taxCode: 'txcd_92010001' },
      { description: 'Offloading at site', amount: charges.offloading, taxCode: 'txcd_20030000' },
      { description: 'Customs brokerage', amount: charges.brokerage, taxCode: 'txcd_20030000' },
    ],
  })
  await getDb().execute(
    "UPDATE orders SET freight_status='invoiced', freight_invoice_id=?, freight_invoice_url=?, stripe_customer_id=COALESCE(stripe_customer_id, ?) WHERE id=?",
    [finalized.id, finalized.hosted_invoice_url ?? '', customerId, order.id],
  )
  await addEvent(getDb(), order.id, 'freight_invoiced', `Invoice ${finalized.number ?? finalized.id}: ${breakdown} ${order.currency} before tax`, opts.actor)
  return { emailed: await sendOrderEmails(order.id, 'freight'), invoiceUrl: finalized.hosted_invoice_url ?? '', offline: false }
}

// ── Webhook handling ─────────────────────────────────────────────────────

type OrderRow = RowDataPacket & { id: number; status: OrderStatus; stock_released: number; total: string; payment_terms: PaymentTerms; quote_id: number | null; subtotal: string; freight: string; tax: string; amount_paid: string; freight_status: string; freight_invoice_id: string | null }
const ORDER_ROW = 'id, status, stock_released, total, payment_terms, quote_id, subtotal, freight, tax, amount_paid, freight_status, freight_invoice_id'

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
  const invoiceId = typeof session.invoice === 'string' ? session.invoice : session.invoice?.id ?? null
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
    await addEvent(conn, order.id, paid ? (isDeposit ? 'deposit_paid' : 'paid') : 'payment_processing', `${method}${invoiceId ? ` · invoice ${invoiceId}` : ''}`)
    return { id: order.id, isDeposit }
  })
  if (result && invoiceId) await recordReceiptInvoice(result.id, invoiceId)
  if (result) await sendOrderEmails(result.id, !paid ? 'processing' : result.isDeposit ? 'deposit' : 'paid')
}

/** Keeps the link to the PDF invoice Stripe created for a checkout payment. */
async function recordReceiptInvoice(orderId: number, invoiceId: string) {
  try {
    const inv = await stripe().invoices.retrieve(invoiceId)
    if (inv.hosted_invoice_url) await getDb().execute("UPDATE orders SET invoice_url=? WHERE id=? AND invoice_url=''", [inv.hosted_invoice_url, orderId])
  } catch (error) {
    console.warn('[shop] could not read the checkout invoice', error instanceof Error ? error.message : error)
  }
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
  const remind = await inTransaction(async conn => {
    const order = await lockOrder(conn, session)
    if (!order || order.status !== 'pending_payment') return null
    await conn.execute('DELETE FROM stock_holds WHERE order_id=?', [order.id])
    await conn.execute("UPDATE orders SET status='expired' WHERE id=?", [order.id])
    await addEvent(conn, order.id, 'expired', 'Payment page expired; held stock released')
    // Only buyers who ticked "email me a link" get a reminder, and only once
    const [r] = await conn.execute<ResultSetHeader>('UPDATE orders SET reminder_sent=1 WHERE id=? AND reminder_opt_in=1 AND reminder_sent=0', [order.id])
    return r.affectedRows ? order.id : null
  })
  if (remind && (await sendCheckoutReminder(remind))) await addEvent(getDb(), remind, 'reminder_sent', 'Checkout reminder emailed (buyer opted in)')
}

/** Records a paid invoice (from the webhook, or straight away when an admin marks it paid offline). */
export async function applyInvoicePaid(invoice: Stripe.Invoice, actor = 'stripe') {
  const orderId = Number(invoice.metadata?.order_id)
  if (!orderId) return
  const isFreight = invoice.metadata?.kind === 'freight'
  const changed = await inTransaction(async conn => {
    const [rows] = await conn.execute<OrderRow[]>(`SELECT ${ORDER_ROW} FROM orders WHERE id=? AND ${isFreight ? 'freight_invoice_id' : 'stripe_invoice_id'}=? FOR UPDATE`, [orderId, invoice.id])
    const order = rows[0]
    if (!order || order.status === 'cancelled' || order.status === 'refunded') return false
    const [done] = await conn.execute<RowDataPacket[]>("SELECT 1 FROM order_events WHERE order_id=? AND event IN ('invoice_paid','freight_paid') AND note LIKE ?", [orderId, `${invoice.id}%`])
    if (done.length) return false
    const invoiceTax = fromCents((invoice.total ?? 0) - (invoice.total_excluding_tax ?? invoice.total ?? 0))
    const tax = round2(Number(order.tax) + invoiceTax)
    if (isFreight) {
      const freight = round2(Number(order.freight) + fromCents(invoice.total_excluding_tax ?? invoice.total ?? 0))
      await conn.execute(
        "UPDATE orders SET freight_status='paid', freight=?, freight_note='Freight and site services', tax=?, total=subtotal+?+?, amount_paid=amount_paid+? WHERE id=?",
        [freight, tax, freight, tax, fromCents(invoice.amount_paid), order.id],
      )
      await addEvent(conn, order.id, 'freight_paid', `${invoice.id} · ${fromCents(invoice.amount_paid).toFixed(2)}`, actor)
      return 'freight'
    }
    const next = order.status === 'invoiced' ? 'paid' : order.status // net-terms orders may already have shipped
    await conn.execute(
      'UPDATE orders SET status=?, tax=?, total=subtotal+freight+?, amount_paid=amount_paid+?, paid_at=UTC_TIMESTAMP() WHERE id=?',
      [next, tax, tax, fromCents(invoice.amount_paid), order.id],
    )
    await markReservedAsSold(conn, order.id)
    await addEvent(conn, order.id, 'invoice_paid', `${invoice.id} · ${fromCents(invoice.amount_paid).toFixed(2)}`, actor)
    return 'order'
  })
  if (changed) await sendOrderEmails(orderId, changed === 'freight' ? 'freight_paid' : 'paid')
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
  pickup_yard: string; fx_rate: string | null; hold_until: Date | null
  freight_status: '' | 'pending' | 'invoiced' | 'paid'; freight_invoice_id: string | null; freight_invoice_url: string
  balance_reminders: number; forfeit_flagged_at: Date | null
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
  freight_status: string; forfeit_flagged_at: Date | null
}

/** Admin order list. Abandoned checkouts (awaiting payment / expired) are hidden unless asked for. */
export async function listOrders(opts: { status?: string; q?: string; includeAbandoned?: boolean } = {}) {
  const where: string[] = [], values: string[] = []
  if (opts.status === 'needs_freight') where.push("o.freight_status='pending' AND o.status NOT IN ('cancelled','refunded','expired','pending_payment','payment_failed')")
  else if (opts.status === 'forfeit') where.push("o.forfeit_flagged_at IS NOT NULL AND o.status IN ('deposit_paid','invoiced')")
  else if (opts.status) { where.push('o.status=?'); values.push(opts.status) }
  else if (!opts.includeAbandoned) where.push("o.status NOT IN ('pending_payment','expired')")
  if (opts.q) {
    where.push('(o.order_number LIKE ? OR o.email LIKE ? OR o.customer_name LIKE ? OR o.company LIKE ? OR o.po_number LIKE ?)')
    const like = `%${opts.q.replace(/[%_\\]/g, '')}%`
    values.push(like, like, like, like, like)
  }
  const [rows] = await getDb().query<OrderListRow[]>(
    `SELECT o.id, o.order_number, o.status, o.currency, o.total, o.amount_refunded, o.customer_name, o.company, o.email, o.fulfilment,
            o.live_mode, o.created_at, o.payment_terms, o.freight_status, o.forfeit_flagged_at,
            (SELECT COALESCE(SUM(quantity),0) FROM order_items i WHERE i.order_id=o.id) items
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
  if (!isOrderNumber(number) || !/^[A-Za-z0-9_-]{43}$/.test(token)) return null
  const found = await loadOrder({ number })
  return found && tokenMatches(found.order.access_token, token) ? found : null
}

// ── Admin actions ────────────────────────────────────────────────────────

const RESTOCKABLE: OrderStatus[] = ['paid', 'payment_processing', 'processing', 'ready_to_ship', 'deposit_paid', 'invoiced']

export async function updateOrder(orderId: number, admin: string, patch: { status?: string; trackingCarrier?: string; trackingNumber?: string; adminNotes?: string; note?: string }) {
  let emailKind: 'shipped' | 'cancelled' | null = null
  const voids: string[] = []
  await inTransaction(async conn => {
    const [rows] = await conn.execute<(OrderRow & { stripe_invoice_id: string | null; fulfilment: string })[]>(`SELECT ${ORDER_ROW}, stripe_invoice_id, fulfilment FROM orders WHERE id=? FOR UPDATE`, [orderId])
    const order = rows[0]
    if (!order) throw new ShopError('Order not found.')
    const sets: string[] = [], values: (string | number)[] = []
    if (patch.trackingCarrier !== undefined) { sets.push('tracking_carrier=?'); values.push(text(patch.trackingCarrier, 80)) }
    if (patch.trackingNumber !== undefined) { sets.push('tracking_number=?'); values.push(text(patch.trackingNumber, 120)) }
    if (patch.adminNotes !== undefined) { sets.push('admin_notes=?'); values.push(text(patch.adminNotes, 5000)) }
    const next = patch.status as OrderStatus | undefined
    if (next && next !== order.status) {
      const allowed: OrderStatus[] = ['processing', 'ready_to_ship', 'shipped', 'delivered', 'cancelled']
      const fromAllowed: OrderStatus[] = ['paid', 'processing', 'ready_to_ship', 'shipped', 'delivered', 'payment_processing', 'deposit_paid', 'invoiced', 'awaiting_offline']
      if (!allowed.includes(next) || !fromAllowed.includes(order.status)) throw new ShopError(`Can’t change an order from “${order.status}” to “${next}”.`)
      if (order.status === 'payment_processing' && next !== 'cancelled') throw new ShopError('Wait for the bank payment to clear before moving this order on.')
      if (order.status === 'awaiting_offline' && next !== 'cancelled') throw new ShopError('Record the payment first (Mark paid), then move the order on.')
      if (next === 'shipped' && order.fulfilment === 'delivery' && ['pending', 'invoiced'].includes(order.freight_status)) {
        throw new ShopError(order.freight_status === 'pending' ? 'Send the freight invoice first; the order ships once freight is paid.' : 'The freight invoice isn’t paid yet. The order ships once freight is paid.')
      }
      sets.push('status=?'); values.push(next)
      if (next === 'shipped') { sets.push('shipped_at=UTC_TIMESTAMP()'); emailKind = 'shipped' }
      if (next === 'cancelled') {
        if (!order.stock_released && RESTOCKABLE.includes(order.status)) await returnStock(conn, order.id)
        await conn.execute('DELETE FROM stock_holds WHERE order_id=?', [order.id])
        if (order.status === 'invoiced' && order.stripe_invoice_id) voids.push(order.stripe_invoice_id)
        if (order.freight_status === 'invoiced' && order.freight_invoice_id) voids.push(order.freight_invoice_id)
        emailKind = 'cancelled'
      }
      await addEvent(conn, order.id, `status:${next}`, patch.note ?? '', admin)
    } else if (patch.note) {
      await addEvent(conn, order.id, 'note', patch.note, admin)
    }
    if (sets.length) await conn.execute(`UPDATE orders SET ${sets.join(', ')} WHERE id=?`, [...values, order.id])
  })
  for (const id of voids) {
    await stripe().invoices.voidInvoice(id)
      .then(() => addEvent(getDb(), orderId, 'invoice_voided', id, admin))
      .catch(error => addEvent(getDb(), orderId, 'invoice_void_failed', `Void ${id} in Stripe: ${error instanceof Error ? error.message : error}`.slice(0, 500), admin))
  }
  return { emailed: emailKind ? await sendOrderEmails(orderId, emailKind) : false }
}

/** An invoice paid by wire transfer or cheque: marks it paid in Stripe (out of band) and on the order. */
export async function markInvoicePaidOffline(orderId: number, admin: string, note: string, which: 'order' | 'freight' = 'order') {
  const found = await loadOrder({ id: orderId })
  if (!found) throw new ShopError('Order not found.')
  const o = found.order
  if (which === 'freight') {
    if (o.freight_status !== 'invoiced') throw new ShopError('There’s no open freight invoice.')
    if (!o.freight_invoice_id) {
      // Recorded for accounting to invoice (offline orders): just mark it paid
      await getDb().execute("UPDATE orders SET freight_status='paid' WHERE id=?", [orderId])
      await addEvent(getDb(), orderId, 'freight_paid', `Paid offline${note ? `: ${note}` : ''}`, admin)
      return
    }
    await applyInvoicePaid(await stripe().invoices.pay(o.freight_invoice_id, { paid_out_of_band: true }), admin)
  } else {
    if (!o.stripe_invoice_id || o.status !== 'invoiced') throw new ShopError('This order has no open invoice.')
    await applyInvoicePaid(await stripe().invoices.pay(o.stripe_invoice_id, { paid_out_of_band: true }), admin)
  }
  if (note) await addEvent(getDb(), orderId, 'note', `Paid offline: ${note}`, admin)
}

/**
 * Orders over the online limit: accounting received the money (EFT, bank draft or cheque).
 * Converts the hold into a sale. `amount` is what was received, including tax.
 */
export async function recordOfflinePayment(orderId: number, admin: string, amount: number, reference: string) {
  if (!(amount > 0)) throw new ShopError('Enter the amount received (including tax).')
  await inTransaction(async conn => {
    const [rows] = await conn.execute<(OrderRow & { hold_until: Date | null })[]>(`SELECT ${ORDER_ROW}, hold_until FROM orders WHERE id=? FOR UPDATE`, [orderId])
    const order = rows[0]
    if (!order) throw new ShopError('Order not found.')
    if (order.status !== 'awaiting_offline') throw new ShopError('This order isn’t waiting for an offline payment.')
    await assertStillHeld(conn, orderId)
    await takeStock(conn, orderId)
    // Freight billed separately (CANDRON freight) is paid on its own invoice, so it isn't part of this payment
    const freightIncluded = !order.freight_status
    const beforeTax = round2(Number(order.subtotal) + (freightIncluded ? Number(order.freight) : 0))
    const tax = Math.max(0, round2(amount - beforeTax))
    await conn.execute(
      "UPDATE orders SET status='paid', tax=?, total=subtotal+freight+?, amount_paid=?, payment_method=?, paid_at=UTC_TIMESTAMP(), hold_until=NULL WHERE id=?",
      [tax, tax, round2(amount), text(reference ? `Offline · ${reference}` : 'Offline (EFT / draft / cheque)', 40), orderId],
    )
    await addEvent(conn, orderId, 'paid', `Offline payment ${amount.toFixed(2)}${reference ? ` · ${reference}` : ''}`, admin)
  })
  return { emailed: await sendOrderEmails(orderId, 'paid') }
}

/** Fails if another order took this order's units after its hold expired. */
async function assertStillHeld(conn: PoolConnection, orderId: number) {
  const [items] = await conn.execute<(RowDataPacket & { product_id: number; quantity: number; name: string })[]>(
    'SELECT product_id, quantity, name FROM order_items WHERE order_id=? AND product_id IS NOT NULL', [orderId],
  )
  for (const it of items) {
    await conn.execute('SELECT id FROM products WHERE id=? FOR UPDATE', [it.product_id])
    // Units on hand minus everyone else's live holds
    const [r] = await conn.execute<(RowDataPacket & { free: number })[]>(
      `SELECT p.stock_quantity - (SELECT COALESCE(SUM(h.quantity),0) FROM stock_holds h WHERE h.product_id=p.id AND h.expires_at > UTC_TIMESTAMP() AND h.order_id<>?) free
       FROM products p WHERE p.id=?`, [orderId, it.product_id],
    )
    if (!r[0] || Number(r[0].free) < it.quantity) throw new ShopError(`${it.name} is no longer available in that quantity (the hold expired and it was sold). Contact the buyer.`)
  }
}

/** Keeps the stock held longer for an order waiting on an offline payment. */
export async function extendHold(orderId: number, admin: string, businessDays: number) {
  const days = Math.max(1, Math.min(30, Math.round(businessDays)))
  return inTransaction(async conn => {
    const [rows] = await conn.execute<(OrderRow & { hold_until: Date | null })[]>(`SELECT ${ORDER_ROW}, hold_until FROM orders WHERE id=? FOR UPDATE`, [orderId])
    if (rows[0]?.status !== 'awaiting_offline') throw new ShopError('Only orders waiting on an offline payment have a hold.')
    // Extends from the current hold date (or from today if it already lapsed), never shortens it
    const current = rows[0].hold_until ? new Date(rows[0].hold_until) : null
    const until = addBusinessDays(current && current > new Date() ? current : new Date(), days)
    await assertStillHeld(conn, orderId)
    await conn.execute('DELETE FROM stock_holds WHERE order_id=?', [orderId])
    await conn.execute('INSERT INTO stock_holds (order_id, product_id, quantity, expires_at) SELECT order_id, product_id, quantity, ? FROM order_items WHERE order_id=? AND product_id IS NOT NULL', [until, orderId])
    await conn.execute('UPDATE orders SET hold_until=? WHERE id=?', [until, orderId])
    await addEvent(conn, orderId, 'hold_extended', `Stock held until ${until.toISOString().slice(0, 10)}`, admin)
    return until
  })
}

/** Deposit orders flagged at the forfeit day: the team confirms, the deposit is kept and the stock released. */
export async function forfeitDeposit(orderId: number, admin: string, note: string) {
  const voids: string[] = []
  await inTransaction(async conn => {
    const [rows] = await conn.execute<(OrderRow & { stripe_invoice_id: string | null; forfeit_flagged_at: Date | null })[]>(`SELECT ${ORDER_ROW}, stripe_invoice_id, forfeit_flagged_at FROM orders WHERE id=? FOR UPDATE`, [orderId])
    const order = rows[0]
    if (!order) throw new ShopError('Order not found.')
    if (order.payment_terms !== 'deposit' || !['deposit_paid', 'invoiced'].includes(order.status)) throw new ShopError('Only unpaid deposit orders can be forfeited.')
    if (!order.forfeit_flagged_at) throw new ShopError('This deposit hasn’t reached the forfeit date.')
    if (!order.stock_released) await returnStock(conn, order.id)
    if (order.status === 'invoiced' && order.stripe_invoice_id) voids.push(order.stripe_invoice_id)
    await conn.execute("UPDATE orders SET status='cancelled' WHERE id=?", [orderId])
    await addEvent(conn, orderId, 'deposit_forfeited', note || 'Balance unpaid; deposit kept and stock released (team confirmed)', admin)
  })
  for (const id of voids) await stripe().invoices.voidInvoice(id).catch(() => addEvent(getDb(), orderId, 'invoice_void_failed', `Void ${id} in Stripe`, admin))
  return { emailed: await sendOrderEmails(orderId, 'forfeited') }
}

/**
 * Refunds the order's checkout payment through Stripe (full remaining amount when amount is null).
 * Invoice payments (balances, net terms, freight) are refunded from the invoice in the Stripe dashboard.
 */
export async function refundOrder(orderId: number, admin: string, amount: number | null, reason: string) {
  const found = await loadOrder({ id: orderId })
  if (!found) throw new ShopError('Order not found.')
  const { order } = found
  if (!order.stripe_payment_intent) throw new ShopError('This order was paid by invoice or offline. Refund it from the invoice in the Stripe dashboard, or through accounting.')
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

// ── Daily tasks (deposit balance reminders, forfeit flags) ───────────────

/**
 * Runs at most once a day: from /api/cron/daily (Hostinger cron or any scheduler) and, as a fallback,
 * whenever an admin opens Orders. Sends deposit-balance reminders on the configured days and flags
 * orders at the forfeit day for the team to confirm.
 */
export async function runDailyTasks(force = false) {
  const today = new Date().toISOString().slice(0, 10)
  if (!force) {
    // Claim today's run: first ever (insert) or first today (update where the date differs). Either is atomic.
    const [ins] = await getDb().execute<ResultSetHeader>("INSERT IGNORE INTO shop_settings (setting_key, value_json) VALUES ('daily_run', JSON_OBJECT('date', ?))", [today])
    if (!ins.affectedRows) {
      const [upd] = await getDb().execute<ResultSetHeader>(
        "UPDATE shop_settings SET value_json=JSON_OBJECT('date', ?) WHERE setting_key='daily_run' AND JSON_UNQUOTE(JSON_EXTRACT(value_json,'$.date')) <> ?",
        [today, today],
      )
      if (!upd.affectedRows) return { skipped: true, reminders: 0, flagged: 0 }
    }
  }
  const settings = await getShopSettings()
  const { reminderDays, forfeitDays } = settings.deposit
  const [orders] = await getDb().execute<(RowDataPacket & { id: number; days: number; balance_reminders: number; forfeit_flagged_at: Date | null })[]>(
    `SELECT id, DATEDIFF(UTC_TIMESTAMP(), paid_at) days, balance_reminders, forfeit_flagged_at FROM orders
     WHERE payment_terms='deposit' AND status IN ('deposit_paid','invoiced') AND paid_at IS NOT NULL`,
  )
  let reminders = 0, flagged = 0
  for (const o of orders) {
    if (o.days >= forfeitDays && !o.forfeit_flagged_at) {
      await getDb().execute('UPDATE orders SET forfeit_flagged_at=UTC_TIMESTAMP() WHERE id=? AND forfeit_flagged_at IS NULL', [o.id])
      await addEvent(getDb(), o.id, 'forfeit_due', `Balance unpaid ${o.days} days after the deposit. Confirm the forfeit in admin.`)
      await sendOrderEmails(o.id, 'forfeit_due')
      flagged += 1
      continue
    }
    // Flagged orders are with the team now; no more reminders
    if (o.forfeit_flagged_at) continue
    const due = reminderDays.filter(d => o.days >= d).length
    if (due > o.balance_reminders) {
      const [u] = await getDb().execute<ResultSetHeader>('UPDATE orders SET balance_reminders=? WHERE id=? AND balance_reminders=?', [due, o.id, o.balance_reminders])
      if (!u.affectedRows) continue
      const sent = await sendOrderEmails(o.id, 'balance_reminder')
      await addEvent(getDb(), o.id, 'balance_reminder', `Reminder ${due} of ${reminderDays.length}${sent ? ' emailed' : ' (email not sent)'}`)
      reminders += 1
    }
  }
  return { skipped: false, reminders, flagged }
}

export const isShopError = (e: unknown): e is ShopError => e instanceof ShopError
