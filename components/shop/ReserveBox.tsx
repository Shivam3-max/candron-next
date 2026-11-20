'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { formatMoney } from '@/lib/shop/order-status'

interface Props { id: number; price: number; currency: string; available: number; depositPercent: number }

/** "Reserve with deposit" listings: the buyer pays a deposit online; the balance and freight are invoiced later. */
export default function ReserveBox(p: Props) {
  const router = useRouter()
  const [qty, setQty] = useState(1)
  const quantity = Math.min(Math.max(1, qty), Math.max(1, p.available))
  const deposit = Math.round(p.price * quantity * p.depositPercent) / 100

  return (
    <div className="shop-buy">
      <div className="shop-buy-row">
        {p.available > 1 && (
          <div className="shop-qty" role="group" aria-label="Quantity">
            <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))} disabled={quantity <= 1} aria-label="Decrease quantity">−</button>
            <input inputMode="numeric" aria-label="Quantity" value={quantity} onChange={e => setQty(Number(e.target.value.replace(/\D/g, '')) || 1)} />
            <button type="button" onClick={() => setQty(q => q + 1)} disabled={quantity >= p.available} aria-label="Increase quantity">+</button>
          </div>
        )}
        <span className="shop-stock">{p.available === 1 ? 'Only 1 available' : `${p.available} available`}</span>
      </div>
      <button type="button" className="btn btn-primary shop-wide" onClick={() => router.push(`/checkout?reserve=${p.id}&qty=${quantity}`)}>
        Reserve with {p.depositPercent}% deposit · {formatMoney(deposit, p.currency)}
      </button>
      <p className="shop-buy-note">Pay the deposit online (card or bank debit) and the unit is held for you. We confirm freight and invoice the balance before it ships. Tax added at payment.</p>
    </div>
  )
}
