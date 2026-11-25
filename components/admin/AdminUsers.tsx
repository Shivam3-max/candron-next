'use client'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminNav from '@/components/admin/AdminNav'

interface Admin { id: number; email: string; owner: boolean; addedBy: string | null; pending: boolean; linkExpires: string | null; created: string }

const day = (d: string | null) => (d ? new Date(d).toLocaleDateString('en-CA', { dateStyle: 'medium' }) : '')

export default function AdminUsers({ initial, adminEmail, canManage }: { initial: Admin[]; adminEmail: string; canManage: boolean }) {
  const router = useRouter()
  const [admins, setAdmins] = useState(initial)
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ tone: 'ok' | 'err'; text: string } | null>(null)

  async function invite(address: string) {
    setBusy(true); setMsg(null)
    const r = await fetch('/api/admin/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: address }) })
    const d = await r.json().catch(() => ({}))
    setBusy(false)
    if (!r.ok) { setMsg({ tone: 'err', text: d.error || 'Could not send the invitation.' }); return }
    setAdmins(d.admins); setEmail('')
    setMsg({ tone: 'ok', text: `Invitation emailed to ${address}. The link works for 48 hours.` })
  }

  async function remove(a: Admin) {
    if (!window.confirm(`Remove ${a.email} as an admin? They’re signed out straight away.`)) return
    setBusy(true); setMsg(null)
    const r = await fetch(`/api/admin/users/${a.id}`, { method: 'DELETE' })
    const d = await r.json().catch(() => ({}))
    setBusy(false)
    if (!r.ok) { setMsg({ tone: 'err', text: d.error || 'Could not remove.' }); return }
    setAdmins(d.admins)
    setMsg({ tone: 'ok', text: `${a.email} removed.` })
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
          <h1>Admin users</h1>
        </div>
        <div className="ia-top-actions">
          <span className="ia-who">{adminEmail}</span>
          <AdminNav current="users" />
          <button type="button" onClick={logout} className="ia-btn ia-ghost">Sign out</button>
        </div>
      </div>

      <div className="ia-narrow">
        <section className="ia-card">
          <h3>Who can sign in</h3>
          <table className="ia-table">
            <tbody>
              {admins.map(a => (
                <tr key={a.id}>
                  <td>
                    <strong>{a.email}</strong><br />
                    <small>{a.owner ? 'Main administrator (set in Hostinger as ADMIN_EMAIL)' : a.pending ? `Invited by ${a.addedBy ?? '—'} · link expires ${day(a.linkExpires)}` : `Added by ${a.addedBy ?? '—'}`}</small>
                  </td>
                  <td className="ia-num">
                    {canManage && !a.owner && (
                      <>
                        {a.pending && <button type="button" className="ia-btn ia-ghost ia-small" disabled={busy} onClick={() => invite(a.email)}>Resend link</button>}{' '}
                        <button type="button" className="ia-btn ia-danger ia-small" disabled={busy} onClick={() => remove(a)}>Remove</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {canManage ? (
          <section className="ia-card">
            <h3>Add an admin</h3>
            <p className="ia-note">They get an email with a link to set their own password (valid 48 hours, single use), then sign in at /admin/login. Admins can manage inventory, orders, quotes, customers and shop settings.</p>
            <form className="ia-inline" onSubmit={(e: FormEvent) => { e.preventDefault(); invite(email) }}>
              <input type="email" required placeholder="name@candron.com" value={email} onChange={e => setEmail(e.target.value)} aria-label="Email address" />
              <button className="ia-btn ia-primary" disabled={busy}>{busy ? 'Sending…' : 'Send invitation'}</button>
            </form>
          </section>
        ) : (
          <p className="ia-note">Only the main administrator can add or remove admin users.</p>
        )}
        {msg && <p className={`ia-msg ia-${msg.tone}`} role="status">{msg.text}</p>}
      </div>
    </div>
  )
}
