// Display helpers shared by the inventory list, product page and cards (client-safe).

export interface PriceFields {
  price_min: number | null
  price_max: number | null
  show_price: boolean
  currency: string
}

export const money = (value: number, currency: string) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value)

export function priceLabel(p: PriceFields): { kicker: string; value: string; note: string } {
  if (!p.show_price || p.price_min === null) {
    return { kicker: 'Price', value: 'Request a quote', note: 'Same-day pricing from our team' }
  }
  const ranged = p.price_max !== null && p.price_max !== p.price_min
  return {
    kicker: ranged ? 'Starting at' : 'Price',
    value: money(p.price_min, p.currency),
    note: ranged ? `Up to ${money(p.price_max as number, p.currency)} · ${p.currency}` : `${p.currency} · taxes and freight extra`,
  }
}

export const ratingText = (kva: number | null, unit: string) =>
  kva === null ? '' : `${Number(kva).toLocaleString('en-CA', { maximumFractionDigits: 2 })} ${unit || 'kVA'}`

export function voltageText(primary: string, secondary: string) {
  if (primary && secondary) return `${primary} → ${secondary} V`
  return primary ? `${primary} V primary` : secondary ? `${secondary} V secondary` : ''
}

export function availability(p: { status: string; stock_quantity: number; location: string }) {
  if (p.status === 'Sold') return { tone: 'sold', text: 'Sold' }
  if (p.status === 'Reserved') return { tone: 'reserved', text: 'Reserved' }
  if (p.status === 'Incoming') return { tone: 'incoming', text: 'Incoming stock' }
  if (p.stock_quantity > 0) return { tone: 'stock', text: `In stock${p.stock_quantity > 1 ? ` · ${p.stock_quantity} units` : ''}` }
  return { tone: 'order', text: 'Built to order' }
}

export const paragraphs = (value: string) =>
  value.replace(/\r/g, '').split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)
