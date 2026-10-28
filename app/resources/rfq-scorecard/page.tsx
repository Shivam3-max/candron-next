import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroArt } from '@/components/LineArt'
import ResourceFaq from '@/components/resources/ResourceFaq'
import { CRITERIA, MUST_STATE, SCORECARD_XLSX, SHEETS } from '@/lib/resources/rfq-scorecard'

export const metadata: Metadata = {
  title: 'Electrical Equipment RFQ Template & Bid Scorecard (Excel)',
  description: 'Free Excel workbook for procurement and project teams: an RFQ template that makes switchgear and transformer quotes comparable, plus a weighted bid scorecard for up to five bidders.',
  alternates: { canonical: '/resources/rfq-scorecard' },
}

const FAQS = [
  { q: 'Why ask every bidder for the same 13 things?', a: 'Most electrical quotes are hard to compare because each bidder states lead time, freight, tests and exceptions differently. Asking for the same basis up front saves a round of clarifications and makes the cheapest-looking quote easier to check.' },
  { q: 'Can I change the weights?', a: 'Yes. The weights are inputs, and the sheet warns you if they no longer add up to 100%. A schedule-critical job might weight lead time above price; a utility tender might add weight to compliance.' },
  { q: 'How is price scored?', a: 'The lowest total price scores 5 and every other bid scores 5 × (lowest ÷ its price). Lead time works the same way with the shortest lead time, and warranty with the longest warranty.' },
  { q: 'Does it work in Google Sheets or Numbers?', a: 'Yes. It uses standard formulas only (MIN, MAX, SUMPRODUCT, RANK), so it opens in Excel, Google Sheets and Apple Numbers.' },
]

export default function RfqScorecardPage() {
  return (
    <>
      <div className="page-hero dt-hero">
        <div className="page-hero-bg dt-hero-bg" />
        <HeroArt kind="cap-proc" views={['flow', 'gantt', 'iso']} figure="FIG. 01 · PROCESS" />
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / <span>RFQ & Bid Scorecard</span></div>
          <div className="label label-white">Free Excel Download</div>
          <h1>RFQ & Bid<br /><em>Scorecard</em></h1>
          <p className="lead mt-4">An RFQ template that makes switchgear and transformer quotes comparable, and a weighted scorecard that ranks up to five bids the same way every time.</p>
          <ul className="dt-hero-points">
            <li>Four sheets: How to use, RFQ, Bid Comparison, Clarifications</li>
            <li>Price, lead time and warranty score automatically</li>
            <li>Works in Excel, Google Sheets and Numbers</li>
          </ul>
          <div className="dt-hero-cta">
            <a href={SCORECARD_XLSX} className="btn btn-primary" download>Download the workbook</a>
            <a href="#scoring" className="btn btn-outline">See how scoring works</a>
          </div>
        </div>
      </div>

      <section className="section bg-off">
        <div className="container" style={{ display: 'grid', gap: '2.4rem' }}>
          <div className="rt-download">
            <span className="rt-download-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M4 9h16M4 15h16M10 3v18" /></svg></span>
            <div><strong>RFQ & Bid Scorecard (.xlsx)</strong><span>Opens with three example bids so you can see the scoring work. Overwrite them with your own.</span></div>
            <a href={SCORECARD_XLSX} className="btn btn-primary" download>Download</a>
          </div>
          <div className="rt-two-col">
            <div>
              <div className="label">What’s Inside</div>
              <h2>Four sheets, one decision</h2>
              <p className="body mt-4">Send the RFQ sheet with your specification, log every question on the Clarifications sheet, then enter the quotes on the Bid Comparison sheet. Yellow cells are the only ones you fill in.</p>
            </div>
            <ol className="rt-steps">
              {SHEETS.map((s, i) => <li key={s.t}><span>{String(i + 1).padStart(2, '0')}</span><div><strong>{s.t}</strong><p>{s.d}</p></div></li>)}
            </ol>
          </div>
        </div>
      </section>

      <section id="scoring" className="section bg-white rt-anchor">
        <div className="container rt-two-col">
          <div className="rt-card">
            <div className="rt-eyebrow">Default weights</div>
            <h2 className="mt-2 mb-6" style={{ fontSize: 'clamp(1.4rem, 2.4vw, 1.8rem)' }}>How each bid is scored</h2>
            <div className="rt-weights">
              {CRITERIA.map(c => (
                <div key={c.name} className="rt-weight">
                  <span><strong>{c.name}</strong>{c.auto && <em className="rt-pill rt-pill-info" style={{ marginLeft: '.5rem' }}>Auto</em>}<br /><small style={{ color: 'var(--gray)' }}>{c.how}</small></span>
                  <b>{c.weight}%</b>
                  <span className="rt-weight-bar"><i style={{ width: `${c.weight * 2.4}%` }} /></span>
                </div>
              ))}
            </div>
            <p className="rt-disclaimer">Weighted score = Σ (weight × score) ÷ 5 × 100. Change any weight in the workbook to suit the project.</p>
          </div>
          <div>
            <div className="label">The RFQ Sheet</div>
            <h2>Thirteen things every quote must state</h2>
            <p className="body mt-4">Ask for these in every RFQ and the quotes line up. It’s the fastest way to spot a low price that leaves out freight, testing or half the specification.</p>
            <ul className="rt-checklist-plain">
              {MUST_STATE.map(m => <li key={m}>{m}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section bg-off">
        <div className="container rt-narrow">
          <div className="label">FAQ</div>
          <h2 className="mb-6">Common questions</h2>
          <ResourceFaq items={FAQS} />
        </div>
      </section>

      <div className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <h2>Add a Canadian-made option to your bid list</h2>
            <p className="lead !text-white/[.6] !max-w-[560px]">CANDRON quotes Canadian-made switchgear, switchboards and transformers on exactly the basis this RFQ asks for, with lead times counted from approved drawings.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact?product=rfq-scorecard" className="btn btn-primary btn-lg">Send us your RFQ</Link>
              <Link href="/resources#toolkit" className="btn btn-outline btn-lg">More project tools →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
