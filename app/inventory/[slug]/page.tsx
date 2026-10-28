import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPublicProduct } from '@/lib/db'
import { artFor, CONDITION_NOTE, PHONE, type SpecRow } from '@/lib/inventory'
import { availability, paragraphs, priceLabel, ratingText } from '@/lib/inventory-format'
import ProductGallery from '@/components/inventory/ProductGallery'
import QuoteForm from '@/components/inventory/QuoteForm'
import CopyCode from '@/components/inventory/CopyCode'
import DimensionDrawing from '@/components/inventory/DimensionDrawing'
import ProductCard from '@/components/inventory/ProductCard'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const result = await getPublicProduct(slug)
  if (!result) return { title: 'Inventory item not found' }
  const { product } = result
  return {
    title: `${product.name} · ${product.sku}`,
    description: product.short_description || `${product.name} in stock at CANDRON, Toronto.`,
    alternates: { canonical: `/inventory/${product.slug}` },
    openGraph: { title: product.name, description: product.short_description, images: product.images.slice(0, 1) },
  }
}

export default async function InventoryProductPage({ params }: Props) {
  const { slug } = await params
  const result = await getPublicProduct(slug)
  if (!result) notFound()
  const { product: p, related } = result

  const price = priceLabel(p)
  const avail = availability(p)
  const keySpecs = [
    { label: 'Rating', value: ratingText(p.kva, p.rating_unit) },
    { label: 'Primary', value: p.input_voltage ? `${p.input_voltage} V` : '' },
    { label: 'Secondary', value: p.output_voltage ? `${p.output_voltage} V` : '' },
    { label: 'Phase', value: p.phase },
  ].filter(s => s.value)

  const ratingRows: SpecRow[] = [
    ['Rating', ratingText(p.kva, p.rating_unit)], ['Primary voltage (HV)', p.input_voltage && `${p.input_voltage} V`],
    ['Secondary voltage (LV)', p.output_voltage && `${p.output_voltage} V`], ['Phase', p.phase], ['Frequency', p.frequency],
    ['Winding', p.winding], ['Cooling class', p.cooling], ['Application', p.special_type],
  ].filter(([, v]) => v).map(([label, value]) => ({ group: 'Ratings', label, value }))
  const generalRows: SpecRow[] = [
    ['Item code', p.sku], ['Category', p.category], ['Condition', p.condition_name], ['Manufacturer', p.manufacturer],
    ['Year built', p.year_built ? String(p.year_built) : ''],
  ].filter(([, v]) => v).map(([label, value]) => ({ group: 'General', label, value }))
  const specGroups = [...ratingRows, ...p.specs, ...generalRows].reduce<Record<string, SpecRow[]>>((acc, row) => {
    (acc[row.group] ||= []).push(row)
    return acc
  }, {})

  const hasDims = Boolean(p.dim_height && p.dim_width)
  const sections = [
    ['overview', 'Overview'], ['specifications', 'Specifications'],
    ...(hasDims || p.weight ? [['dimensions', 'Dimensions & weight']] : []),
    ['shipping', 'Shipping & warranty'],
    ...(p.documents.length ? [['documents', 'Documents']] : []),
    ['quote', 'Request a quote'],
  ] as [string, string][]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    sku: p.sku,
    category: p.category,
    description: p.short_description,
    brand: { '@type': 'Brand', name: p.manufacturer || 'CANDRON' },
    itemCondition: `https://schema.org/${p.condition_name === 'Used' ? 'UsedCondition' : p.condition_name === 'Remanufactured' ? 'RefurbishedCondition' : 'NewCondition'}`,
    ...(p.show_price && p.price_min !== null ? {
      offers: { '@type': 'Offer', priceCurrency: p.currency, price: p.price_min, availability: `https://schema.org/${p.stock_quantity > 0 && p.status === 'Available' ? 'InStock' : 'PreOrder'}` },
    } : {}),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="pd-crumbs">
        <div className="container pd-crumbs-inner">
          <nav aria-label="Breadcrumb">
            <Link href="/inventory">← Inventory</Link>
            <span aria-hidden="true">/</span>
            <span>{p.category}</span>
          </nav>
          <a href={PHONE.href} className="pd-crumbs-phone">Questions? <strong>{PHONE.label}</strong></a>
        </div>
      </div>

      <section className="pd-top">
        <div className="container pd-top-grid">
          <ProductGallery images={p.images} name={p.name} art={artFor(p.category)} />

          <div className="pd-buy">
            <div className="pd-badges">
              <span className={`inv-badge inv-${avail.tone}`}>{avail.text}</span>
              <span className="pd-cond">{p.condition_name}</span>
              {p.special_type && <span className="pd-cond">{p.special_type}</span>}
            </div>
            <h1>{p.name}</h1>
            <CopyCode code={p.sku} />
            {p.short_description && <p className="pd-summary">{p.short_description}</p>}

            {keySpecs.length > 0 && (
              <dl className="pd-keyspecs">
                {keySpecs.map(s => <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>)}
              </dl>
            )}

            <div className="pd-price">
              <div>
                <small>{price.kicker}</small>
                <strong>{price.value}</strong>
                <span>{price.note}</span>
              </div>
            </div>

            <ul className="pd-facts">
              {p.location && <li><span>Stocked at</span>{p.location}</li>}
              {p.lead_time && <li><span>Ships</span>{p.lead_time}</li>}
              {p.warranty && <li><span>Warranty</span>{p.warranty}</li>}
            </ul>

            <div className="pd-actions">
              <a href="#quote" className="btn btn-primary">Request a quote</a>
              <a href={PHONE.href} className="btn btn-outline-blue">Call {PHONE.label}</a>
            </div>
            {p.documents[0] && (
              <a href={p.documents[0].url} className="pd-doc-link" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M12 11v6M9 14l3 3 3-3" /></svg>
                {p.documents[0].label || 'Download spec sheet'}
              </a>
            )}

            <ul className="pd-trust">
              <li>Factory-tested before shipment</li>
              <li>Inspected and crated in Toronto</li>
              <li>Engineering support for site changes</li>
            </ul>
          </div>
        </div>
      </section>

      <nav className="pd-tabs" aria-label="Product sections">
        <div className="container">{sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</div>
      </nav>

      <div className="pd-sections">
        <div className="container pd-sections-grid">
          <div className="pd-main-col">
            <section id="overview" className="pd-section">
              <h2>Overview</h2>
              {paragraphs(p.description).map((t, i) => <p key={i}>{t}</p>)}
              {p.highlights.length > 0 && (
                <ul className="pd-highlights">{p.highlights.map(h => <li key={h}>{h}</li>)}</ul>
              )}
              {CONDITION_NOTE[p.condition_name] && (
                <p className="pd-condition-note"><strong>{p.condition_name}:</strong> {CONDITION_NOTE[p.condition_name]}</p>
              )}
            </section>

            <section id="specifications" className="pd-section">
              <h2>Specifications</h2>
              <div className="pd-spec-groups">
                {Object.entries(specGroups).map(([group, rows]) => (
                  <div key={group} className="pd-spec-group">
                    <h3>{group}</h3>
                    <dl>{rows.map(r => <div key={r.label}><dt>{r.label}</dt><dd>{r.value}</dd></div>)}</dl>
                  </div>
                ))}
              </div>
            </section>

            {(hasDims || p.weight) && (
              <section id="dimensions" className="pd-section">
                <h2>Dimensions & weight</h2>
                <div className="pd-dims-wrap">
                  <DimensionDrawing h={p.dim_height} w={p.dim_width} d={p.dim_depth} unit={p.dim_unit} />
                  <dl className="pd-dims-table">
                    {p.dim_height && <div><dt>Height</dt><dd>{p.dim_height.toLocaleString('en-CA')} {p.dim_unit}</dd></div>}
                    {p.dim_width && <div><dt>Width</dt><dd>{p.dim_width.toLocaleString('en-CA')} {p.dim_unit}</dd></div>}
                    {p.dim_depth && <div><dt>Depth</dt><dd>{p.dim_depth.toLocaleString('en-CA')} {p.dim_unit}</dd></div>}
                    {p.weight && <div><dt>Weight</dt><dd>{p.weight.toLocaleString('en-CA')} {p.weight_unit}</dd></div>}
                  </dl>
                </div>
                <p className="pd-fine">Overall dimensions are approximate. Certified outline drawings are supplied with the order.</p>
              </section>
            )}

            <section id="shipping" className="pd-section">
              <h2>Shipping & warranty</h2>
              <div className="pd-info-cards">
                <div><h3>Shipping</h3><p>Ships from {p.location || 'Toronto, Ontario'}{p.lead_time ? ` — ${p.lead_time.toLowerCase()}` : ''}. We crate, load and arrange flatbed freight anywhere in Canada and the United States.</p></div>
                <div><h3>Warranty</h3><p>{p.warranty ? `${p.warranty} CANDRON warranty` : 'Covered by the CANDRON equipment warranty'}, backed by our own field service team.</p></div>
                <div><h3>Testing</h3><p>Routine factory tests are completed before shipment, and the test report travels with the unit.</p></div>
              </div>
            </section>

            {p.documents.length > 0 && (
              <section id="documents" className="pd-section">
                <h2>Documents</h2>
                <ul className="pd-docs">
                  {p.documents.map(d => <li key={d.url}><a href={d.url} target="_blank" rel="noreferrer">{d.label || d.url}<span aria-hidden="true">↗</span></a></li>)}
                </ul>
              </section>
            )}
          </div>

          <aside id="quote" className="pd-quote">
            <div className="pd-quote-card">
              <div className="label">Request a quote</div>
              <h2>Price and availability for {p.sku}</h2>
              <p>Tell us where it’s going and when you need it. We usually reply the same business day.</p>
              <QuoteForm sku={p.sku} name={p.name} />
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="pd-related">
          <div className="container">
            <div className="pd-related-head">
              <h2>More from inventory</h2>
              <Link href="/inventory" className="btn btn-outline-blue">All inventory →</Link>
            </div>
            <div className="inv-grid">{related.map(r => <ProductCard key={r.id} p={r} />)}</div>
          </div>
        </section>
      )}

      <div className="pd-mobilebar">
        <div><small>{price.kicker}</small><strong>{price.value}</strong></div>
        <a href="#quote" className="btn btn-primary">Request a quote</a>
      </div>
    </>
  )
}
