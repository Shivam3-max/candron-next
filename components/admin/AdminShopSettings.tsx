'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminNav from '@/components/admin/AdminNav'
import type { ShopSettings } from '@/lib/shop/settings'
import { REGIONS } from '@/lib/shop/regions'

const numOrEmpty = (v: number | null) => (v === null ? '' : String(v))
const toNum = (v: string) => (v.trim() === '' ? null : Number(v))

export default function AdminShopSettings({ initial, adminEmail, stripe }: { initial: ShopSettings; adminEmail: string; stripe: { configured: boolean; live: boolean } }) {
  const router = useRouter()
  const [s, setS] = useState<ShopSettings>(initial)
  const [msg, setMsg] = useState<{ tone: 'ok' | 'err'; text: string } | null>(null)
  const [saving, setSaving] = useState(false)
  const set = <K extends keyof ShopSettings>(k: K, v: ShopSettings[K]) => setS(x => ({ ...x, [k]: v }))
  const setFreight = (patch: Partial<ShopSettings['freight']>) => setS(x => ({ ...x, freight: { ...x.freight, ...patch } }))
  const setPickup = (patch: Partial<ShopSettings['pickup']>) => setS(x => ({ ...x, pickup: { ...x.pickup, ...patch } }))
  const bandLimits = Array.from(new Set(s.freight.zones.flatMap(z => z.bands.map(b => b.maxLb)))).sort((a, b) => (a ?? Infinity) - (b ?? Infinity))

  function setBand(zi: number, maxLb: number | null, price: number | null) {
    setFreight({
      zones: s.freight.zones.map((z, i) => i !== zi ? z : {
        ...z, bands: z.bands.some(b => b.maxLb === maxLb) ? z.bands.map(b => (b.maxLb === maxLb ? { ...b, price } : b)) : [...z.bands, { maxLb, price }],
      }),
    })
  }

  async function save() {
    setSaving(true); setMsg(null)
    const r = await fetch('/api/admin/shop-settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s) })
    const d = await r.json().catch(() => ({}))
    setSaving(false)
    if (!r.ok) { setMsg({ tone: 'err', text: d.error || 'Could not save.' }); return }
    setS(d.settings)
    setMsg({ tone: 'ok', text: 'Settings saved.' })
    router.refresh()
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  return (
    <div className="ia">
      <div className="ia-top">
        <div>
          <div className="ia-kicker">CANDRON · Admin</div>
          <h1>Shop settings</h1>
        </div>
        <div className="ia-top-actions">
          <span className="ia-who">{adminEmail}</span>
          <AdminNav current="shop" />
          <button type="button" onClick={logout} className="ia-btn ia-ghost">Sign out</button>
        </div>
      </div>

      <div className="ia-narrow">
        <section className="ia-card">
          <h3>Online ordering</h3>
          <p className={`ia-banner ${stripe.configured ? (stripe.live ? 'ia-banner-live' : 'ia-banner-test') : ''}`}>
            {!stripe.configured
              ? 'Stripe is not connected. Add STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET in Hostinger, then redeploy.'
              : stripe.live ? 'Stripe is connected in LIVE mode. Real payments will be taken.' : 'Stripe is connected in TEST mode. Use test cards; no real money moves.'}
          </p>
          <label className="ia-check ia-big"><input type="checkbox" checked={s.enabled} disabled={!stripe.configured && !s.enabled} onChange={e => set('enabled', e.target.checked)} /> Take orders online (shows “Add to cart” on listings set to “Buy online”)</label>
          <p className="ia-note">Only listings with <strong>Online purchase → Buy online</strong>, a fixed price shown, and stock on hand can be bought. Everything else stays “Request a quote”.</p>
        </section>

        <section className="ia-card">
          <h3>Payments</h3>
          <div className="ia-grid">
            <label className="ia-field"><span className="ia-label">Card limit (before tax)</span>
              <input inputMode="decimal" value={numOrEmpty(s.cardLimit)} placeholder="No limit" onChange={e => set('cardLimit', toNum(e.target.value))} />
              <span className="ia-hint">Above this, buyers pay by bank debit only. Leave blank for no limit.</span>
            </label>
            <div className="ia-toggles ia-wide">
              <label><input type="checkbox" checked={s.bankDebit} onChange={e => set('bankDebit', e.target.checked)} /> Offer bank debit (Canadian pre-authorized debit for CAD, ACH for USD). Turn it on in Stripe → Settings → Payment methods too.</label>
              <label><input type="checkbox" checked={s.automaticTax} onChange={e => set('automaticTax', e.target.checked)} /> Calculate sales tax with Stripe Tax (GST/HST/QST/PST). Add your tax registrations in Stripe → Tax first.</label>
            </div>
          </div>
        </section>

        <section className="ia-card">
          <h3>Delivery</h3>
          <div className="ia-toggles">
            <label><input type="checkbox" checked={s.shipCountries.includes('CA')} onChange={e => set('shipCountries', e.target.checked ? Array.from(new Set([...s.shipCountries, 'CA' as const])) : s.shipCountries.filter(c => c !== 'CA'))} /> Ship to Canada</label>
            <label><input type="checkbox" checked={s.shipCountries.includes('US')} onChange={e => set('shipCountries', e.target.checked ? Array.from(new Set([...s.shipCountries, 'US' as const])) : s.shipCountries.filter(c => c !== 'US'))} /> Ship to the United States</label>
            <label><input type="checkbox" checked={s.pickup.enabled} onChange={e => setPickup({ enabled: e.target.checked })} /> Offer free pickup</label>
          </div>
          {s.pickup.enabled && (
            <div className="ia-grid ia-mt">
              <label className="ia-field"><span className="ia-label">Pickup option name</span><input value={s.pickup.label} onChange={e => setPickup({ label: e.target.value })} /></label>
              <label className="ia-field ia-wide"><span className="ia-label">Pickup street address (used for tax; shared with the buyer after ordering)</span><input value={s.pickup.line1} onChange={e => setPickup({ line1: e.target.value })} /></label>
              <label className="ia-field"><span className="ia-label">City</span><input value={s.pickup.city} onChange={e => setPickup({ city: e.target.value })} /></label>
              <label className="ia-field"><span className="ia-label">Province</span>
                <select value={s.pickup.region} onChange={e => setPickup({ region: e.target.value, country: 'CA' })}>{REGIONS.CA.map(r => <option key={r.code} value={r.code}>{r.name}</option>)}</select>
              </label>
              <label className="ia-field"><span className="ia-label">Postal code</span><input value={s.pickup.postal} onChange={e => setPickup({ postal: e.target.value })} /></label>
            </div>
          )}
        </section>

        <section className="ia-card">
          <h3>Freight</h3>
          <div className="ia-grid">
            <label className="ia-field"><span className="ia-label">How freight is charged</span>
              <select value={s.freight.mode} onChange={e => setFreight({ mode: e.target.value as ShopSettings['freight']['mode'] })}>
                <option value="zones">By region and weight (table below)</option>
                <option value="percent">Percentage of the order</option>
                <option value="quote">Quoted after the order (not charged at checkout)</option>
              </select>
            </label>
            {s.freight.mode === 'percent' && <label className="ia-field"><span className="ia-label">Percentage of goods (%)</span><input inputMode="decimal" value={s.freight.percent} onChange={e => setFreight({ percent: Number(e.target.value) || 0 })} /></label>}
            {s.freight.mode !== 'quote' && <label className="ia-field"><span className="ia-label">Minimum freight charge</span><input inputMode="decimal" value={s.freight.minimum} onChange={e => setFreight({ minimum: Number(e.target.value) || 0 })} /></label>}
          </div>
          {s.freight.mode === 'zones' && (
            <>
              <p className="ia-note">Delivered price per shipment, before tax. Leave a cell blank where freight must be quoted (the buyer is asked to choose pickup or request a quote). Total shipment weight decides the column; items without a weight can’t be shipped at checkout.</p>
              <div className="ia-table-wrap">
                <table className="ia-table ia-freight">
                  <thead><tr><th>Zone</th><th>Matches</th>{bandLimits.map(m => <th key={String(m)}>{m === null ? 'Heavier' : `≤ ${m.toLocaleString('en-CA')} lb`}</th>)}<th /></tr></thead>
                  <tbody>
                    {s.freight.zones.map((z, zi) => (
                      <tr key={zi}>
                        <td><input value={z.name} onChange={e => setFreight({ zones: s.freight.zones.map((x, i) => (i === zi ? { ...x, name: e.target.value } : x)) })} /></td>
                        <td><input value={z.match.join(', ')} title="CA, CA-ON, CA-ON:M (postal prefix), US, US-NY" onChange={e => setFreight({ zones: s.freight.zones.map((x, i) => (i === zi ? { ...x, match: e.target.value.split(',').map(m => m.trim()) } : x)) })} /></td>
                        {bandLimits.map(m => (
                          <td key={String(m)}><input inputMode="decimal" placeholder="Quote" value={numOrEmpty(z.bands.find(b => b.maxLb === m)?.price ?? null)} onChange={e => setBand(zi, m, toNum(e.target.value))} /></td>
                        ))}
                        <td><button type="button" className="ia-x" aria-label={`Remove ${z.name}`} onClick={() => setFreight({ zones: s.freight.zones.filter((_, i) => i !== zi) })}>×</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button type="button" className="ia-add" onClick={() => setFreight({ zones: [...s.freight.zones, { name: 'New zone', match: ['CA'], bands: bandLimits.map(maxLb => ({ maxLb, price: null })) }] })}>+ Add zone</button>
              <p className="ia-hint">Matches: <code>CA</code> = all of Canada, <code>CA-ON</code> = Ontario, <code>CA-ON:M</code> = Ontario postal codes starting with M, <code>US-NY</code> = New York. The most specific match wins.</p>
            </>
          )}
        </section>

        <section className="ia-card">
          <h3>Deposits and invoices</h3>
          <div className="ia-grid">
            <label className="ia-field"><span className="ia-label">Default deposit (%)</span>
              <input inputMode="decimal" value={s.deposit.percent} onChange={e => set('deposit', { ...s.deposit, percent: Number(e.target.value) || 0 })} />
              <span className="ia-hint">Used by “Reserve with deposit” listings without their own %.</span>
            </label>
            <label className="ia-field"><span className="ia-label">Days to pay a balance invoice</span>
              <input inputMode="numeric" value={s.deposit.balanceDays} onChange={e => set('deposit', { ...s.deposit, balanceDays: Number(e.target.value.replace(/\D/g, '')) || 0 })} />
            </label>
          </div>
        </section>

        <section className="ia-card">
          <h3>Return policy (for Google listings)</h3>
          <p className="ia-note">Published in the product data search engines read, for listings you sell online. Leave the window blank until the policy is final.</p>
          <div className="ia-grid">
            <label className="ia-field"><span className="ia-label">Return window (days)</span><input inputMode="numeric" value={numOrEmpty(s.returns.days)} placeholder="Not published" onChange={e => set('returns', { ...s.returns, days: toNum(e.target.value) })} /></label>
            <label className="ia-field"><span className="ia-label">Restocking fee (%)</span><input inputMode="decimal" value={numOrEmpty(s.returns.restockingPercent)} placeholder="None" onChange={e => set('returns', { ...s.returns, restockingPercent: toNum(e.target.value) })} /></label>
            <div className="ia-toggles ia-wide"><label><input type="checkbox" checked={s.returns.usedFinalSale} onChange={e => set('returns', { ...s.returns, usedFinalSale: e.target.checked })} /> Used and surplus equipment is final sale (no returns)</label></div>
          </div>
        </section>

        <section className="ia-card">
          <h3>Notifications</h3>
          <label className="ia-field ia-wide"><span className="ia-label">Send new-order emails to</span>
            <input value={s.notifyEmail} placeholder="Default: the contact form recipients" onChange={e => set('notifyEmail', e.target.value)} />
            <span className="ia-hint">Separate several addresses with commas.</span>
          </label>
        </section>

        <div className="ia-savebar">
          {msg && <span className={`ia-msg ia-${msg.tone}`} role="status">{msg.text}</span>}
          <button type="button" className="ia-btn ia-primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save settings'}</button>
        </div>
      </div>
    </div>
  )
}
