// Order statuses (client-safe). The flow: pending_payment → paid (or payment_processing → paid)
// → processing → ready_to_ship → shipped → delivered; plus cancelled / expired / payment_failed / refunded.
// Deposits: pending_payment → deposit_paid → invoiced (balance) → paid. Net terms: invoiced → paid.

export const ORDER_STATUSES = {
  pending_payment: { label: 'Awaiting payment', tone: 'wait', customer: 'Waiting for payment to be completed.' },
  payment_processing: { label: 'Payment processing', tone: 'wait', customer: 'Your bank payment is processing. This usually takes 3–5 business days; we’ll email you when it clears.' },
  deposit_paid: { label: 'Deposit paid', tone: 'ok', customer: 'Deposit received and the equipment is reserved for you. We’ll send an invoice for the balance (and freight) before it ships.' },
  invoiced: { label: 'Invoice sent', tone: 'wait', customer: 'Your invoice has been issued. You can pay it online from the link below, by bank debit or card, before the due date.' },
  paid: { label: 'Paid', tone: 'ok', customer: 'Payment received. Our team is preparing your order.' },
  processing: { label: 'Processing', tone: 'ok', customer: 'Your order is being prepared.' },
  ready_to_ship: { label: 'Ready to ship', tone: 'ok', customer: 'Your order is ready and we’re arranging freight or pickup.' },
  shipped: { label: 'Shipped', tone: 'ok', customer: 'Your order is on its way.' },
  delivered: { label: 'Delivered', tone: 'done', customer: 'Your order has been delivered.' },
  cancelled: { label: 'Cancelled', tone: 'off', customer: 'This order was cancelled.' },
  expired: { label: 'Checkout expired', tone: 'off', customer: 'The payment page expired before payment was made. Nothing was charged.' },
  payment_failed: { label: 'Payment failed', tone: 'bad', customer: 'The payment didn’t go through. Please contact us to complete your order.' },
  refunded: { label: 'Refunded', tone: 'off', customer: 'This order was refunded.' },
} as const

export type OrderStatus = keyof typeof ORDER_STATUSES

/** Statuses an admin can move a paid order to, in workflow order ("paid" itself comes only from Stripe). */
export const ADMIN_STATUSES: OrderStatus[] = ['processing', 'ready_to_ship', 'shipped', 'delivered', 'cancelled']

export const statusLabel = (s: string) => ORDER_STATUSES[s as OrderStatus]?.label ?? s
export const statusTone = (s: string) => ORDER_STATUSES[s as OrderStatus]?.tone ?? 'wait'

export const PAYMENT_TERMS = {
  pay_now: 'Paid in full online',
  deposit: 'Deposit, balance invoiced',
  net: 'Invoice (net terms)',
} as const
export type PaymentTerms = keyof typeof PAYMENT_TERMS

export const formatMoney = (amount: number, currency = 'CAD') =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)
