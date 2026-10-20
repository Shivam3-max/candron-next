import Link from 'next/link'
import InventoryArt from '@/components/inventory/InventoryArt'
import { artFor } from '@/lib/inventory'
import { availability, priceLabel, ratingText, voltageText, type PriceFields } from '@/lib/inventory-format'

export interface CardProduct extends PriceFields {
  id: number
  slug: string
  sku: string
  name: string
  short_description: string
  category: string
  condition_name: string
  status: string
  kva: number | null
  rating_unit: string
  input_voltage: string
  output_voltage: string
  phase: string
  stock_quantity: number
  location: string
  lead_time: string
  image: string | null
  is_featured: boolean
}

export default function ProductCard({ p }: { p: CardProduct }) {
  const price = priceLabel(p)
  const avail = availability(p)
  const specs = [ratingText(p.kva, p.rating_unit), voltageText(p.input_voltage, p.output_voltage), p.phase].filter(Boolean)
  return (
    <article className="inv-card">
      <Link href={`/inventory/${p.slug}`} className="inv-card-media" aria-label={p.name}>
        {p.image
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={p.image} alt="" loading="lazy" />
          : <InventoryArt kind={artFor(p.category)} />}
        <span className={`inv-badge inv-${avail.tone}`}>{avail.text}</span>
        {p.is_featured && <span className="inv-flag">Featured</span>}
      </Link>
      <div className="inv-card-body">
        <div className="inv-card-meta"><span>{p.sku}</span><span>{p.condition_name}</span></div>
        <h3><Link href={`/inventory/${p.slug}`}>{p.name}</Link></h3>
        {specs.length > 0 && (
          <ul className="inv-card-specs">{specs.map(s => <li key={s}>{s}</li>)}</ul>
        )}
        <div className="inv-card-foot">
          <div className="inv-card-price">
            <small>{price.kicker}</small>
            <strong>{price.value}</strong>
          </div>
          <Link href={`/inventory/${p.slug}`} className="inv-card-cta">View <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </article>
  )
}
