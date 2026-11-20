'use client'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { formatMoney, type PaymentTerms } from '@/lib/shop/order-status'

interface Props { number: string; token: string; terms: PaymentTerms; netDays: number; currency: string; total: number; deposit: number | null }

export default function QuoteAccept(p: Props) {
  const [poNumber, setPoNumber] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [state, setState] = useState<'idle' | 'sending'>('idle')
  const [error, setError] = useState('')

  async function submit(e: FormEvent) {
    e.preventDefault()
    setState('sending'); setError('')
    try {
      const r = await fetch('/api/shop/quote/accept', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: p.number, token: p.token, poNumber, acceptTerms }),
      })
      const d = await r.json().catch(() => ({}))
      if (!r.ok || !d.url) throw new Error(d.error || 'Could not accept the quote.')
      window.location.assign(d.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not accept the quote.')
      setState('idle')
    }
  }

  const action = p.terms === 'deposit' ? `Accept and pay ${formatMoney(p.deposit ?? 0, p.currency)} deposit`
    : p.terms === 'net' ? `Accept and send me the invoice (net ${p.netDays})`
    : `Accept and pay ${formatMoney(p.total, p.currency)}`

  return (
    <form className="shop-card shop-accept" onSubmit={submit}>
      <h2>Accept this quote</h2>
      <div className="shop-grid">
        <label><span>Your PO number (optional)</span><input value={poNumber} maxLength={60} onChange={e => setPoNumber(e.target.value)} /></label>
      </div>
      <label className="shop-terms">
        <input type="checkbox" checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)} required />
        <span>I accept this quote and the <Link href="/terms-and-conditions" target="_blank">terms and conditions</Link>.</span>
      </label>
      {error && <p className="shop-error" role="alert">{error}</p>}
      <button className="btn btn-primary shop-wide" disabled={!acceptTerms || state === 'sending'}>{state === 'sending' ? 'Please wait…' : action}</button>
      <p className="shop-fine shop-secure">{p.terms === 'net' ? 'Stock is reserved for you and the invoice is emailed by Stripe. Pay by bank debit or card.' : 'You’ll pay on Stripe’s secure page (card or bank debit). Tax is added there.'}</p>
    </form>
  )
}
