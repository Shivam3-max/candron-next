import { CONDITIONS, STATUSES, RATING_UNITS, ITEM_CODE_PATTERN, type SpecRow } from '@/lib/inventory'

export type ProductInput = {
  slug: string; sku: string; name: string; short_description: string; description: string; category: string
  condition_name: string; status: string; manufacturer: string; year_built: number | null
  kva: number | null; rating_unit: string; input_voltage: string; output_voltage: string; phase: string
  frequency: string; winding: string; cooling: string; special_type: string
  price_min: number | null; price_max: number | null; show_price: boolean; currency: string
  stock_quantity: number; location: string; lead_time: string; warranty: string
  dim_height: number | null; dim_width: number | null; dim_depth: number | null; dim_unit: string
  weight: number | null; weight_unit: string
  highlights: string[]; documents: { label: string; url: string }[]; specs: SpecRow[]
  is_featured: boolean; is_active: boolean
}

const text = (value: unknown, max = 500) => String(value ?? '').trim().slice(0, max)
const nullableNumber = (value: unknown) => (value === '' || value === null || value === undefined ? null : Number(value))
export function isValidCurrency(code: string) {
  if (!/^[A-Z]{3}$/.test(code)) return false
  try { new Intl.NumberFormat('en-CA', { style: 'currency', currency: code }); return true } catch { return false }
}

/** Map MySQL errors to messages that are safe to show in the admin UI. */
export function productErrorMessage(error: unknown, fallback: string) {
  const code = (error as { code?: string })?.code
  if (code === 'ER_DUP_ENTRY') return 'That item code or URL slug is already used by another product.'
  if (code?.startsWith('ER_')) return fallback
  return error instanceof Error ? error.message : fallback
}

const oneOf = (value: string, list: readonly string[], label: string) => {
  if (!list.includes(value)) throw new Error(`Invalid ${label}.`)
  return value
}

