'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { addToCart, useCart } from '@/lib/shop/cart-store'
import { trackAddToCart } from '@/lib/analytics'

interface Props { id: number; slug: string; sku: string; name: string; price: number; currency: string; image: string | null; available: number; maxQuantity: number }

/** Buy box for "Buy online" listings: quantity, Add to cart and Buy now. */
export default function AddToCart(p: Props) {
  const router = useRouter()
  const cart = useCart()
  const inCart = cart.find(i => i.id === p.id)?.quantity ?? 0
  // Online orders are capped per item; larger quantities get volume pricing by quote
  const limit = Math.min(p.available, p.maxQuantity)
  const max = Math.max(0, limit - inCart)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const quantity = Math.min(Math.max(1, qty), Math.max(1, max))

  function add(goToCart: boolean) {
    if (max <= 0) { if (goToCart) router.push('/cart'); return }
    addToCart({ id: p.id, slug: p.slug, sku: p.sku, name: p.name, price: p.price, currency: p.currency, image: p.image, max: limit }, quantity)
    trackAddToCart(p.currency, { item_id: p.sku, item_name: p.name, price: p.price, quantity })
    if (goToCart) router.push('/cart')
    else { setAdded(true); setQty(1) }
  }

  return (
    <div className="shop-buy">
      <div className="shop-buy-row">
        <div className="shop-qty" role="group" aria-label="Quantity">
          <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))} disabled={quantity <= 1} aria-label="Decrease quantity">−</button>
          <input
            inputMode="numeric" aria-label="Quantity" value={quantity}
            onChange={e => setQty(Number(e.target.value.replace(/\D/g, '')) || 1)}
          />
          <button type="button" onClick={() => setQty(q => q + 1)} disabled={quantity >= max} aria-label="Increase quantity">+</button>
        </div>
        <span className="shop-stock">{p.available === 1 ? 'Only 1 available' : `${p.available} available`}{inCart ? ` · ${inCart} in your cart` : ''}</span>
      </div>
      <div className="shop-buy-actions">
        <button type="button" className="btn btn-primary" onClick={() => add(false)} disabled={max <= 0}>
          {max <= 0 ? (inCart >= p.maxQuantity ? `Online limit (${p.maxQuantity}) is in your cart` : 'All available units are in your cart') : 'Add to cart'}
        </button>
        <button type="button" className="btn btn-outline-blue" onClick={() => add(true)}>Buy now</button>
      </div>
      {added && (
        <p className="shop-added" role="status">
          Added to your cart. <Link href="/cart">View cart and check out →</Link>
        </p>
      )}
      <p className="shop-buy-note">Secure checkout by Stripe · card or bank debit · tax at checkout · freight quoted after your order, or pick up</p>
    </div>
  )
}
