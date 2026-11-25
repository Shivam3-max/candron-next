# Online ordering: Stripe test-mode plan (phase 4)

Run everything with **test keys** first. No real money moves in test mode.

## 1. Setup

1. **Stripe dashboard (test mode)**
   - Settings → Payment methods: turn on **Cards** and **Canadian pre-authorized debits** (plus ACH if selling in USD).
   - Tax: add the Ontario GST/HST registration (and QST/PST if registered), and set a head-office address.
   - Invoicing: set the business name, logo and footer on invoices.
2. **Local `.env.local`**, never committed:
   - `STRIPE_SECRET_KEY=sk_test_…`
   - `SMTP_USER` / `SMTP_PASSWORD` (Google Workspace app password)
3. **Local webhooks**, using the Stripe CLI:
   - Run `stripe listen --forward-to localhost:3000/api/stripe/webhook`.
   - Put the `whsec_…` it prints into `.env.local` as `STRIPE_WEBHOOK_SECRET`.
4. **Admin**
   - Shop settings: check the yards, online limit ($10,000), notification emails and tax numbers; turn on "Take orders online".
   - Set three LV listings to Buy online: two at the Mississauga yard, one at Buffalo. Make one of them over $10,000.

## 2. Scenarios

| # | Scenario | How | Expect |
|---|---|---|---|
| 1 | Card payment | Buy now → checkout → card `4242 4242 4242 4242` | Order **Paid**; stock down; buyer and team emails; GA `purchase` |
| 2 | 3-D Secure card | Card `4000 0025 0000 3155`, approve the challenge | Same as 1 |
| 3 | Declined card | Card `4000 0000 0000 9995` | Error stays on the Stripe page; order stays awaiting payment; holds expire |
| 4 | Pre-authorized debit (success) | Pay by bank debit with Stripe's test account | **Payment processing**, then **Paid** when the test debit clears |
| 5 | Pre-authorized debit (failure) | Use Stripe's failing test account number | **Payment failed**; stock returned; emails |
| 6 | Abandoned checkout + reminder | Tick the reminder box, leave the Stripe page; then `stripe trigger checkout.session.expired` or wait | **Checkout expired**; holds released; one reminder email |
| 7 | Over $10,000 | Cart over $10k before tax | **Submit order** (no Stripe); **Awaiting payment (accounting)**; stock held 5 business days; admin **Mark paid** → **Paid** |
| 8 | Stripe Tax | Ship to ON, QC, AB and BC | 13% HST; 5% GST + 9.975% QST if registered; 5% GST; GST + PST if registered |
| 9 | Pickup | Pickup at Mississauga; then Buffalo with an Ontario billing address | No freight; 13% HST in both cases |
| 10 | US buyer | Ship to New York | Prices in USD (Bank of Canada rate + 5%); no tax; ACH offered |
| 11 | Freight invoice | Paid delivery order → Admin → Send freight invoice (freight + offloading); try Shipped first | Shipped is blocked; pay the invoice → freight **paid**; then Shipped works |
| 11b | Deposit quote | Quote with a 10% deposit; accept; Admin → Send balance invoice | **Deposit paid**, then **Paid** when the invoice is paid |
| 12 | Mark paid offline | Send an invoice, then "Mark invoice paid (offline)" | **Paid**; invoice is paid in Stripe |
| 13 | Quote, pay in full | Admin → Quotes → create → send; accept from the email link | Order **Paid**; quote **Accepted** |
| 14 | Quote, net terms | Quote with Net 30; accept | Order **Invoice sent**; stock **Reserved**; Stripe invoice emailed |
| 15 | Cancel an invoiced order | Admin → cancel | Invoice **voided** in Stripe; stock returned |
| 16 | Refunds | Refund part, then the rest, from admin | Stripe refunds; amount refunded; **Refunded** when complete |
| 17 | Tax-exempt buyer | Account → upload certificate; admin approves; order again | Accounting emailed; Stripe customer is tax-exempt; no tax charged |
| 17b | Invoice PDF | Any card order | Receipt email links a PDF invoice with GST/HST number, PO and terms |
| 18 | Accounts | Sign in by email link; addresses; Order again; sign out | As built in phase 3 |
| 19 | Duplicate webhooks | Stripe dashboard → resend an event | Nothing double-counted |
| 20 | Mobile | Phone checkout, including Apple Pay / Google Pay | Works end to end |

## 3. Go live

1. Swap Hostinger to the **live** keys and add a live webhook endpoint `https://candron.com/api/stripe/webhook` with these events:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.async_payment_failed`
   - `checkout.session.expired`
   - `charge.refunded`
   - `invoice.paid`
   - `invoice.payment_failed`

   Put the live `whsec_…` in `STRIPE_WEBHOOK_SECRET`.
   Also set `CRON_SECRET` and a daily Hostinger cron job calling `/api/cron/daily` (see [client-answers-plan.md](client-answers-plan.md)).
2. Re-enter the payment methods, tax registrations and invoice branding in **live** mode (Stripe keeps test and live settings separate).
3. Place one small real order with a company card, then refund it.
4. Merge `feature/online-ordering` to `main` only after the client signs off on the questionnaire answers: freight, card limit, deposits, returns and tax.
