import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroArt } from '@/components/LineArt'
import LeadTimePlanner from '@/components/resources/LeadTimePlannerLoader'
import ResourceFaq from '@/components/resources/ResourceFaq'

export const metadata: Metadata = {
  title: 'Long-Lead Electrical Equipment Planner',
  description: 'Free planner: enter your energization date and equipment list to get order-by dates for transformers, switchgear and switchboards. No sign-up.',
  alternates: { canonical: '/resources/lead-time-planner' },
}

const STEPS = [
  { t: 'Set the energization date', d: 'The date the owner expects power on. Everything is worked back from here.' },
  { t: 'List the long-lead gear', d: 'Pick each piece of equipment. Indicative lead-time ranges fill in; replace them with your own quotes when you have them.' },
  { t: 'Check the project phases', d: 'Submittals, approval, delivery, installation, inspection and commissioning all take time. Adjust the weeks to match your job.' },
  { t: 'Read the order-by dates', d: 'Each item gets a safe order date (using the long end of its lead time), a best-case date and a status: on track, at risk or late.' },
]

const FAQS = [
  { q: 'Where do the lead times come from?', a: 'They are indicative ranges for the Canadian market in late 2026, based on typical manufacturing times counted from approved drawings. Lead times change month to month and differ by rating and options, so treat them as a starting point and replace them with real quotes.' },
  { q: 'What does “at risk” mean?', a: 'Today is already past the safe order date (which uses the long end of the lead time), but the job can still make the date if the equipment comes in at the short end. “Late” means even the best case misses the energization date.' },
  { q: 'Why is manufacturing counted after approval?', a: 'Most manufacturers start the lead-time clock when drawings are approved, not when the purchase order is placed. Slow submittal reviews are one of the most common reasons equipment arrives late.' },
  { q: 'Is my data saved?', a: 'Your project stays in this browser only so you can come back to it. Nothing is sent to CANDRON. Use Start over to clear it.' },
  { q: 'Can I share the schedule?', a: 'Yes. Download the CSV for your scheduling software, print it or save it as a PDF, or copy a plain-text summary into an email.' },
]

export default function LeadTimePlannerPage() {
  return (
    <>
      <div className="page-hero dt-hero">
        <div className="page-hero-bg dt-hero-bg" />
        <HeroArt kind="cap-proc" views={['gantt', 'flow', 'iso']} figure="FIG. 01 · SCHEDULE" />
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / <span>Long-Lead Equipment Planner</span></div>
          <div className="label label-white">Free Project Tool</div>
          <h1>Long-Lead Equipment<br /><em>Planner</em></h1>
          <p className="lead mt-4">Work back from your energization date to an order-by date for every piece of long-lead electrical gear, with submittals, approvals, delivery and commissioning built in. No sign-up.</p>
          <div className="dt-hero-cta">
            <a href="#planner" className="btn btn-primary">Open the planner</a>
            <a href="#how" className="btn btn-outline">How it works</a>
          </div>
        </div>
      </div>

      <section id="planner" className="section bg-off rt-anchor">
        <div className="container">
          <LeadTimePlanner />
        </div>
      </section>

      <section id="how" className="section bg-white rt-anchor">
        <div className="container rt-two-col">
          <div>
            <div className="label">How It Works</div>
            <h2>Four steps to a defensible procurement schedule</h2>
            <p className="body mt-4">Equipment lead time is the single biggest schedule risk on most electrical jobs, and the clock usually starts at drawing approval, not at the purchase order. The planner adds the time on both sides of manufacturing so the order-by date is honest.</p>
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
            <h2>Need a firm date, not a range?</h2>
            <p className="lead !text-white/[.6] !max-w-[560px]">Send your equipment list and energization date. CANDRON provides Canadian-made switchgear, switchboards and transformers and will reply with current lead times the same business day.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact?product=lead-time-planner" className="btn btn-primary btn-lg">Ask for build slots</Link>
              <Link href="/resources#toolkit" className="btn btn-outline btn-lg">More project tools →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
