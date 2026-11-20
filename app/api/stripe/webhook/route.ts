import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { handleStripeEvent } from '@/lib/shop/orders'
import { stripe } from '@/lib/shop/stripe'

export const dynamic = 'force-dynamic'

/**
 * Stripe webhook. Add this endpoint in Stripe → Developers → Webhooks with the events:
 * checkout.session.completed, checkout.session.async_payment_succeeded,
 * checkout.session.async_payment_failed, checkout.session.expired, charge.refunded,
 * invoice.paid, invoice.payment_failed (deposit balances and net-terms quotes).
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  const signature = req.headers.get('stripe-signature')
  if (!secret || !signature) return NextResponse.json({ error: 'Not configured' }, { status: 400 })
  // The signature covers the exact raw body, so read it as text before any parsing
  const payload = await req.text()
  let event: Stripe.Event
  try {
    event = stripe().webhooks.constructEvent(payload, signature, secret)
  } catch (error) {
    console.warn('[stripe] webhook signature check failed', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }
  try {
    const result = await handleStripeEvent(event)
    return NextResponse.json({ received: true, result })
  } catch (error) {
    // 500 makes Stripe retry the delivery later
    console.error(`[stripe] ${event.type} ${event.id} failed`, error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}
