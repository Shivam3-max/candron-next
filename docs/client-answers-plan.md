# Online ordering: client answers → implementation plan

Source: client questionnaire returned Nov 24 2026, plus follow-up answers Nov 25 2026. Branch: `feature/online-ordering` (phases 1–3 built, off by default).

Status key: **Ready** = clear answer and already supported (settings only). **Build** = clear answer, needs code. **Open** = still waiting on the client.

## 1. Decisions

| # | Decision (client) | Today | Plan | Status |
|---|---|---|---|---|
| 1.1 | Buy online only for priced LV dry-type | Per-listing "Buy online" | Set LV listings to Buy online | Ready |
| 1.2 / 1.3 | **MV and HV always go through the sales team, no online deposit.** Custom builds, switchgear, switchboards and liquid-filled are quote only | Per-listing Buy / Reserve / Quote | Remove "Reserve with deposit" from the listing options (MV/HV and the rest = Request a quote). Add a "Custom build" flag that forces quote only. Deposits stay available only on **sales-team quotes** | Build (small) |
| 1.3 | **Up to 5 units online; 5 or more = special pricing** | Any quantity up to stock | Per-item online maximum (setting). Above it: "Need 5 or more? Request volume pricing" link to the quote form. *Exact cut-off (4 or 5) to confirm, see section 2* | Build (small) |
| 2.1 / 2.6 | Freight is invoiced after the order **if the buyer chooses CANDRON freight**; offloading always extra | Freight "quoted separately" with no follow-up | Checkout delivery options: **CANDRON freight (quoted after order)** or **Pickup / own carrier** from the yard. Checkout charges goods + tax only. Admin sends a **freight invoice** (freight, offloading, brokerage lines); the order can't be marked shipped until it's paid | Build |
| 2.3 | Pickup from **Mississauga, Windsor or Buffalo NY**; city only, no street address; **8 am–6 pm, after hours by call** | One pickup address | Yards in Shop settings (city + hours + phone); each listing picks its yard; pickup shows the yard; pickup only if the whole cart is at one yard. Exact location given in the order email after payment | Build |
| 2.3 / 6.x | **Buffalo pickup by a Canadian buyer: Canadian tax applies** | Tax by pickup address (Buffalo = no tax) | For Buffalo pickups, tax by the buyer's **billing** province when billing is in Canada; US billing = no tax (export) | Build |
| 2.4 / 2.5 | Deliver to all of Canada and the US; CANDRON's broker (BZee) handles customs | Canada only | Enable US delivery; checkout note on customs/brokerage | Build |
| 2.7 | Ships in 2–3 days after payment | Per-listing lead time | Default "Ships in 2–3 business days" when a listing has none | Build (small) |
| 3.1 / 3.4 | **Orders over $10,000 CAD before tax are not paid online.** The buyer arranges payment with accounting (email or call) | Card limit, then bank debit above it | Online payment limit **$10,000 before tax** (replaces the card limit). Up to $10k: card or pre-authorized debit as today. Over $10k: checkout becomes **"Submit order"**. The order is recorded and the stock held, the buyer sees "Our accounting team will contact you to arrange payment" (accounting@candron.com, phone), accounting and sales are emailed, and admin marks it paid when the money arrives | Build |
| 3.2 | No surcharge | None | – | Ready |
| 3.3 | Pre-authorized debit yes (up to $10k) | Built | Keep for orders up to $10k | Ready |
| 3.5 | US buyers pay **USD = CAD × day's rate + 5%** | One currency per listing | Daily Bank of Canada CAD→USD rate (free, no key), cached; US delivery = USD prices + 5%, charged in USD by Stripe. Listings show CAD with "USD at checkout for US delivery" | Build |
| 4.1 | Deposit 10% | Default 25% | Default 10% on sales quotes | Ready |
| 4.2 / 5.5 | Deposit refundable until production; cancellation charges apply | Partial refunds built | Cancellation policy in the Terms of Sale; refunds handled by the team in admin | Ready (+ T&Cs) |
| 4.3 | Balance due in **30 days**, 3 reminders; **team confirms, forfeit after 120 days** | Balance invoice is manual | On deposit: balance invoice due in 30 days. Daily job sends 3 reminders (day 30, 60, 90) and flags the order at **day 120** in admin; the team confirms the forfeit (keep deposit, release stock). Needs a daily trigger (Hostinger cron or external scheduler) | Build |
| 5.1–5.4 | Custom: no returns. Non-custom: unused, original packaging, 14 days. Restocking fee varies. Used = final sale. Buyer pays return freight | Return settings | Returns 14 days; used and custom final sale; "customer pays return shipping"; restocking fee "may apply" | Build (small) |
| 6.1–6.4 | Tax on all Canadian orders by ship-to province | Stripe Tax | Add the registrations in Stripe Tax | Open (numbers) |
| 6.5 | Exemption certificate uploaded or emailed to accounting@ before processing | Upload + approval built | Admin can also mark a customer exempt from an emailed certificate; checkout notice for exempt buyers | Build (small) |
| 6.9 | Invoices show company, address, GST/HST, customer, payment terms | Stripe receipts for card orders | Stripe invoice (PDF) for every online order with company details, GST/HST number and "Terms: due on receipt" | Build |
| 7.1 / 7.2 | Online = Net 0; net terms via sales | Net terms only on team quotes | No change | Ready |
| 8.1 | Orders → sales@candron.com; payments → accounting@candron.com | One notification address | Two settings: Orders and Accounting. Payments, invoices, refunds, over-$10k orders and exemptions go to accounting | Build |
| 8.2 | Admins: sales@candron.com, neel.goyal@candron.com | One admin | Several admin users, each signing in with an emailed link | Build |
| 8.3 | Order numbers CEI-26-000XXX | CE-2026-00001 | `CEI-26-000123` | Build (small) |
| 9.1–9.2 | Sales T&Cs; warranty shown; used items sold as-is | Generic terms page | Terms of Sale, Returns & Cancellation and Warranty pages; "Sold as-is, no warranty" on used listings; linked at checkout | Open (document) |

