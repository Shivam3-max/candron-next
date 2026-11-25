// Online-ordering settings, edited in /admin/shop and stored in shop_settings.
// Defaults keep the shop switched off, so deploying this code changes nothing publicly.
// Defaults follow the client's questionnaire answers (Nov 2026).
import type { RowDataPacket } from 'mysql2/promise'
import { getDb, isDatabaseConfigured } from '@/lib/db'
import { isCountry, isRegion, type CountryCode } from '@/lib/shop/regions'

export interface FreightBand { maxLb: number | null; price: number | null }
/** match: "CA" (country), "CA-ON" (province/state) or "CA-ON:M" (province + postal-code prefix). Most specific match wins. */
export interface FreightZone { name: string; match: string[]; bands: FreightBand[] }

/** A yard buyers can collect from. Only the city is shown publicly; the postal code is used for tax. */
export interface PickupYard { id: string; name: string; region: string; postal: string; country: CountryCode; enabled: boolean }

export interface ShopSettings {
  enabled: boolean
  shipCountries: CountryCode[]
  /** Orders above this (CAD, before tax) aren't paid online: accounting arranges payment. null = no limit */
  onlineLimit: number | null
  /** Business days stock stays held for an order above the online limit */
  offlineHoldDays: number
  /** Most units of one listing a buyer can order online (more = volume pricing by quote) */
  maxQuantity: number
  bankDebit: boolean
  automaticTax: boolean
  pickup: { enabled: boolean; hours: string; yards: PickupYard[] }
  freight: {
    mode: 'zones' | 'percent' | 'quote'
    percent: number
    minimum: number
    zones: FreightZone[]
  }
  /** US delivery: CAD prices converted at the day's Bank of Canada rate plus a margin */
  usd: { enabled: boolean; marginPercent: number }
  /** Deposits on sales quotes: balance due, reminder days (after the deposit) and when the team is asked to forfeit */
  deposit: { percent: number; balanceDays: number; reminderDays: number[]; forfeitDays: number }
  returns: { days: number | null; restockingPercent: number | null; usedFinalSale: boolean; customFinalSale: boolean }
  /** Shown on listings without their own lead time */
  defaultShipsIn: string
  /** New orders (sales team) */
  notifyEmail: string
  /** Payments, invoices, refunds, orders above the online limit, tax exemptions */
  accountingEmail: string
  /** Printed on Stripe invoices and receipts */
  invoice: { gstHst: string; qst: string; pst: string; footer: string }
}

const BANDS = (prices: (number | null)[]): FreightBand[] =>
  [500, 1500, 3000, 6000, null].map((maxLb, i) => ({ maxLb, price: prices[i] ?? null }))

export const DEFAULT_YARDS: PickupYard[] = [
  { id: 'mississauga', name: 'Mississauga', region: 'ON', postal: 'L5B 3C1', country: 'CA', enabled: true },
  { id: 'windsor', name: 'Windsor', region: 'ON', postal: 'N9A 6S1', country: 'CA', enabled: true },
  { id: 'buffalo', name: 'Buffalo', region: 'NY', postal: '14202', country: 'US', enabled: true },
]

