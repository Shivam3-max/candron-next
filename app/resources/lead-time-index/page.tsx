import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroArt } from '@/components/LineArt'
import RadarSubscribe from '@/components/resources/RadarSubscribe'
import ResourceFaq from '@/components/resources/ResourceFaq'
import { LATEST, PRESSURE_TEXT, groupOf, nameOf } from '@/lib/resources/lead-time-index'

export const metadata: Metadata = {
  title: `Canadian Electrical Equipment Lead-Time Index — ${LATEST.quarter}`,
  description: `Quarterly lead-time ranges for transformers, switchgear, switchboards and standby power equipment in Canada, ${LATEST.quarter}: weeks from approved drawings to shipment, what is driving them and how to plan around them.`,
  alternates: { canonical: '/resources/lead-time-index' },
}

const AXIS = 160
const GROUPS = ['Transformers', 'Switchgear & distribution', 'Critical & standby power'] as const

const FAQS = [
  { q: 'Where do these ranges come from?', a: 'They are CANDRON’s indicative ranges for the Canadian market, drawn from the quotes and supplier conversations we have while providing Canadian-made equipment. They are not a survey and they are not a quote: a specific rating, option or manufacturer can sit outside the range.' },
  { q: 'What does the lead time measure?', a: 'Weeks from approved submittal drawings to shipment from the factory. Add submittal preparation and review before it, and delivery, installation and commissioning after it, to get to energization.' },
  { q: 'How often is it updated?', a: `Every quarter. This is the first issue (${LATEST.quarter}), so it sets the baseline; later issues will show which ranges moved and why.` },
  { q: 'Can I use it in a schedule or report?', a: 'Yes, with a credit to CANDRON. For a schedule you will commit to, replace the ranges with real quotes as soon as you have them — the Long-Lead Equipment Planner makes that easy.' },
]

export default function LeadTimeIndexPage() {
  const i = LATEST
  return (
    <>
      <div className="page-hero dt-hero">
        <div className="page-hero-bg dt-hero-bg" />
        <HeroArt kind="cap-proc" views={['gantt', 'flow', 'iso']} figure={`FIG. 01 · ${i.quarter}`} />
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / <span>Lead-Time Index</span></div>
          <div className="label label-white">Quarterly · {i.quarter}</div>
          <h1>Canadian Electrical Equipment<br /><em>Lead-Time Index</em></h1>
          <p className="lead mt-4">How long transformers, switchgear and standby power equipment are taking in Canada this quarter, in weeks from approved drawings to shipment — and what to do about it.</p>
          <div className="dt-hero-cta">
            <a href="#index" className="btn btn-primary">Read the {i.quarter} index</a>
            <Link href="/resources/lead-time-planner" className="btn btn-outline">Plan your order dates</Link>
          </div>
        </div>
      </div>

      <section id="index" className="section bg-off rt-anchor">
        <div className="container">
          <div className="rr-meta"><span>Issue: {i.quarter}</span><span>Published {i.published}</span><span>{i.rows.length} equipment types</span></div>
          <div className="lti-head">
            <h2>{i.headline}</h2>
            <p className="body">{i.summary}</p>
          </div>
          <div className="rt-card lti-card">
            <div className="lti-axis" aria-hidden="true">
              <span />
              <div>{[0, 26, 52, 78, 104, 130, 156].map(w => <i key={w} style={{ left: `${(w / AXIS) * 100}%` }}>{w}</i>)}</div>
            </div>
            {GROUPS.map(g => (
              <div key={g} className="lti-group">
                <div className="rt-eyebrow">{g}</div>
                {i.rows.filter(r => groupOf(r.id) === g).map(r => (
                  <div key={r.id} className="lti-row">
                    <div className="lti-name"><strong>{nameOf(r.id)}</strong><small>{r.comment}</small></div>
                    <div className="lti-track" role="img" aria-label={`${r.low} to ${r.high} weeks`}>
                      <span className={`lti-bar lti-${r.pressure}`} style={{ left: `${(r.low / AXIS) * 100}%`, width: `${((r.high - r.low) / AXIS) * 100}%` }} />
                    </div>
                    <div className="lti-wk"><b>{r.low}–{r.high}</b> wk<span className={`lti-tag lti-${r.pressure}`}>{PRESSURE_TEXT[r.pressure]}</span></div>
                  </div>
                ))}
              </div>
            ))}
            <div className="rt-legend lti-legend">
              <span><i className="lti-high" />Long: plan first</span>
              <span><i className="lti-elevated" />Elevated: order early</span>
              <span><i className="lti-steady" />Manageable inside a normal schedule</span>
            </div>
          </div>
          <p className="rt-disclaimer">Indicative ranges in weeks from approved drawings to shipment, for the Canadian market. Not a quote; a specific rating, option or manufacturer can fall outside the range. Confirm with current quotes before committing a schedule.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container rt-two-col">
          <div>
            <div className="label">What’s Driving It</div>
            <h2>Why the long items are long</h2>
            <div className="lti-list mt-6">
              {i.drivers.map(d => <div key={d.t}><strong>{d.t}</strong><p>{d.d}</p></div>)}
            </div>
          </div>
          <div>
            <div className="label">What To Do</div>
            <h2>Four ways to beat the lead time</h2>
            <ol className="rt-steps mt-6">
              {i.tips.map((t, n) => <li key={t.t}><span>{String(n + 1).padStart(2, '0')}</span><div><strong>{t.t}</strong><p>{t.d}</p></div></li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="section bg-off">
        <div className="container rr-subscribe">
          <div>
            <div className="label">Every Quarter</div>
            <h2>Get the next issue by email</h2>
            <p className="body mt-4">Four short emails a year: the updated ranges, what moved and why. No sales follow-up unless you ask for it.</p>
          </div>
          <RadarSubscribe
            request="Please send me the Canadian Electrical Equipment Lead-Time Index each quarter."
            button="Email me each quarter"
            done="You’re on the list. The next issue arrives in January."
            note="Four emails a year. Unsubscribe any time by replying “unsubscribe”."
          />
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
            <h2>Need a real date for your job?</h2>
            <p className="lead !text-white/[.6] !max-w-[560px]">Send your equipment list. CANDRON provides Canadian-made switchgear, switchboards and transformers and will reply with current lead times the same business day.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact?product=lead-time-index" className="btn btn-primary btn-lg">Ask for current lead times</Link>
              <Link href="/resources/lead-time-planner" className="btn btn-outline btn-lg">Open the planner →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
