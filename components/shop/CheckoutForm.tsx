'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { useCart } from '@/lib/shop/cart-store'
import { formatMoney } from '@/lib/shop/order-status'
import { COUNTRIES, REGIONS, type CountryCode } from '@/lib/shop/regions'
import { trackBeginCheckout } from '@/lib/analytics'

interface Quote {
  open: boolean
  lines: { id: number; sku: string; name: string; quantity: number; unitPrice: number; lineTotal: number; error: string | null }[]
  currency: string; subtotal: number; errors: string[]
  freight: { ok: true; amount: number; label: string; billedLater: boolean } | { ok: false; error: string } | null
  methods: string[]; cardLimit: number | null; automaticTax: boolean
  pickup: { label: string; city: string; region: string } | null
  shipCountries: CountryCode[]
  deposit: { percent: number; amount: number } | null
}

interface SavedAddress { id: number; label: string; line1: string; line2: string; city: string; region: string; postal: string; country: string; is_default: number }
const blankAddress = { line1: '', line2: '', city: '', region: '', postal: '', country: 'CA' as CountryCode }

export default function CheckoutForm() {
  const cart = useCart()
  // /checkout?reserve=<id>&qty=<n> pays a deposit on one listing instead of checking out the cart
  const params = useSearchParams()
  const reserveId = Number(params.get('reserve')) || 0
  const mode: 'buy' | 'reserve' = reserveId ? 'reserve' : 'buy'
  const items = reserveId
    ? [{ id: reserveId, quantity: Math.max(1, Number(params.get('qty')) || 1), currency: 'CAD', sku: '', name: '', price: 0 }]
    : cart
  const [contact, setContact] = useState({ name: '', company: '', email: '', phone: '', poNumber: '', notes: '' })
  const [fulfilment, setFulfilment] = useState<'delivery' | 'pickup'>('delivery')
  const [address, setAddress] = useState(blankAddress)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [reminder, setReminder] = useState(false)
  const [account, setAccount] = useState<{ email: string; addresses: SavedAddress[] } | null>(null)
  const [saveToAccount, setSaveToAccount] = useState(true)

  // Signed-in buyers: prefill their details and offer their saved delivery addresses
  useEffect(() => {
    let live = true
    fetch('/api/account/me').then(r => (r.ok ? r.json() : null)).then(d => {
      if (!live || !d?.customer) return
      setAccount({ email: d.customer.email, addresses: d.addresses ?? [] })
      setContact(c => ({ ...c, name: c.name || d.customer.name, company: c.company || d.customer.company, email: c.email || d.customer.email, phone: c.phone || d.customer.phone }))
      const def = (d.addresses as SavedAddress[] | undefined)?.find(a => a.is_default) ?? d.addresses?.[0]
      if (def) setAddress(a => (a.line1 ? a : { line1: def.line1, line2: def.line2, city: def.city, region: def.region, postal: def.postal, country: def.country as CountryCode }))
    }).catch(() => {})
    return () => { live = false }
  }, [])
  const [quote, setQuote] = useState<Quote | null>(null)
  const [state, setState] = useState<'idle' | 'sending'>('idle')
  const [error, setError] = useState('')

  const itemKey = items.map(i => `${i.id}:${i.quantity}`).join(',')
  const postalKey = address.postal.replace(/\s+/g, '').toUpperCase()

  // Re-price (and recalculate freight) when the cart or delivery details change
  useEffect(() => {
    if (!itemKey) return
    const ctrl = new AbortController()
    const t = setTimeout(() => {
      fetch('/api/shop/cart', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: ctrl.signal,
        body: JSON.stringify({
          items: itemKey.split(',').map(p => ({ id: Number(p.split(':')[0]), quantity: Number(p.split(':')[1]) })),
          mode,
          fulfilment,
          address: fulfilment === 'delivery' && address.region ? { country: address.country, region: address.region, postal: postalKey } : null,
        }),
      }).then(r => r.json()).then((d: Quote) => setQuote(d)).catch(() => {})
    }, 300)
    return () => { clearTimeout(t); ctrl.abort() }
  }, [itemKey, mode, fulfilment, address.country, address.region, postalKey])

  if (!items.length && mode === 'buy') {
    return (
      <div className="shop-empty">
        <p>Your cart is empty.</p>
        <Link href="/inventory" className="btn btn-primary">Browse in-stock inventory</Link>
      </div>
    )
  }

  const countries = COUNTRIES.filter(c => !quote || quote.shipCountries.includes(c.code))
  const country = COUNTRIES.find(c => c.code === address.country) ?? COUNTRIES[0]
  const currency = quote?.currency ?? items[0].currency
  const freightAmount = quote?.freight?.ok ? quote.freight.amount : 0
  const blocked = !quote || !quote.open || quote.errors.length > 0 || quote.lines.some(l => l.error) || (quote.freight !== null && !quote.freight.ok)
  const setC = (k: keyof typeof contact, v: string) => setContact(c => ({ ...c, [k]: v }))
  const setA = (k: keyof typeof address, v: string) => setAddress(a => ({ ...a, [k]: v }))

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!quote) return
    setState('sending')
    setError('')
    trackBeginCheckout(currency, quote.subtotal + freightAmount, quote.lines.map(l => ({ item_id: l.sku, item_name: l.name, price: l.unitPrice, quantity: l.quantity })))
    try {
      const r = await fetch('/api/shop/checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contact, mode, fulfilment, address, acceptTerms, reminder, saveAddress: Boolean(account) && saveToAccount, items: items.map(i => ({ id: i.id, quantity: i.quantity })), website: (e.currentTarget as HTMLFormElement).website?.value }),
      })
      const d = await r.json().catch(() => ({}))
      if (!r.ok || !d.url) throw new Error(d.error || 'Could not start checkout.')
      window.location.assign(d.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not start checkout.')
      setState('idle')
    }
  }

  return (
    <form className="shop-checkout" onSubmit={submit}>
      <div className="shop-checkout-main">
        <fieldset className="shop-card">
          <legend>1 · Contact</legend>
          {account
            ? <p className="shop-signin-hint">Signed in as {account.email}. This order will appear in <Link href="/account">your account</Link>.</p>
            : <p className="shop-signin-hint">Ordered before? <Link href={`/account/login?next=${encodeURIComponent(mode === 'reserve' ? `/checkout?reserve=${reserveId}` : '/checkout')}`}>Sign in</Link> to use your saved details and addresses, or continue as a guest.</p>}
          <div className="shop-grid">
            <label><span>Full name *</span><input required autoComplete="name" value={contact.name} onChange={e => setC('name', e.target.value)} /></label>
            <label><span>Company</span><input autoComplete="organization" value={contact.company} onChange={e => setC('company', e.target.value)} /></label>
            <label><span>Email *</span><input required type="email" autoComplete="email" value={contact.email} onChange={e => setC('email', e.target.value)} /></label>
            <label><span>Phone *</span><input required type="tel" autoComplete="tel" value={contact.phone} onChange={e => setC('phone', e.target.value)} /></label>
            <label><span>PO number</span><input value={contact.poNumber} maxLength={60} onChange={e => setC('poNumber', e.target.value)} /></label>
          </div>
        </fieldset>

        <fieldset className="shop-card">
          <legend>2 · Delivery</legend>
          {quote?.pickup && (
            <div className="shop-choice" role="radiogroup" aria-label="Delivery or pickup">
              <label className={fulfilment === 'delivery' ? 'on' : ''}><input type="radio" name="fulfilment" checked={fulfilment === 'delivery'} onChange={() => setFulfilment('delivery')} /> Ship to my site</label>
              <label className={fulfilment === 'pickup' ? 'on' : ''}><input type="radio" name="fulfilment" checked={fulfilment === 'pickup'} onChange={() => setFulfilment('pickup')} /> {quote.pickup.label} ({quote.pickup.city}, {quote.pickup.region}) · free</label>
            </div>
          )}
          {fulfilment === 'delivery' && account && account.addresses.length > 0 && (
            <label className="shop-saved-address"><span>Saved address</span>
              <select defaultValue="" onChange={e => {
                const a = account.addresses.find(x => x.id === Number(e.target.value))
                if (a) setAddress({ line1: a.line1, line2: a.line2, city: a.city, region: a.region, postal: a.postal, country: a.country as CountryCode })
              }}>
                <option value="">Choose a saved address…</option>
                {account.addresses.map(a => <option key={a.id} value={a.id}>{a.label ? `${a.label} · ` : ''}{a.line1}, {a.city}</option>)}
              </select>
            </label>
          )}
          {fulfilment === 'delivery' ? (
            <div className="shop-grid">
              <label className="shop-wide"><span>Street address *</span><input required autoComplete="address-line1" value={address.line1} onChange={e => setA('line1', e.target.value)} /></label>
              <label className="shop-wide"><span>Unit, building, site notes</span><input autoComplete="address-line2" value={address.line2} onChange={e => setA('line2', e.target.value)} /></label>
              <label><span>City *</span><input required autoComplete="address-level2" value={address.city} onChange={e => setA('city', e.target.value)} /></label>
              <label><span>Country *</span>
                <select value={address.country} autoComplete="country" onChange={e => setAddress(a => ({ ...a, country: e.target.value as CountryCode, region: '' }))}>
                  {countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                </select>
              </label>
              <label><span>{country.regionLabel} *</span>
                <select required value={address.region} autoComplete="address-level1" onChange={e => setA('region', e.target.value)}>
                  <option value="">Choose…</option>
                  {REGIONS[address.country].map(r => <option key={r.code} value={r.code}>{r.name}</option>)}
                </select>
              </label>
              <label><span>{country.postalLabel} *</span><input required autoComplete="postal-code" value={address.postal} onChange={e => setA('postal', e.target.value)} /></label>
            </div>
          ) : (
            <p className="shop-fine">We’ll call you to book a pickup time once your order is ready. Please bring suitable lifting equipment or ask us about loading.</p>
          )}
          {fulfilment === 'delivery' && account && (
            <label className="shop-check shop-mt"><input type="checkbox" checked={saveToAccount} onChange={e => setSaveToAccount(e.target.checked)} /> Save this address to my account</label>
          )}
          <label className="shop-wide shop-notes"><span>Notes for our team (site access, offloading, timing)</span>
            <textarea rows={3} value={contact.notes} onChange={e => setC('notes', e.target.value)} />
          </label>
          <input name="website" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
        </fieldset>
      </div>

      <aside className="shop-card shop-checkout-summary" aria-live="polite">
        <h2>Order summary</h2>
        <ul className="shop-mini-lines">
          {(quote?.lines ?? items.map(i => ({ id: i.id, sku: i.sku, name: i.name, quantity: i.quantity, unitPrice: i.price, lineTotal: i.price * i.quantity, error: null }))).map(l => (
            <li key={l.id}>
              <span>{l.name} <small>× {l.quantity}</small>{l.error && <em className="shop-line-error">{l.error}</em>}</span>
              <strong>{formatMoney(l.lineTotal, currency)}</strong>
            </li>
          ))}
        </ul>
        <div className="shop-summary-row"><span>Subtotal</span><strong>{quote ? formatMoney(quote.subtotal, currency) : '…'}</strong></div>
        <div className="shop-summary-row">
          <span>{quote?.freight?.ok ? quote.freight.label : 'Freight'}</span>
          <strong>{!quote?.freight ? (fulfilment === 'delivery' ? 'Enter address' : '…') : quote.freight.ok ? (quote.freight.billedLater ? 'Quoted separately' : formatMoney(quote.freight.amount, currency)) : '—'}</strong>
        </div>
        {quote?.freight && !quote.freight.ok && <p className="shop-error">{quote.freight.error} <Link href="/contact">Request a quote</Link></p>}
        <div className="shop-summary-row"><span>Tax</span><strong>{quote?.automaticTax === false ? 'Not charged online' : 'Calculated on next step'}</strong></div>
        {quote?.deposit ? (
          <>
            <div className="shop-summary-row"><span>Order value before tax</span><strong>{formatMoney(quote.subtotal, currency)}</strong></div>
            <div className="shop-summary-row shop-total"><span>Deposit due now ({quote.deposit.percent}%)</span><strong>{formatMoney(quote.deposit.amount, currency)}</strong></div>
            <p className="shop-fine">Tax on the deposit is added on the payment page. The balance and freight are invoiced before shipping.</p>
          </>
        ) : (
          <div className="shop-summary-row shop-total"><span>Total before tax</span><strong>{quote ? formatMoney(quote.subtotal + freightAmount, currency) : '…'}</strong></div>
        )}
        {quote && (
          <p className="shop-fine">
            Pay by {quote.methods.includes('card') ? 'card (Visa, Mastercard, Amex, Apple Pay, Google Pay)' : ''}{quote.methods.includes('card') && quote.methods.length > 2 ? ' or ' : ''}{quote.methods.some(m => m === 'acss_debit' || m === 'us_bank_account') ? 'bank debit from a business account' : ''}.
            {quote.cardLimit !== null && !quote.methods.includes('card') ? ` Card payments are available on orders up to ${formatMoney(quote.cardLimit, currency)}.` : ''}
          </p>
        )}
        {quote && !quote.open && <p className="shop-error">Online checkout is paused right now. Please request a quote or call us.</p>}
        {quote?.errors.map(e => <p key={e} className="shop-error">{e}</p>)}
        <label className="shop-terms">
          <input type="checkbox" checked={reminder} onChange={e => setReminder(e.target.checked)} />
          <span>Email me a link to finish this order if I don’t complete payment (one reminder only).</span>
        </label>
        <label className="shop-terms">
          <input type="checkbox" checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)} required />
          <span>I agree to the <Link href="/terms-and-conditions" target="_blank">terms and conditions</Link> and <Link href="/warranty" target="_blank">warranty</Link>.</span>
        </label>
        {error && <p className="shop-error" role="alert">{error}</p>}
        <button className="btn btn-primary shop-wide" disabled={blocked || state === 'sending' || !acceptTerms}>
          {state === 'sending' ? 'Opening secure payment…' : mode === 'reserve' ? 'Continue to pay the deposit' : 'Continue to secure payment'}
        </button>
        <p className="shop-fine shop-secure">Payments are processed securely by Stripe. CANDRON never sees your card or bank details.</p>
        {mode === 'buy' && <Link href="/cart" className="shop-continue">← Back to cart</Link>}
      </aside>
    </form>
  )
}
