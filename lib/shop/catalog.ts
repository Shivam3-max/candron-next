// Server-side pricing and availability for online orders. The browser's cart only holds
// product ids and quantities; every price, total and stock figure is recomputed here.
import type { PoolConnection, RowDataPacket } from 'mysql2/promise'
import { ACTIVE_HOLDS, getDb } from '@/lib/db'
import { lineWeightLb } from '@/lib/shop/freight'

export interface CartRequestItem { id: number; quantity: number }

type Row = RowDataPacket & {
  id: number; slug: string; sku: string; name: string; status: string; is_active: number; purchase_mode: string; custom_build: number
  show_price: number; price_min: string | null; price_max: string | null; currency: string; stock_quantity: number
  weight: string | null; weight_unit: string; held: string | null; image_id: number | null; lead_time: string
  pickup_yard: string; condition_name: string
}

export interface PricedLine {
  id: number; slug: string; sku: string; name: string; image: string | null; currency: string; leadTime: string
  unitPrice: number; quantity: number; available: number; lineTotal: number; weightLb: number | null
  /** Pickup yard id ('' = not set, so pickup isn't offered for this item) */
  yard: string
  condition: string
  error: string | null
}

const toNum = (v: string | null) => (v === null ? null : Number(v))

/**
 * Why a product can't be bought online right now, or null if it can. Only "Buy online" listings
 * qualify; medium/high voltage, custom builds and everything else go through the sales team.
 */
export function purchaseBlock(p: { is_active: number | boolean; status: string; purchase_mode: string; custom_build?: number | boolean; show_price: number | boolean; price_min: number | null; price_max: number | null }, available: number) {
  if (!p.is_active || p.purchase_mode !== 'buy' || p.custom_build) return 'This item is quote-only.'
  if (!p.show_price || p.price_min === null || (p.price_max !== null && p.price_max !== p.price_min)) return 'Price on request.'
  if (p.status === 'Sold' || p.status === 'Reserved') return `This item is ${p.status.toLowerCase()}.`
  if (available <= 0) return 'Out of stock.'
  return null
}

export const volumeMessage = (max: number) => `Online orders are limited to ${max} per item. For ${max + 1} or more, please request a quote for volume pricing.`

/** Prices the cart. Pass a transaction connection + lock=true when creating an order. */
export async function priceCart(items: CartRequestItem[], opts: { conn?: PoolConnection; lock?: boolean; maxQuantity?: number } = {}) {
  const wanted = new Map<number, number>()
  for (const it of items.slice(0, 50)) {
    const id = Math.floor(Number(it.id)), qty = Math.floor(Number(it.quantity))
    if (id > 0 && qty > 0) wanted.set(id, Math.min((wanted.get(id) ?? 0) + qty, 999))
  }
  if (!wanted.size) return { lines: [] as PricedLine[], currency: 'CAD', subtotal: 0, errors: [] as string[] }
  const ids = [...wanted.keys()]
  const db = opts.conn ?? getDb()
  // Lock the product rows first so two checkouts can't both take the last unit
  if (opts.lock) await db.query(`SELECT id FROM products WHERE id IN (${ids.map(() => '?').join(',')}) FOR UPDATE`, ids)
  const [rows] = await db.query<Row[]>(
    `SELECT p.id, p.slug, p.sku, p.name, p.status, p.is_active, p.purchase_mode, p.custom_build, p.show_price, p.price_min, p.price_max, p.currency,
            p.stock_quantity, p.weight, p.weight_unit, p.lead_time, p.pickup_yard, p.condition_name, ${ACTIVE_HOLDS} held,
            (SELECT pi.id FROM product_images pi WHERE pi.product_id=p.id AND pi.image_data IS NOT NULL ORDER BY pi.sort_order,pi.id LIMIT 1) image_id
     FROM products p WHERE p.id IN (${ids.map(() => '?').join(',')})`,
    ids,
  )
  const lines: PricedLine[] = []
  const errors: string[] = []
  for (const id of ids) {
    const r = rows.find(x => x.id === id)
    if (!r) { errors.push('An item in your cart is no longer available and was removed.'); continue }
    const available = Math.max(0, r.stock_quantity - Number(r.held ?? 0))
    const price = toNum(r.price_min)
    const block = purchaseBlock({ ...r, price_min: price, price_max: toNum(r.price_max) }, available)
    const quantity = wanted.get(id)!
    const error = block
      ?? (opts.maxQuantity && quantity > opts.maxQuantity ? volumeMessage(opts.maxQuantity) : null)
      ?? (quantity > available ? `Only ${available} available.` : null)
    lines.push({
      id, slug: r.slug, sku: r.sku, name: r.name, image: r.image_id ? `/api/media/${r.image_id}` : null, currency: r.currency,
      leadTime: r.lead_time, unitPrice: price ?? 0, quantity, available, lineTotal: Math.round((price ?? 0) * quantity * 100) / 100,
      weightLb: lineWeightLb(toNum(r.weight), r.weight_unit, quantity), yard: r.pickup_yard ?? '', condition: r.condition_name, error,
    })
  }
  const currencies = new Set(lines.map(l => l.currency))
  if (currencies.size > 1) errors.push('Items priced in CAD and USD must be ordered separately.')
  const subtotal = Math.round(lines.reduce((s, l) => s + (l.error ? 0 : l.lineTotal), 0) * 100) / 100
  return { lines, currency: lines[0]?.currency ?? 'CAD', subtotal, errors }
}

/** Units a buyer can add right now (stock minus active holds). */
export async function availableQuantity(productId: number) {
  const [rows] = await getDb().execute<(RowDataPacket & { available: number })[]>(
    `SELECT GREATEST(p.stock_quantity - ${ACTIVE_HOLDS}, 0) available FROM products p WHERE p.id=?`, [productId],
  )
  return Number(rows[0]?.available ?? 0)
}
