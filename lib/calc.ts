// Shared helpers for the /resources calculators

/**
 * Read a ratio the user may type as a decimal (0.85) or a percentage (85).
 * Values up to 1 are taken as decimals, values above 1 as percentages.
 * Returns NaN for blanks, negatives and anything above 100%.
 */
export function parseRatio(input: string): number {
  if (input.trim() === '') return NaN
  const v = parseFloat(input)
  if (isNaN(v) || v <= 0) return NaN
  const r = v > 1 ? v / 100 : v
  return r > 1 ? NaN : r
}

/** Standard three-phase transformer ratings (kVA), dry-type and liquid-filled combined. */
export const STANDARD_KVA_3PH = [15, 30, 45, 75, 112.5, 150, 225, 300, 500, 750, 1000, 1500, 2000, 2500, 3000, 3750, 5000, 7500, 10000]
/** Standard single-phase transformer ratings (kVA). */
export const STANDARD_KVA_1PH = [5, 10, 15, 25, 37.5, 50, 75, 100, 167, 250, 333, 500]

/** Smallest standard rating at or above the required kVA, or null when it is beyond the list (custom unit). */
export function nextStandardKva(kva: number, phase: '1' | '3' = '3'): number | null {
  const list = phase === '1' ? STANDARD_KVA_1PH : STANDARD_KVA_3PH
  return list.find(s => s >= kva - 1e-9) ?? null
}

/** Format a number with thousands separators and at most `dp` decimals (trailing zeros dropped). */
export function fmt(n: number, dp = 2): string {
  return n.toLocaleString('en-CA', { maximumFractionDigits: dp })
}
