'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminNav from '@/components/admin/AdminNav'
import type { PickupYard, ShopSettings } from '@/lib/shop/settings'
import { REGIONS, type CountryCode } from '@/lib/shop/regions'

const numOrEmpty = (v: number | null) => (v === null ? '' : String(v))
const toNum = (v: string) => (v.trim() === '' ? null : Number(v))

export default function AdminShopSettings({ initial, adminEmail, stripe }: { initial: ShopSettings; adminEmail: string; stripe: { configured: boolean; live: boolean } }) {
  const router = useRouter()
  const [s, setS] = useState<ShopSettings>(initial)
  const [msg, setMsg] = useState<{ tone: 'ok' | 'err'; text: string } | null>(null)
  const [saving, setSaving] = useState(false)
  const [reminderText, setReminderText] = useState(initial.deposit.reminderDays.join(', '))
  const set = <K extends keyof ShopSettings>(k: K, v: ShopSettings[K]) => setS(x => ({ ...x, [k]: v }))
  const setFreight = (patch: Partial<ShopSettings['freight']>) => setS(x => ({ ...x, freight: { ...x.freight, ...patch } }))
  const setPickup = (patch: Partial<ShopSettings['pickup']>) => setS(x => ({ ...x, pickup: { ...x.pickup, ...patch } }))
  const setYard = (i: number, patch: Partial<PickupYard>) => setPickup({ yards: s.pickup.yards.map((y, j) => (j === i ? { ...y, ...patch } : y)) })
  const setDeposit = (patch: Partial<ShopSettings['deposit']>) => setS(x => ({ ...x, deposit: { ...x.deposit, ...patch } }))
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
          <p className="ia-note">Only listings with <strong>Online purchase → Buy online</strong> (not custom builds), a fixed price shown, and stock on hand can be bought. Everything else stays “Request a quote”.</p>
          <div className="ia-grid ia-mt">
            <label className="ia-field"><span className="ia-label">Most units per item online</span>
              <input inputMode="numeric" value={s.maxQuantity} onChange={e => set('maxQuantity', Number(e.target.value.replace(/\D/g, '')) || 0)} />
              <span className="ia-hint">More than this = “Request a quote for volume pricing”.</span>
            </label>
            <label className="ia-field"><span className="ia-label">Default “ships in” text</span>
              <input value={s.defaultShipsIn} onChange={e => set('defaultShipsIn', e.target.value)} placeholder="Ships in 2–3 business days" />
              <span className="ia-hint">Shown on Buy online listings without their own lead time.</span>
            </label>
          </div>
        </section>

        <section className="ia-card">
          <h3>Payments</h3>
          <div className="ia-grid">
            <label className="ia-field"><span className="ia-label">Online payment limit (CAD, before tax)</span>
              <input inputMode="decimal" value={numOrEmpty(s.onlineLimit)} placeholder="No limit" onChange={e => set('onlineLimit', toNum(e.target.value))} />
              <span className="ia-hint">Above this, nothing is paid online: the order is submitted, stock is held and accounting arranges EFT, bank draft or cheque.</span>
            </label>
            <label className="ia-field"><span className="ia-label">Hold stock for (business days)</span>
              <input inputMode="numeric" value={s.offlineHoldDays} onChange={e => set('offlineHoldDays', Number(e.target.value.replace(/\D/g, '')) || 0)} />
              <span className="ia-hint">For orders over the limit, while accounting collects payment. Can be extended per order.</span>
            </label>
            <div className="ia-toggles ia-wide">
              <label><input type="checkbox" checked={s.bankDebit} onChange={e => set('bankDebit', e.target.checked)} /> Offer bank debit (Canadian pre-authorized debit for CAD, ACH for USD). Turn it on in Stripe → Settings → Payment methods too.</label>
              <label><input type="checkbox" checked={s.automaticTax} onChange={e => set('automaticTax', e.target.checked)} /> Calculate sales tax with Stripe Tax (GST/HST/QST/PST). Add your tax registrations in Stripe → Tax first.</label>
              <label><input type="checkbox" checked={s.usd.enabled} onChange={e => set('usd', { ...s.usd, enabled: e.target.checked })} /> Charge US buyers in USD (CAD price at the day’s Bank of Canada rate, plus the margin below)</label>
            </div>
            {s.usd.enabled && (
              <label className="ia-field"><span className="ia-label">USD margin (%)</span>
                <input inputMode="decimal" value={s.usd.marginPercent} onChange={e => set('usd', { ...s.usd, marginPercent: Number(e.target.value) || 0 })} />
              </label>
            )}
          </div>
        </section>

        <section className="ia-card">
          <h3>Invoices</h3>
          <p className="ia-note">Every online order gets a Stripe PDF invoice. Your business name and address come from Stripe → Settings → Business details; add your registration numbers here so they print on every invoice.</p>
          <div className="ia-grid">
            <label className="ia-field"><span className="ia-label">GST/HST number</span><input value={s.invoice.gstHst} placeholder="123456789 RT0001" onChange={e => set('invoice', { ...s.invoice, gstHst: e.target.value })} /></label>
            <label className="ia-field"><span className="ia-label">QST number (if registered)</span><input value={s.invoice.qst} onChange={e => set('invoice', { ...s.invoice, qst: e.target.value })} /></label>
            <label className="ia-field"><span className="ia-label">PST number(s) (if registered)</span><input value={s.invoice.pst} onChange={e => set('invoice', { ...s.invoice, pst: e.target.value })} /></label>
            <label className="ia-field ia-wide"><span className="ia-label">Invoice footer</span><input value={s.invoice.footer} placeholder="e.g. Terms of sale: candron.com/terms-and-conditions" onChange={e => set('invoice', { ...s.invoice, footer: e.target.value })} /></label>
          </div>
        </section>

        <section className="ia-card">
          <h3>Delivery</h3>
          <div className="ia-toggles">
            <label><input type="checkbox" checked={s.shipCountries.includes('CA')} onChange={e => set('shipCountries', e.target.checked ? Array.from(new Set([...s.shipCountries, 'CA' as const])) : s.shipCountries.filter(c => c !== 'CA'))} /> Ship to Canada</label>
            <label><input type="checkbox" checked={s.shipCountries.includes('US')} onChange={e => set('shipCountries', e.target.checked ? Array.from(new Set([...s.shipCountries, 'US' as const])) : s.shipCountries.filter(c => c !== 'US'))} /> Ship to the United States</label>
            <label><input type="checkbox" checked={s.pickup.enabled} onChange={e => setPickup({ enabled: e.target.checked })} /> Offer pickup / customer’s own carrier (no freight charge)</label>
          </div>
          {s.pickup.enabled && (
            <>
              <label className="ia-field ia-mt"><span className="ia-label">Pickup hours (shown at checkout)</span><input value={s.pickup.hours} onChange={e => setPickup({ hours: e.target.value })} /></label>
              <p className="ia-note">Each listing chooses its yard (Inventory → Pricing). Only the city is shown to buyers. The postal code is used to calculate tax for pickups at Canadian yards; pickups at a US yard are taxed on the buyer’s billing address, so Canadian buyers pay Canadian tax.</p>
              <div className="ia-table-wrap">
                <table className="ia-table">
                  <thead><tr><th>Id</th><th>City</th><th>Country</th><th>Province / state</th><th>Postal / ZIP (tax)</th><th>On</th><th /></tr></thead>
                  <tbody>
                    {s.pickup.yards.map((y, i) => (
                      <tr key={i}>
                        <td><input value={y.id} onChange={e => setYard(i, { id: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })} aria-label="Yard id" /></td>
                        <td><input value={y.name} onChange={e => setYard(i, { name: e.target.value })} aria-label="City" /></td>
                        <td><select value={y.country} onChange={e => setYard(i, { country: e.target.value as CountryCode, region: '' })} aria-label="Country"><option value="CA">Canada</option><option value="US">United States</option></select></td>
                        <td><select value={y.region} onChange={e => setYard(i, { region: e.target.value })} aria-label="Province or state"><option value="">Choose…</option>{REGIONS[y.country].map(r => <option key={r.code} value={r.code}>{r.name}</option>)}</select></td>
                        <td><input value={y.postal} onChange={e => setYard(i, { postal: e.target.value })} aria-label="Postal code" /></td>
                        <td><input type="checkbox" checked={y.enabled} onChange={e => setYard(i, { enabled: e.target.checked })} aria-label={`${y.name} enabled`} /></td>
                        <td><button type="button" className="ia-x" aria-label={`Remove ${y.name}`} onClick={() => setPickup({ yards: s.pickup.yards.filter((_, j) => j !== i) })}>×</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button type="button" className="ia-add" onClick={() => setPickup({ yards: [...s.pickup.yards, { id: `yard-${s.pickup.yards.length + 1}`, name: '', region: 'ON', postal: '', country: 'CA', enabled: true }] })}>+ Add yard</button>
              <p className="ia-hint">Changing a yard’s id unlinks the listings that use it.</p>
            </>
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
          <h3>Deposits (sales quotes)</h3>
          <p className="ia-note">Deposits aren’t taken on listings. The sales team can quote with a deposit; these defaults apply to those orders.</p>
          <div className="ia-grid">
            <label className="ia-field"><span className="ia-label">Default deposit (%)</span>
              <input inputMode="decimal" value={s.deposit.percent} onChange={e => setDeposit({ percent: Number(e.target.value) || 0 })} />
            </label>
            <label className="ia-field"><span className="ia-label">Balance due (days after the deposit)</span>
              <input inputMode="numeric" value={s.deposit.balanceDays} onChange={e => setDeposit({ balanceDays: Number(e.target.value.replace(/\D/g, '')) || 0 })} />
            </label>
            <label className="ia-field"><span className="ia-label">Balance reminders (days after the deposit)</span>
              <input value={reminderText} onChange={e => { setReminderText(e.target.value); setDeposit({ reminderDays: e.target.value.split(',').map(v => Number(v.trim())).filter(n => n > 0) }) }} />
              <span className="ia-hint">Emailed to the buyer, copying accounting. Separate with commas.</span>
            </label>
            <label className="ia-field"><span className="ia-label">Flag for forfeit after (days)</span>
              <input inputMode="numeric" value={s.deposit.forfeitDays} onChange={e => setDeposit({ forfeitDays: Number(e.target.value.replace(/\D/g, '')) || 0 })} />
              <span className="ia-hint">The team is emailed and confirms the forfeit in Orders. Nothing is forfeited automatically.</span>
            </label>
          </div>
        </section>

        <section className="ia-card">
          <h3>Return policy</h3>
          <p className="ia-note">Shown on the Returns page and in the product data search engines read. The buyer pays return freight; restocking fees vary and are confirmed by the sales team.</p>
          <div className="ia-grid">
            <label className="ia-field"><span className="ia-label">Return window (days)</span><input inputMode="numeric" value={numOrEmpty(s.returns.days)} placeholder="Not published" onChange={e => set('returns', { ...s.returns, days: toNum(e.target.value) })} /></label>
            <label className="ia-field"><span className="ia-label">Restocking fee (%)</span><input inputMode="decimal" value={numOrEmpty(s.returns.restockingPercent)} placeholder="None" onChange={e => set('returns', { ...s.returns, restockingPercent: toNum(e.target.value) })} /></label>
            <div className="ia-toggles ia-wide">
              <label><input type="checkbox" checked={s.returns.usedFinalSale} onChange={e => set('returns', { ...s.returns, usedFinalSale: e.target.checked })} /> Used and surplus equipment is final sale, sold as-is (no returns, no warranty)</label>
              <label><input type="checkbox" checked={s.returns.customFinalSale} onChange={e => set('returns', { ...s.returns, customFinalSale: e.target.checked })} /> Custom builds are final sale</label>
            </div>
          </div>
        </section>

        <section className="ia-card">
          <h3>Notifications</h3>
          <div className="ia-grid">
            <label className="ia-field"><span className="ia-label">Orders (sales team)</span>
              <input value={s.notifyEmail} placeholder="sales@candron.com" onChange={e => set('notifyEmail', e.target.value)} />
            </label>
            <label className="ia-field"><span className="ia-label">Payments (accounting)</span>
              <input value={s.accountingEmail} placeholder="accounting@candron.com" onChange={e => set('accountingEmail', e.target.value)} />
            </label>
          </div>
          <p className="ia-hint">Sales hears about new orders; accounting about payments, refunds, orders over the online limit, overdue balances and tax-exemption certificates. Separate several addresses with commas.</p>
        </section>

        <div className="ia-savebar">
          {msg && <span className={`ia-msg ia-${msg.tone}`} role="status">{msg.text}</span>}
          <button type="button" className="ia-btn ia-primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save settings'}</button>
        </div>
      </div>
    </div>
  )
}
