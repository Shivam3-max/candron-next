// CAD → USD for US deliveries: the Bank of Canada's daily USD/CAD rate (free, no key), plus the
// margin set in Shop settings. The rate is cached in shop_settings so checkout never waits on the bank.
import type { RowDataPacket } from 'mysql2/promise'
import { getDb } from '@/lib/db'

const KEY = 'fx_usdcad'
const SOURCE = 'https://www.bankofcanada.ca/valet/observations/FXUSDCAD/json?recent=1'
const REFRESH_MS = 6 * 60 * 60 * 1000
/** Beyond this the cached rate is too old to price with (long weekends are ~4 days). */
const MAX_AGE_DAYS = 5

export interface FxRate { date: string; cadPerUsd: number; fetchedAt: number }

async function readCache(): Promise<FxRate | null> {
  const [rows] = await getDb().execute<(RowDataPacket & { value_json: unknown })[]>('SELECT value_json FROM shop_settings WHERE setting_key=?', [KEY])
  if (!rows[0]) return null
  const v = typeof rows[0].value_json === 'string' ? JSON.parse(rows[0].value_json) : rows[0].value_json
  return v && Number(v.cadPerUsd) > 0 ? { date: String(v.date), cadPerUsd: Number(v.cadPerUsd), fetchedAt: Number(v.fetchedAt) || 0 } : null
}

async function fetchRate(): Promise<FxRate> {
  const res = await fetch(SOURCE, { signal: AbortSignal.timeout(5000), cache: 'no-store' })
  if (!res.ok) throw new Error(`Bank of Canada returned ${res.status}`)
  const data = await res.json() as { observations?: { d: string; FXUSDCAD?: { v: string } }[] }
  const obs = data.observations?.[0]
  const cadPerUsd = Number(obs?.FXUSDCAD?.v)
  if (!obs?.d || !(cadPerUsd > 0.5 && cadPerUsd < 3)) throw new Error('Unexpected Bank of Canada response')
  return { date: obs.d, cadPerUsd, fetchedAt: Date.now() }
}

/** Today's (or the latest published) Bank of Canada rate. Throws when no usable rate is available. */
export async function usdCadRate(): Promise<FxRate> {
  const cached = await readCache().catch(() => null)
  if (cached && Date.now() - cached.fetchedAt < REFRESH_MS) return cached
  try {
    const fresh = await fetchRate()
    await getDb().execute(
      'INSERT INTO shop_settings (setting_key, value_json) VALUES (?, ?) ON DUPLICATE KEY UPDATE value_json=VALUES(value_json)',
      [KEY, JSON.stringify(fresh)],
    )
    return fresh
  } catch (error) {
    console.warn('[shop] Could not refresh the USD rate', error instanceof Error ? error.message : error)
    if (cached && (Date.now() - Date.parse(cached.date)) / 86_400_000 <= MAX_AGE_DAYS) return cached
    throw new Error('USD pricing is unavailable right now')
  }
}

/** USD per CAD including the margin, e.g. rate 1.40 and 5% → 0.75. */
export const usdFactor = (rate: FxRate, marginPercent: number) => (1 / rate.cadPerUsd) * (1 + marginPercent / 100)

/** CAD amount in USD, rounded to the cent. */
export const toUsd = (cad: number, factor: number) => Math.round(cad * factor * 100) / 100
