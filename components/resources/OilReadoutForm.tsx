'use client'
import { useState } from 'react'

const FLUIDS = ['Mineral oil', 'Natural ester (FR3)', 'Silicone', 'Not sure']

/** Upload form for a free DGA read-out. Sends the lab report through the site's contact form. */
export default function OilReadoutForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const [error, setError] = useState('')

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const files = data.getAll('attachments').filter((f): f is File => f instanceof File && f.size > 0)
    if (!files.length) { setError('Please attach the lab report.'); setState('err'); return }
    if (files.some(f => f.size > 4 * 1024 * 1024)) { setError('Each file must be 4 MB or smaller.'); setState('err'); return }
    const line = (k: string, label: string) => (data.get(k) ? `${label}: ${data.get(k)}` : '')
    data.set('message', ['Free oil-test (DGA) read-out request.',
      line('unit', 'Transformer'), line('rating', 'Rating'), line('fluid', 'Fluid'), line('age', 'Age / year'),
      line('notes', 'Notes')].filter(Boolean).join('\n'))
    ;['unit', 'rating', 'fluid', 'age', 'notes'].forEach(k => data.delete(k))
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

  if (state === 'ok') {
    return (
      <div className="rt-card dga-done" role="status">
        <div className="rt-eyebrow">Report received</div>
        <h3>Thanks — an engineer will read it.</h3>
        <p>We&rsquo;ll email you a plain-English read-out with what the gases suggest and what to do next. If anything looks urgent, we&rsquo;ll call.</p>
        <button type="button" className="rt-text-btn" onClick={() => setState('idle')}>Send another report</button>
      </div>
    )
  }

  return (
    <form className="rt-card dga-form" onSubmit={submit}>
      <div className="rt-eyebrow">Send your oil test</div>
      <div className="rt-fields">
        <label className="rt-field"><span>Name</span><input id="oil-name" name="name" required autoComplete="name" /></label>
        <label className="rt-field"><span>Company</span><input id="oil-company" name="company" autoComplete="organization" /></label>
        <label className="rt-field"><span>Work email</span><input id="oil-email" name="email" type="email" required autoComplete="email" /></label>
        <label className="rt-field"><span>Phone (optional)</span><input id="oil-phone" name="phone" type="tel" autoComplete="tel" /></label>
        <label className="rt-field"><span>Transformer / site</span><input id="oil-unit" name="unit" placeholder="e.g. T-2, Plant 3" /></label>
        <label className="rt-field"><span>Rating</span><input id="oil-rating" name="rating" placeholder="e.g. 2,500 kVA, 27.6 kV" /></label>
        <label className="rt-field"><span>Fluid</span>
          <select id="oil-fluid" name="fluid" defaultValue="Mineral oil">{FLUIDS.map(f => <option key={f}>{f}</option>)}</select>
        </label>
        <label className="rt-field"><span>Age or year made</span><input id="oil-age" name="age" placeholder="e.g. 2009" /></label>
      </div>
      <label className="rt-field dga-file"><span>Lab report (PDF, Excel or photo · up to 3 files, 4 MB each)</span>
        <input id="oil-file" name="attachments" type="file" multiple required accept=".pdf,.xls,.xlsx,.jpg,.jpeg,.png,.doc,.docx" />
      </label>
      <label className="rt-field"><span>Anything we should know? (optional)</span>
        <textarea id="oil-notes" name="notes" rows={3} placeholder="Earlier results, recent faults, loading, alarms…" />
      </label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
      <button type="submit" className="btn btn-primary" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send for a free read-out'}</button>
      {state === 'err' && <p className="rr-msg err">{error}</p>}
      <p className="rt-disclaimer">Free for any make of transformer. We use your report only to answer you. Results are advice for planning, not a condition assessment.</p>
    </form>
  )
}
