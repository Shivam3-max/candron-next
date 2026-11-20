import type { Metadata } from 'next'
import CartView from '@/components/shop/CartView'

export const metadata: Metadata = {
  title: 'Your cart',
  robots: { index: false, follow: false },
  alternates: { canonical: '/cart' },
}

export default function CartPage() {
  return (
    <section className="shop-page">
      <div className="container shop-narrow">
        <div className="shop-head">
          <div className="label">Online order</div>
          <h1>Your cart</h1>
        </div>
        <CartView />
      </div>
    </section>
  )
}
