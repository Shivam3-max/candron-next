export type ProductInput = {
  slug: string; sku: string; name: string; short_description: string; description: string; category: string
  condition_name: 'New' | 'Used' | 'Remanufactured'; kva: number | null; input_voltage: string
  output_voltage: string; phase: string; special_type: string; price_min: number | null; price_max: number | null
  currency: string; stock_quantity: number; lead_time: string; specs: Record<string, string>
  is_featured: boolean; is_active: boolean
}

const legacyBrandPattern = new RegExp(`\\b${['mad', 'dox'].join('')}\\b`, 'gi')
const text = (value: unknown, max = 500) => String(value ?? '').replace(legacyBrandPattern, 'CANDRON').trim().slice(0, max)
const nullableNumber = (value: unknown) => value === '' || value === null || value === undefined ? null : Number(value)

export function parseProductInput(body: Record<string, unknown>): ProductInput {
  const name = text(body.name, 255)
  const sku = text(body.sku, 100)
  const slug = text(body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), 190)
  const category = text(body.category, 120)
  if (!name || !sku || !slug || !category) throw new Error('Name, SKU, slug, and category are required.')
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Slug may contain lowercase letters, numbers, and hyphens only.')
  const condition = text(body.condition_name || 'New', 30)
  if (!['New', 'Used', 'Remanufactured'].includes(condition)) throw new Error('Invalid condition.')
  const kva = nullableNumber(body.kva), priceMin = nullableNumber(body.price_min), priceMax = nullableNumber(body.price_max)
  if ([kva, priceMin, priceMax].some(value => value !== null && (!Number.isFinite(value) || value < 0))) throw new Error('Numeric values must be positive.')
  const rawSpecs = body.specs
  const specs = rawSpecs && typeof rawSpecs === 'object' && !Array.isArray(rawSpecs)
    ? Object.fromEntries(Object.entries(rawSpecs).map(([key, value]) => [text(key, 100), text(value, 500)]).filter(([key]) => key)) : {}
  return {
    slug, sku, name, short_description: text(body.short_description, 500), description: text(body.description, 10000), category,
    condition_name: condition as ProductInput['condition_name'], kva, input_voltage: text(body.input_voltage, 80),
    output_voltage: text(body.output_voltage, 80), phase: text(body.phase, 40), special_type: text(body.special_type, 120),
    price_min: priceMin, price_max: priceMax, currency: text(body.currency || 'CAD', 3).toUpperCase(),
    stock_quantity: Math.max(0, Math.floor(Number(body.stock_quantity) || 0)), lead_time: text(body.lead_time, 120), specs,
    is_featured: Boolean(body.is_featured), is_active: body.is_active !== false,
  }
}

export const productColumns = ['slug','sku','name','short_description','description','category','condition_name','kva','input_voltage','output_voltage','phase','special_type','price_min','price_max','currency','stock_quantity','lead_time','specs_json','is_featured','is_active'] as const
export function productValues(i: ProductInput) { return [i.slug,i.sku,i.name,i.short_description,i.description,i.category,i.condition_name,i.kva,i.input_voltage,i.output_voltage,i.phase,i.special_type,i.price_min,i.price_max,i.currency,i.stock_quantity,i.lead_time,JSON.stringify(i.specs),Number(i.is_featured),Number(i.is_active)] }
