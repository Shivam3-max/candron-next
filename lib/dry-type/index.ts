import type { LineArtKind } from '@/lib/lineart-meta'
import type { FAQ, KPI, SpecRow, Standard } from '@/components/ProductTypePage'
import { LV_PRODUCTS } from './products-lv'
import { MV_PRODUCTS } from './products-mv'
import { CONTROL_PRODUCTS } from './products-control'
import { REACTOR_PRODUCTS } from './products-reactors'

/**
 * CANDRON dry-type transformer range: one record per product page.
 * Families group the pages for navigation; every page URL is family.href + '/' + slug.
 */

export type FamilyId = 'lv' | 'mv' | 'control' | 'reactors'

export type NeedId =
  | 'building' | 'convert' | 'noise' | 'drives' | 'nonlinear' | 'outdoor' | 'hazardous' | 'portable'
  | 'control' | 'motorstart' | 'mv' | 'grounding' | 'surge' | 'fault'

export interface Art { kind: LineArtKind; views?: string[] }

export interface DryProduct {
  slug: string
  family: FamilyId
  /** Full page name */
  name: string
  /** Short name for menus and cards */
  short: string
  /** One-line range for cards and menus, e.g. "3 – 900 kVA · 1.2 kV class" */
  range: string
  /** One plain-English sentence: what it does */
  does: string
  /** "Pick this when…" bullets, in plain words */
  pickIf: string[]
  /** A nearby product that suits a different situation better */
  insteadIf?: { text: string; slug: string }
  needs: NeedId[]
  /** Comparison-table cells */
  compare: { rating: string; voltage: string; insulation: string; enclosure: string }
  meta: { title: string; description: string }
  art: Art
  eyebrow: string
  subtitle: string
  badges: string[]
  kpis: KPI[]
  overviewTitle: string
  overviewText: string
  overviewPoints: string[]
  features: string[]
  upgrades: string[]
  specRows: SpecRow[]
  standards: Standard[]
  applications: string[]
  faqs: FAQ[]
  quoteItems: string[]
  related: string[]
}

export interface DryFamily {
  id: FamilyId
  name: string
  /** Hero heading in two lines; the second is highlighted */
  h1: [string, string]
  short: string
  href: string
  range: string
  tagline: string
  intro: string
  art: Art
  /** Bullets for the family hero: what the family covers */
  points: string[]
  meta: { title: string; description: string }
}

export const DRY_HUB = '/products/transformers/dry-type'
export const DRY_GUIDE = '/products/transformers/dry-type/guide'

export const FAMILIES: DryFamily[] = [
  {
    id: 'lv',
    name: 'Low-Voltage Distribution Transformers',
    h1: ['Low-Voltage', 'Distribution Transformers'],
    short: 'LV Distribution',
    href: '/products/transformers/dry-type-lv',
    range: '3 – 1,000 kVA · up to 1.2 kV class',
    tagline: 'The transformers that feed lights, outlets, machines and drives inside a building.',
    intro: 'Low-voltage dry-type transformers take 600 V or 480 V from the main switchboard and turn it into the voltages your equipment actually uses — 208/120 V, 240/120 V, 480 V and more. Nine versions cover everything from a plain step-down unit to sealed outdoor, hazardous-area and harmonic-mitigating designs.',
    art: { kind: 'dry' },
    points: ['Single-phase 3 – 350 kVA, three-phase 5 – 1,000 kVA', 'Copper or aluminum windings', '220 °C insulation with 150, 115 or 80 °C rise', 'Meets DOE 2016 and NRCan 2019 efficiency rules'],
    meta: {
      title: 'Low-Voltage Dry-Type Transformers',
      description: 'CANDRON low-voltage dry-type transformers built in Toronto: general-purpose, shielded isolation, drive isolation, K-factor, harmonic-mitigating, autotransformers, encapsulated, mini power centres and hazardous-location units.',
    },
  },
  {
    id: 'mv',
    name: 'Medium-Voltage Power Transformers',
    h1: ['Medium-Voltage', 'Power Transformers'],
    short: 'MV Power',
    href: '/products/transformers/dry-type-mv',
    range: 'up to 15,000 kVA · up to 46 kV class',
    tagline: 'Large dry-type power transformers for plants, campuses, data centres and renewables.',
    intro: 'Medium-voltage dry-type transformers step utility or plant voltages of 2.4 kV to 46 kV down to the levels your switchgear distributes. With no oil to leak or burn, they can sit inside the building, close to the load. Choose VPI/VPE for a proven, economical design, cast coil for the toughest environments, and a grounding transformer when an ungrounded system needs a neutral.',
    art: { kind: 'castcoil' },
    points: ['Three-phase 300 – 15,000 kVA, single-phase 100 – 5,000 kVA', 'Up to 46 kV class, 250 kV BIL', 'VPI, VPE or cast-coil construction', 'Optional fans for extra capacity'],
    meta: {
      title: 'Medium-Voltage Dry-Type Transformers',
      description: 'CANDRON medium-voltage dry-type power transformers up to 15,000 kVA and 46 kV class: VPI/VPE, cast coil and neutral grounding transformers, built and tested in Toronto.',
    },
  },
  {
    id: 'control',
    name: 'Control & Motor-Starting Transformers',
    h1: ['Control & Motor-Starting', 'Transformers'],
    short: 'Control & Motor',
    href: '/products/transformers/dry-type/control',
    range: '25 VA – 3,000 VA · 15 – 400 HP',
    tagline: 'Small transformers that keep machines, panels and motor starters working.',
    intro: 'Not every transformer feeds a building. These ones live inside control panels, motor starters and medium-voltage switchgear. They give coils, relays and PLCs a steady control voltage, power breaker controls inside MV gear, and let big motors start gently without dragging down the plant’s voltage.',
    art: { kind: 'dt-ctrl' },
    points: ['Industrial control: 25 – 7,500 VA', 'MV control power: 500 – 3,000 VA, up to 7.2 kV', 'Motor-starting autotransformers: 15 – 400 HP', 'Copper windings throughout'],
    meta: {
      title: 'Control & Motor-Starting Transformers',
      description: 'Industrial control transformers (25 – 7,500 VA), medium-voltage control power transformers up to 7.2 kV and motor-starting autotransformers for 15 – 400 HP motors, made in Canada by CANDRON.',
    },
  },
  {
    id: 'reactors',
    name: 'Reactors, Filters & Surge Protection',
    h1: ['Reactors, Filters', '& Surge Protection'],
    short: 'Reactors & Filters',
    href: '/products/transformers/dry-type/reactors',
    range: '2 A – 1,250 A · up to 34.5 kV',
    tagline: 'Magnetics that clean up power, protect drives and motors, and calm switching surges.',
    intro: 'Variable-frequency drives, long motor cables and vacuum breakers all create electrical stress that ordinary transformers were never meant to handle. Reactors and filters smooth current, cut harmonics and trim voltage spikes. Air-core reactors limit fault current on medium-voltage systems, and RC snubbers soak up the fast transients that vacuum switching can create.',
    art: { kind: 'dt-reactor' },
    points: ['Line & load reactors: 2 – 1,250 A', 'dV/dt motor filters: 2 – 320 A', 'Air-core reactors: up to 10,000 kVAR, 25 kV', 'RC snubbers: 2.4 – 34.5 kV'],
    meta: {
      title: 'Reactors, Filters & RC Snubbers',
      description: 'AC line and load reactors, dV/dt motor protection filters, air-core reactors and RC surge snubbers from CANDRON — power-quality magnetics designed and built in Toronto.',
    },
  },
]

