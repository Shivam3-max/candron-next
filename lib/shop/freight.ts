// Freight for "Buy online" orders, computed on the server from the shop settings.
import type { ShopSettings } from '@/lib/shop/settings'

export interface FreightLine { weightLb: number | null; lineTotal: number }
export type FreightResult =
  | { ok: true; amount: number; label: string; billedLater: boolean }
  | { ok: false; error: string }

const toLb = (weight: number | null, unit: string) => (weight === null ? null : unit === 'kg' ? weight * 2.20462 : weight)
export const lineWeightLb = (weight: number | null, unit: string, quantity: number) => {
  const w = toLb(weight, unit)
  return w === null ? null : w * quantity
}

/** Zone whose most specific rule matches the address ("CA-ON:M5V" beats "CA-ON" beats "CA"). */
export function matchZone(settings: ShopSettings, country: string, region: string, postal: string) {
  const pc = postal.toUpperCase().replace(/\s+/g, '')
  let best: { zone: ShopSettings['freight']['zones'][number]; score: number } | null = null
  for (const zone of settings.freight.zones) {
    for (const rule of zone.match) {
      const [area, prefix] = rule.split(':')
      const [c, r] = area.split('-')
      if (c !== country || (r && r !== region) || (prefix && !pc.startsWith(prefix))) continue
      const score = (r ? 10 : 0) + (prefix ? prefix.length : 0)
      if (!best || score > best.score) best = { zone, score }
    }
  }
  return best?.zone ?? null
}

export function calculateFreight(
  settings: ShopSettings,
  fulfilment: 'delivery' | 'pickup',
  address: { country: string; region: string; postal: string },
  lines: FreightLine[],
): FreightResult {
  if (fulfilment === 'pickup') {
    return settings.pickup.enabled ? { ok: true, amount: 0, label: settings.pickup.label || 'Pick up', billedLater: false } : { ok: false, error: 'Pickup is not available.' }
  }
  if (!settings.shipCountries.includes(address.country as ShopSettings['shipCountries'][number])) {
    return { ok: false, error: 'We can’t ship online orders to that country yet. Please request a quote.' }
  }
  const { mode, percent, minimum } = settings.freight
  if (mode === 'quote') {
    return { ok: true, amount: 0, label: 'Freight quoted separately', billedLater: true }
  }
  if (mode === 'percent') {
    const goods = lines.reduce((s, l) => s + l.lineTotal, 0)
    return { ok: true, amount: Math.max(minimum, Math.round(goods * percent) / 100), label: 'Freight', billedLater: false }
  }
  if (lines.some(l => l.weightLb === null)) {
    return { ok: false, error: 'Freight for one of these items needs a quote (no shipping weight on file). Choose pickup or request a quote.' }
  }
  const zone = matchZone(settings, address.country, address.region, address.postal)
  if (!zone) return { ok: false, error: 'We don’t have a freight rate for that address yet. Please request a quote.' }
  const weight = lines.reduce((s, l) => s + (l.weightLb ?? 0), 0)
  const band = [...zone.bands]
    .sort((a, b) => (a.maxLb ?? Infinity) - (b.maxLb ?? Infinity))
    .find(b => b.maxLb === null || weight <= b.maxLb)
  if (!band || band.price === null) {
    return { ok: false, error: `This shipment (about ${Math.round(weight).toLocaleString('en-CA')} lb) needs a freight quote for ${zone.name}. Choose pickup or request a quote.` }
  }
  return { ok: true, amount: Math.max(minimum, band.price), label: `Freight · ${zone.name}`, billedLater: false }
}
