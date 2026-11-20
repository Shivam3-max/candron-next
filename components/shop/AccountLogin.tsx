'use client'
import { useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function AccountLogin() {
  const params = useSearchParams()
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('sending'); setError('')
    const r = await fetch('/api/account/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, next: params.get('next') ?? '/account', website: (e.currentTarget.elements.namedItem('website') as HTMLInputElement | null)?.value }),
    })
    const d = await r.json().catch(() => ({}))
    if (!r.ok) { setError(d.error || 'Could not send the link.'); setState('idle'); return }
    setState('sent')
  }

  if (state === 'sent') {
    return (
      <div className="shop-card" role="status">
        <h2>Check your email</h2>
        <p>If {email} can receive email, a sign-in link is on its way. It works once and expires in 20 minutes. Check your spam folder if it doesn’t arrive within a minute.</p>
        <button type="button" className="shop-continue shop-link-btn" onClick={() => setState('idle')}>Use a different email</button>
      </div>
    )
  }

  return (
    <form className="shop-card" onSubmit={submit}>
      {params.get('expired') && <p className="shop-notice">That sign-in link has expired or was already used. Request a new one below.</p>}
      <div className="shop-grid shop-grid-one">
        <label><span>Email address</span><input type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} /></label>
      </div>
      <input name="website" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
      {error && <p className="shop-error" role="alert">{error}</p>}
      <button className="btn btn-primary shop-wide" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Email me a sign-in link'}</button>
    </form>
  )
}