## 2. Still open

1. **Quantity cut-off.** "Up to 5 units" and "5 or above special pricing": is the online maximum **4** (5+ = quote) or **5** (6+ = quote)?
2. **$10k on sales quotes.** Does the $10k limit apply to the whole order or to each payment? For example, can a 10% deposit ($5,000) on a $50,000 quote be paid online?
3. **Hold time** for orders over $10k waiting on payment (suggest 5 business days, then the team can extend or cancel).
4. **Tax numbers:** GST/HST, plus QST and PST if registered.
5. **Order numbers:** does `CEI-26-000123` restart each year? Quote format (`CEI-Q-26-000123`)?
6. **T&Cs document** (warranty, cancellation, returns).
7. **Stripe USD:** confirm the Stripe account accepts USD (we can check this once we have test access).

## 3. Build order

1. **Settings and small changes** (~1 day): 10% deposit default; remove Reserve listing mode; Custom build flag; per-item online maximum; returns; order number format; default ship time; sales and accounting emails; "Sold as-is".
2. **$10k rule** (~1–2 days): online payment limit before tax; "Submit order" flow for larger orders with stock hold, emails and mark-paid; same limit on sales quotes.
3. **Delivery options + freight invoice** (~2 days): CANDRON freight vs pickup / own carrier; freight invoice from admin; ship only after it's paid.
4. **Pickup yards** (~1 day): three yards with hours; Buffalo tax rule.
5. **USD for US delivery** (~2 days).
6. **Deposit schedule on sales quotes** (~1–2 days): 30-day balance, reminders day 30/60/90, day-120 flag, team confirms forfeit; daily trigger.
7. **Invoices** (~1 day) and **admin users** (~1 day).
8. **Policy pages** (~1 day once the T&Cs arrive).
9. **Stripe test-mode run** ([stripe-test-plan.md](stripe-test-plan.md)), then go-live.

