import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroArt } from '@/components/LineArt'
import DgaCheck from '@/components/resources/DgaCheck'
import OilReadoutForm from '@/components/resources/OilReadoutForm'
import ResourceFaq from '@/components/resources/ResourceFaq'
import { DGA_REFS } from '@/lib/resources/dga'

export const metadata: Metadata = {
  title: 'Free Transformer Oil Test (DGA) Read-Out',
  description: 'Send your transformer oil test or dissolved gas analysis (DGA) report and a CANDRON engineer will email a plain-English read-out.',
  alternates: { canonical: '/resources/oil-test-readout' },
}

const STEPS = [
  { t: 'Attach the lab report', d: 'Any lab, any make of transformer. PDF, spreadsheet or a clear photo of the results page.' },
  { t: 'Add what you know', d: 'Rating, fluid, age and anything unusual: recent faults, alarms, heavy loading or earlier results.' },
  { t: 'An engineer reads it', d: `We look at the gases, the trend and the fluid quality results against ${DGA_REFS}.` },
  { t: 'You get a plain-English read-out', d: 'What the results suggest, how urgent it is, and what to do next: retest sooner, investigate, or carry on as normal.' },
]

const FAQS = [
  { q: 'Is it really free?', a: 'Yes. There is no charge and no obligation, for any make of transformer. We do it because owners who understand their oil tests make better decisions about maintenance and replacement, and some of them call us when they do.' },
  { q: 'What should the report include?', a: 'Dissolved gases (hydrogen, methane, ethane, ethylene, acetylene, carbon monoxide and carbon dioxide) at minimum. Moisture, dielectric breakdown, acidity, interfacial tension and furans help us say more. Earlier results let us look at the trend, which matters more than any single sample.' },
  { q: 'How accurate is the quick check on this page?', a: 'It applies the Duval Triangle 1 method for mineral oil, which classifies the type of fault the gases resemble. It cannot say whether there is a fault: that depends on the gas levels, how fast they are rising, the fluid and the transformer. That is what the engineer read-out adds.' },
  { q: 'Do you take samples too?', a: 'Yes. CANDRON’s field team takes oil samples, runs transformer field tests and commissions new units. Ask when you send the report.' },
]

export default function OilReadoutPage() {
  return (
    <>
      <div className="page-hero dt-hero">
        <div className="page-hero-bg dt-hero-bg" />
        <HeroArt kind="lq-pm3" figure="FIG. 01 · OIL SAMPLE" />
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / <span>Oil Test Read-Out</span></div>
          <div className="label label-white">Free Engineering Read-Out</div>
          <h1>Free Oil-Test<br /><em>(DGA) Read-Out</em></h1>
          <p className="lead mt-4">Got a transformer oil test back from the lab and not sure what it means? Send it to us. An engineer will email you a plain-English read-out: what the gases suggest, how urgent it is and what to do next.</p>
          <ul className="dt-hero-points">
            <li>Any make of transformer, any lab</li>
            <li>Free, no obligation</li>
            <li>Plus a Duval Triangle quick check you can run now</li>
          </ul>
          <div className="dt-hero-cta">
            <a href="#send" className="btn btn-primary">Send your oil test</a>
            <a href="#check" className="btn btn-outline">Quick check</a>
          </div>
        </div>
      </div>

      <section id="send" className="section bg-off rt-anchor">
        <div className="container rt-two-col">
          <div>
            <div className="label">How It Works</div>
            <h2>From lab report to a decision</h2>
            <ol className="rt-steps mt-6">
              {STEPS.map((s, i) => (
                <li key={s.t}><span>{String(i + 1).padStart(2, '0')}</span><div><strong>{s.t}</strong><p>{s.d}</p></div></li>
              ))}
            </ol>
          </div>
          <OilReadoutForm />
        </div>
      </section>

      <section id="check" className="section bg-white rt-anchor">
        <div className="container">
          <div className="rt-narrow mb-8">
            <div className="label">Quick Check</div>
            <h2>Duval Triangle in your browser</h2>
            <p className="body mt-4">Type the gas results from your report to see which fault type they resemble. It is a first look, not a diagnosis: the engineer read-out adds the trend, the levels and the fluid quality.</p>
          </div>
          <DgaCheck />
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
            <h2>Results pointing to a replacement?</h2>
            <p className="lead !text-white/[.6] !max-w-[560px]">CANDRON provides Canadian-made liquid-filled and dry-type transformers, built to match an existing pad and cable layout so the outage stays short.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact?product=oil-test-readout" className="btn btn-primary btn-lg">Talk to an engineer</Link>
              <Link href="/products/transformers/liquid-filled" className="btn btn-outline btn-lg">Liquid-filled range →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