export function parseProductInput(body: Record<string, unknown>): ProductInput {
  const name = text(body.name, 255)
  const sku = text(body.sku, 100).toUpperCase()
  const slug = text(body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), 190)
  const category = text(body.category, 120)
  if (!name || !sku || !slug || !category) throw new Error('Name, item code, URL slug and category are required.')
  if (!ITEM_CODE_PATTERN.test(sku)) throw new Error('Item code may use capital letters, numbers and hyphens only (e.g. CE-PMT-0500-001).')
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('URL slug may contain lowercase letters, numbers and hyphens only.')

  const numbers = {
    kva: nullableNumber(body.kva), price_min: nullableNumber(body.price_min), price_max: nullableNumber(body.price_max),
    dim_height: nullableNumber(body.dim_height), dim_width: nullableNumber(body.dim_width), dim_depth: nullableNumber(body.dim_depth),
    weight: nullableNumber(body.weight), year_built: nullableNumber(body.year_built),
  }
  for (const [key, value] of Object.entries(numbers)) {
    if (value !== null && (!Number.isFinite(value) || value < 0)) throw new Error(`${key.replace('_', ' ')} must be a positive number.`)
  }
  if (numbers.price_min !== null && numbers.price_max !== null && numbers.price_max < numbers.price_min) throw new Error('Maximum price must be at least the starting price.')
  // Column limits: kva DECIMAL(12,2), prices DECIMAL(14,2), dimensions DECIMAL(10,2), weight DECIMAL(12,2), stock INT UNSIGNED
  if (numbers.kva !== null && numbers.kva >= 1e10) throw new Error('Rating is too large.')
  if ([numbers.price_min, numbers.price_max].some(v => v !== null && v >= 1e12)) throw new Error('Price is too large.')
  if ([numbers.dim_height, numbers.dim_width, numbers.dim_depth].some(v => v !== null && v >= 1e8)) throw new Error('Dimension is too large.')
  if (numbers.weight !== null && numbers.weight >= 1e10) throw new Error('Weight is too large.')
  if (Number(body.stock_quantity) > 1_000_000_000) throw new Error('Stock quantity is too large.')
  // An invalid code makes Intl.NumberFormat throw and would crash the public inventory pages
  const currency = text(body.currency || 'CAD', 10).toUpperCase()
  if (!['CAD', 'USD'].includes(currency) || !isValidCurrency(currency)) throw new Error('Currency must be CAD or USD.')

  const highlights = Array.isArray(body.highlights) ? body.highlights.map(h => text(h, 200)).filter(Boolean).slice(0, 12) : []
  const documents = Array.isArray(body.documents)
    ? body.documents
        .map(d => (d && typeof d === 'object' ? { label: text((d as Record<string, unknown>).label, 120), url: text((d as Record<string, unknown>).url, 500) } : null))
        .filter((d): d is { label: string; url: string } => !!d && !!d.url && (/^https:\/\//.test(d.url) || d.url.startsWith('/')))
        .slice(0, 10)
    : []
  const specs = Array.isArray(body.specs)
    ? body.specs
        .map(r => (r && typeof r === 'object' ? r as Record<string, unknown> : null))
        .filter((r): r is Record<string, unknown> => !!r)
        .map(r => ({ group: text(r.group || 'Specifications', 60), label: text(r.label, 100), value: text(r.value, 300) }))
        .filter(r => r.label && r.value)
        .slice(0, 60)
    : []

  return {
    slug, sku, name, category,
    short_description: text(body.short_description, 500),
    description: text(body.description, 10000),
    condition_name: oneOf(text(body.condition_name || 'New', 30), CONDITIONS, 'condition'),
    status: oneOf(text(body.status || 'Available', 30), STATUSES, 'status'),
    manufacturer: text(body.manufacturer || 'CANDRON', 120),
    year_built: numbers.year_built === null ? null : Math.round(numbers.year_built),
    kva: numbers.kva,
    rating_unit: oneOf(text(body.rating_unit || 'kVA', 12), RATING_UNITS, 'rating unit'),
    input_voltage: text(body.input_voltage, 80), output_voltage: text(body.output_voltage, 80),
    phase: text(body.phase, 40), frequency: text(body.frequency, 20), winding: text(body.winding, 40),
    cooling: text(body.cooling, 40), special_type: text(body.special_type, 120),
    price_min: numbers.price_min, price_max: numbers.price_max, show_price: body.show_price !== false,
    currency,
    stock_quantity: Math.max(0, Math.floor(Number(body.stock_quantity) || 0)),
    location: text(body.location, 120), lead_time: text(body.lead_time, 120), warranty: text(body.warranty, 120),
    dim_height: numbers.dim_height, dim_width: numbers.dim_width, dim_depth: numbers.dim_depth,
    dim_unit: text(body.dim_unit, 4) === 'mm' ? 'mm' : 'in',
    weight: numbers.weight, weight_unit: text(body.weight_unit, 4) === 'kg' ? 'kg' : 'lb',
    highlights, documents, specs,
    is_featured: Boolean(body.is_featured), is_active: body.is_active !== false,
  }
}

export const productColumns = [
  'slug', 'sku', 'name', 'short_description', 'description', 'category', 'condition_name', 'status', 'manufacturer',
  'year_built', 'kva', 'rating_unit', 'input_voltage', 'output_voltage', 'phase', 'frequency', 'winding', 'cooling',
  'special_type', 'price_min', 'price_max', 'show_price', 'currency', 'stock_quantity', 'location', 'lead_time',
  'warranty', 'dim_height', 'dim_width', 'dim_depth', 'dim_unit', 'weight', 'weight_unit', 'highlights_json',
  'documents_json', 'specs_json', 'is_featured', 'is_active',
] as const

export function productValues(i: ProductInput) {
  return [
    i.slug, i.sku, i.name, i.short_description, i.description, i.category, i.condition_name, i.status, i.manufacturer,
    i.year_built, i.kva, i.rating_unit, i.input_voltage, i.output_voltage, i.phase, i.frequency, i.winding, i.cooling,
    i.special_type, i.price_min, i.price_max, Number(i.show_price), i.currency, i.stock_quantity, i.location, i.lead_time,
    i.warranty, i.dim_height, i.dim_width, i.dim_depth, i.dim_unit, i.weight, i.weight_unit, JSON.stringify(i.highlights),
    JSON.stringify(i.documents), JSON.stringify(i.specs), Number(i.is_featured), Number(i.is_active),
  ]
}
