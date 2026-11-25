'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminNav from '@/components/admin/AdminNav'
import { formatMoney, PAYMENT_TERMS, type PaymentTerms } from '@/lib/shop/order-status'
import { COUNTRIES, REGIONS, type CountryCode } from '@/lib/shop/regions'

interface QuoteRow { id: number; quote_number: string; status: string; currency: string; customer_name: string; company: string; email: string; payment_terms: PaymentTerms; valid_until: string | null; created_at: string; total: string; order_id: number | null }
interface RequestRow { id: number; product_id: number | null; sku: string; product_name: string; quantity: number; name: string; company: string; email: string; phone: string; message: string | null; status: string; created_at: string; price: string | null; currency: string | null }
interface Product { id: number; sku: string; name: string; price: number | null; currency: string; stock: number }
interface Line { product_id: number | null; sku: string; name: string; description: string; unit_price: string; quantity: string }

const addDays = (n: number) => new Date(Date.now() + n * 86400000).toISOString().slice(0, 10)
const blank = (depositPercent: number) => ({
  currency: 'CAD', customer_name: '', company: '', email: '', phone: '',
  fulfilment: 'delivery' as 'delivery' | 'pickup', pickup_yard: '',
  ship: { line1: '', line2: '', city: '', region: '', postal: '', country: 'CA' as CountryCode },
  items: [] as Line[],
  freight: '0', freight_note: 'Freight',
  payment_terms: 'pay_now' as PaymentTerms, deposit_percent: String(depositPercent), net_days: '30',
  valid_until: addDays(14), message: '', internal_notes: '', request_id: null as number | null,
})
type Form = ReturnType<typeof blank>

const STATUS_TONE: Record<string, string> = { draft: 'off', sent: 'wait', accepted: 'ok', expired: 'off', cancelled: 'off' }
const when = (d: string) => new Date(d).toLocaleDateString('en-CA', { dateStyle: 'medium' })

