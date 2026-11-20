import { sendGAEvent } from '@next/third-parties/google'

// Google Analytics 4 property. Overridable per environment (e.g. a staging property).
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-C3JP916RZK'

// Only production builds report, so local development doesn't pollute the data.
export const analyticsEnabled = process.env.NODE_ENV === 'production'

type LeadForm = 'contact' | 'inventory_quote' | 'oil_readout'

function track(name: string, params: Record<string, string>) {
  // GA isn't loaded in development; sendGAEvent would only log a warning
  if (typeof window === 'undefined' || !('dataLayer' in window)) return
  sendGAEvent('event', name, params)
}

// GA4 recommended event names. Never pass names, emails, phones or messages (no PII in GA).
export const trackLead = (form: LeadForm) => track('generate_lead', { form_name: form })
export const trackNewsletterSignup = () => track('sign_up', { method: 'newsletter' })

// GA4 e-commerce events (recommended names). Items carry only catalogue data, never buyer details.
export interface GaItem { item_id: string; item_name: string; price: number; quantity: number }
function trackCommerce(name: string, params: { currency: string; value: number; items: GaItem[]; transaction_id?: string; tax?: number; shipping?: number }) {
  if (typeof window === 'undefined' || !('dataLayer' in window)) return
  sendGAEvent('event', name, params)
}
export const trackAddToCart = (currency: string, item: GaItem) => trackCommerce('add_to_cart', { currency, value: item.price * item.quantity, items: [item] })
export const trackBeginCheckout = (currency: string, value: number, items: GaItem[]) => trackCommerce('begin_checkout', { currency, value, items })
export const trackPurchase = (p: { transaction_id: string; currency: string; value: number; tax: number; shipping: number; items: GaItem[] }) => trackCommerce('purchase', p)
