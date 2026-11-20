# CANDRON online ordering: plan

Status: draft for review · Nov 20 2026

## 1. Where the site is today

| Area | Today | Gap for e-commerce |
|---|---|---|
| Catalogue | `/inventory` + product pages from MySQL (`products`, `product_images`). Stock batches seeded at deploy. Price, currency, `show_price`, `stock_quantity`, `status` already exist. | Prices are missing on most MV/used gear. No weight on many LV units (needed for freight). |
| Buying | "Request a quote" form posts to `/api/contact` and emails the team. | No cart, checkout, payment, order record or stock decrement. |
| Customers | None (guest contact form only). | No customer records, addresses, order history. |
| Admin | `/admin`: single admin, product CRUD and photos. | No orders, quotes, refunds, shipping or customer views. |
| Email | Nodemailer via Google Workspace SMTP; confirmation to visitor + team. | Needs order, payment, shipping and quote emails. |
| Analytics | GA4 with `generate_lead`. | No e-commerce events (`add_to_cart`, `begin_checkout`, `purchase`). |
| Platform | Next.js 16.4 App Router, React 19, MySQL on Hostinger (single Node process), schema bootstrapped at start (`instrumentation.ts`). | Webhook endpoint, background-safe order processing, new tables. |
| Legal | Terms & conditions, warranty pages. | Terms of sale, shipping, returns/cancellation, privacy update for payments. |

What already helps: item codes, structured product data with `Offer` markup, per-listing quantity and status, one-time deploy tasks (safe migrations), admin auth with session revocation.

## 2. How comparable sellers do it

**Maddox (US)** runs a separate Shopify store (`store.maddox.com`) next to the marketing site.
- In-stock standard units (mainly LV dry-type) have a fixed price, size/condition selectors, quantity, live stock count and **Add to cart**. Custom and larger units go to **Request a quote** ("quote in 30 mins").
- Freight: lower 48 states only for web orders, "generally around 10 % of the order price" for large equipment by LTL; carrier-calculated rates for small parts. In-stock units ship in 3–5 business days.
- Payment: cards (Visa, MC, Amex, Discover, Apple Pay) with a **3 % surcharge on card orders over $30,000**, plus ACH, wire and cheque via their AR team. A credit application exists for terms.
- Customer accounts, 30-day returns, 5-year warranty.

**Surplus marketplaces** (Surplus Record, Electrical Trader, eBay sellers) list used gear with fixed prices but push **freight to a separate quote**, often sell **EXW / FOB the yard** (rigging, loading and lowboy freight excluded), and take wire/ACH for large tickets.

**Pattern to copy:** buy-now for standard, light, priced stock; quote-to-order for heavy, used or custom equipment, with the same payment rails behind both.

## 3. Proposed model for CANDRON

Every listing gets a **purchase mode** (set in admin, with a sensible default):