export const DEFAULT_SETTINGS: ShopSettings = {
  enabled: false,
  shipCountries: ['CA', 'US'],
  onlineLimit: 10000,
  offlineHoldDays: 5,
  maxQuantity: 4,
  bankDebit: true,
  automaticTax: true,
  pickup: { enabled: true, hours: 'Monday to Friday, 8 am to 6 pm. After hours by appointment, please call.', yards: DEFAULT_YARDS },
  freight: {
    mode: 'quote',
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
  usd: { enabled: true, marginPercent: 5 },
  deposit: { percent: 10, balanceDays: 30, reminderDays: [30, 60, 90], forfeitDays: 120 },
  returns: { days: 14, restockingPercent: null, usedFinalSale: true, customFinalSale: true },
  defaultShipsIn: 'Ships in 2–3 business days',
  notifyEmail: 'sales@candron.com',
  accountingEmail: 'accounting@candron.com',
  invoice: { gstHst: '', qst: '', pst: '', footer: '' },
}

const KEY = 'shop'
const money = (v: unknown, max = 1e9) => {
  if (v === null || v === undefined || v === '') return null
  const n = Number(v)
  if (!Number.isFinite(n) || n < 0 || n > max) throw new Error('Amounts must be positive numbers.')
  return Math.round(n * 100) / 100
}
const int = (v: unknown, min: number, max: number, fallback: number) => {
  const n = Math.round(Number(v))
  return Number.isFinite(n) && v !== '' && v !== null ? Math.min(max, Math.max(min, n)) : fallback
}
const text = (v: unknown, max = 200) => String(v ?? '').trim().slice(0, max)
const obj = (v: unknown) => (v && typeof v === 'object' ? v : {}) as Record<string, unknown>
const emails = (v: unknown) => text(v, 500).split(',').map(s => s.trim()).filter(Boolean)

/** Validates settings posted from the admin form (throws with a readable message). */
export function parseSettings(input: unknown): ShopSettings {
  const b = obj(input), f = obj(b.freight), p = obj(b.pickup), d = obj(b.deposit), r = obj(b.returns), u = obj(b.usd), inv = obj(b.invoice)
  const countries = Array.isArray(b.shipCountries) ? b.shipCountries.map(String).filter(isCountry) : []
  const mode = ['zones', 'percent', 'quote'].includes(String(f.mode)) ? (f.mode as ShopSettings['freight']['mode']) : 'quote'
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
  const yards = (Array.isArray(p.yards) ? p.yards : []).slice(0, 10).map((y: Record<string, unknown>, i) => {
    const country = isCountry(String(y.country)) ? (y.country as CountryCode) : 'CA'
    const yard: PickupYard = {
      id: text(y.id, 40).toLowerCase().replace(/[^a-z0-9-]/g, '') || `yard-${i + 1}`,
      name: text(y.name, 80), region: text(y.region, 4).toUpperCase(), postal: text(y.postal, 12).toUpperCase(), country, enabled: y.enabled !== false,
    }
    if (!yard.name) throw new Error('Every pickup yard needs a city name.')
    if (!isRegion(country, yard.region)) throw new Error(`Choose the province or state for the ${yard.name} yard.`)
    if (!yard.postal) throw new Error(`Enter a postal or ZIP code for the ${yard.name} yard (used for tax, never shown).`)
    return yard
  })
  if (new Set(yards.map(y => y.id)).size !== yards.length) throw new Error('Two pickup yards have the same id.')
  const reminderDays = (Array.isArray(d.reminderDays) ? d.reminderDays : String(d.reminderDays ?? '').split(','))
    .map(Number).filter(n => Number.isInteger(n) && n > 0 && n < 365).sort((a, z) => a - z).slice(0, 6)
  const settings: ShopSettings = {
    enabled: Boolean(b.enabled),
    shipCountries: countries.length ? countries : ['CA'],
    onlineLimit: money(b.onlineLimit),
    offlineHoldDays: int(b.offlineHoldDays, 1, 30, 5),
    maxQuantity: int(b.maxQuantity, 1, 999, 4),
    bankDebit: Boolean(b.bankDebit),
    automaticTax: Boolean(b.automaticTax),
    pickup: { enabled: Boolean(p.enabled), hours: text(p.hours, 200), yards },
    freight: { mode, percent: money(f.percent, 100) ?? 0, minimum: money(f.minimum) ?? 0, zones },
    usd: { enabled: Boolean(u.enabled), marginPercent: money(u.marginPercent, 50) ?? 0 },
    deposit: {
      percent: Math.min(100, Math.max(1, money(d.percent, 100) ?? 10)),
      balanceDays: int(d.balanceDays, 1, 120, 30),
      reminderDays,
      forfeitDays: int(d.forfeitDays, 1, 730, 120),
    },
    returns: {
      days: money(r.days, 365),
      restockingPercent: money(r.restockingPercent, 100),
      usedFinalSale: r.usedFinalSale !== false,
      customFinalSale: r.customFinalSale !== false,
    },
    defaultShipsIn: text(b.defaultShipsIn, 80),
    notifyEmail: emails(b.notifyEmail).join(', '),
    accountingEmail: emails(b.accountingEmail).join(', '),
    invoice: { gstHst: text(inv.gstHst, 40), qst: text(inv.qst, 40), pst: text(inv.pst, 80), footer: text(inv.footer, 500) },
  }
  for (const e of [...emails(settings.notifyEmail), ...emails(settings.accountingEmail)]) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) throw new Error(`“${e}” isn’t a valid email address.`)
  }
  if (settings.pickup.enabled && !yards.some(y => y.enabled)) throw new Error('Add at least one pickup yard, or turn pickup off.')
  if (settings.freight.mode === 'percent' && !settings.freight.percent) throw new Error('Enter the freight percentage.')
  if (settings.deposit.reminderDays.some(n => n >= settings.deposit.forfeitDays)) throw new Error('Reminders must come before the forfeit day.')
  return settings
}

/** Saved settings merged over the defaults (so new options get sensible values). */
export async function getShopSettings(): Promise<ShopSettings> {
  if (!isDatabaseConfigured()) return DEFAULT_SETTINGS
  try {
    const [rows] = await getDb().execute<(RowDataPacket & { value_json: unknown })[]>('SELECT value_json FROM shop_settings WHERE setting_key=?', [KEY])
    if (!rows[0]) return DEFAULT_SETTINGS
    const raw = (typeof rows[0].value_json === 'string' ? JSON.parse(rows[0].value_json) : rows[0].value_json) ?? {}
    const pickup = { ...DEFAULT_SETTINGS.pickup, ...raw.pickup }
    return {
      ...DEFAULT_SETTINGS, ...raw,
      pickup: { enabled: Boolean(pickup.enabled), hours: String(pickup.hours ?? ''), yards: Array.isArray(pickup.yards) ? pickup.yards : DEFAULT_YARDS },
      freight: { ...DEFAULT_SETTINGS.freight, ...raw.freight },
      usd: { ...DEFAULT_SETTINGS.usd, ...raw.usd },
      deposit: { ...DEFAULT_SETTINGS.deposit, ...raw.deposit },
      returns: { ...DEFAULT_SETTINGS.returns, ...raw.returns },
      invoice: { ...DEFAULT_SETTINGS.invoice, ...raw.invoice },
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

/** Enabled yard by id (null when unknown or switched off). */
export const findYard = (settings: ShopSettings, id: string | null | undefined) =>
  (settings.pickup.enabled && id && settings.pickup.yards.find(y => y.id === id && y.enabled)) || null

/** True when this amount (CAD, before tax) must be paid offline through accounting. */
export const overOnlineLimit = (settings: ShopSettings, amountCad: number) => settings.onlineLimit !== null && amountCad > settings.onlineLimit

export const stripeConfigured = () => Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET)
export const stripeLiveMode = () => Boolean(process.env.STRIPE_SECRET_KEY?.startsWith('sk_live') || process.env.STRIPE_SECRET_KEY?.startsWith('rk_live'))

/** The shop takes orders only when an admin switched it on and Stripe keys are present. */
export async function shopIsOpen() {
  if (!stripeConfigured()) return false
  return (await getShopSettings()).enabled
}
