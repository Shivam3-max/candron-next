'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { clearCart } from '@/lib/shop/cart-store'
import { trackPurchase, type GaItem } from '@/lib/analytics'

interface Purchase { transaction_id: string; currency: string; value: number; tax: number; shipping: number; items: GaItem[] }

/**
 * On the confirmation page: polls while Stripe's webhook confirms the payment, then clears
 * the cart and reports the GA4 purchase once per order.
 */
export default function OrderPaidTracker({ waiting, purchase }: { waiting: boolean; purchase: Purchase | null }) {
  const router = useRouter()

  useEffect(() => {
    if (!waiting) return
    let tries = 0
    const id = setInterval(() => { tries += 1; if (tries > 20) clearInterval(id); else router.refresh() }, 3000)
    return () => clearInterval(id)
  }, [waiting, router])

  useEffect(() => {
    if (!purchase) return
    clearCart()
    const key = `candron_ga_purchase_${purchase.transaction_id}`
    try {
      if (window.localStorage.getItem(key)) return
      window.localStorage.setItem(key, '1')
    } catch { /* storage blocked: still report once for this view */ }
    trackPurchase(purchase)
  }, [purchase])

  return null
}
