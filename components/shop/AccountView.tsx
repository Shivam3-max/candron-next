'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { addToCart } from '@/lib/shop/cart-store'
import { formatMoney, statusLabel, statusTone } from '@/lib/shop/order-status'
import { COUNTRIES, REGIONS, regionName, type CountryCode } from '@/lib/shop/regions'

interface Address { id: number; label: string; line1: string; line2: string; city: string; region: string; postal: string; country: string; is_default: number }
interface Props {
  customer: { email: string; name: string; company: string; phone: string; taxExempt: string; taxNote: string }
  orders: { id: number; number: string; link: string; status: string; currency: string; total: number; created: string; items: string }[]
  quotes: { number: string; link: string; status: string; currency: string; total: number; validUntil: string | null; created: string }[]
  addresses: Address[]
  documents: { id: number; name: string; created: string; note: string }[]
}

const TABS = [['orders', 'Orders'], ['quotes', 'Quotes'], ['addresses', 'Addresses'], ['details', 'Details & tax']] as const
const day = (d: string) => new Date(d).toLocaleDateString('en-CA', { dateStyle: 'medium' })
const blankAddress = { label: '', line1: '', line2: '', city: '', region: '', postal: '', country: 'CA' as CountryCode, is_default: false }
const QUOTE_TONE: Record<string, string> = { sent: 'wait', accepted: 'ok', expired: 'off', cancelled: 'off' }