Total: about **2 weeks** of build, plus the test run. Everything except the quantity cut-off, tax numbers and T&Cs can start now (defaults: maximum 4, 5-day hold, $10k per order).

## 4. Built (Nov 25 2026)

Built on `feature/online-ordering` with the defaults above. All are editable in Admin → Shop settings.

| Area | What it does now |
|---|---|
| Listings | "Reserve with deposit" is gone (existing ones become quote-only). New **Custom build** flag (always quote-only, final sale) and **Pickup yard** per listing. Used items show "Sold as-is, no warranty". Default "Ships in 2–3 business days". |
| Quantity | At most **4** of an item online (setting); more shows "request a quote for volume pricing". |
| $10k rule | Over **$10,000 CAD before tax**, nothing is paid online: checkout becomes **Submit order**, the stock is held **5 business days**, sales and accounting are emailed, and the buyer is told accounting will contact them. Admin → Orders: **Mark paid** (amount + EFT/cheque reference), **Extend hold**. Quotes over $10k turn into the same kind of order when accepted. |
| Delivery | Checkout offers **CANDRON freight** (quoted after the order) or **Pickup / own carrier** at the item's yard (city and hours only). Pickup needs a billing address. |
| Freight invoice | Admin → Orders → **Send freight invoice** (freight, offloading, customs brokerage) through Stripe; orders paid through accounting record the charge for accounting to invoice. An order can't be marked Shipped until freight is paid. |
| Tax | Canadian yards: tax at the yard. **Buffalo** pickups: tax on the buyer's billing address, so Canadian buyers pay Canadian tax and US buyers pay none. |
| USD | US addresses pay **USD at the Bank of Canada rate + 5%** (rate cached, refreshed every 6 hours). Listings still show CAD. |
| Deposits (sales quotes) | Default 10%, balance due in 30 days, reminders on days **30, 60, 90** (accounting copied), **flag at day 120**; the team confirms **Forfeit** in admin. Runs once a day from `/api/cron/daily` (needs `CRON_SECRET`) and, as a fallback, when an admin opens Orders. |
| Invoices | Every online payment creates a **Stripe PDF invoice** with the GST/HST/QST/PST numbers from settings, PO number and payment terms. Business name and address come from Stripe's business details. |
| Emails | Orders → **sales@candron.com**, payments/refunds/over-limit orders/overdue balances/exemption certificates → **accounting@candron.com**. |
| Numbers | Orders `CEI-26-000123`, quotes `CEI-Q-26-000123` (running number, no yearly reset). Old links still work. |
| Admins | Admin → **Admins**: the main admin (ADMIN_EMAIL) invites sales@ and neel.goyal@; each sets their own password from an emailed link (48 h, single use). |
| Returns | New `/returns` page from the settings (kept out of search until the T&Cs are published). |

Tested on a scratch database: pricing rules, over-limit order → hold → extend → mark paid, freight recorded and paid, ship blocked until freight paid, Stripe freight webhook (and a duplicate), daily reminders and forfeit flag (once a day), forfeit, quote over the limit, admin invite/set-password/remove. Stripe itself (Checkout, invoices) still needs the test-mode run.

**Still to do:** confirm the open questions (section 2), add the tax numbers, and build the Terms of Sale and Warranty pages from the client's document.

**Go-live additions:**
- Set `CRON_SECRET` (16+ random characters) in Hostinger, and add a daily cron job that calls `https://candron.com/api/cron/daily` with the header `Authorization: Bearer <CRON_SECRET>`.
- In Stripe, fill in Settings → Business details (address) and Invoice settings. Stripe charges a small fee per invoice created after a Checkout payment.
