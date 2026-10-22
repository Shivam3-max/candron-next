'use client'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  CATEGORIES, CONDITIONS, STATUSES, RATING_UNITS, PHASES, FREQUENCIES, WINDINGS, COOLING, SPEC_TEMPLATE,
  suggestItemCode, type SpecRow,
} from '@/lib/inventory'
import type { InventoryProduct } from '@/lib/db'

type Product = InventoryProduct
type Img = { id: number; name: string; url: string }

const blank = {
  name: '', sku: '', slug: '', category: CATEGORIES[0].name, condition_name: 'New', status: 'Available', manufacturer: 'CANDRON',
  year_built: '', special_type: '', short_description: '', kva: '', rating_unit: 'kVA', input_voltage: '', output_voltage: '',
  phase: 'Three-phase', frequency: '60 Hz', winding: '', cooling: '', show_price: true, price_min: '', price_max: '',
  currency: 'CAD', stock_quantity: '1', location: 'Toronto, ON', lead_time: '', warranty: '', dim_height: '', dim_width: '',
  dim_depth: '', dim_unit: 'in', weight: '', weight_unit: 'lb', description: '', is_featured: false, is_active: true,
}
type Form = typeof blank

const str = (v: number | null | undefined) => (v === null || v === undefined ? '' : String(v))
const toForm = (p: Product): Form => ({
  name: p.name, sku: p.sku, slug: p.slug, category: p.category, condition_name: p.condition_name, status: p.status || 'Available',
  manufacturer: p.manufacturer || '', year_built: str(p.year_built), special_type: p.special_type || '',
  short_description: p.short_description || '', kva: str(p.kva), rating_unit: p.rating_unit || 'kVA',
  input_voltage: p.input_voltage || '', output_voltage: p.output_voltage || '', phase: p.phase || '', frequency: p.frequency || '',
  winding: p.winding || '', cooling: p.cooling || '', show_price: p.show_price, price_min: str(p.price_min), price_max: str(p.price_max),
  currency: p.currency || 'CAD', stock_quantity: String(p.stock_quantity ?? 0), location: p.location || '', lead_time: p.lead_time || '',
  warranty: p.warranty || '', dim_height: str(p.dim_height), dim_width: str(p.dim_width), dim_depth: str(p.dim_depth),
  dim_unit: p.dim_unit || 'in', weight: str(p.weight), weight_unit: p.weight_unit || 'lb', description: p.description || '',
  is_featured: p.is_featured, is_active: p.is_active,
})
const slugify = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

/** Template spec rows first (so the form always offers them), then any extra rows the product has. */
function specsForEditor(specs: SpecRow[]): SpecRow[] {
  const rows: SpecRow[] = SPEC_TEMPLATE.flatMap(g => g.fields.map(label => ({
    group: g.group, label, value: specs.find(s => s.group === g.group && s.label === label)?.value ?? '',
  })))
  const extras = specs.filter(s => !rows.some(r => r.group === s.group && r.label === s.label))
  return [...rows, ...extras]
}

function Field({ label, hint, children, wide }: { label: string; hint?: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <label className={`ia-field${wide ? ' ia-wide' : ''}`}>
      <span className="ia-label">{label}</span>
      {children}
      {hint && <span className="ia-hint">{hint}</span>}
    </label>
  )
}

