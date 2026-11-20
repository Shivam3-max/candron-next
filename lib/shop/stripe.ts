import Stripe from 'stripe'

declare global {
  var __candronStripe: Stripe | undefined
}

/** Server-only Stripe client. The API version is the one this SDK release is pinned to. */
export function stripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  if (!global.__candronStripe) {
    global.__candronStripe = new Stripe(key, { maxNetworkRetries: 2, timeout: 20_000, appInfo: { name: 'candron.com' } })
  }
  return global.__candronStripe
}

export const toCents = (amount: number) => Math.round(amount * 100)
export const fromCents = (cents: number | null | undefined) => Math.round(cents ?? 0) / 100

/** Dashboard link for a payment (test or live). */
export const dashboardPaymentUrl = (paymentIntent: string, live: boolean) =>
  `https://dashboard.stripe.com/${live ? '' : 'test/'}payments/${paymentIntent}`
