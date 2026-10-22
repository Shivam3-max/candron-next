'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import ProductCard, { type CardProduct } from '@/components/inventory/ProductCard'
import { PHONE } from '@/lib/inventory'

type Option = { value: string | number; count: number }
type Filters = Record<string, Option[]>

// query param, column in the API's filter payload, label
const FACETS = [
  ['condition', 'condition_name', 'Condition'],
  ['status', 'status', 'Availability'],
  ['phase', 'phase', 'Phase'],
  ['rating', 'kva', 'Rating'],
  ['primary', 'input_voltage', 'Primary voltage'],
  ['secondary', 'output_voltage', 'Secondary voltage'],
] as const

const SORTS = [
  ['featured', 'Featured first'], ['newest', 'Newest'], ['rating-asc', 'Rating: low to high'],
  ['rating-desc', 'Rating: high to low'], ['price-asc', 'Price: low to high'], ['price-desc', 'Price: high to low'], ['name', 'Name A–Z'],
] as const

const PAGE_SIZE = 12

export default function InventoryClient() {
  const [products, setProducts] = useState<CardProduct[]>([])
  const [filters, setFilters] = useState<Filters>({})
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState('')
  const [inStock, setInStock] = useState(false)
  const [selected, setSelected] = useState<Record<string, string>>({})
  const [showFilters, setShowFilters] = useState(false)

  const params = useMemo(() => {
    const p = new URLSearchParams({ page: String(page), limit: String(PAGE_SIZE), sort })
    if (query.trim()) p.set('q', query.trim())
    if (category) p.set('category', category)
    if (inStock) p.set('inStock', '1')
    Object.entries(selected).forEach(([k, v]) => v && p.set(k, v))
    return p
  }, [page, sort, query, category, inStock, selected])

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const r = await fetch(`/api/catalog?${params}`, { cache: 'no-store' })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error || 'Unable to load inventory')
      if (d.databaseAvailable === false) throw new Error('Inventory is temporarily unavailable. Please call us or try again shortly.')
      setProducts(d.products)
      setFilters(d.filters)
      setTotal(d.total)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to load inventory')
    } finally {
      setLoading(false)
    }
  }, [params])

  useEffect(() => {
    const t = setTimeout(load, query ? 250 : 0)
    return () => clearTimeout(t)
  }, [load, query])

  const pick = (key: string, value: string) => { setSelected(s => ({ ...s, [key]: s[key] === value ? '' : value })); setPage(1) }
  const clearAll = () => { setSelected({}); setCategory(''); setInStock(false); setQuery(''); setPage(1) }
  const activeCount = Object.values(selected).filter(Boolean).length + (category ? 1 : 0) + (inStock ? 1 : 0)
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const categories = filters.category || []

  return (
    <>
      <section className="inv-hero">
        <div className="container inv-hero-inner">
          <div className="inv-hero-copy">
            <div className="label label-white">CANDRON Inventory</div>
            <h1>Equipment ready <em>to ship.</em></h1>
            <p>Transformers, switchgear and power distribution equipment in stock in Toronto. Every unit is inspected and tested before it leaves our floor.</p>
            <label className="inv-search">
              <span className="sr-only">Search inventory</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>
              <input value={query} onChange={e => { setQuery(e.target.value); setPage(1) }} placeholder="Search by rating, voltage, item code…" />
            </label>
          </div>
          <ul className="inv-hero-facts">
            <li><strong>Factory-tested</strong><span>Test report with every unit</span></li>
            <li><strong>Ships from Toronto</strong><span>Crated and loaded by our team</span></li>
            <li><strong>Same-day quotes</strong><span><a href={PHONE.href}>{PHONE.label}</a></span></li>
          </ul>
        </div>
      </section>

      <section className="inv-body">
        <div className="container">
          {categories.length > 0 && (
            <div className="inv-cats" role="group" aria-label="Filter by category">
              <button type="button" className={!category ? 'on' : ''} onClick={() => { setCategory(''); setPage(1) }}>All equipment</button>
              {categories.map(c => (
                <button key={String(c.value)} type="button" className={category === c.value ? 'on' : ''} onClick={() => { setCategory(category === c.value ? '' : String(c.value)); setPage(1) }}>
                  {c.value}<span>{c.count}</span>
                </button>
              ))}
            </div>
          )}

          <div className="inv-layout">
            <aside className={`inv-filters${showFilters ? ' open' : ''}`} aria-label="Refine results">
              <div className="inv-filters-head">
                <h2>Refine</h2>
                {activeCount > 0 && <button type="button" onClick={clearAll}>Clear all ({activeCount})</button>}
              </div>
              <label className="inv-switch">
                <input type="checkbox" checked={inStock} onChange={e => { setInStock(e.target.checked); setPage(1) }} />
                <span>In stock, ready to ship</span>
              </label>
              {FACETS.map(([key, column, label]) => {
                const options = filters[column] || []
                if (!options.length) return null
                return (
                  <fieldset key={key} className="inv-facet">
                    <legend>{label}</legend>
                    <div className="inv-chips">
                      {options.map(o => {
                        const v = String(o.value)
                        return (
                          <button key={v} type="button" className={selected[key] === v ? 'on' : ''} aria-pressed={selected[key] === v} onClick={() => pick(key, v)}>
                            {column === 'kva' ? Number(v).toLocaleString('en-CA') : v}<span>{o.count}</span>
                          </button>
                        )
                      })}
                    </div>
                  </fieldset>
                )
              })}
            </aside>

            <div className="inv-results">
              <div className="inv-toolbar">
                <p aria-live="polite"><strong>{total}</strong> {total === 1 ? 'item' : 'items'}{category ? ` in ${category}` : ''}</p>
                <button type="button" className="inv-filter-toggle" onClick={() => setShowFilters(s => !s)} aria-expanded={showFilters}>
                  Filters{activeCount ? ` (${activeCount})` : ''}
                </button>
                <label className="inv-sort">
                  <span>Sort</span>
                  <select value={sort} onChange={e => { setSort(e.target.value); setPage(1) }}>
                    {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </label>
              </div>

              {loading ? (
                <div className="inv-grid">{Array.from({ length: 3 }, (_, i) => <div key={i} className="inv-card inv-skeleton" />)}</div>
              ) : error ? (
                <div className="inv-empty"><h2>Inventory unavailable</h2><p>{error}</p><button type="button" onClick={load} className="btn btn-primary">Try again</button></div>
              ) : products.length === 0 ? (
                <div className="inv-empty">
                  <h2>Nothing matches yet</h2>
                  <p>We build to order too. Tell us the rating and voltages you need and we’ll quote stock or a factory build the same day.</p>
                  <div className="inv-empty-actions">
                    {activeCount > 0 && <button type="button" className="btn btn-outline-blue" onClick={clearAll}>Clear filters</button>}
                    <Link href="/contact" className="btn btn-primary">Request a quote</Link>
                  </div>
                </div>
              ) : (
                <div className="inv-grid">{products.map(p => <ProductCard key={p.id} p={p} />)}</div>
              )}

              {pages > 1 && (
                <nav className="inv-pager" aria-label="Pages">
                  <button type="button" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Previous</button>
                  <span>Page {page} of {pages}</span>
                  <button type="button" disabled={page >= pages} onClick={() => setPage(p => p + 1)}>Next →</button>
                </nav>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
