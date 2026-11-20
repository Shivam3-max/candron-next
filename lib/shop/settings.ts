// Online-ordering settings, edited in /admin/shop and stored in shop_settings.
// Defaults keep the shop switched off, so deploying this code changes nothing publicly.
import type { RowDataPacket } from 'mysql2/promise'
import { getDb, isDatabaseConfigured } from '@/lib/db'
import { isCountry, type CountryCode } from '@/lib/shop/regions'

export interface FreightBand { maxLb: number | null; price: number | null }
/** match: "CA" (country), "CA-ON" (province/state) or "CA-ON:M" (province + postal-code prefix). Most specific match wins. */
export interface FreightZone { name: string; match: string[]; bands: FreightBand[] }

export interface ShopSettings {
  enabled: boolean
  shipCountries: CountryCode[]
  /** Orders above this amount (before tax) can't be paid by card; null = no limit */
  cardLimit: number | null
  bankDebit: boolean
  automaticTax: boolean
  pickup: { enabled: boolean; label: string; line1: string; city: string; region: string; postal: string; country: CountryCode }
  freight: {
    mode: 'zones' | 'percent' | 'quote'
    percent: number
    minimum: number
    zones: FreightZone[]
  }
  /** Default deposit for "Reserve" listings and quotes, and days to pay invoices */
  deposit: { percent: number; balanceDays: number }
  notifyEmail: string
}

const BANDS = (prices: (number | null)[]): FreightBand[] =>
  [500, 1500, 3000, 6000, null].map((maxLb, i) => ({ maxLb, price: prices[i] ?? null }))

export const DEFAULT_SETTINGS: ShopSettings = {
  enabled: false,
  shipCountries: ['CA'],
  cardLimit: 25000,
  bankDebit: true,
  automaticTax: true,
  pickup: { enabled: true, label: 'Pick up in Ontario', line1: '', city: 'Toronto', region: 'ON', postal: '', country: 'CA' },
  freight: {
    mode: 'zones',
    percent: 10,
    minimum: 150,
    zones: [
      // Toronto (M) plus Durham, York, Peel and Halton postal areas
      { name: 'Greater Toronto Area', match: ['CA-ON:M', 'CA-ON:L1', 'CA-ON:L3', 'CA-ON:L4', 'CA-ON:L5', 'CA-ON:L6', 'CA-ON:L7'], bands: BANDS([]) },
      { name: 'Rest of Ontario', match: ['CA-ON'], bands: BANDS([]) },
      { name: 'Quebec', match: ['CA-QC'], bands: BANDS([]) },
      { name: 'Prairies', match: ['CA-MB', 'CA-SK', 'CA-AB'], bands: BANDS([]) },
      { name: 'British Columbia', match: ['CA-BC'], bands: BANDS([]) },
      { name: 'Atlantic Canada', match: ['CA-NB', 'CA-NS', 'CA-PE', 'CA-NL'], bands: BANDS([]) },
      { name: 'United States', match: ['US'], bands: BANDS([]) },
    ],
  },
  deposit: { percent: 25, balanceDays: 14 },
  notifyEmail: '',
}

const KEY = 'shop'
const money = (v: unknown, max = 1e9) => {
  if (v === null || v === undefined || v === '') return null
  const n = Number(v)
  if (!Number.isFinite(n) || n < 0 || n > max) throw new Error('Amounts must be positive numbers.')
  return Math.round(n * 100) / 100
}
const text = (v: unknown, max = 200) => String(v ?? '').trim().slice(0, max)

