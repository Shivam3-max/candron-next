'use client'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminNav from '@/components/admin/AdminNav'
import { formatMoney, statusLabel } from '@/lib/shop/order-status'
import { regionName } from '@/lib/shop/regions'

interface Row { id: number; email: string; name: string; company: string; phone: string; tax_exempt_status: string; tax_exempt_note: string; created_at: string; last_login_at: string | null; orders: number; spent: string | null; docs: number }
interface Detail {
  customer: Row & { admin_notes: string | null }
  orders: { id: number; order_number: string; status: string; currency: string; total: string; created_at: string; items: string }[]
  addresses: { id: number; label: string; line1: string; line2: string; city: string; region: string; postal: string; country: string; is_default: number }[]
  documents: { id: number; file_name: string; note: string; created_at: string; size: number }[]
}

const TAX: Record<string, { label: string; tone: string }> = {
  none: { label: 'Not exempt', tone: 'off' }, pending: { label: 'Review certificate', tone: 'wait' },
  approved: { label: 'Tax exempt', tone: 'ok' }, rejected: { label: 'Rejected', tone: 'bad' },
}
const day = (d: string | null) => (d ? new Date(d).toLocaleDateString('en-CA', { dateStyle: 'medium' }) : '—')

export default function AdminCustomers({ initial, adminEmail }: { initial: Row[]; adminEmail: string }) {
  const router = useRouter()
  const [rows, setRows] = useState(initial)
  const [q, setQ] = useState('')
  const [selected, setSelected] = useState<number | null>(initial[0]?.id ?? null)
  const [detail, setDetail] = useState<Detail | null>(null)
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState('')
  const [msg, setMsg] = useState<{ tone: 'ok' | 'err'; text: string } | null>(null)

  const loadList = useCallback(async () => {
    const r = await fetch(`/api/admin/customers?q=${encodeURIComponent(q)}`)
    if (r.ok) setRows((await r.json()).customers)
  }, [q])
  const show = useCallback((d: Detail | null) => { setDetail(d); setNote(d?.customer.tax_exempt_note ?? ''); setNotes(d?.customer.admin_notes ?? '') }, [])
  const fetchDetail = (id: number) => fetch(`/api/admin/customers/${id}`).then(r => (r.ok ? r.json() as Promise<Detail> : null))

  useEffect(() => { const t = setTimeout(loadList, 250); return () => clearTimeout(t) }, [loadList])
  useEffect(() => {
    if (!selected) return
    let live = true
    fetchDetail(selected).then(d => { if (live) show(d) })
    return () => { live = false }
  }, [selected, show])

  async function patch(body: Record<string, string>, ok: string) {
    if (!detail) return
    if (body.taxExempt && !window.confirm(body.taxExempt === 'approved' ? 'Approve this exemption? New checkouts and invoices for this email won’t be charged sales tax.' : 'Update the exemption status? The customer is emailed.')) return
    setMsg(null)
    const r = await fetch(`/api/admin/customers/${detail.customer.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const d = await r.json().catch(() => ({}))
    if (!r.ok) { setMsg({ tone: 'err', text: d.error || 'Could not save.' }); return }
    setMsg({ tone: 'ok', text: body.taxExempt && body.taxExempt !== 'none' ? `${ok} ${d.emailed ? 'The customer was emailed.' : 'Email not sent (check SMTP); let the customer know.'}` : ok })
    show(await fetchDetail(detail.customer.id))
    await loadList()
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  const c = detail?.customer
  return (
    <div className="ia">
      <div className="ia-top">
        <div><div className="ia-kicker">CANDRON · Admin</div><h1>Customers</h1></div>
        <div className="ia-top-actions">
          <span className="ia-who">{adminEmail}</span>
          <AdminNav current="customers" />
          <button type="button" onClick={logout} className="ia-btn ia-ghost">Sign out</button>
        </div>
      </div>
      <div className="ia-shell">
        <aside className="ia-list">
          <input className="ia-search" placeholder="Email, name or company" value={q} onChange={e => setQ(e.target.value)} />
          <div className="ia-count">{rows.length} customer account{rows.length === 1 ? '' : 's'}</div>
          <ul>
            {rows.map(r => (
              <li key={r.id}>
                <button type="button" className={`ia-order-row${selected === r.id ? ' on' : ''}`} onClick={() => { setSelected(r.id); setMsg(null) }}>
                  <span className="ia-row-text"><strong>{r.company || r.name || r.email}</strong><small>{r.email} · {r.orders} order{Number(r.orders) === 1 ? '' : 's'}</small></span>
                  {r.tax_exempt_status !== 'none' && <span className={`ia-pill ia-tone-${TAX[r.tax_exempt_status]?.tone}`}>{TAX[r.tax_exempt_status]?.label}</span>}
                </button>
              </li>
            ))}
            {!rows.length && <li className="ia-empty">No customer accounts yet. Buyers create one by signing in at /account.</li>}
          </ul>
        </aside>

        <div className="ia-editor">
          {!c || !detail ? <section className="ia-card"><p className="ia-note">Select a customer.</p></section> : (
            <>
              <div className="ia-editor-head">
                <div>
                  <div className="ia-kicker">Customer since {day(c.created_at)} · last sign-in {day(c.last_login_at)}</div>
                  <h2>{c.company || c.name || c.email}</h2>
                </div>
              </div>
              {msg && <p className={`ia-banner ${msg.tone === 'ok' ? 'ia-banner-live' : ''}`}>{msg.text}</p>}

              <section className="ia-card ia-two">
                <div>
                  <h3>Contact</h3>
                  <p>{c.name || '—'}<br /><a href={`mailto:${c.email}`}>{c.email}</a><br />{c.phone || '—'}</p>
                </div>
                <div>
                  <h3>Addresses</h3>
                  {detail.addresses.length ? detail.addresses.map(a => <p key={a.id}>{a.label && <strong>{a.label}<br /></strong>}{a.line1}, {a.city}, {regionName(a.country, a.region)} {a.postal}</p>) : <p>None saved.</p>}
                </div>
              </section>

              <section className="ia-card">
                <h3>Tax exemption · <span className={`ia-pill ia-tone-${TAX[c.tax_exempt_status]?.tone}`}>{TAX[c.tax_exempt_status]?.label}</span></h3>
                {detail.documents.length ? (
                  <ul className="ia-docs">
                    {detail.documents.map(d => <li key={d.id}><a href={`/api/admin/customer-documents/${d.id}`}>{d.file_name}</a> · {Math.round(d.size / 1024)} KB · {day(d.created_at)}{d.note && ` · “${d.note}”`}</li>)}
                  </ul>
                ) : <p className="ia-note">No certificate uploaded.</p>}
                <div className="ia-grid ia-mt">
                  <label className="ia-field ia-wide"><span className="ia-label">Exemption number / note (shown to the customer)</span><input value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. Ontario RST exemption #12345" /></label>
                </div>
                <div className="ia-row-btns ia-mt-btn">
                  <button type="button" className="ia-btn ia-primary" onClick={() => patch({ taxExempt: 'approved', note }, 'Exemption approved.')}>Approve exemption</button>
                  <button type="button" className="ia-btn ia-danger" onClick={() => patch({ taxExempt: 'rejected', note }, 'Exemption rejected.')}>Reject</button>
                  {c.tax_exempt_status !== 'none' && <button type="button" className="ia-btn ia-ghost" onClick={() => patch({ taxExempt: 'none', note: '' }, 'Exemption removed.')}>Remove exemption</button>}
                </div>
                <p className="ia-hint ia-mt">Applies to new checkouts, quotes accepted and invoices issued from now on. Invoices already sent keep their tax.</p>
              </section>

              <section className="ia-card">
                <h3>Orders</h3>
                {detail.orders.length ? (
                  <table className="ia-table">
                    <tbody>{detail.orders.map(o => <tr key={o.id}><td><a href={`/admin/orders?id=${o.id}`}>{o.order_number}</a><br /><small>{o.items}</small></td><td>{statusLabel(o.status)}</td><td>{day(o.created_at)}</td><td className="ia-num">{formatMoney(Number(o.total), o.currency)}</td></tr>)}</tbody>
                  </table>
                ) : <p className="ia-note">No orders yet.</p>}
              </section>

              <section className="ia-card">
                <h3>Internal notes</h3>
                <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} />
                <button type="button" className="ia-btn ia-ghost ia-mt-btn" onClick={() => patch({ adminNotes: notes }, 'Notes saved.')}>Save notes</button>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
