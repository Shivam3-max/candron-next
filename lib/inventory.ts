// Shared inventory vocabulary: categories, conditions, statuses, spec templates and the
// CANDRON item-code convention. Used by the admin form, the API validators and the pages.
import type { LineArtKind } from '@/lib/lineart-meta'

export interface InventoryCategory {
  name: string
  /** Short code used in CANDRON item codes, e.g. CE-PMT-0500-001 */
  code: string
  /** Line-art drawing shown when a product has no photos yet */
  art: LineArtKind
}

export const CATEGORIES: InventoryCategory[] = [
  { name: 'Padmount Transformer', code: 'PMT', art: 'padmount' },
  { name: 'Substation Transformer', code: 'SUB', art: 'substation' },
  { name: 'Pole-Mount Transformer', code: 'PLM', art: 'polemount' },
  { name: 'Dry-Type Transformer (LV)', code: 'DTL', art: 'dry' },
  { name: 'Dry-Type Transformer (MV)', code: 'DTM', art: 'castcoil' },
  { name: 'MV Switchgear', code: 'MVS', art: 'mv' },
  { name: 'LV Switchgear', code: 'LVS', art: 'lv' },
  { name: 'Switchboard', code: 'SWB', art: 'swbd' },
  { name: 'Control Panel', code: 'CTP', art: 'control' },
  { name: 'Load Bank', code: 'LDB', art: 'loadbank' },
  { name: 'Power Distribution Unit', code: 'PDU', art: 'pdu' },
  { name: 'Remote Power Panel', code: 'RPP', art: 'rpp' },
]

export const CONDITIONS = ['New', 'Surplus', 'Remanufactured', 'Used'] as const
export const STATUSES = ['Available', 'Incoming', 'Reserved', 'Sold'] as const
export const RATING_UNITS = ['kVA', 'MVA', 'A', 'kW'] as const

export const CONDITION_NOTE: Record<string, string> = {
  New: 'Factory-new equipment, built and tested by CANDRON.',
  Surplus: 'New, never-energized equipment from surplus stock.',
  Remanufactured: 'Rebuilt to as-new condition and fully re-tested before shipment.',
  Used: 'Inspected and tested pre-owned equipment, ready for service.',
}

export function categoryFor(name: string): InventoryCategory | undefined {
  return CATEGORIES.find(c => c.name.toLowerCase() === name.toLowerCase())
}

export function artFor(category: string): LineArtKind {
  return categoryFor(category)?.art ?? 'plant'
}

/** Suggested item code: CE-<category code>-<rating, 4 digits>-<sequence, 3 digits>. */
export function suggestItemCode(category: string, rating: number | null, sequence: number) {
  const code = categoryFor(category)?.code ?? 'GEN'
  const r = rating === null || !Number.isFinite(rating) ? '0000' : String(Math.round(rating)).padStart(4, '0').slice(-4)
  return `CE-${code}-${r}-${String(sequence).padStart(3, '0')}`
}

export const ITEM_CODE_PATTERN = /^[A-Z0-9][A-Z0-9-]{2,40}$/

export interface SpecRow { group: string; label: string; value: string }

/** Spec groups offered in the admin form; any row left blank is not shown on the site. */
export const SPEC_TEMPLATE: { group: string; fields: string[] }[] = [
  { group: 'Electrical', fields: ['Impedance (%Z)', 'BIL (HV / LV)', 'Taps', 'Vector group / connection', 'Temperature rise', 'Insulation class', 'Efficiency standard'] },
  { group: 'Construction', fields: ['Insulating fluid', 'Enclosure rating', 'Tank / enclosure finish', 'HV configuration', 'Accessories'] },
  { group: 'Compliance', fields: ['Standards', 'Certification', 'Test report'] },
]

export const PHASES = ['Single-phase', 'Three-phase'] as const
export const FREQUENCIES = ['60 Hz', '50 Hz', '50/60 Hz'] as const
export const WINDINGS = ['Copper', 'Aluminum', 'Copper / Aluminum'] as const
export const COOLING = ['ONAN', 'ONAF', 'ONAN/ONAF', 'KNAN', 'KNAN/KNAF', 'AN', 'AN/AF', 'AA', 'AA/FA', 'Natural', 'Forced air'] as const

export const PHONE = { href: 'tel:+16476162595', label: '+1 (647) 616-2595' }
