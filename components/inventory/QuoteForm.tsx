'use client'
import { FormEvent, useState } from 'react'

/** Product quote request — posts to the site's contact endpoint with the item code attached. */
export default function QuoteForm({ sku, name }: { sku: string; name: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('sending')
    setError('')
    const data = new FormData(e.currentTarget)
    const qty = String(data.get('quantity') || '1')
    const notes = String(data.get('notes') || '').trim()
    data.set('message', `Quote request — ${name} (item ${sku}), quantity ${qty}.${notes ? `\n\n${notes}` : ''}`)
    data.delete('quantity')
    data.delete('notes')
    try {
      const r = await fetch('/api/contact', { method: 'POST', body: data })
      const d = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(d.error || 'Could not send your request.')
      setState('sent')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send your request.')
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div className="pd-quote-done" role="status">
        <strong>Request received.</strong>
        <p>Our team will reply with pricing and availability for {sku}, usually the same business day.</p>
      </div>
    )
  }

  return (
    <form className="pd-quote-form" onSubmit={submit}>
      <div className="pd-quote-grid">
        <label><span>Name *</span><input name="name" required autoComplete="name" /></label>
        <label><span>Company</span><input name="company" autoComplete="organization" /></label>
        <label><span>Email *</span><input name="email" type="email" required autoComplete="email" /></label>
        <label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" /></label>
        <label><span>Quantity</span><input name="quantity" type="number" min={1} defaultValue={1} /></label>
        <label className="pd-wide"><span>Site details or questions</span><textarea name="notes" rows={3} placeholder="Delivery location, timeline, voltage changes…" /></label>
        <input name="website" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
      </div>
      {state === 'error' && <p className="pd-quote-error" role="alert">{error}</p>}
      <button className="btn btn-primary pd-quote-btn" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : `Request quote for ${sku}`}</button>
    </form>
  )
}