/** Validates settings posted from the admin form (throws with a readable message). */
export function parseSettings(input: unknown): ShopSettings {
  const b = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>
  const f = (b.freight && typeof b.freight === 'object' ? b.freight : {}) as Record<string, unknown>
  const p = (b.pickup && typeof b.pickup === 'object' ? b.pickup : {}) as Record<string, unknown>
  const countries = Array.isArray(b.shipCountries) ? b.shipCountries.map(String).filter(isCountry) : []
  const mode = ['zones', 'percent', 'quote'].includes(String(f.mode)) ? (f.mode as ShopSettings['freight']['mode']) : 'zones'
  const zones = (Array.isArray(f.zones) ? f.zones : []).slice(0, 40).map((z: Record<string, unknown>) => ({
    name: text(z.name, 80),
    match: (Array.isArray(z.match) ? z.match : String(z.match ?? '').split(','))
      .map(m => String(m).trim().toUpperCase()).filter(m => /^(CA|US)(-[A-Z]{2}(:[A-Z0-9]{1,3})?)?$/.test(m)),
    bands: (Array.isArray(z.bands) ? z.bands : []).slice(0, 10).map((x: Record<string, unknown>) => ({
      maxLb: money(x.maxLb, 1e6), price: money(x.price),
    })),
  }))
  for (const z of zones) {
    if (!z.name) throw new Error('Every freight zone needs a name.')
    if (!z.match.length) throw new Error(`Freight zone “${z.name}” needs at least one valid match, e.g. CA-ON or US.`)
  }
  const settings: ShopSettings = {
    enabled: Boolean(b.enabled),
    shipCountries: countries.length ? countries : ['CA'],
    cardLimit: money(b.cardLimit),
    bankDebit: Boolean(b.bankDebit),
    automaticTax: Boolean(b.automaticTax),
    pickup: {
      enabled: Boolean(p.enabled), label: text(p.label, 80) || 'Pick up', line1: text(p.line1), city: text(p.city, 80),
      region: text(p.region, 4).toUpperCase(), postal: text(p.postal, 12).toUpperCase(),
      country: isCountry(String(p.country)) ? (p.country as CountryCode) : 'CA',
    },
    freight: { mode, percent: money(f.percent, 100) ?? 0, minimum: money(f.minimum) ?? 0, zones },
    deposit: {
      percent: Math.min(100, Math.max(1, money((b.deposit as Record<string, unknown> | undefined)?.percent, 100) ?? 25)),
      balanceDays: Math.min(120, Math.max(1, Math.round(Number((b.deposit as Record<string, unknown> | undefined)?.balanceDays) || 14))),
    },
    notifyEmail: text(b.notifyEmail, 500),
  }
  if (settings.pickup.enabled && (!settings.pickup.line1 || !settings.pickup.city || !settings.pickup.region || !settings.pickup.postal)) {
    throw new Error('Enter the full pickup address (street, city, province and postal code), or turn pickup off.')
  }
  if (settings.freight.mode === 'percent' && !settings.freight.percent) throw new Error('Enter the freight percentage.')
  return settings
}

/** Saved settings merged over the defaults (so new options get sensible values). */
export async function getShopSettings(): Promise<ShopSettings> {
  if (!isDatabaseConfigured()) return DEFAULT_SETTINGS
  try {
    const [rows] = await getDb().execute<(RowDataPacket & { value_json: unknown })[]>('SELECT value_json FROM shop_settings WHERE setting_key=?', [KEY])
    if (!rows[0]) return DEFAULT_SETTINGS
    const raw = typeof rows[0].value_json === 'string' ? JSON.parse(rows[0].value_json) : rows[0].value_json
    return {
      ...DEFAULT_SETTINGS, ...raw,
      pickup: { ...DEFAULT_SETTINGS.pickup, ...raw?.pickup },
      freight: { ...DEFAULT_SETTINGS.freight, ...raw?.freight },
      deposit: { ...DEFAULT_SETTINGS.deposit, ...raw?.deposit },
    }
  } catch (error) {
    console.warn('[shop] Could not read settings.', error instanceof Error ? error.message : error)
    return DEFAULT_SETTINGS
  }
}

export async function saveShopSettings(settings: ShopSettings) {
  await getDb().execute(
    'INSERT INTO shop_settings (setting_key, value_json) VALUES (?, ?) ON DUPLICATE KEY UPDATE value_json=VALUES(value_json)',
    [KEY, JSON.stringify(settings)],
  )
}

export const stripeConfigured = () => Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET)
export const stripeLiveMode = () => Boolean(process.env.STRIPE_SECRET_KEY?.startsWith('sk_live') || process.env.STRIPE_SECRET_KEY?.startsWith('rk_live'))

/** The shop takes orders only when an admin switched it on and Stripe keys are present. */
export async function shopIsOpen() {
  if (!stripeConfigured()) return false
  return (await getShopSettings()).enabled
}
