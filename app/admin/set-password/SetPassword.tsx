'use client'
import { FormEvent, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const field = 'w-full min-h-12 box-border rounded-[9px] border border-[#DDE3EF] p-3.5 text-[16px] outline-none focus:border-blue'
const label = 'font-mono text-[.875rem] font-bold uppercase tracking-[.1em] block mb-2'

export default function SetPassword() {
  const router = useRouter()
  const token = useSearchParams().get('token') ?? ''
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const password = String(form.get('password') ?? '')
    if (password !== String(form.get('confirm') ?? '')) { setError('The passwords don’t match.'); return }
    setLoading(true); setError('')
    const r = await fetch('/api/admin/set-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token, password }) }).catch(() => null)
    const d = r ? await r.json().catch(() => ({})) : { error: 'Network error. Please try again.' }
    setLoading(false)
    if (!r?.ok) { setError(d.error || 'Could not set the password.'); return }
    router.replace('/admin')
    router.refresh()
  }

  return (
    <section className="min-h-[100dvh] bg-off pt-28 sm:pt-36 pb-12 sm:pb-20 flex items-center">
      <div className="container">
        <form onSubmit={submit} className="w-full max-w-[440px] mx-auto bg-white rounded-[16px] sm:rounded-[18px] border border-[#E4E9F3] shadow-[0_12px_50px_rgba(5,9,31,.08)] p-5 sm:p-8">
          <div className="label">Secure Access</div>
          <h1 className="!text-navy !text-[clamp(1.65rem,8vw,2rem)] mb-3">Set your password</h1>
          <p className="text-gray text-[1.0625rem] leading-[1.6] mb-7">Choose a password for the CANDRON admin. Use at least 12 characters.</p>
          {!token && <p className="rounded-[8px] bg-red-50 text-red-700 p-3 mb-4" role="alert">This link is missing its code. Open the link from your invitation email.</p>}
          <label className="block mb-4"><span className={label}>New password</span><input name="password" type="password" required minLength={12} autoComplete="new-password" className={field} /></label>
          <label className="block mb-5"><span className={label}>Confirm password</span><input name="confirm" type="password" required minLength={12} autoComplete="new-password" className={field} /></label>
          {error && <p className="rounded-[8px] bg-red-50 text-red-700 p-3 text-[1.0625rem]" role="alert">{error}</p>}
          <button disabled={loading || !token} className="btn btn-primary min-h-12 w-full justify-center mt-2">{loading ? 'Saving…' : 'Set password and sign in'}</button>
        </form>
      </div>
    </section>
  )
}
