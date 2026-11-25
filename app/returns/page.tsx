import type { Metadata } from 'next'
import Link from 'next/link'
import { PHONE } from '@/lib/inventory'
import { getShopSettings } from '@/lib/shop/settings'

export const dynamic = 'force-dynamic'
// Kept out of search until the client's full Terms of Sale are published alongside it
export const metadata: Metadata = {
  title: 'Returns and cancellations',
  description: 'Returns, cancellations and deposits for equipment ordered from CANDRON.',
  alternates: { canonical: '/returns' },
  robots: { index: false, follow: true },
}

export default async function ReturnsPage() {
  const s = await getShopSettings()
  const accounting = s.accountingEmail.split(',')[0]?.trim()
  return (
    <section className="shop-page">
      <div className="container shop-narrow">
        <div className="shop-head">
          <div className="label">Online orders</div>
          <h1>Returns and cancellations</h1>
          <p>How returns, cancellations and deposits work for equipment ordered from CANDRON. Our <Link href="/terms-and-conditions">terms of sale</Link> apply to every order.</p>
        </div>

        <div className="shop-card shop-policy">
          <h2>Returns</h2>
          <ul>
            {s.returns.days
              ? <li>New, standard (non-custom) equipment can be returned within <strong>{s.returns.days} days</strong> of receipt if it is unused and in its original packaging. Contact us before sending anything back.</li>
              : <li>Returns of new, standard equipment are reviewed case by case. Contact us before sending anything back.</li>}
            <li>The buyer pays return freight. A restocking fee may apply; our sales team confirms it before the return is approved.</li>
            {s.returns.customFinalSale && <li><strong>Custom-built equipment</strong> can’t be returned.</li>}
            {s.returns.usedFinalSale && <li><strong>Used and surplus equipment</strong> is sold as-is, with no warranty, and is final sale.</li>}
            <li>Please inspect equipment on delivery and note any damage on the carrier’s bill of lading.</li>
          </ul>
        </div>

        <div className="shop-card shop-policy">
          <h2>Cancellations and deposits</h2>
          <ul>
            <li>Where a deposit is taken (on quotes from our sales team), it is refundable until production starts. Cancellation charges may apply; our sales team confirms them.</li>
            <li>The balance is due within <strong>{s.deposit.balanceDays} days</strong> of the deposit. We send reminders, and if the balance is still unpaid after <strong>{s.deposit.forfeitDays} days</strong> the order may be cancelled and the deposit kept.</li>
          </ul>
        </div>

        <div className="shop-card shop-policy">
          <h2>Payment</h2>
          <ul>
            <li>Online orders are due on receipt. Orders over {s.onlineLimit ? `$${s.onlineLimit.toLocaleString('en-CA')} CAD` : 'our online limit'} before tax are paid by EFT, bank draft or cheque through our accounting team{accounting ? <> (<a href={`mailto:${accounting}`}>{accounting}</a>)</> : null}.</li>
            <li>Freight, when we arrange it, is quoted after your order and invoiced before shipping. Offloading is extra.</li>
          </ul>
        </div>

        <p className="shop-fine">Questions? Call <a href={PHONE.href}>{PHONE.label}</a> or <Link href="/contact">contact us</Link>.</p>
      </div>
    </section>
  )
}
