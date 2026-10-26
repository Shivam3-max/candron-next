import type { LineArtKind } from '@/lib/lineart-meta'
import type { FAQ, KPI, SpecRow, Standard } from '@/components/ProductTypePage'

/**
 * A product range (dry-type, liquid-filled, switchboards & switchgear, load banks…):
 * a hub page, family pages and one data record per product page.
 */

export interface Art { kind: LineArtKind; views?: string[] }

export interface RangeProduct {
  slug: string
  family: string
  /** Page URL when it doesn't follow family.href + '/' + slug (kept for existing URLs). */
  path?: string
  /** Full page name */
  name: string
  /** Short name for menus and cards */
  short: string
  /** One-line range for cards and menus */
  range: string
  /** One plain-English sentence: what it does */
  does: string
  /** "Pick this when…" bullets, in plain words */
  pickIf: string[]
  /** A nearby product that suits a different situation better */
  insteadIf?: { text: string; slug: string }
  needs: string[]
  /** Comparison-table cells, keyed by the range's compareCols */
  compare: Record<string, string>
  meta: { title: string; description: string }
  art: Art
  /** CANDRON's own photo for this product (e.g. a project photo); overrides the drawing. */
  photo?: { src: string; alt: string }
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

export interface RangeFamily {
  id: string
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

export interface RangeNeed { id: string; label: string; hint: string }

export interface RangeHub {
  /** Breadcrumb trail between Home and the hub, e.g. Products / Transformers */
  crumbs: { label: string; href: string }[]
  label: string
  h1: [string, string]
  lead: string
  art: Art
  stats: { value: string; label: string }[]
  why: { label: string; title: string; items: { t: string; d: string }[] }
  /** Optional deeper look at one benefit, shown right after the "why" cards */
  spotlight?: { label: string; title: string; intro: string; points: { t: string; d: string }[]; outcome: string }
  basics?: { label: string; title: string; intro: string; items: { t: string; d: string; href: string }[] }
  finderIntro: string
  faqs: FAQ[]
  cta: { title: string; text: string; product: string }
  meta: { title: string; description: string }
}

export interface RangeDef {
  id: string
  /** "Dry-Type" — used in breadcrumbs and labels */
  name: string
  /** "dry-type transformers" — used in sentences */
  noun: string
  hubHref: string
  hub: RangeHub
  guide?: { href: string; label: string }
  /** Real photos, if added later, live in /public/images/<photoDir>/<slug>.webp */
  photoDir: string
  compareCols: { key: string; label: string }[]
  /** The two compare cells shown on family cards */
  cardCols: [string, string]
  families: RangeFamily[]
  products: RangeProduct[]
  needs: RangeNeed[]
}
