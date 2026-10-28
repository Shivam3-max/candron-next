/**
 * Canadian Electrical Equipment Lead-Time Index. One issue per quarter; add the newest at the top
 * of ISSUES. Ranges are indicative weeks from approved drawings to ship, and share their equipment
 * list with the Long-Lead Equipment Planner (lib/resources/lead-times.ts) so the two stay in step.
 */
import { EQUIPMENT, type EquipmentType } from '@/lib/resources/lead-times'

export type Pressure = 'high' | 'elevated' | 'steady'

export interface IndexRow { id: string; low: number; high: number; pressure: Pressure; comment: string }
export interface IndexIssue {
  slug: string
  quarter: string
  published: string
  headline: string
  summary: string
  rows: IndexRow[]
  drivers: { t: string; d: string }[]
  tips: { t: string; d: string }[]
}

const row = (id: string, pressure: Pressure, comment: string): IndexRow => {
  const e = EQUIPMENT.find(x => x.id === id) as EquipmentType
  return { id, low: e.low, high: e.high, pressure, comment }
}

export const ISSUES: IndexIssue[] = [
  {
    slug: 'q4-2026',
    quarter: 'Q4 2026',
    published: 'October 2026',
    headline: 'Transformers still set the critical path',
    summary: 'This first issue sets the baseline. Medium-voltage switchgear and almost every class of transformer above a few hundred kVA remain the longest items on Canadian electrical jobs, while low-voltage switchboards and dry-type transformers can usually be scheduled inside a normal project.',
    rows: [
      row('power', 'high', 'Design review and factory test slots book far ahead.'),
      row('unit-sub', 'high', 'Coordination of throats with the switchgear often adds weeks.'),
      row('pm3', 'high', 'Utility-spec and natural ester units sit at the top of the range.'),
      row('pm1', 'elevated', 'Common utility ratings move fastest.'),
      row('mv-dry', 'elevated', 'Cast coil and high BIL ratings run longer than VPI.'),
      row('lv-dry', 'steady', 'Standard ratings are often available from stock.'),
      row('mv-mc', 'high', 'Vacuum breakers, relays and arc-resistant options set the date.'),
      row('mv-me', 'elevated', 'Utility-specified fuses and switches can add time.'),
      row('lv-sg', 'elevated', 'Power circuit breakers are the long item.'),
      row('swbd', 'steady', 'Breaker availability decides where in the range a job lands.'),
      row('mcc', 'steady', 'Drives and soft starters are usually the long items.'),
      row('ehouse', 'high', 'Follows the longest piece of gear inside it.'),
      row('gen', 'elevated', 'Larger sets and emissions packages run longer.'),
      row('ats', 'steady', 'Bypass-isolation and closed-transition units take longer.'),
      row('pdu', 'steady', 'Branch monitoring options can extend it.'),
    ],
    drivers: [
      { t: 'Demand from data centres and electrification', d: 'Large new loads, utility grid upgrades and renewable projects are all competing for the same transformer and switchgear capacity.' },
      { t: 'Electrical steel and copper', d: 'Grain-oriented electrical steel and copper set much of a transformer’s cost and schedule, and quotes with escalation clauses remain common.' },
      { t: 'Breakers, relays and controls', d: 'Vacuum circuit breakers, power circuit breakers and protective relays come from a small number of sources, so switchgear dates follow theirs.' },
      { t: 'Submittal and approval time', d: 'The lead-time clock usually starts at approved drawings. Slow reviews add weeks that never show up in a quoted lead time.' },
    ],
    tips: [
      { t: 'Order transformers first', d: 'Release long-lead transformers and MV gear on approved single-lines, before the rest of the electrical package is final.' },
      { t: 'Approve drawings in days, not weeks', d: 'Agree review turnaround with the engineer and owner up front, and allow for one resubmission in the schedule.' },
      { t: 'Ask for stock and standard ratings', d: 'A standard voltage, impedance or enclosure can take months off a lead time. Ask what is in stock before you specify a one-off.' },
      { t: 'Consider Canadian-made', d: 'Domestic production keeps shipping short, avoids border delays and makes factory visits and witnessed tests easy to arrange.' },
    ],
  },
]

export const LATEST = ISSUES[0]
export const nameOf = (id: string) => EQUIPMENT.find(e => e.id === id)?.name ?? id
export const groupOf = (id: string) => EQUIPMENT.find(e => e.id === id)?.group ?? 'Transformers'
export const PRESSURE_TEXT: Record<Pressure, string> = { high: 'Long', elevated: 'Elevated', steady: 'Manageable' }
