'use client'
import Link from 'next/link'
import { cartCount, useCart } from '@/lib/shop/cart-store'

const cartIcon = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2.5 3.5h2.6l2.4 11.2a1.6 1.6 0 0 0 1.6 1.3h8.6a1.6 1.6 0 0 0 1.6-1.2l1.6-7.3H6.2" />
  </svg>
)

/** Header cart button. Hidden until something is in the cart, so the header is unchanged for quote-only visitors. */
export default function CartLink({ className = '' }: { className?: string }) {
  const count = cartCount(useCart())
  if (!count) return null
  return (
    <Link href="/cart" className={`shop-cart-link ${className}`} aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}>
      {cartIcon}
      <span className="shop-cart-count">{count > 99 ? '99+' : count}</span>
    </Link>
  )
}
