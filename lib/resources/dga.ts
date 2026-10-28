/**
 * DGA read-out content: the Duval Triangle 1 zones for mineral oil, and plain-language notes
 * on the key gases. Zone limits are the published Duval Triangle 1 boundaries, in % of
 * CH4 + C2H4 + C2H2. The triangle is only meaningful once gas levels or growth are abnormal.
 */

export type ZoneId = 'PD' | 'T1' | 'T2' | 'T3' | 'D1' | 'D2' | 'DT'

/** A point as [CH4 %, C2H4 %, C2H2 %]; each corner triple sums to 100. */
type Tri = [number, number, number]

export const ZONES: { id: ZoneId; name: string; meaning: string; colour: string; poly: Tri[] }[] = [
  { id: 'PD', name: 'Partial discharge', meaning: 'Low-energy discharges in gas pockets or voids, often from poor drying or impregnation. Watch the trend.', colour: '#C9D7FF', poly: [[100, 0, 0], [98, 2, 0], [98, 0, 2]] },
  { id: 'T1', name: 'Thermal fault below 300 °C', meaning: 'Mild overheating, for example from overloading or blocked cooling. Usually slow-moving; check loading and cooling.', colour: '#FFE7A8', poly: [[98, 2, 0], [80, 20, 0], [76, 20, 4], [96, 0, 4], [98, 0, 2]] },
  { id: 'T2', name: 'Thermal fault 300 – 700 °C', meaning: 'Hot spots in the core, connections or leads. Retest sooner and look for a cause.', colour: '#FFC97A', poly: [[80, 20, 0], [50, 50, 0], [46, 50, 4], [76, 20, 4]] },
  { id: 'T3', name: 'Thermal fault above 700 °C', meaning: 'Severe overheating such as circulating currents in the core or a bad joint. Needs prompt investigation.', colour: '#FF9C6B', poly: [[50, 50, 0], [0, 100, 0], [0, 85, 15], [35, 50, 15]] },
  { id: 'D1', name: 'Low-energy discharge (sparking)', meaning: 'Sparking or tracking, for example from floating metal parts or poor contacts. Investigate before it grows.', colour: '#B9E3F5', poly: [[87, 0, 13], [64, 23, 13], [0, 23, 77], [0, 0, 100]] },
  { id: 'D2', name: 'High-energy discharge (arcing)', meaning: 'Arcing with power follow-through. The most serious result: get engineering advice before keeping the unit in service.', colour: '#F59AA0', poly: [[64, 23, 13], [47, 40, 13], [31, 40, 29], [0, 71, 29], [0, 23, 77]] },
  { id: 'DT', name: 'Mixed thermal and electrical faults', meaning: 'A mix of overheating and discharge. Retest, trend and compare with loading and other tests.', colour: '#D9D2F2', poly: [[96, 0, 4], [46, 50, 4], [35, 50, 15], [0, 85, 15], [0, 71, 29], [31, 40, 29], [47, 40, 13], [87, 0, 13]] },
]

/** Duval Triangle 1 zone for the relative percentages of CH4, C2H4 and C2H2. */
export function duvalZone(ch4: number, c2h4: number, c2h2: number): ZoneId | null {
  const sum = ch4 + c2h4 + c2h2
  if (sum <= 0) return null
  const m = (ch4 / sum) * 100, e = (c2h4 / sum) * 100, a = (c2h2 / sum) * 100
  if (m >= 98) return 'PD'
  if (a > 13 && e < 23) return 'D1'
  if ((a > 13 && e >= 23 && e < 40) || (a > 29 && e >= 40)) return 'D2'
  if (a < 4 && e < 20) return 'T1'
  if (a < 4 && e < 50) return 'T2'
  if (e >= 50 && a < 15) return 'T3'
  return 'DT'
}

export const GASES = [
  { id: 'h2', f: 'H₂', name: 'Hydrogen', note: 'Produced by almost every fault; on its own it points to partial discharge.' },
  { id: 'ch4', f: 'CH₄', name: 'Methane', note: 'Low-temperature overheating of oil.' },
  { id: 'c2h6', f: 'C₂H₆', name: 'Ethane', note: 'Overheating of oil, below about 300 °C.' },
  { id: 'c2h4', f: 'C₂H₄', name: 'Ethylene', note: 'Hotter overheating of oil; rises fast with temperature.' },
  { id: 'c2h2', f: 'C₂H₂', name: 'Acetylene', note: 'Arcing or very high temperatures. Any steady increase deserves attention.' },
  { id: 'co', f: 'CO', name: 'Carbon monoxide', note: 'Paper (cellulose) insulation ageing or overheating.' },
  { id: 'co2', f: 'CO₂', name: 'Carbon dioxide', note: 'Normal paper ageing. A low CO₂/CO ratio, roughly under 3, can point to paper overheating.' },
] as const

export type GasId = (typeof GASES)[number]['id']

export const DGA_REFS = 'IEEE C57.104 and the Duval Triangle 1 method for mineral oil'
