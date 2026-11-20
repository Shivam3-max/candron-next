import type { Metadata } from 'next'
import { Suspense } from 'react'
import AccountLogin from '@/components/shop/AccountLogin'

export const metadata: Metadata = { title: 'Sign in', robots: { index: false, follow: false } }

export default function AccountLoginPage() {
  return (
    <section className="shop-page">
      <div className="container shop-login">
        <div className="shop-head">
          <div className="label">Your account</div>
          <h1>Sign in</h1>
          <p>We’ll email you a one-time sign-in link. No password needed. Your account shows your orders, quotes, invoices and saved delivery addresses.</p>
        </div>
        <Suspense><AccountLogin /></Suspense>
      </div>
    </section>
  )
}
