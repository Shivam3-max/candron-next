'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { removeFromCart, setQuantity, syncCart, useCart } from '@/lib/shop/cart-store'
import { formatMoney } from '@/lib/shop/order-status'

interface Line { id: number; slug: string; sku: string; name: string; image: string | null; currency: string; unitPrice: number; quantity: number; available: number; lineTotal: number; error: string | null }
interface Priced { open: boolean; lines: Line[]; currency: string; subtotal: number; errors: string[] }

function CancelledNotice() {
  const cancelled = useSearchParams().get('cancelled')
  if (!cancelled) return null
  return <p className="shop-notice">Payment for order {cancelled} wasn’t completed and nothing was charged. Your cart is still here.</p>
}

export default function CartView() {
  const items = useCart()
  const [priced, setPriced] = useState<Priced | null>(null)
  const [loadError, setLoadError] = useState('')
  const key = items.map(i => `${i.id}:${i.quantity}`).join(',')

  useEffect(() => {
    if (!key) return
    const ctrl = new AbortController()
    fetch('/api/shop/cart', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: ctrl.signal,
      body: JSON.stringify({ items: key.split(',').map(p => ({ id: Number(p.split(':')[0]), quantity: Number(p.split(':')[1]) })) }),
    })
      .then(r => r.json().then(d => (r.ok ? d : Promise.reject(new Error(d.error)))))
      .then((d: Priced) => { setPriced(d); setLoadError(''); syncCart(d.lines) })
      .catch(e => { if (e.name !== 'AbortError') setLoadError(e.message || 'Could not load your cart.') })
    return () => ctrl.abort()
  }, [key])

  if (!items.length) {
    return (
      <div className="shop-empty">
        <Suspense><CancelledNotice /></Suspense>
        <p>Your cart is empty.</p>
        <Link href="/inventory" className="btn btn-primary">Browse in-stock inventory</Link>
      </div>
    )
  }

  const lineFor = (id: number) => priced?.lines.find(l => l.id === id)
  const blocking = priced ? priced.lines.some(l => l.error) || priced.errors.length > 0 : true
  const currency = priced?.currency ?? items[0].currency

  return (
    <div className="shop-cart">
      <Suspense><CancelledNotice /></Suspense>
      {loadError && <p className="shop-error" role="alert">{loadError}</p>}
      {priced && !priced.open && <p className="shop-notice">Online checkout is paused right now. Please request a quote or call us and we’ll place the order for you.</p>}
      {priced?.errors.map(e => <p key={e} className="shop-error" role="alert">{e}</p>)}
      <ul className="shop-lines">
        {items.map(item => {
          const line = lineFor(item.id)
          return (
            <li key={item.id} className="shop-line">
              <Link href={`/inventory/${item.slug}`} className="shop-line-img" aria-hidden="true" tabIndex={-1}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {item.image ? <img src={item.image} alt="" /> : <span>{item.sku.slice(3, 6)}</span>}
              </Link>
              <div className="shop-line-main">
                <Link href={`/inventory/${item.slug}`} className="shop-line-name">{item.name}</Link>
                <small>{item.sku} · {formatMoney(line?.unitPrice ?? item.price, item.currency)} each</small>
                {line?.error && <span className="shop-line-error">{line.error}</span>}
              </div>
              <div className="shop-qty shop-qty-sm" role="group" aria-label={`Quantity for ${item.name}`}>
                <button type="button" onClick={() => setQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} aria-label="Decrease">−</button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => setQuantity(item.id, item.quantity + 1)} disabled={line ? item.quantity >= line.available : false} aria-label="Increase">+</button>
              </div>
              <strong className="shop-line-total">{formatMoney(line ? line.lineTotal : item.price * item.quantity, item.currency)}</strong>
              <button type="button" className="shop-remove" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}>Remove</button>
            </li>
          )
        })}
      </ul>
      <div className="shop-summary">
        <div className="shop-summary-row"><span>Subtotal</span><strong>{priced ? formatMoney(priced.subtotal, currency) : '…'}</strong></div>
        <p className="shop-fine">Freight and tax are calculated at checkout from your delivery address. Prices in {currency}.</p>
        {priced?.open && !blocking
          ? <Link href="/checkout" className="btn btn-primary shop-wide">Check out</Link>
          : <button type="button" className="btn btn-primary shop-wide" disabled>{!priced ? 'Checking prices…' : !priced.open ? 'Online checkout unavailable' : 'Fix the items above to continue'}</button>}
        <Link href="/inventory" className="shop-continue">← Continue shopping</Link>
      </div>
    </div>
  )
}
