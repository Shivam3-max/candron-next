import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroArt } from '@/components/LineArt'
import GeneratorPlanner from '@/components/resources/GeneratorPlannerLoader'
import ResourceFaq from '@/components/resources/ResourceFaq'
import { GEN_REFS, LOGBOOK_PDF } from '@/lib/resources/generator-tests'

export const metadata: Metadata = {
  title: 'CSA C282 Generator Test Planner & Logbook',
  description: 'Free planner for facility managers: build a 12-month CSA C282 inspection and load-test calendar for an emergency generator.',
  alternates: { canonical: '/resources/generator-test-planner' },
}

const STEPS = [
  { t: 'Describe the set', d: 'Nameplate kW, building type and the load the set actually carries when you transfer the building to it.' },
  { t: 'Check the load', d: 'The planner compares building load with the common 30% of nameplate benchmark and tells you whether monthly tests will load the engine properly.' },
  { t: 'Pick your days', d: 'Choose the weekly inspection day, the monthly load-test day and the month for the annual contractor service.' },
  { t: 'Take it with you', d: 'Add the whole programme to Outlook or Google Calendar with one .ics file, download a CSV, or print the logbook with dates filled in.' },
]

const FAQS = [
  { q: 'Does this replace CSA C282?', a: `No. It lays out a typical inspection and test programme aligned with ${GEN_REFS}, but it does not reproduce the standard. Intervals, test loads and durations differ between editions and occupancies, so confirm them with the current edition and your authority having jurisdiction.` },
  { q: 'Why does 30% load matter?', a: 'A diesel engine run lightly never reaches full temperature. Unburnt fuel and carbon collect in the exhaust and injectors (wet-stacking), and the set may not carry full load when it is needed. Testing at a meaningful load, or with a load bank, prevents that.' },
  { q: 'What if my building load is too small?', a: 'Use a portable load bank for the annual test, or install a permanent outdoor load bank that can top up the load during monthly runs. Either way the engine sees real load and the test proves the set.' },
  { q: 'Is my data saved?', a: 'Your generator details stay in this browser only so you can come back to them. Nothing is sent to CANDRON. Use Start over to clear them.' },
  { q: 'Can I get a blank logbook?', a: 'Yes. Download the PDF logbook: weekly inspection log, monthly load test log and a service and defect record, ready to print and keep in the generator room.' },
]

export default function GeneratorTestPlannerPage() {
  return (
    <>
      <div className="page-hero dt-hero">
        <div className="page-hero-bg dt-hero-bg" />
        <HeroArt kind="cap-test" figure="FIG. 01 · LOAD TEST" />
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / <span>Generator Test Planner</span></div>
          <div className="label label-white">Free Facility Tool</div>
          <h1>CSA C282 Generator<br /><em>Test Planner & Logbook</em></h1>
          <p className="lead mt-4">Turn your emergency generator’s inspection and load-test programme into a 12-month calendar, check whether building load is enough to test it properly, and print the logbook. No sign-up.</p>
          <div className="dt-hero-cta">
            <a href="#planner" className="btn btn-primary">Open the planner</a>
            <a href={LOGBOOK_PDF} className="btn btn-outline" download>Blank logbook (PDF)</a>
          </div>
        </div>
      </div>

      <section id="planner" className="section bg-off rt-anchor">
        <div className="container">
          <GeneratorPlanner />
        </div>
      </section>

      <section id="how" className="section bg-white rt-anchor">
        <div className="container rt-two-col">
          <div>
            <div className="label">How It Works</div>
            <h2>A test programme the inspector can follow</h2>
            <p className="body mt-4">Most generator problems show up during the first real outage, because the set was only ever exercised lightly or the tests were never written down. A fixed calendar and a filled-in logbook fix both.</p>
            <div className="rt-download rt-no-print mt-6">
              <span className="rt-download-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h9l4 4v16H6z" /><path d="M14 2v5h5M12 11v6M9 14l3 3 3-3" /></svg></span>
              <div><strong>Generator Test Logbook (PDF)</strong><span>Weekly, monthly and service logs for a full year.</span></div>
              <a href={LOGBOOK_PDF} className="btn btn-primary" download>Download</a>
            </div>
          </div>
          <ol className="rt-steps">
            {STEPS.map((s, i) => (
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
            <h2>Need a load bank test or a load bank?</h2>
            <p className="lead !text-white/[.6] !max-w-[560px]">CANDRON provides Canadian-made portable and permanent load banks, and our field team runs generator load tests across Ontario and beyond.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact?product=generator-test-planner" className="btn btn-primary btn-lg">Book a load test</Link>
              <Link href="/products/load-banks" className="btn btn-outline btn-lg">See load banks →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