export default function AdminProducts({ initialProducts, adminEmail }: { initialProducts: Product[]; adminEmail: string }) {
  const router = useRouter()
  const [products, setProducts] = useState(initialProducts)
  const [editing, setEditing] = useState<Product | null>(initialProducts[0] ?? null)
  const [form, setForm] = useState<Form>(initialProducts[0] ? toForm(initialProducts[0]) : blank)
  const [slugLocked, setSlugLocked] = useState(Boolean(initialProducts[0]))
  const [specs, setSpecs] = useState<SpecRow[]>(specsForEditor(initialProducts[0]?.specs ?? []))
  const [highlights, setHighlights] = useState<string[]>(initialProducts[0]?.highlights ?? [])
  const [documents, setDocuments] = useState<{ label: string; url: string }[]>(initialProducts[0]?.documents ?? [])
  const [images, setImages] = useState<Img[]>([])
  const [message, setMessage] = useState<{ tone: 'ok' | 'err'; text: string } | null>(null)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [uploading, setUploading] = useState(false)

  const list = useMemo(() => products.filter(p => `${p.name} ${p.sku} ${p.category}`.toLowerCase().includes(search.toLowerCase())), [products, search])
  const set = <K extends keyof Form>(key: K, value: Form[K]) => setForm(f => ({ ...f, [key]: value }))

  useEffect(() => {
    if (!editing) return
    let live = true
    fetch(`/api/admin/products/${editing.id}/images`)
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (live && d) setImages(d.images) })
    return () => { live = false }
  }, [editing])

  function open(product: Product | null) {
    setEditing(product)
    setImages([])
    setForm(product ? toForm(product) : blank)
    setSlugLocked(Boolean(product))
    setSpecs(specsForEditor(product?.specs ?? []))
    setHighlights(product?.highlights ?? [])
    setDocuments(product?.documents ?? [])
    setMessage(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function suggestCode() {
    const sameCategory = products.filter(p => p.category === form.category && p.id !== editing?.id).length
    set('sku', suggestItemCode(form.category, form.kva === '' ? null : Number(form.kva), sameCategory + 1))
  }

  async function refreshList(selectSlug?: string) {
    router.refresh()
    const r = await fetch('/api/admin/products')
    if (!r.ok) return
    const fresh: Product[] = (await r.json()).products
    setProducts(fresh)
    if (selectSlug) {
      const next = fresh.find(p => p.slug === selectSlug) ?? null
      setEditing(next)
    }
  }

  async function save(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    const payload = {
      ...form,
      kva: form.kva === '' ? null : Number(form.kva),
      price_min: form.price_min === '' ? null : Number(form.price_min),
      price_max: form.price_max === '' ? null : Number(form.price_max),
      year_built: form.year_built === '' ? null : Number(form.year_built),
      dim_height: form.dim_height === '' ? null : Number(form.dim_height),
      dim_width: form.dim_width === '' ? null : Number(form.dim_width),
      dim_depth: form.dim_depth === '' ? null : Number(form.dim_depth),
      weight: form.weight === '' ? null : Number(form.weight),
      stock_quantity: Number(form.stock_quantity || 0),
      specs: specs.filter(s => s.label.trim() && s.value.trim()),
      highlights: highlights.map(h => h.trim()).filter(Boolean),
      documents: documents.filter(d => d.url.trim()),
    }
    const r = await fetch(editing ? `/api/admin/products/${editing.id}` : '/api/admin/products', {
      method: editing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const d = await r.json().catch(() => ({}))
    setSaving(false)
    if (!r.ok) { setMessage({ tone: 'err', text: d.error || 'Could not save.' }); return }
    setMessage({ tone: 'ok', text: editing ? 'Saved.' : 'Product created — you can add photos now.' })
    await refreshList(payload.slug || slugify(form.name))
  }

  async function remove() {
    if (!editing || !window.confirm(`Delete ${editing.name} (${editing.sku})? This cannot be undone.`)) return
    const r = await fetch(`/api/admin/products/${editing.id}`, { method: 'DELETE' })
    if (!r.ok) { setMessage({ tone: 'err', text: 'Could not delete.' }); return }
    open(null)
    await refreshList()
  }

  async function upload(files: FileList | null) {
    if (!editing || !files?.length) return
    setUploading(true)
    for (const file of Array.from(files)) {
      const body = new FormData()
      body.append('image', file)
      const r = await fetch(`/api/admin/products/${editing.id}/images`, { method: 'POST', body })
      const d = await r.json().catch(() => ({}))
      if (!r.ok) setMessage({ tone: 'err', text: `${file.name}: ${d.error || 'upload failed'}` })
      else setImages(d.images)
    }
    setUploading(false)
  }

  async function reorder(next: Img[]) {
    if (!editing) return
    setImages(next)
    await fetch(`/api/admin/products/${editing.id}/images`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order: next.map(i => i.id) }) })
  }

  async function deleteImage(img: Img) {
    if (!editing || !window.confirm('Remove this photo?')) return
    const r = await fetch(`/api/admin/products/${editing.id}/images?imageId=${img.id}`, { method: 'DELETE' })
    if (r.ok) setImages((await r.json()).images)
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  const groups = Array.from(new Set(specs.map(s => s.group)))

  return (
    <div className="ia">
      <div className="ia-top">
        <div>
          <div className="ia-kicker">CANDRON · Inventory admin</div>
          <h1>Inventory</h1>
        </div>
        <div className="ia-top-actions">
          <span className="ia-who">{adminEmail}</span>
          <a href="/inventory" target="_blank" rel="noreferrer" className="ia-btn ia-ghost">View inventory ↗</a>
          <button type="button" onClick={logout} className="ia-btn ia-ghost">Sign out</button>
        </div>
      </div>

      <div className="ia-shell">
        <aside className="ia-list">
          <button type="button" className="ia-btn ia-primary ia-new" onClick={() => open(null)}>+ New product</button>
          <input className="ia-search" placeholder="Search name, code, category" value={search} onChange={e => setSearch(e.target.value)} />
          <div className="ia-count">{products.length} product{products.length === 1 ? '' : 's'}</div>
          <ul>
            {list.map(p => (
              <li key={p.id}>
                <button type="button" className={editing?.id === p.id ? 'on' : ''} onClick={() => open(p)}>
                  <span className="ia-thumb">
                    {p.image
                      // eslint-disable-next-line @next/next/no-img-element -- admin thumbnails served from /api/media
                      ? <img src={p.image} alt="" />
                      : <span>{p.sku.slice(3, 6)}</span>}
                  </span>
                  <span className="ia-row-text">
                    <strong>{p.name}</strong>
                    <small>{p.sku} · {p.category}</small>
                  </span>
                  <span className={`ia-pill ia-${(p.is_active ? p.status : 'Hidden').toLowerCase()}`}>{p.is_active ? p.status : 'Hidden'}</span>
                </button>
              </li>
            ))}
            {list.length === 0 && <li className="ia-empty">No products yet.</li>}
          </ul>
        </aside>

        <form className="ia-editor" onSubmit={save}>
          <div className="ia-editor-head">
            <div>
              <div className="ia-kicker">{editing ? `Editing ${editing.sku}` : 'New product'}</div>
              <h2>{form.name || 'Untitled product'}</h2>
            </div>
            {editing && <a className="ia-btn ia-ghost" href={`/inventory/${editing.slug}`} target="_blank" rel="noreferrer">Open product page ↗</a>}
          </div>

          <section className="ia-card">
            <h3>1 · Basics</h3>
            <div className="ia-grid">
              <Field label="Product name" wide>
                <input required value={form.name} onChange={e => { set('name', e.target.value); if (!slugLocked) set('slug', slugify(e.target.value)) }} placeholder="e.g. 500 kVA Three-Phase Padmount Transformer" />
              </Field>
              <Field label="Category">
                <select value={form.category} onChange={e => set('category', e.target.value)}>
                  {CATEGORIES.map(c => <option key={c.name}>{c.name}</option>)}
                  {!CATEGORIES.some(c => c.name === form.category) && <option>{form.category}</option>}
                </select>
              </Field>
              <Field label="Item code" hint="Your own code. Format suggestion: CE-PMT-0500-001">
                <div className="ia-inline">
                  <input required value={form.sku} onChange={e => set('sku', e.target.value.toUpperCase())} placeholder="CE-…" />
                  <button type="button" className="ia-btn ia-ghost ia-small" onClick={suggestCode}>Suggest</button>
                </div>
              </Field>
              <Field label="URL slug" hint={`candron.com/inventory/${form.slug || '…'}`}>
                <div className="ia-inline">
                  <input required value={form.slug} disabled={slugLocked} onChange={e => set('slug', slugify(e.target.value))} />
                  <button type="button" className="ia-btn ia-ghost ia-small" onClick={() => setSlugLocked(l => !l)}>{slugLocked ? 'Edit' : 'Lock'}</button>
                </div>
              </Field>
              <Field label="Condition">
                <select value={form.condition_name} onChange={e => set('condition_name', e.target.value)}>{CONDITIONS.map(c => <option key={c}>{c}</option>)}</select>
              </Field>
              <Field label="Status">
                <select value={form.status} onChange={e => set('status', e.target.value)}>{STATUSES.map(c => <option key={c}>{c}</option>)}</select>
              </Field>
              <Field label="Manufacturer"><input value={form.manufacturer} onChange={e => set('manufacturer', e.target.value)} /></Field>
              <Field label="Year built"><input inputMode="numeric" value={form.year_built} onChange={e => set('year_built', e.target.value.replace(/\D/g, '').slice(0, 4))} /></Field>
              <Field label="Application / type" hint="e.g. Inverter duty, K-factor, Drive isolation"><input value={form.special_type} onChange={e => set('special_type', e.target.value)} /></Field>
              <Field label={`Summary (${form.short_description.length}/220)`} wide hint="One or two lines shown under the title and on cards.">
                <textarea rows={2} maxLength={220} value={form.short_description} onChange={e => set('short_description', e.target.value)} />
              </Field>
              <div className="ia-toggles ia-wide">
                <label><input type="checkbox" checked={form.is_active} onChange={e => set('is_active', e.target.checked)} /> Visible on the website</label>
                <label><input type="checkbox" checked={form.is_featured} onChange={e => set('is_featured', e.target.checked)} /> Featured (shown first)</label>
              </div>
            </div>
          </section>

          <section className="ia-card">
            <h3>2 · Ratings</h3>
            <div className="ia-grid">
              <Field label="Rating">
                <div className="ia-inline">
                  <input inputMode="decimal" value={form.kva} onChange={e => set('kva', e.target.value)} placeholder="500" />
                  <select className="ia-unit" value={form.rating_unit} onChange={e => set('rating_unit', e.target.value)}>{RATING_UNITS.map(u => <option key={u}>{u}</option>)}</select>
                </div>
              </Field>
              <Field label="Primary voltage (HV)" hint="e.g. 13,800 Δ or 480"><input value={form.input_voltage} onChange={e => set('input_voltage', e.target.value)} /></Field>
              <Field label="Secondary voltage (LV)" hint="e.g. 600Y/347"><input value={form.output_voltage} onChange={e => set('output_voltage', e.target.value)} /></Field>
              <Field label="Phase"><select value={form.phase} onChange={e => set('phase', e.target.value)}><option value="">—</option>{PHASES.map(p => <option key={p}>{p}</option>)}</select></Field>
              <Field label="Frequency"><select value={form.frequency} onChange={e => set('frequency', e.target.value)}><option value="">—</option>{FREQUENCIES.map(p => <option key={p}>{p}</option>)}</select></Field>
              <Field label="Winding"><select value={form.winding} onChange={e => set('winding', e.target.value)}><option value="">—</option>{WINDINGS.map(p => <option key={p}>{p}</option>)}</select></Field>
              <Field label="Cooling class"><select value={form.cooling} onChange={e => set('cooling', e.target.value)}><option value="">—</option>{COOLING.map(p => <option key={p}>{p}</option>)}</select></Field>
            </div>
          </section>

          <section className="ia-card">
            <h3>3 · Specifications</h3>
            <p className="ia-note">Leave any row blank to hide it. Add your own rows for anything else.</p>
            {groups.map(group => (
              <div key={group} className="ia-spec-group">
                <div className="ia-spec-title">{group}</div>
                {specs.map((row, i) => row.group !== group ? null : (
                  <div key={i} className="ia-spec-row">
                    <input aria-label="Specification name" value={row.label} onChange={e => setSpecs(s => s.map((r, j) => j === i ? { ...r, label: e.target.value } : r))} />
                    <input aria-label={`${row.label} value`} value={row.value} placeholder="—" onChange={e => setSpecs(s => s.map((r, j) => j === i ? { ...r, value: e.target.value } : r))} />
                    <button type="button" className="ia-x" aria-label="Remove row" onClick={() => setSpecs(s => s.filter((_, j) => j !== i))}>×</button>
                  </div>
                ))}
                <button type="button" className="ia-add" onClick={() => setSpecs(s => [...s, { group, label: '', value: '' }])}>+ Add row to {group}</button>
              </div>
            ))}
            <button type="button" className="ia-add" onClick={() => { const g = window.prompt('New group name (e.g. Accessories)'); if (g?.trim()) setSpecs(s => [...s, { group: g.trim(), label: '', value: '' }]) }}>+ New spec group</button>
          </section>

          <section className="ia-card">
            <h3>4 · Dimensions & weight</h3>
            <div className="ia-grid">
              <Field label="Height"><input inputMode="decimal" value={form.dim_height} onChange={e => set('dim_height', e.target.value)} /></Field>
              <Field label="Width"><input inputMode="decimal" value={form.dim_width} onChange={e => set('dim_width', e.target.value)} /></Field>
              <Field label="Depth"><input inputMode="decimal" value={form.dim_depth} onChange={e => set('dim_depth', e.target.value)} /></Field>
              <Field label="Unit"><select value={form.dim_unit} onChange={e => set('dim_unit', e.target.value)}><option value="in">inches</option><option value="mm">mm</option></select></Field>
              <Field label="Weight">
                <div className="ia-inline">
                  <input inputMode="decimal" value={form.weight} onChange={e => set('weight', e.target.value)} />
                  <select className="ia-unit" value={form.weight_unit} onChange={e => set('weight_unit', e.target.value)}><option value="lb">lb</option><option value="kg">kg</option></select>
                </div>
              </Field>
            </div>
          </section>

          <section className="ia-card">
            <h3>5 · Pricing & availability</h3>
            <div className="ia-grid">
              <div className="ia-toggles ia-wide">
                <label><input type="checkbox" checked={form.show_price} onChange={e => set('show_price', e.target.checked)} /> Show price on the website (otherwise “Request a quote”)</label>
              </div>
              <Field label="Starting price"><input inputMode="decimal" value={form.price_min} onChange={e => set('price_min', e.target.value)} /></Field>
              <Field label="Up to (optional)"><input inputMode="decimal" value={form.price_max} onChange={e => set('price_max', e.target.value)} /></Field>
              <Field label="Currency"><select value={form.currency} onChange={e => set('currency', e.target.value)}><option>CAD</option><option>USD</option></select></Field>
              <Field label="Quantity in stock"><input inputMode="numeric" value={form.stock_quantity} onChange={e => set('stock_quantity', e.target.value.replace(/\D/g, ''))} /></Field>
              <Field label="Stock location"><input value={form.location} onChange={e => set('location', e.target.value)} placeholder="Toronto, ON" /></Field>
              <Field label="Lead time / ships in"><input value={form.lead_time} onChange={e => set('lead_time', e.target.value)} placeholder="Ready to ship" /></Field>
              <Field label="Warranty"><input value={form.warranty} onChange={e => set('warranty', e.target.value)} placeholder="2 years" /></Field>
            </div>
          </section>

          <section className="ia-card">
            <h3>6 · Description & highlights</h3>
            <Field label="Full description" wide hint="Separate paragraphs with a blank line.">
              <textarea rows={8} value={form.description} onChange={e => set('description', e.target.value)} />
            </Field>
            <div className="ia-label ia-mt">Key highlights (bullet points)</div>
            {highlights.map((h, i) => (
              <div key={i} className="ia-spec-row ia-one">
                <input value={h} onChange={e => setHighlights(list => list.map((x, j) => j === i ? e.target.value : x))} />
                <button type="button" className="ia-x" aria-label="Remove highlight" onClick={() => setHighlights(list => list.filter((_, j) => j !== i))}>×</button>
              </div>
            ))}
            <button type="button" className="ia-add" onClick={() => setHighlights(list => [...list, ''])}>+ Add highlight</button>
          </section>

          <section className="ia-card">
            <h3>7 · Documents</h3>
            <p className="ia-note">Spec sheets, drawings or test reports. Use a full https:// link or a site path such as /docs/…</p>
            {documents.map((d, i) => (
              <div key={i} className="ia-spec-row">
                <input placeholder="Label (e.g. Spec sheet PDF)" value={d.label} onChange={e => setDocuments(list => list.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} />
                <input placeholder="https://… or /docs/…" value={d.url} onChange={e => setDocuments(list => list.map((x, j) => j === i ? { ...x, url: e.target.value } : x))} />
                <button type="button" className="ia-x" aria-label="Remove document" onClick={() => setDocuments(list => list.filter((_, j) => j !== i))}>×</button>
              </div>
            ))}
            <button type="button" className="ia-add" onClick={() => setDocuments(list => [...list, { label: '', url: '' }])}>+ Add document</button>
          </section>

          <section className="ia-card">
            <h3>8 · Photos</h3>
            {!editing ? <p className="ia-note">Save the product first, then add photos here.</p> : (
              <>
                <p className="ia-note">The first photo is the main image. JPG, PNG or WebP, up to 5 MB each.</p>
                <div className="ia-photos">
                  {images.map((img, i) => (
                    <figure key={img.id} className={i === 0 ? 'main' : ''}>
                      {/* eslint-disable-next-line @next/next/no-img-element -- admin preview of uploaded media */}
                      <img src={img.url} alt={img.name} />
                      <figcaption>
                        {i === 0 ? <span className="ia-main-tag">Main</span> : <button type="button" onClick={() => reorder([img, ...images.filter(x => x.id !== img.id)])}>Make main</button>}
                        <span className="ia-photo-btns">
                          <button type="button" disabled={i === 0} aria-label="Move left" onClick={() => { const n = [...images]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; void reorder(n) }}>←</button>
                          <button type="button" disabled={i === images.length - 1} aria-label="Move right" onClick={() => { const n = [...images]; [n[i + 1], n[i]] = [n[i], n[i + 1]]; void reorder(n) }}>→</button>
                          <button type="button" aria-label="Delete photo" onClick={() => deleteImage(img)}>×</button>
                        </span>
                      </figcaption>
                    </figure>
                  ))}
                  <label className="ia-upload">
                    <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={e => { void upload(e.target.files); e.target.value = '' }} />
                    <span>{uploading ? 'Uploading…' : '+ Add photos'}</span>
                  </label>
                </div>
              </>
            )}
          </section>

          <div className="ia-savebar">
            {message && <span className={`ia-msg ia-${message.tone}`} role="status">{message.text}</span>}
            {editing && <button type="button" className="ia-btn ia-danger" onClick={remove}>Delete</button>}
            <button className="ia-btn ia-primary" disabled={saving}>{saving ? 'Saving…' : editing ? 'Save changes' : 'Create product'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
