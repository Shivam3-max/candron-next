import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroArt } from '@/components/LineArt'
import ResourceFaq from '@/components/resources/ResourceFaq'
import { SPEC_SECTIONS } from '@/lib/resources/div26'

export const metadata: Metadata = {
  title: 'Division 26 Guide Specifications (Word)',
  description: 'Free, editable Word guide specifications in three-part format for Canadian projects: pad-mounted transformers (26 12 19), metal-clad switchgear (26 13 13).',
  alternates: { canonical: '/resources/division-26-specs' },
}

const FAQS = [
  { q: 'Are these specifications vendor-neutral?', a: 'Yes. They describe performance, ratings, construction and tests, not one manufacturer’s product. The acceptable-manufacturers clause is left blank for you to complete, and the footer credit can be deleted.' },
  { q: 'Which standards do they follow?', a: 'Canadian standards first: CSA product standards, CSA C802 efficiency limits, the Canadian Electrical Code and Measurement Canada for metering, with IEEE, NEMA and UL references where they apply. Confirm the current edition of each before issue.' },
  { q: 'What format are they in?', a: 'Word (.docx), in the usual three-part format: General, Products and Execution. Options and values to fill in are in [brackets], and specifier notes are shaded so they are easy to find and delete.' },
  { q: 'Can I ask for a section that is not here?', a: 'Yes. Tell us what you are specifying — e-houses, unit substations, load banks, MV dry-type transformers or anything else we provide — and we will send a draft section.' },
  { q: 'Is there a catch?', a: 'No. They are free to use on any project, including projects that buy from other suppliers. If you would like a technical review of a specification you have written, we are happy to do that too.' },
]

export default function Division26Page() {
  return (
    <>
      <div className="page-hero dt-hero">
        <div className="page-hero-bg dt-hero-bg" />
        <HeroArt kind="cap-proc" views={['flow', 'gantt', 'iso']} figure="FIG. 01 · SPECIFICATION" />
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / <span>Division 26 Specifications</span></div>
          <div className="label label-white">Free for Consulting Engineers</div>
          <h1>Division 26<br /><em>Guide Specifications</em></h1>
          <p className="lead mt-4">Editable Word sections for transformers, switchgear and switchboards, written for Canadian projects. Three-part format, CSA standards first, options in brackets and specifier notes you can delete.</p>
          <ul className="dt-hero-points">
            <li>{SPEC_SECTIONS.length} sections, vendor-neutral</li>
            <li>CSA, Canadian Electrical Code and Measurement Canada references</li>
            <li>Word files; no sign-up</li>
          </ul>
          <div className="dt-hero-cta">
            <a href="#sections" className="btn btn-primary">Download sections</a>
            <Link href="/contact?product=division-26-specs" className="btn btn-outline">Request another section</Link>
          </div>
        </div>
      </div>

      <section id="sections" className="section bg-off rt-anchor">
        <div className="container">
          <div className="d26-grid">
            {SPEC_SECTIONS.map(s => (
              <article key={s.number} className="rt-card d26-card">
                <div className="d26-num">Section {s.number}</div>
                <h2>{s.title}</h2>
                <p className="d26-covers">{s.covers}</p>
                <div className="d26-row"><b>References</b><span>{s.standards.join(' · ')}</span></div>
                <div className="d26-row"><b>Options inside</b><span>{s.options.join(' · ')}</span></div>
                <div className="d26-actions">
                  <a href={s.file} className="btn btn-primary" download>Download .docx</a>
                  <Link href={s.product.href} className="rt-text-btn">{s.product.label} →</Link>
                </div>
              </article>
            ))}
          </div>
          <p className="rt-disclaimer">Guide specifications for editing by the engineer of record. They are not a substitute for engineering judgment. Confirm the current edition of every referenced standard and the requirements of the authority having jurisdiction and the local utility.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container rt-two-col">
          <div>
            <div className="label">How To Use Them</div>
            <h2>Edit, delete, issue</h2>
            <p className="body mt-4">Each section is a starting point you finish in minutes, not a template that fights your office standard. Paste it into your master, or use it as a checklist against your own section.</p>
          </div>
          <ol className="rt-steps">
            {[
              { t: 'Pick the options', d: 'Every choice is in [brackets]: ratings, enclosure types, fluids, protection functions. Keep one, delete the rest.' },
              { t: 'Read the specifier notes', d: 'Shaded notes explain the trade-offs, such as natural ester fluid in the cold or arc-resistant room heights. Delete them before issue.' },
              { t: 'Fill the blanks', d: 'Acceptable manufacturers, warranty periods, training hours and notice for witnessed tests.' },
              { t: 'Check the editions', d: 'Standards are named, not reproduced. Confirm the edition your project and authority having jurisdiction use.' },
            ].map((s, i) => (
              <li key={s.t}><span>{String(i + 1).padStart(2, '0')}</span><div><strong>{s.t}</strong><p>{s.d}</p></div></li>
            ))}
          </ol>
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
            <h2>Want a second pair of eyes on a spec?</h2>
            <p className="lead !text-white/[.6] !max-w-[560px]">CANDRON’s engineers review switchgear and transformer specifications for consultants, and provide Canadian-made equipment that meets them.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact?product=division-26-specs" className="btn btn-primary btn-lg">Ask for a spec review</Link>
              <Link href="/resources#toolkit" className="btn btn-outline btn-lg">More project tools →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