export default function AdminQuotes(props: {
  initialQuotes: QuoteRow[]; initialRequests: RequestRow[]; products: Product[]; initialId: number | null; adminEmail: string
  defaults: { depositPercent: number; yards: { id: string; name: string }[]; onlineLimit: number | null }; stripeReady: boolean
}) {
  const router = useRouter()
  const [tab, setTab] = useState<'quotes' | 'requests'>(props.initialRequests.length && !props.initialId ? 'requests' : 'quotes')
  const [quotes, setQuotes] = useState(props.initialQuotes)
  const [requests, setRequests] = useState(props.initialRequests)
  const [selected, setSelected] = useState<number | null>(props.initialId)
  const [form, setForm] = useState<Form>(blank(props.defaults.depositPercent))
  const [meta, setMeta] = useState<{ status: string; number: string; link: string; orderId: number | null } | null>(null)
  const [msg, setMsg] = useState<{ tone: 'ok' | 'err'; text: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const [pick, setPick] = useState('')

  const readOnly = !!meta && !['draft', 'sent'].includes(meta.status)
  const subtotal = form.items.reduce((s, l) => s + (Number(l.unit_price) || 0) * (Number(l.quantity) || 0), 0)
  const total = subtotal + (Number(form.freight) || 0)
  const deposit = Math.round(total * (Number(form.deposit_percent) || 0)) / 100
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm(f => ({ ...f, [k]: v }))
  const setShip = (k: keyof Form['ship'], v: string) => setForm(f => ({ ...f, ship: { ...f.ship, [k]: v } }))
  const setLine = (i: number, patch: Partial<Line>) => setForm(f => ({ ...f, items: f.items.map((l, j) => (j === i ? { ...l, ...patch } : l)) }))
  const productOptions = useMemo(() => props.products.filter(p => p.currency === form.currency), [props.products, form.currency])

  const reload = useCallback(async () => {
    const r = await fetch('/api/admin/quotes')
    if (!r.ok) return
    const d = await r.json()
    setQuotes(d.quotes); setRequests(d.requests)
  }, [])

  const showQuote = useCallback((d: { quote: Record<string, unknown>; items: Record<string, unknown>[]; link: string } | null) => {
    if (!d) return
    const q = d.quote
    setForm({
      currency: String(q.currency), customer_name: String(q.customer_name), company: String(q.company), email: String(q.email), phone: String(q.phone),
      fulfilment: q.fulfilment === 'pickup' ? 'pickup' : 'delivery', pickup_yard: String(q.pickup_yard ?? ''),
      ship: { line1: String(q.ship_line1), line2: String(q.ship_line2), city: String(q.ship_city), region: String(q.ship_region), postal: String(q.ship_postal), country: (q.ship_country === 'US' ? 'US' : 'CA') },
      items: d.items.map(i => ({ product_id: (i.product_id as number | null) ?? null, sku: String(i.sku), name: String(i.name), description: String(i.description), unit_price: String(Number(i.unit_price)), quantity: String(i.quantity) })),
      freight: String(Number(q.freight)), freight_note: String(q.freight_note),
      payment_terms: q.payment_terms as PaymentTerms, deposit_percent: String(Number(q.deposit_percent)), net_days: String(q.net_days),
      valid_until: q.valid_until ? String(q.valid_until).slice(0, 10) : '', message: String(q.message ?? ''), internal_notes: String(q.internal_notes ?? ''),
      request_id: (q.request_id as number | null) ?? null,
    })
    setMeta({ status: String(q.status), number: String(q.quote_number), link: d.link, orderId: (q.order_id as number | null) ?? null })
  }, [])

  useEffect(() => {
    if (!selected) return
    let live = true
    fetch(`/api/admin/quotes/${selected}`).then(r => (r.ok ? r.json() : null)).then(d => { if (live) showQuote(d) })
    return () => { live = false }
  }, [selected, showQuote])

  function newQuote(from?: RequestRow) {
    setSelected(null); setMeta(null); setMsg(null); setTab('quotes')
    const f = blank(props.defaults.depositPercent)
    if (from) {
      const product = props.products.find(p => p.id === from.product_id)
      Object.assign(f, {
        customer_name: from.name, company: from.company, email: from.email, phone: from.phone, request_id: from.id,
        currency: product?.currency ?? from.currency ?? 'CAD',
        items: [{ product_id: from.product_id, sku: from.sku, name: product?.name ?? from.product_name, description: '', unit_price: product?.price !== null && product?.price !== undefined ? String(product.price) : '', quantity: String(from.quantity) }],
        internal_notes: from.message ? `Request: ${from.message}` : '',
      })
    }
    setForm(f)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function addProduct(id: number) {
    const p = props.products.find(x => x.id === id)
    if (!p) return
    setForm(f => ({ ...f, items: [...f.items, { product_id: p.id, sku: p.sku, name: p.name, description: '', unit_price: p.price === null ? '' : String(p.price), quantity: '1' }] }))
    setPick('')
  }

  async function save(send: boolean) {
    setBusy(true); setMsg(null)
    const body = { ...form, send, items: form.items.map(l => ({ ...l, unit_price: Number(l.unit_price), quantity: Number(l.quantity) })) }
    const r = await fetch(selected ? `/api/admin/quotes/${selected}` : '/api/admin/quotes', { method: selected ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const d = await r.json().catch(() => ({}))
    setBusy(false)
    if (!r.ok) { setMsg({ tone: 'err', text: d.error || 'Could not save.' }); return }
    setSelected(d.id)
    setMsg({ tone: 'ok', text: send ? (d.emailed ? 'Quote sent. The buyer was emailed a link to accept and pay.' : 'Quote marked as sent, but the email didn’t go out (check SMTP). Copy the link and send it yourself.') : 'Draft saved.' })
    await reload()
    const fresh = await fetch(`/api/admin/quotes/${d.id}`).then(x => (x.ok ? x.json() : null))
    showQuote(fresh)
  }

  async function action(a: 'cancel' | 'resend') {
    if (!selected) return
    if (a === 'cancel' && !window.confirm('Withdraw this quote? The buyer’s link will stop working.')) return
    setBusy(true); setMsg(null)
    const r = await fetch(`/api/admin/quotes/${selected}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: a }) })
    const d = await r.json().catch(() => ({}))
    setBusy(false)
    if (!r.ok) { setMsg({ tone: 'err', text: d.error || 'Could not complete that.' }); return }
    setMsg({ tone: 'ok', text: a === 'cancel' ? 'Quote withdrawn.' : d.emailed ? 'Quote email re-sent.' : 'Email not sent (check SMTP).' })
    await reload()
    showQuote(await fetch(`/api/admin/quotes/${selected}`).then(x => (x.ok ? x.json() : null)))
  }

  async function closeRequest(id: number) {
    await fetch(`/api/admin/quote-requests/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'closed' }) })
    await reload()
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  const country = COUNTRIES.find(c => c.code === form.ship.country) ?? COUNTRIES[0]
  const cur = form.currency

  return (
    <div className="ia">
      <div className="ia-top">
        <div><div className="ia-kicker">CANDRON · Admin</div><h1>Quotes</h1></div>
        <div className="ia-top-actions">
          <span className="ia-who">{props.adminEmail}</span>
          <AdminNav current="quotes" />
          <button type="button" onClick={logout} className="ia-btn ia-ghost">Sign out</button>
        </div>
      </div>
      {!props.stripeReady && <p className="ia-banner">Online ordering is off (Shop settings) or Stripe isn’t connected, so buyers can view quotes but can’t accept and pay online yet.</p>}

      <div className="ia-shell">
        <aside className="ia-list">
          <button type="button" className="ia-btn ia-primary ia-new" onClick={() => newQuote()}>+ New quote</button>
          <div className="ia-tabs" role="tablist">
            <button type="button" role="tab" aria-selected={tab === 'quotes'} className={tab === 'quotes' ? 'on' : ''} onClick={() => setTab('quotes')}>Quotes ({quotes.length})</button>
            <button type="button" role="tab" aria-selected={tab === 'requests'} className={tab === 'requests' ? 'on' : ''} onClick={() => setTab('requests')}>Requests ({requests.length})</button>
          </div>
          {tab === 'quotes' ? (
            <ul>
              {quotes.map(q => (
                <li key={q.id}>
                  <button type="button" className={`ia-order-row${selected === q.id ? ' on' : ''}`} onClick={() => { setSelected(q.id); setMsg(null) }}>
                    <span className="ia-row-text"><strong>{q.quote_number} · {formatMoney(Number(q.total), q.currency)}</strong><small>{q.company || q.customer_name || 'No customer yet'} · {when(q.created_at)}</small></span>
                    <span className={`ia-pill ia-tone-${STATUS_TONE[q.status] ?? 'off'}`}>{q.status}</span>
                  </button>
                </li>
              ))}
              {!quotes.length && <li className="ia-empty">No quotes yet.</li>}
            </ul>
          ) : (
            <ul>
              {requests.map(r => (
                <li key={r.id} className="ia-request">
                  <div className="ia-row-text">
                    <strong>{r.product_name || r.sku} × {r.quantity}</strong>
                    <small>{r.company || r.name} · {r.email} · {when(r.created_at)}</small>
                    {r.message && <small className="ia-request-msg">{r.message}</small>}
                  </div>
                  <div className="ia-request-actions">
                    <button type="button" className="ia-btn ia-primary ia-small" onClick={() => newQuote(r)}>Create quote</button>
                    <button type="button" className="ia-btn ia-ghost ia-small" onClick={() => closeRequest(r.id)}>Close</button>
                  </div>
                </li>
              ))}
              {!requests.length && <li className="ia-empty">No open requests. Product “Request a quote” forms land here.</li>}
            </ul>
          )}
        </aside>

        <div className="ia-editor">
          <div className="ia-editor-head">
            <div>
              <div className="ia-kicker">{meta ? `${meta.number} · ${meta.status}` : 'New quote'}</div>
              <h2>{form.company || form.customer_name || 'Untitled quote'} · {formatMoney(total, cur)}</h2>
            </div>
            {meta && meta.status !== 'draft' && (
              <div className="ia-top-actions">
                <button type="button" className="ia-btn ia-ghost" onClick={() => { void navigator.clipboard.writeText(`${window.location.origin}${meta.link}`); setMsg({ tone: 'ok', text: 'Customer link copied.' }) }}>Copy customer link</button>
                <a className="ia-btn ia-ghost" href={meta.link} target="_blank" rel="noreferrer">Open as customer ↗</a>
              </div>
            )}
          </div>
          {meta?.orderId && <p className="ia-banner ia-banner-live">Accepted · <a href={`/admin/orders?id=${meta.orderId}`}>open the order →</a></p>}

          <fieldset className="ia-fieldset" disabled={readOnly}>
            <section className="ia-card">
              <h3>Customer</h3>
              <div className="ia-grid">
                <label className="ia-field"><span className="ia-label">Contact name</span><input value={form.customer_name} onChange={e => set('customer_name', e.target.value)} /></label>
                <label className="ia-field"><span className="ia-label">Company</span><input value={form.company} onChange={e => set('company', e.target.value)} /></label>
                <label className="ia-field"><span className="ia-label">Email</span><input type="email" value={form.email} onChange={e => set('email', e.target.value)} /></label>
                <label className="ia-field"><span className="ia-label">Phone</span><input value={form.phone} onChange={e => set('phone', e.target.value)} /></label>
                <label className="ia-field"><span className="ia-label">Currency</span><select value={form.currency} onChange={e => set('currency', e.target.value)}><option>CAD</option><option>USD</option></select></label>
              </div>
            </section>

            <section className="ia-card">
              <h3>Lines</h3>
              <div className="ia-table-wrap">
                <table className="ia-table ia-freight ia-lines">
                  <thead><tr><th>Item</th><th>Item code</th><th>Note on quote</th><th>Qty</th><th>Unit price</th><th className="ia-num">Line</th><th /></tr></thead>
                  <tbody>
                    {form.items.map((l, i) => (
                      <tr key={i}>
                        <td><input value={l.name} onChange={e => setLine(i, { name: e.target.value })} />{l.product_id && <small className="ia-hint">Inventory unit · stock is held when accepted</small>}</td>
                        <td><input value={l.sku} onChange={e => setLine(i, { sku: e.target.value })} /></td>
                        <td><input value={l.description} onChange={e => setLine(i, { description: e.target.value })} placeholder="e.g. lead time, options" /></td>
                        <td><input inputMode="numeric" value={l.quantity} onChange={e => setLine(i, { quantity: e.target.value.replace(/\D/g, '') })} /></td>
                        <td><input inputMode="decimal" value={l.unit_price} onChange={e => setLine(i, { unit_price: e.target.value })} /></td>
                        <td className="ia-num">{formatMoney((Number(l.unit_price) || 0) * (Number(l.quantity) || 0), cur)}</td>
                        <td><button type="button" className="ia-x" aria-label="Remove line" onClick={() => setForm(f => ({ ...f, items: f.items.filter((_, j) => j !== i) }))}>×</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="ia-inline ia-mt">
                <select value={pick} onChange={e => { setPick(e.target.value); if (e.target.value) addProduct(Number(e.target.value)) }} aria-label="Add an inventory item">
                  <option value="">+ Add inventory item…</option>
                  {productOptions.map(p => <option key={p.id} value={p.id}>{p.sku} · {p.name}{p.price !== null ? ` · ${formatMoney(p.price, p.currency)}` : ''} · {p.stock} in stock</option>)}
                </select>
                <button type="button" className="ia-btn ia-ghost ia-small" onClick={() => setForm(f => ({ ...f, items: [...f.items, { product_id: null, sku: '', name: '', description: '', unit_price: '', quantity: '1' }] }))}>+ Custom line</button>
              </div>
            </section>

            <section className="ia-card">
              <h3>Delivery and freight</h3>
              <div className="ia-toggles">
                <label><input type="radio" checked={form.fulfilment === 'delivery'} onChange={() => set('fulfilment', 'delivery')} /> Deliver to site</label>
                {props.defaults.yards.length > 0 && <label><input type="radio" checked={form.fulfilment === 'pickup'} onChange={() => set('fulfilment', 'pickup')} /> Customer picks up / own carrier</label>}
              </div>
              {form.fulfilment === 'pickup' && (
                <div className="ia-grid ia-mt">
                  <label className="ia-field"><span className="ia-label">Pickup yard</span>
                    <select value={form.pickup_yard} onChange={e => set('pickup_yard', e.target.value)}><option value="">Choose…</option>{props.defaults.yards.map(y => <option key={y.id} value={y.id}>{y.name}</option>)}</select>
                  </label>
                  <p className="ia-hint ia-wide">Enter the customer’s billing address below (it goes on the invoice; for Buffalo pickups, tax follows it).</p>
                </div>
              )}
              {(
                <div className="ia-grid ia-mt">
                  <label className="ia-field ia-wide"><span className="ia-label">{form.fulfilment === 'pickup' ? 'Billing street address' : 'Street address'}</span><input value={form.ship.line1} onChange={e => setShip('line1', e.target.value)} /></label>
                  <label className="ia-field"><span className="ia-label">Unit / site notes</span><input value={form.ship.line2} onChange={e => setShip('line2', e.target.value)} /></label>
                  <label className="ia-field"><span className="ia-label">City</span><input value={form.ship.city} onChange={e => setShip('city', e.target.value)} /></label>
                  <label className="ia-field"><span className="ia-label">Country</span><select value={form.ship.country} onChange={e => setForm(f => ({ ...f, ship: { ...f.ship, country: e.target.value as CountryCode, region: '' } }))}>{COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}</select></label>
                  <label className="ia-field"><span className="ia-label">{country.regionLabel}</span><select value={form.ship.region} onChange={e => setShip('region', e.target.value)}><option value="">Choose…</option>{REGIONS[form.ship.country].map(r => <option key={r.code} value={r.code}>{r.name}</option>)}</select></label>
                  <label className="ia-field"><span className="ia-label">{country.postalLabel}</span><input value={form.ship.postal} onChange={e => setShip('postal', e.target.value)} /></label>
                </div>
              )}
              <div className="ia-grid ia-mt">
                <label className="ia-field"><span className="ia-label">Freight ({cur}, before tax)</span><input inputMode="decimal" value={form.freight} onChange={e => set('freight', e.target.value)} /></label>
                <label className="ia-field ia-wide"><span className="ia-label">Freight line label</span><input value={form.freight_note} onChange={e => set('freight_note', e.target.value)} placeholder="Freight · flatbed to site, offloading included" /></label>
              </div>
            </section>

            <section className="ia-card">
              <h3>Payment terms and validity</h3>
              <div className="ia-grid">
                <label className="ia-field"><span className="ia-label">Payment</span>
                  <select value={form.payment_terms} onChange={e => set('payment_terms', e.target.value as PaymentTerms)}>
                    {(Object.keys(PAYMENT_TERMS) as PaymentTerms[]).filter(t => t !== 'offline').map(t => <option key={t} value={t}>{t === 'pay_now' ? 'Pay in full online' : t === 'deposit' ? 'Deposit online, balance invoiced' : 'Invoice on acceptance (net terms)'}</option>)}
                  </select>
                </label>
                {form.payment_terms === 'deposit' && <label className="ia-field"><span className="ia-label">Deposit %</span><input inputMode="decimal" value={form.deposit_percent} onChange={e => set('deposit_percent', e.target.value)} /><span className="ia-hint">{formatMoney(deposit, cur)} before tax</span></label>}
                {form.payment_terms === 'net' && <label className="ia-field"><span className="ia-label">Net days</span><input inputMode="numeric" value={form.net_days} onChange={e => set('net_days', e.target.value.replace(/\D/g, ''))} /></label>}
                <label className="ia-field"><span className="ia-label">Valid until</span><input type="date" value={form.valid_until} onChange={e => set('valid_until', e.target.value)} /></label>
                {props.defaults.onlineLimit !== null && form.currency === 'CAD' && total > props.defaults.onlineLimit && (
                  <p className="ia-hint ia-wide">Over the {formatMoney(props.defaults.onlineLimit, 'CAD')} online limit: when the buyer accepts, nothing is paid online. Accounting is emailed to arrange payment and the stock is held.</p>
                )}
                <label className="ia-field ia-wide"><span className="ia-label">Message to the customer (scope, lead time, conditions)</span><textarea rows={4} value={form.message} onChange={e => set('message', e.target.value)} /></label>
                <label className="ia-field ia-wide"><span className="ia-label">Internal notes (not shown to the customer)</span><textarea rows={2} value={form.internal_notes} onChange={e => set('internal_notes', e.target.value)} /></label>
              </div>
              <table className="ia-table ia-mt">
                <tbody>
                  <tr><td>Subtotal</td><td className="ia-num">{formatMoney(subtotal, cur)}</td></tr>
                  <tr><td>{form.freight_note || 'Freight'}</td><td className="ia-num">{formatMoney(Number(form.freight) || 0, cur)}</td></tr>
                  <tr className="ia-strong"><td>Total before tax</td><td className="ia-num">{formatMoney(total, cur)}</td></tr>
                </tbody>
              </table>
            </section>
          </fieldset>

          <div className="ia-savebar">
            {msg && <span className={`ia-msg ia-${msg.tone}`} role="status">{msg.text}</span>}
            {meta && ['draft', 'sent'].includes(meta.status) && <button type="button" className="ia-btn ia-danger" onClick={() => action('cancel')} disabled={busy}>Withdraw</button>}
            {meta?.status === 'sent' && <button type="button" className="ia-btn ia-ghost" onClick={() => action('resend')} disabled={busy}>Re-send email</button>}
            {!readOnly && <button type="button" className="ia-btn ia-ghost" onClick={() => save(false)} disabled={busy}>Save draft</button>}
            {!readOnly && <button type="button" className="ia-btn ia-primary" onClick={() => save(true)} disabled={busy}>{meta?.status === 'sent' ? 'Save and re-send' : 'Save and send to customer'}</button>}
          </div>
        </div>
      </div>
    </div>
  )
}
