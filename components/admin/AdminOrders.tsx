'use client'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminNav from '@/components/admin/AdminNav'
import { ADMIN_STATUSES, ORDER_STATUSES, formatMoney, statusLabel, statusTone } from '@/lib/shop/order-status'
import { regionName } from '@/lib/shop/regions'

interface ListRow { id: number; order_number: string; status: string; currency: string; total: string; amount_refunded: string; customer_name: string; company: string; email: string; fulfilment: string; live_mode: number; created_at: string; items: number }
interface Detail {
  order: Record<string, string | number | null> & { id: number; order_number: string; status: string; currency: string }
  items: { id: number; sku: string; name: string; slug: string; unit_price: string; quantity: number; line_total: string }[]
  events: { id: number; event: string; note: string; actor: string; created_at: string }[]
  stripeUrl: string | null
}

const when = (d: string | null | undefined) => (d ? new Date(`${String(d).replace(' ', 'T')}${String(d).endsWith('Z') ? '' : 'Z'}`).toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' }) : '—')

export default function AdminOrders({ initialOrders, initialId, adminEmail, stripe }: { initialOrders: ListRow[]; initialId: number | null; adminEmail: string; stripe: { configured: boolean; live: boolean } }) {
  const router = useRouter()
  const [orders, setOrders] = useState(initialOrders)
  const [filter, setFilter] = useState({ status: '', q: '', all: false })
  const [selected, setSelected] = useState<number | null>(initialId ?? initialOrders[0]?.id ?? null)
  const [detail, setDetail] = useState<Detail | null>(null)
  const [msg, setMsg] = useState<{ tone: 'ok' | 'err'; text: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const [edit, setEdit] = useState({ status: '', note: '', trackingCarrier: '', trackingNumber: '', adminNotes: '' })
  const [refund, setRefund] = useState({ amount: '', reason: '' })

  const loadList = useCallback(async () => {
    const q = new URLSearchParams({ ...(filter.status && { status: filter.status }), ...(filter.q && { q: filter.q }), ...(filter.all && { all: '1' }) })
    const r = await fetch(`/api/admin/orders?${q}`)
    if (r.ok) setOrders((await r.json()).orders)
  }, [filter])

  const showDetail = useCallback((d: Detail | null) => {
    setDetail(d)
    if (!d) return
    setEdit({ status: '', note: '', trackingCarrier: String(d.order.tracking_carrier ?? ''), trackingNumber: String(d.order.tracking_number ?? ''), adminNotes: String(d.order.admin_notes ?? '') })
    setRefund({ amount: '', reason: '' })
  }, [])
  const fetchDetail = (id: number) => fetch(`/api/admin/orders/${id}`).then(r => (r.ok ? r.json() as Promise<Detail> : null))
  const loadDetail = async (id: number) => showDetail(await fetchDetail(id))

  useEffect(() => { const t = setTimeout(loadList, 250); return () => clearTimeout(t) }, [loadList])
  useEffect(() => {
    if (!selected) return
    let live = true
    fetchDetail(selected).then(d => { if (live) showDetail(d) })
    return () => { live = false }
  }, [selected, showDetail])

  async function save() {
    if (!detail) return
    if (edit.status === 'cancelled' && !window.confirm('Cancel this order? Stock goes back to inventory and the buyer is emailed. Refund the payment separately.')) return
    setBusy(true); setMsg(null)
    const r = await fetch(`/api/admin/orders/${detail.order.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...edit, status: edit.status || undefined }) })
    const d = await r.json().catch(() => ({}))
    setBusy(false)
    if (!r.ok) { setMsg({ tone: 'err', text: d.error || 'Could not save.' }); return }
    const mailNote = d.emailed ? ' The buyer was emailed.' : edit.status === 'shipped' || edit.status === 'cancelled' ? ' Email not sent (check SMTP settings); let the buyer know directly.' : ''
    setMsg({ tone: 'ok', text: `Saved.${mailNote}` })
    await Promise.all([loadDetail(detail.order.id), loadList()])
  }

  async function doRefund() {
    if (!detail) return
    const cur = detail.order.currency
    const remaining = Number(detail.order.total) - Number(detail.order.amount_refunded)
    const amount = refund.amount === '' ? remaining : Number(refund.amount)
    if (!window.confirm(`Refund ${formatMoney(amount, cur)} to the buyer through Stripe? This can’t be undone.`)) return
    setBusy(true); setMsg(null)
    const r = await fetch(`/api/admin/orders/${detail.order.id}/refund`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: refund.amount === '' ? null : Number(refund.amount), reason: refund.reason }) })
    const d = await r.json().catch(() => ({}))
    setBusy(false)
    if (!r.ok) { setMsg({ tone: 'err', text: d.error || 'Refund failed.' }); return }
    setMsg({ tone: 'ok', text: `Refund sent to Stripe.${d.emailed ? ' The buyer was emailed.' : ' Email not sent (check SMTP settings).'}` })
    await Promise.all([loadDetail(detail.order.id), loadList()])
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  const o = detail?.order
  const cur = o?.currency ?? 'CAD'
  const refundable = o && o.stripe_payment_intent && Number(o.total) - Number(o.amount_refunded) > 0 && !['pending_payment', 'expired', 'payment_failed', 'payment_processing'].includes(o.status)

  return (
    <div className="ia">
      <div className="ia-top">
        <div>
          <div className="ia-kicker">CANDRON · Admin</div>
          <h1>Orders</h1>
        </div>
        <div className="ia-top-actions">
          <span className="ia-who">{adminEmail}</span>
          <AdminNav current="orders" />
          <button type="button" onClick={logout} className="ia-btn ia-ghost">Sign out</button>
        </div>
      </div>
      {!stripe.configured && <p className="ia-banner">Stripe isn’t connected yet (STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET). Orders will appear here once online ordering is switched on.</p>}
      {stripe.configured && !stripe.live && <p className="ia-banner ia-banner-test">Stripe is in <strong>test mode</strong>. Orders here use test payments; no real money moves.</p>}

      <div className="ia-shell">
        <aside className="ia-list">
          <select className="ia-search" value={filter.status} onChange={e => setFilter(f => ({ ...f, status: e.target.value }))} aria-label="Filter by status">
            <option value="">All active orders</option>
            {Object.entries(ORDER_STATUSES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
          <input className="ia-search" placeholder="Order #, email, name, company, PO" value={filter.q} onChange={e => setFilter(f => ({ ...f, q: e.target.value }))} />
          <label className="ia-check"><input type="checkbox" checked={filter.all} onChange={e => setFilter(f => ({ ...f, all: e.target.checked }))} /> Include unpaid / expired checkouts</label>
          <div className="ia-count">{orders.length} order{orders.length === 1 ? '' : 's'}</div>
          <ul>
            {orders.map(row => (
              <li key={row.id}>
                <button type="button" className={`ia-order-row${selected === row.id ? ' on' : ''}`} onClick={() => setSelected(row.id)}>
                  <span className="ia-row-text">
                    <strong>{row.order_number} · {formatMoney(Number(row.total), row.currency)}{row.live_mode ? '' : ' · test'}</strong>
                    <small>{row.company || row.customer_name} · {row.items} item{row.items === 1 ? '' : 's'} · {when(row.created_at)}</small>
                  </span>
                  <span className={`ia-pill ia-tone-${statusTone(row.status)}`}>{statusLabel(row.status)}</span>
                </button>
              </li>
            ))}
            {orders.length === 0 && <li className="ia-empty">No orders yet.</li>}
          </ul>
        </aside>

        <div className="ia-editor">
          {!o ? <section className="ia-card"><p className="ia-note">Select an order.</p></section> : (
            <>
              <div className="ia-editor-head">
                <div>
                  <div className="ia-kicker">Order {o.order_number} · placed {when(String(o.created_at))}{o.live_mode ? '' : ' · TEST'}</div>
                  <h2>{formatMoney(Number(o.total), cur)} · {statusLabel(o.status)}</h2>
                </div>
                {detail.stripeUrl && <a className="ia-btn ia-ghost" href={detail.stripeUrl} target="_blank" rel="noreferrer">Open in Stripe ↗</a>}
              </div>

              <section className="ia-card">
                <h3>Items</h3>
                <table className="ia-table">
                  <tbody>
                    {detail.items.map(i => (
                      <tr key={i.id}><td>{i.slug ? <a href={`/inventory/${i.slug}`} target="_blank" rel="noreferrer">{i.name}</a> : i.name}<br /><small>{i.sku}</small></td><td>{i.quantity} × {formatMoney(Number(i.unit_price), cur)}</td><td className="ia-num">{formatMoney(Number(i.line_total), cur)}</td></tr>
                    ))}
                    <tr><td colSpan={2}>Subtotal</td><td className="ia-num">{formatMoney(Number(o.subtotal), cur)}</td></tr>
                    <tr><td colSpan={2}>{String(o.freight_note || 'Freight')}</td><td className="ia-num">{formatMoney(Number(o.freight), cur)}</td></tr>
                    <tr><td colSpan={2}>Tax</td><td className="ia-num">{formatMoney(Number(o.tax), cur)}</td></tr>
                    <tr className="ia-strong"><td colSpan={2}>Total</td><td className="ia-num">{formatMoney(Number(o.total), cur)}</td></tr>
                    {Number(o.amount_refunded) > 0 && <tr><td colSpan={2}>Refunded</td><td className="ia-num">−{formatMoney(Number(o.amount_refunded), cur)}</td></tr>}
                  </tbody>
                </table>
                <p className="ia-note">Payment: {String(o.payment_method || '—')}{o.paid_at ? ` · paid ${when(String(o.paid_at))}` : ''}</p>
              </section>

              <section className="ia-card ia-two">
                <div>
                  <h3>Customer</h3>
                  <p>{String(o.customer_name)}{o.company ? <><br />{String(o.company)}</> : null}<br /><a href={`mailto:${o.email}`}>{String(o.email)}</a><br /><a href={`tel:${o.phone}`}>{String(o.phone)}</a>{o.po_number ? <><br />PO: <strong>{String(o.po_number)}</strong></> : null}</p>
                  {o.customer_notes && <p className="ia-quote">{String(o.customer_notes)}</p>}
                </div>
                <div>
                  <h3>{o.fulfilment === 'pickup' ? 'Pickup' : 'Ship to'}</h3>
                  {o.fulfilment === 'pickup' ? <p>Customer will pick up. Call to book a time.</p>
                    : <p>{String(o.ship_line1)}{o.ship_line2 ? <><br />{String(o.ship_line2)}</> : null}<br />{String(o.ship_city)}, {regionName(String(o.ship_country), String(o.ship_region))} {String(o.ship_postal)}<br />{String(o.ship_country)}</p>}
                </div>
              </section>

              <section className="ia-card">
                <h3>Update order</h3>
                <div className="ia-grid">
                  <label className="ia-field"><span className="ia-label">Change status</span>
                    <select value={edit.status} onChange={e => setEdit(s => ({ ...s, status: e.target.value }))}>
                      <option value="">Keep “{statusLabel(o.status)}”</option>
                      {ADMIN_STATUSES.filter(s => s !== o.status).map(s => <option key={s} value={s}>{statusLabel(s)}</option>)}
                    </select>
                  </label>
                  <label className="ia-field"><span className="ia-label">Carrier</span><input value={edit.trackingCarrier} onChange={e => setEdit(s => ({ ...s, trackingCarrier: e.target.value }))} placeholder="e.g. Day & Ross" /></label>
                  <label className="ia-field"><span className="ia-label">Tracking / PRO number</span><input value={edit.trackingNumber} onChange={e => setEdit(s => ({ ...s, trackingNumber: e.target.value }))} /></label>
                  <label className="ia-field ia-wide"><span className="ia-label">Note for the timeline (internal)</span><input value={edit.note} onChange={e => setEdit(s => ({ ...s, note: e.target.value }))} /></label>
                  <label className="ia-field ia-wide"><span className="ia-label">Internal notes</span><textarea rows={3} value={edit.adminNotes} onChange={e => setEdit(s => ({ ...s, adminNotes: e.target.value }))} /></label>
                </div>
                <p className="ia-note">Marking an order Shipped emails the buyer with the carrier and tracking number. Cancelling returns the stock and emails the buyer; refund the payment separately below.</p>
                <div className="ia-savebar ia-inline-bar">
                  {msg && <span className={`ia-msg ia-${msg.tone}`} role="status">{msg.text}</span>}
                  <button type="button" className="ia-btn ia-primary" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
                </div>
              </section>

              {refundable && (
                <section className="ia-card">
                  <h3>Refund</h3>
                  <div className="ia-grid">
                    <label className="ia-field"><span className="ia-label">Amount ({cur})</span><input inputMode="decimal" placeholder={`Full: ${(Number(o.total) - Number(o.amount_refunded)).toFixed(2)}`} value={refund.amount} onChange={e => setRefund(r => ({ ...r, amount: e.target.value }))} /></label>
                    <label className="ia-field ia-wide"><span className="ia-label">Reason (internal)</span><input value={refund.reason} onChange={e => setRefund(r => ({ ...r, reason: e.target.value }))} /></label>
                  </div>
                  <button type="button" className="ia-btn ia-danger" onClick={doRefund} disabled={busy}>Refund through Stripe</button>
                </section>
              )}

              <section className="ia-card">
                <h3>Timeline</h3>
                <ol className="ia-timeline">
                  {detail.events.map(ev => <li key={ev.id}><strong>{ev.event.replace('status:', 'Status → ').replace(/_/g, ' ')}</strong>{ev.note && ` · ${ev.note}`}<small>{when(ev.created_at)} · {ev.actor}</small></li>)}
                </ol>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