| Mode | Use for | Customer sees |
|---|---|---|
| `buy` | In-stock, priced, freight-calculable units (most LV dry-type) | Price, quantity, **Add to cart**, and Request a quote for volume pricing |
| `reserve` | Priced but heavy units (MV dry-type, switchboards) | Price + **Reserve with deposit** (e.g. 25 %), balance invoiced before shipping |
| `quote` | No price, used lineups, custom work | **Request a quote** (today's flow), which can become a payable quote |

### Flows

1. **Buy now:** product → cart → checkout (Stripe hosted) → order confirmed → admin ships → tracking email.
2. **Reserve:** product → Stripe Checkout for the deposit → listing shows "Reserved" → admin sends a Stripe invoice for the balance + freight → ships after payment.
3. **Quote to order:** quote request → admin builds a quote in `/admin` (lines, freight, terms, expiry) → customer gets an email link to `/quote/<token>` → accepts and pays online (card, PAD/ACH or bank transfer) or receives a Stripe invoice (net terms).

### Payments (Stripe)

- **Stripe Checkout (hosted page)**, not a custom card form. It keeps card data off our server (lowest PCI scope), and supports cards, Apple Pay/Google Pay, **Canadian pre-authorized debit (ACSS)** for CAD and **US bank account (ACH)** for USD, with mandate collection handled by Stripe.
- **Large orders:** above a threshold (e.g. $25,000), offer bank debit and **bank transfer** (Stripe customer balance/virtual account details, auto-reconciled) instead of cards. This avoids the card fees Maddox recovers with its surcharge. Card surcharging in Canada has network caps and provincial limits, so we leave it out unless the client asks.
- **Stripe Invoicing** for deposit balances and net-terms customers.
- **Stripe Tax** for GST/HST/QST/PST by province and US sales tax, using the customer's ship-to address. Tax-exempt buyers are marked exempt on their customer record.
- **Currency:** one currency per order. CAD by default; USD listings and US buyers are supported because products already carry `currency`.

### Freight

Heavy equipment is the hardest part.
- `buy` items: calculated at checkout from the unit's **weight** and the **destination zone** (e.g. GTA, Ontario, Quebec, Prairies, BC, Atlantic, US lower 48). Rates come from an admin-editable table, plus a free **"pick up in Ontario"** option. Liftgate/offloading is a paid add-on.
- `reserve` and `quote` items: freight is quoted by the team and added to the balance invoice or the quote.
- Units without a weight cannot be `buy` (admin validation).

### Stock integrity

- Prices, tax and freight are **always computed on the server** from the database. The cart only holds item IDs and quantities.
- When checkout starts, the quantity is **held for 30 minutes** (`stock_holds`). Stripe session expiry releases it. A paid order converts the hold into a stock decrement.
- Orders are only marked paid from a **verified Stripe webhook** (signature checked on the raw body), never from the redirect page. Webhook events are stored by ID, so retries are processed once.

## 4. Data model (new tables)

- `customers`: email, name, company, phone, Stripe customer ID, tax-exempt flag
- `carts`, `cart_items`: cart keyed by an httpOnly cookie, items with quantity
- `orders`: number (e.g. `CE-2026-00042`), customer, status, currency, subtotal, freight, tax, total, deposit/balance, ship-to and bill-to addresses, Stripe session/payment intent/invoice IDs
- `order_items`: snapshot of SKU, name, unit price and quantity at purchase time
- `order_events`: status history and notes (audit trail)
- `stock_holds`: product, quantity, checkout session, expiry
- `quotes`, `quote_items`: lines, freight, terms, expiry, access token, status (draft, sent, accepted, paid, expired)
- `freight_zones`, `freight_rates`: zone and weight-band rates
- `stripe_events`: processed webhook IDs
- `products` gains `purchase_mode`, `deposit_percent`, `ships_in` (for example "3–5 business days")

These tables are added through the existing deploy-time migration path (`migrate-inventory.mjs` and `deployment_tasks`).

### Order statuses

`pending_payment → paid (or deposit_paid) → processing → ready_to_ship → shipped → delivered`. Other end states are `cancelled` and `refunded` (or partially refunded). Bank debit and transfer payments sit in `payment_processing` until Stripe confirms them, which takes a few business days.

## 5. Screens and endpoints

**Storefront**
- Product page: purchase-mode-aware buy box (price, quantity, stock, ships-in, Add to cart / Reserve / Quote).
- Cart drawer and `/cart` page.
- `/checkout`: contact, company and PO number, then a redirect to Stripe Checkout. Shipping address, freight option and tax are calculated there.
- `/order/<number>?t=<token>`: confirmation and status page, with no login needed.
- `/quote/<token>`: view, accept and pay a quote.
- Optional later: customer accounts using email magic links, with order history and saved addresses.

**Admin**
- Orders: list, filters, detail, status changes, tracking number, internal notes, refund (full or partial through Stripe), resend emails.
- Quotes: create from a quote request, add lines and freight, send, see status.
- Products: purchase mode, deposit percentage, weight required for `buy`.
- Settings: freight zones and rates, card-payment threshold, deposit default.

**API (route handlers)**
- `POST /api/cart`, `PATCH /api/cart/[itemId]`, `DELETE /api/cart/[itemId]`
- `POST /api/checkout` (creates the order, stock holds and Stripe Checkout Session)
- `POST /api/stripe/webhook`, handling these events:
  - `checkout.session.completed`
  - `checkout.session.async_payment_succeeded` / `checkout.session.async_payment_failed`
  - `checkout.session.expired`
  - `invoice.paid`
  - `charge.refunded`
- `/api/admin/orders*`, `/api/admin/quotes*`, `/api/admin/freight*`

**Email:** order received (to customer and team), payment confirmed, bank-debit pending, shipped with tracking, quote sent, quote accepted, refund issued. All emails use the existing SMTP mailer and match the current email design.

## 6. Delivery phases

| Phase | Scope | Estimate |
|---|---|---|
| 0. Decisions & setup | Client answers (section 8); Stripe account (client-owned) in test mode; GST/HST registration in Stripe Tax; legal pages drafted | 2–3 days (mostly client) |
| 1. Buy-now MVP | Schema, cart, server pricing, freight table, Stripe Checkout (card + PAD/ACH), webhook, stock holds, order emails, admin orders list/detail/status/refund, GA4 ecommerce events | 2–3 weeks |
| 2. Quotes & deposits | Admin quote builder, `/quote/<token>` pay flow, reserve-with-deposit, Stripe Invoicing for balances and net terms, bank-transfer option for large orders | 1.5–2 weeks |
| 3. Accounts & polish | Customer magic-link accounts, order history, saved addresses, tax-exempt uploads, reorder, abandoned-cart email, Google Merchant shipping/returns markup | 1–2 weeks |
| 4. Hardening & launch | End-to-end tests in Stripe test mode (cards, 3-D Secure, PAD, failures, refunds, webhook retries), load and rate-limit checks, live keys, soft launch on LV stock only | 3–5 days |

The phases build on each other: phase 1 is usable on its own (LV dry-type stock goes live first), and quotes stay on today's email flow until phase 2.

## 7. Security, compliance, operations

- Secrets in Hostinger env only: `STRIPE_SECRET_KEY` (a restricted key where possible), `STRIPE_WEBHOOK_SECRET`. The hosted Checkout page needs no publishable key.
- Test mode first. Live keys are only added after the phase 4 sign-off.
- Webhook signature verification, idempotent processing, and server-side totals only. A rate limit on cart and checkout, plus the existing honeypot on quote forms.
- No card data stored or logged. Stripe handles PCI (SAQ A with hosted Checkout).
- PAD mandates, receipts and dispute evidence are handled in Stripe. The Terms of Sale need to cover freight, risk of loss, inspection on delivery, returns/restocking, cancellation of reserved units, warranty and limitation of liability, and should be reviewed by the client's counsel.
- Privacy policy: add payment processor (Stripe) and order data retention.
- The single Hostinger Node process means jobs like hold expiry must also run lazily. Expired holds are released whenever stock is read, as well as by the webhook, so nothing depends on a cron.

## 8. Decisions needed from the client

1. Which listings are **buy now** at launch? (Suggestion: priced LV dry-type stock only.)
2. **Freight:** zone rates, or a percentage like Maddox (~10 %)? Is pick-up available, and from where? Ship to the US?
3. **Payment limits:** a maximum card amount? Card surcharge yes or no? Is wire/transfer required above a set amount?
4. **Deposits** for MV and heavy units: what percentage, and is it refundable?
5. **Returns and cancellation:** return window, restocking fee, and which items are final sale (used gear).
6. **Taxes:** the GST/HST number, and whether CANDRON is registered for QST or PST anywhere. US sales tax obligations, if they ship to the US.
7. **Net terms:** which customers, and on what credit-approval process?
8. **Stripe account:** the client creates it in CANDRON's legal name, adds bank details and invites us as a developer. We never handle their banking details.
9. **Order emails:** who receives order notifications, and should the order number be on the commercial invoice?

## Sources

- Maddox store and policies: [store.maddox.com](https://store.maddox.com/), [shipping policy](https://www.maddox.com/resources/shipping-policy), [payment instructions](https://www.maddox.com/resources/payment-instructions), [LV dry-type page](https://maddox.com/products-and-services/low-voltage-dry-type)
- Surplus listings and freight terms: [Surplus Record example](https://surplusrecord.com/listing/2000-kva-13800-primary-480-277-secondary-general-electric-m156439a-substation-dry-type-transformer-3-available-1051235/), [Electrical Trader](https://electricaltrader.com/)
- Stripe Canadian pre-authorized debit: [ACSS debit docs](https://docs.stripe.com/payments/acss-debit), [PAD guide](https://stripe.com/resources/more/pre-authorized-debits-in-canada-an-in-depth-guide)

## Phase 1: built (Nov 20 2026)

Ships switched **off**. Nothing changes publicly until the steps below are done.

**What's in:**
- Per-listing "Buy online" setting (admin → product → Pricing)
- Cart (browser storage, server re-priced) and checkout
- Stripe Checkout with card + Apple Pay/Google Pay/Link and bank debit (Canadian PAD for CAD, ACH for USD), plus a card limit
- Stripe Tax (optional)
- Freight by zone and weight, percentage, or quoted separately, plus free pickup
- 35-minute stock holds
- Webhook-confirmed payments
- Order page for the buyer (private link)
- Order emails to buyer and team
- Admin → Orders (status, tracking, internal notes, cancel with restock, Stripe refunds)
- Admin → Shop settings
- GA4 events: `add_to_cart`, `begin_checkout`, `purchase`

**Go-live checklist:**
1. In Stripe (test mode first):
   - Turn on the payment methods (Cards; Canadian pre-authorized debits and/or ACH) under Settings → Payment methods.
   - Add tax registrations under Tax if Stripe Tax is used.
2. Add a webhook endpoint `https://candron.com/api/stripe/webhook` (Developers → Webhooks) with these events:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.async_payment_failed`
   - `checkout.session.expired`
   - `charge.refunded`
   - `invoice.paid` (added in phase 2)
   - `invoice.payment_failed` (added in phase 2)
3. In Hostinger, set the environment variables:
   - `STRIPE_SECRET_KEY` (`sk_test_…` first; a restricted key is fine)
   - `STRIPE_WEBHOOK_SECRET` (`whsec_…`)
   - optionally `SITE_URL`

   Then redeploy.
4. Configure the admin:
   - Admin → Shop settings: pickup address, freight rates, card limit, notification email. Switch "Take orders online" on.
   - Admin → each listing to sell: set Online purchase = Buy online, add a shipping weight, and make sure a single price is shown.
5. Place test orders with Stripe test cards and a test bank debit. Check the emails, the admin order and the stock. Then swap in the live keys and webhook secret.

## Phase 2: built (Nov 20 2026)

**Quotes**
- Product "Request a quote" submissions are stored as requests (Admin → Quotes → Requests).
- One click turns a request into a quote. The admin can add inventory units and custom lines, plus freight, delivery address, message, internal notes and an expiry date.
- Payment terms per quote: pay in full online, deposit % online with the balance invoiced, or net-terms invoice.
- "Save and send" emails the buyer a private link to `/quote/Q-…`. Quotes expire automatically after their date.
- The buyer accepts with an optional PO number:
  - pay in full or deposit → Stripe Checkout, with inventory units held during payment;
  - net terms → stock is reserved and a Stripe invoice is issued and emailed.
- If Stripe fails, acceptance is rolled back and the quote stays open.

**Deposits and invoices**
- New listing mode, "Reserve with deposit". It has its own deposit % (or the shop default) and a Reserve box on the product page that leads to a deposit checkout. Freight is quoted later.
- When the deposit is paid, the order becomes "Deposit paid" and the unit "Reserved".
- From the order, admin sends a **balance invoice** (order value − deposit + freight, editable). It uses Stripe Invoicing with Stripe Tax, card under the limit or bank debit, and Stripe emails it.
- `invoice.paid` → the order becomes Paid and the unit Sold. Invoices paid by wire or cheque can be **marked paid offline** (they're also marked paid in Stripe).
- Cancelling an invoiced order voids the Stripe invoice and returns the stock.
- Refunds: the admin button refunds the checkout payment (full order or deposit). Invoice payments are refunded from the invoice in the Stripe dashboard.

**Not in phase 2:** bank-transfer virtual accounts. Stripe's customer-balance transfers don't support CAD, so CAD buyers use pre-authorized debit or wire (mark paid offline).