export const PRODUCTS: DryProduct[] = [...LV_PRODUCTS, ...MV_PRODUCTS, ...CONTROL_PRODUCTS, ...REACTOR_PRODUCTS]

export const NEEDS: { id: NeedId; label: string; hint: string }[] = [
  { id: 'building', label: 'Power a building', hint: 'Lights, outlets, HVAC and general loads' },
  { id: 'convert', label: 'Match a machine’s voltage', hint: 'e.g. 600 V supply, 480 V machine' },
  { id: 'noise', label: 'Clean, quiet power', hint: 'Labs, medical, IT, sensitive electronics' },
  { id: 'drives', label: 'Feed a VFD or drive', hint: 'Variable-frequency and DC drives' },
  { id: 'nonlinear', label: 'Lots of electronics', hint: 'Computers, LED drivers, UPS, chargers' },
  { id: 'outdoor', label: 'Outdoors or harsh air', hint: 'Dust, rain, salt, chemicals' },
  { id: 'hazardous', label: 'Hazardous area', hint: 'Flammable gas or vapour may be present' },
  { id: 'portable', label: 'Temporary or remote power', hint: 'Job sites, pumps, small buildings' },
  { id: 'control', label: 'Control circuits', hint: 'Relays, contactors, PLCs, switchgear controls' },
  { id: 'motorstart', label: 'Start a large motor', hint: 'Reduce inrush and voltage dip' },
  { id: 'mv', label: 'Medium-voltage service', hint: '2.4 kV – 46 kV distribution' },
  { id: 'grounding', label: 'Ground an ungrounded system', hint: 'Create a neutral for protection' },
  { id: 'surge', label: 'Switching surges', hint: 'Vacuum breakers, long cables' },
  { id: 'fault', label: 'Limit fault current', hint: 'Medium-voltage feeders and filters' },
]

export const familyOf = (id: FamilyId) => FAMILIES.find(f => f.id === id)!
export const productHref = (p: Pick<DryProduct, 'family' | 'slug'>) => `${familyOf(p.family).href}/${p.slug}`
export const productsIn = (id: FamilyId) => PRODUCTS.filter(p => p.family === id)
export const findProduct = (family: FamilyId, slug: string) => PRODUCTS.find(p => p.family === family && p.slug === slug)
export const bySlug = (slug: string) => PRODUCTS.find(p => p.slug === slug)

export * from './shared'

/** Resolve a related key: "family/slug", or a slug (same family first, then any family). */
export function resolve(key: string, from?: FamilyId) {
  if (key.includes('/')) {
    const [f, s] = key.split('/') as [FamilyId, string]
    return findProduct(f, s)
  }
  return (from && findProduct(from, key)) || bySlug(key)
}
