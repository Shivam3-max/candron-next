import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroArt } from '@/components/LineArt'
import ResourceFaq from '@/components/resources/ResourceFaq'
import { ChecklistSheet } from '@/components/resources/Checklist'
import { COLD_PDF, COLD_REFS, COLD_SHEETS } from '@/lib/resources/cold-climate'

export const metadata: Metadata = {
  title: 'Cold-Climate & Arctic Readiness Checklist for Electrical Equipment',
  description: 'Free checklist for northern, remote and Arctic projects: how to specify, factory-test, ship, install, energize and maintain switchgear, transformers and e-houses down to −50 °C. Download the PDF.',
  alternates: { canonical: '/resources/cold-climate-checklist' },
}

const FAQS = [
  { q: 'Who is this checklist for?', a: 'Consulting engineers, owners and contractors on mines, remote communities, northern utilities, oil and gas sites and any project where winter temperatures fall to −30 °C or below.' },
  { q: 'Which equipment does it cover?', a: 'Medium- and low-voltage switchgear and switchboards, liquid-filled and dry-type transformers, and walk-in power houses (e-houses). Most items apply to control panels and generator sets too.' },
  { q: 'Does it replace the manufacturer’s instructions?', a: `No. Use it alongside the manufacturer’s instructions, the project specification and the requirements of the authority having jurisdiction. It refers to ${COLD_REFS} without reproducing them.` },
  { q: 'What is the most common cold-climate failure?', a: 'Moisture. Equipment that sits de-energized and unheated in the cold collects condensation, then fails insulation tests or flashes over when energized. Heaters on from delivery day, and an insulation check before closing in, prevent most of it.' },
]

const SHORT: Record<string, string> = {
  'cold-spec': 'Specify',
  'cold-factory': 'Factory & shipping',
  'cold-site': 'Storage & install',
  'cold-energize': 'Energization',
  'cold-winter': 'Winter O&M',
}

const ITEM_COUNT = COLD_SHEETS.reduce((n, s) => n + s.groups.reduce((m, g) => m + g.items.length, 0), 0)

export default function ColdClimatePage() {
  return (
    <>
      <div className="page-hero dt-hero">
        <div className="page-hero-bg dt-hero-bg" />
        <HeroArt kind="lq-pm3" figure="FIG. 01 · −45 °C SITE" />
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / <span>Cold-Climate Checklist</span></div>
          <div className="label label-white">Free Download</div>
          <h1>Cold-Climate & Arctic<br /><em>Readiness Checklist</em></h1>
          <p className="lead mt-4">What to specify, test, ship, install and maintain so switchgear, transformers and e-houses work at −45 °C — from the first specification to the tenth winter.</p>
          <ul className="dt-hero-points">
            <li>{COLD_SHEETS.length} sheets, {ITEM_COUNT} checks</li>
            <li>Switchgear, transformers and e-houses</li>
            <li>Free PDF; no sign-up</li>
          </ul>
          <div className="dt-hero-cta">
            <a href={COLD_PDF} className="btn btn-primary" download>Download the PDF</a>
            <a href="#sheets" className="btn btn-outline">Read online</a>
          </div>
        </div>
      </div>

      <section id="sheets" className="section bg-off rt-anchor">
        <div className="container rt-narrow" style={{ display: 'grid', gap: '2.4rem' }}>
          <div className="rt-download rt-no-print">
            <span className="rt-download-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h9l4 4v16H6z" /><path d="M14 2v5h5M12 11v6M9 14l3 3 3-3" /></svg></span>
            <div><strong>Cold-Climate Checklist (PDF)</strong><span>Five printable sheets with fields for project, tag, date and witness.</span></div>
            <a href={COLD_PDF} className="btn btn-primary" download>Download</a>
          </div>
          <nav className="rt-toc" aria-label="Sheets in this checklist">
            {COLD_SHEETS.map(s => <a key={s.id} href={`#${s.id}`}>{s.code} · {SHORT[s.id] ?? s.title}</a>)}
          </nav>
          {COLD_SHEETS.map(s => <ChecklistSheet key={s.id} s={s} />)}
          <p className="rt-disclaimer">General guidance only. Follow the manufacturer’s instructions, the project specification and the requirements of the authority having jurisdiction. References: {COLD_REFS}.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container rt-narrow">
          <div className="label">FAQ</div>
          <h2 className="mb-6">Common questions</h2>
          <ResourceFaq items={FAQS} />
        </div>
      </section>

      <div className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <h2>Equipment for a northern site?</h2>
            <p className="lead !text-white/[.6] !max-w-[560px]">CANDRON provides Canadian-made switchgear and transformers already proven in Arctic mining service, specified and tested for the cold before they ship.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact?product=cold-climate-checklist" className="btn btn-primary btn-lg">Talk to an engineer</Link>
              <Link href="/resources#toolkit" className="btn btn-outline btn-lg">More project tools →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
