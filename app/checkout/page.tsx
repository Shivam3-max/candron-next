import type { Metadata } from 'next'
import { Suspense } from 'react'
import CheckoutForm from '@/components/shop/CheckoutForm'

export const metadata: Metadata = {
  title: 'Checkout',
  robots: { index: false, follow: false },
  alternates: { canonical: '/checkout' },
}

export default function CheckoutPage() {
  return (
    <section className="shop-page">
      <div className="container">
        <div className="shop-head">
          <div className="label">Online order</div>
          <h1>Checkout</h1>
          <p>Enter your details and delivery address. You’ll pay on Stripe’s secure page in the next step.</p>
        </div>
        <Suspense><CheckoutForm /></Suspense>
      </div>
    </section>
  )
}
