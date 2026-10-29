import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroArt } from '@/components/LineArt'
import ResourceFaq from '@/components/resources/ResourceFaq'
import { ChecklistSheet, PunchList } from '@/components/resources/Checklist'
import { PACK_PDF, PACK_REFS, SHEETS } from '@/lib/resources/fat-pack'

export const metadata: Metadata = {
  title: 'FAT & Commissioning Checklists (PDF)',
  description: 'Free checklists for electrical contractors and commissioning leads: factory acceptance test agendas for MV switchgear and transformers.',
  alternates: { canonical: '/resources/fat-commissioning-pack' },
}

const FAQS = [
  { q: 'Who is this pack for?', a: 'Electrical project managers, commissioning leads, owners’ engineers and site superintendents who witness factory tests or energize new medium-voltage gear and transformers.' },
  { q: 'Does it replace the manufacturer’s test procedure?', a: 'No. It is a witness and verification list to use alongside the manufacturer’s procedure, the project specification and the standards that apply. Always follow the manufacturer’s instructions and the requirements of the authority having jurisdiction.' },
  { q: 'Which standards does it follow?', a: `The checks reflect common practice under ${PACK_REFS}. The pack names standards but does not reproduce them; check the current edition for test levels and limits.` },
  { q: 'Can I edit it?', a: 'Yes. Print it, mark it up, or copy the items into your own commissioning forms. It is free to use on any project, with or without CANDRON equipment.' },
]

const SHORT: Record<string, string> = {
  'fat-switchgear': 'FAT: switchgear',
  'fat-transformer': 'FAT: transformers',
  'pre-switchgear': 'Pre-energization: switchgear',
  'pre-transformer': 'Pre-energization: transformers',
}

const ITEM_COUNT = SHEETS.reduce((n, s) => n + s.groups.reduce((m, g) => m + g.items.length, 0), 0)

export default function FatPackPage() {
  return (
    <>
      <div className="page-hero dt-hero">
        <div className="page-hero-bg dt-hero-bg" />
        <HeroArt kind="cap-test" figure="FIG. 01 · TEST BAY" />
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / <span>FAT & Commissioning Pack</span></div>
          <div className="label label-white">Free Download</div>
          <h1>FAT & Commissioning<br /><em>Checklist Pack</em></h1>
          <p className="lead mt-4">The checks we look for when we witness factory tests and commission equipment, turned into five sheets you can take to a factory test or a first energization: witness agendas, pre-energization checklists and a punch list with sign-off.</p>
          <ul className="dt-hero-points">
            <li>{SHEETS.length} checklists, {ITEM_COUNT} checks, plus a punch list</li>
            <li>MV switchgear and transformers, dry-type and liquid-filled</li>
            <li>Free PDF; no sign-up</li>
          </ul>
          <div className="dt-hero-cta">
            <a href={PACK_PDF} className="btn btn-primary" download>Download the PDF</a>
            <a href="#sheets" className="btn btn-outline">Read online</a>
          </div>
        </div>
      </div>

      <section id="sheets" className="section bg-off rt-anchor">
        <div className="container rt-narrow" style={{ display: 'grid', gap: '2.4rem' }}>
          <div className="rt-download rt-no-print">
            <span className="rt-download-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h9l4 4v16H6z" /><path d="M14 2v5h5M12 11v6M9 14l3 3 3-3" /></svg></span>
            <div><strong>FAT & Commissioning Pack (PDF)</strong><span>Five printable sheets with fields for project, tag, date and witness.</span></div>
            <a href={PACK_PDF} className="btn btn-primary" download>Download</a>
          </div>
          <nav className="rt-toc" aria-label="Sheets in this pack">
            {SHEETS.map(s => <a key={s.id} href={`#${s.id}`}>{s.code} · {SHORT[s.id] ?? s.title}</a>)}
            <a href="#punch-list">E · Punch list</a>
          </nav>
          {SHEETS.map(s => <ChecklistSheet key={s.id} s={s} />)}
          <PunchList rows={6} />
          <p className="rt-disclaimer">General guidance only. Follow the manufacturer’s instructions, the project specification and the requirements of the authority having jurisdiction. References: {PACK_REFS}.</p>
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
            <h2>Witness a factory test with us</h2>
            <p className="lead !text-white/[.6] !max-w-[560px]">CANDRON provides Canadian-made switchgear, switchboards and transformers and attends the factory acceptance test on every order. You’re welcome to witness it with us, or ask our field team to commission it on site.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact?product=fat-commissioning-pack" className="btn btn-primary btn-lg">Talk to our test team</Link>
              <Link href="/resources#toolkit" className="btn btn-outline btn-lg">More project tools →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
