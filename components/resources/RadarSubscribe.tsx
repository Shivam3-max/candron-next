'use client'
import { useState } from 'react'

/** Sign-up for the monthly Radar email. Sends a request through the site's contact form. */
export default function RadarSubscribe() {
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    data.set('message', 'Please add me to the Canada Power Projects Radar monthly email.')
    setState('sending')
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: data })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Something went wrong. Please try again or call us.')
      }
      setState('ok')
      form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setState('err')
    }
  }

  return (
    <form className="rr-form" onSubmit={submit}>
      <label className="rt-field"><span>Name</span><input id="radar-name" name="name" required autoComplete="name" /></label>
      <label className="rt-field"><span>Company</span><input id="radar-company" name="company" autoComplete="organization" /></label>
      <label className="rt-field"><span>Work email</span><input id="radar-email" name="email" type="email" required autoComplete="email" /></label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
      <button type="submit" className="btn btn-primary" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Email me each issue'}</button>
      {state === 'ok' && <p className="rr-msg ok">You’re on the list. The next issue arrives in early December.</p>}
      {state === 'err' && <p className="rr-msg err">{error}</p>}
      <p className="rr-msg" style={{ color: 'var(--gray)' }}>One email a month. Unsubscribe any time by replying “unsubscribe”.</p>
    </form>
  )
}