export default function AccountView(p: Props) {
  const router = useRouter()
  const [tab, setTab] = useState<(typeof TABS)[number][0]>('orders')
  const [addresses, setAddresses] = useState(p.addresses)
  const [editing, setEditing] = useState<{ id: number | null; a: typeof blankAddress } | null>(null)
  const [profile, setProfile] = useState({ name: p.customer.name, company: p.customer.company, phone: p.customer.phone })
  const [docs, setDocs] = useState(p.documents)
  const [taxStatus, setTaxStatus] = useState(p.customer.taxExempt)
  const [msg, setMsg] = useState<{ tone: 'ok' | 'err'; text: string } | null>(null)
  const [busy, setBusy] = useState(false)

  async function call(url: string, init: RequestInit) {
    setBusy(true); setMsg(null)
    const r = await fetch(url, init)
    const d = await r.json().catch(() => ({}))
    setBusy(false)
    if (r.status === 401) { router.replace('/account/login'); return null }
    if (!r.ok) { setMsg({ tone: 'err', text: d.error || 'Something went wrong.' }); return null }
    return d
  }

  async function reorder(id: number) {
    const d = await call(`/api/account/reorder/${id}`, {})
    if (!d) return
    const ok = (d.lines as { id: number; slug: string; sku: string; name: string; unitPrice: number; currency: string; image: string | null; available: number; quantity: number; error: string | null }[]).filter(l => !l.error)
    if (!ok.length) { setMsg({ tone: 'err', text: 'These items aren’t available to buy online right now. Please request a quote.' }); return }
    for (const l of ok) addToCart({ id: l.id, slug: l.slug, sku: l.sku, name: l.name, price: l.unitPrice, currency: l.currency, image: l.image, max: l.available }, l.quantity)
    router.push('/cart')
  }

  async function saveAddress(e: FormEvent) {
    e.preventDefault()
    if (!editing) return
    const d = await call(editing.id ? `/api/account/addresses/${editing.id}` : '/api/account/addresses', {
      method: editing.id ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing.a),
    })
    if (d) { setAddresses(d.addresses); setEditing(null); setMsg({ tone: 'ok', text: 'Address saved.' }) }
  }

  async function removeAddress(id: number) {
    if (!window.confirm('Delete this address?')) return
    const d = await call(`/api/account/addresses/${id}`, { method: 'DELETE' })
    if (d) setAddresses(d.addresses)
  }

  async function saveProfile(e: FormEvent) {
    e.preventDefault()
    if (await call('/api/account/profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profile) })) setMsg({ tone: 'ok', text: 'Details saved.' })
  }

  async function upload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const d = await call('/api/account/documents', { method: 'POST', body: new FormData(form) })
    if (d) { setDocs(d.documents); form.reset(); if (taxStatus !== 'approved') setTaxStatus('pending'); setMsg({ tone: 'ok', text: 'Certificate uploaded. We’ll review it and email you.' }) }
  }

  async function signOut() {
    await fetch('/api/account/logout', { method: 'POST' })
    router.replace('/account/login')
    router.refresh()
  }

  const setA = (k: keyof typeof blankAddress, v: string | boolean) => setEditing(x => (x ? { ...x, a: { ...x.a, [k]: v } } : x))

  return (
    <div className="shop-account">
      <div className="shop-head shop-account-head">
        <div>
          <div className="label">Your account</div>
          <h1>{p.customer.company || p.customer.name || 'Welcome'}</h1>
          <p>{p.customer.email}</p>
        </div>
        <button type="button" className="btn btn-outline-blue" onClick={signOut}>Sign out</button>
      </div>

      <div className="shop-tabs" role="tablist">
        {TABS.map(([k, label]) => <button key={k} type="button" role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => { setTab(k); setMsg(null) }}>{label}</button>)}
      </div>
      {msg && <p className={msg.tone === 'ok' ? 'shop-notice' : 'shop-error'} role="status">{msg.text}</p>}

      {tab === 'orders' && (
        <div className="shop-card">
          {!p.orders.length ? <p>No orders yet. <Link href="/inventory">Browse in-stock inventory →</Link></p> : (
            <ul className="shop-history">
              {p.orders.map(o => (
                <li key={o.id}>
                  <div>
                    <Link href={o.link} className="shop-history-num">{o.number}</Link>
                    <small>{day(o.created)} · {o.items}</small>
                  </div>
                  <span className={`shop-pill shop-tone-${statusTone(o.status)}`}>{statusLabel(o.status)}</span>
                  <strong>{formatMoney(o.total, o.currency)}</strong>
                  <span className="shop-history-actions">
                    <Link href={o.link} className="shop-link-btn">View</Link>
                    <button type="button" className="shop-link-btn" onClick={() => reorder(o.id)} disabled={busy}>Order again</button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === 'quotes' && (
        <div className="shop-card">
          {!p.quotes.length ? <p>No quotes yet. Use “Request a quote” on any listing and we’ll send one here.</p> : (
            <ul className="shop-history">
              {p.quotes.map(q => (
                <li key={q.number}>
                  <div>
                    <Link href={q.link} className="shop-history-num">{q.number}</Link>
                    <small>{day(q.created)}{q.validUntil && q.status === 'sent' ? ` · valid until ${String(q.validUntil).slice(0, 10)}` : ''}</small>
                  </div>
                  <span className={`shop-pill shop-tone-${QUOTE_TONE[q.status] ?? 'off'}`}>{q.status}</span>
                  <strong>{formatMoney(q.total, q.currency)}</strong>
                  <span className="shop-history-actions"><Link href={q.link} className="shop-link-btn">{q.status === 'sent' ? 'Review and accept' : 'View'}</Link></span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === 'addresses' && (
        <div className="shop-card">
          <ul className="shop-addresses">
            {addresses.map(a => (
              <li key={a.id}>
                <div>
                  <strong>{a.label || 'Delivery address'}{a.is_default ? ' · default' : ''}</strong>
                  <span>{a.line1}{a.line2 && `, ${a.line2}`}, {a.city}, {regionName(a.country, a.region)} {a.postal}, {a.country}</span>
                </div>
                <span className="shop-history-actions">
                  <button type="button" className="shop-link-btn" onClick={() => setEditing({ id: a.id, a: { label: a.label, line1: a.line1, line2: a.line2, city: a.city, region: a.region, postal: a.postal, country: a.country as CountryCode, is_default: Boolean(a.is_default) } })}>Edit</button>
                  <button type="button" className="shop-link-btn" onClick={() => removeAddress(a.id)}>Delete</button>
                </span>
              </li>
            ))}
            {!addresses.length && <li>No saved addresses. Addresses you use at checkout can be saved here too.</li>}
          </ul>
          {!editing ? <button type="button" className="btn btn-outline-blue" onClick={() => setEditing({ id: null, a: blankAddress })}>+ Add address</button> : (
            <form className="shop-grid shop-mt" onSubmit={saveAddress}>
              <label className="shop-wide"><span>Label (site or project name)</span><input value={editing.a.label} onChange={e => setA('label', e.target.value)} /></label>
              <label className="shop-wide"><span>Street address *</span><input required value={editing.a.line1} onChange={e => setA('line1', e.target.value)} /></label>
              <label className="shop-wide"><span>Unit, building, site notes</span><input value={editing.a.line2} onChange={e => setA('line2', e.target.value)} /></label>
              <label><span>City *</span><input required value={editing.a.city} onChange={e => setA('city', e.target.value)} /></label>
              <label><span>Country *</span><select value={editing.a.country} onChange={e => setEditing(x => (x ? { ...x, a: { ...x.a, country: e.target.value as CountryCode, region: '' } } : x))}>{COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}</select></label>
              <label><span>Province / state *</span><select required value={editing.a.region} onChange={e => setA('region', e.target.value)}><option value="">Choose…</option>{REGIONS[editing.a.country].map(r => <option key={r.code} value={r.code}>{r.name}</option>)}</select></label>
              <label><span>Postal / ZIP code *</span><input required value={editing.a.postal} onChange={e => setA('postal', e.target.value)} /></label>
              <label className="shop-wide shop-check"><input type="checkbox" checked={editing.a.is_default} onChange={e => setA('is_default', e.target.checked)} /> Use as my default delivery address</label>
              <div className="shop-wide shop-row-btns">
                <button className="btn btn-primary" disabled={busy}>Save address</button>
                <button type="button" className="btn btn-outline-blue" onClick={() => setEditing(null)}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      )}

      {tab === 'details' && (
        <>
          <form className="shop-card" onSubmit={saveProfile}>
            <h2>Your details</h2>
            <div className="shop-grid">
              <label><span>Name</span><input autoComplete="name" value={profile.name} onChange={e => setProfile(x => ({ ...x, name: e.target.value }))} /></label>
              <label><span>Company</span><input autoComplete="organization" value={profile.company} onChange={e => setProfile(x => ({ ...x, company: e.target.value }))} /></label>
              <label><span>Phone</span><input type="tel" autoComplete="tel" value={profile.phone} onChange={e => setProfile(x => ({ ...x, phone: e.target.value }))} /></label>
              <label><span>Email</span><input value={p.customer.email} disabled /></label>
            </div>
            <button className="btn btn-primary shop-mt" disabled={busy}>Save details</button>
          </form>

          <form className="shop-card" onSubmit={upload}>
            <h2>Sales tax exemption</h2>
            <p className={`shop-status shop-tone-${taxStatus === 'approved' ? 'ok' : taxStatus === 'rejected' ? 'bad' : 'wait'}`}>
              <span className="shop-status-pill">{taxStatus === 'approved' ? 'Exempt: approved' : taxStatus === 'pending' ? 'Under review' : taxStatus === 'rejected' ? 'Not approved' : 'Not exempt'}</span>
              {p.customer.taxNote && <span>{p.customer.taxNote}</span>}
            </p>
            <p className="shop-fine">If your organization is exempt from GST/HST or provincial sales tax (for example a reseller with a PST exemption, a First Nations purchaser or an exporter), upload your certificate. Once approved, online orders and invoices to {p.customer.email} are not charged the exempt tax.</p>
            <div className="shop-grid">
              <label><span>Certificate (PDF, JPG or PNG, up to 5 MB)</span><input type="file" name="file" accept="application/pdf,image/jpeg,image/png" required /></label>
              <label><span>Exemption number or note</span><input name="note" maxLength={500} /></label>
            </div>
            <button className="btn btn-primary shop-mt" disabled={busy}>Upload certificate</button>
            {docs.length > 0 && <ul className="shop-docs">{docs.map(d => <li key={d.id}>{d.name} · uploaded {day(d.created)}{d.note && ` · ${d.note}`}</li>)}</ul>}
          </form>
        </>
      )}
    </div>
  )
}
