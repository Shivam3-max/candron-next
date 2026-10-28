import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroArt } from '@/components/LineArt'
import RadarSubscribe from '@/components/resources/RadarSubscribe'
import { itemCount, latestIssue } from '@/lib/resources/radar'

const issue = latestIssue()

export const metadata: Metadata = {
  title: `Canada Power Projects Radar — ${issue.month}`,
  description: 'A free monthly digest of newly announced Canadian data centre, battery storage, renewable, transmission, mining and transit electrification projects with major electrical scope, with links to every source.',
  alternates: { canonical: '/resources/projects-radar' },
}

export default function ProjectsRadarPage() {
  return (
    <>
      <div className="page-hero dt-hero">
        <div className="page-hero-bg dt-hero-bg" />
        <HeroArt kind="plant" figure="FIG. 01 · GRID" />
        <div className="container page-hero-content">
          <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/resources">Resources</Link> / <span>Projects Radar</span></div>
          <div className="label label-white">Monthly · Free</div>
          <h1>Canada Power<br /><em>Projects Radar</em></h1>
          <p className="lead mt-4">Newly announced Canadian projects with serious electrical scope (data centres, storage, renewables, transmission, mining and transit), gathered once a month so you see the work before it reaches the tender boards.</p>
          <div className="rr-meta">
            <span>Issue {String(issue.number).padStart(2, '0')} · {issue.month}</span>
            <span>{itemCount(issue)} projects</span>
            <span>Compiled {issue.compiled}</span>
          </div>
          <div className="dt-hero-cta">
            <a href="#issue" className="btn btn-primary">Read this issue</a>
            <a href="#subscribe" className="btn btn-outline">Get it by email</a>
          </div>
        </div>
      </div>

      <section id="issue" className="section bg-off rt-anchor">
        <div className="container">
          <div className="rt-card" style={{ marginBottom: '2.4rem' }}>
            <div className="rt-eyebrow">From the editor</div>
            <p className="body mt-2" style={{ margin: 0 }}>{issue.editorial}</p>
          </div>
          {issue.sections.map(sec => (
            <div key={sec.title} className="rr-section">
              <div>
                <div className="label">{sec.title}</div>
                <p className="body" style={{ margin: 0 }}>{sec.intro}</p>
              </div>
              <div className="rr-items">
                {sec.items.map(it => (
                  <article key={it.title} className="rr-item">
                    <div>
                      <h3>{it.isNew && <span className="rr-tag new">New</span>}<span className="rr-tag">{it.sector}</span>{it.title}</h3>
                      <p>{it.summary}</p>
                      <p className="rr-scope"><b>Electrical scope</b>{it.scope}</p>
                      <p className="rr-source" style={{ marginTop: '.6rem' }}>Source: <a href={it.source.url} target="_blank" rel="noopener noreferrer">{it.source.label} ↗</a></p>
                    </div>
                    <dl className="rr-facts">
                      <div><dt>Where</dt><dd>{it.where}</dd></div>
                      <div><dt>Owner</dt><dd>{it.owner}</dd></div>
                      <div><dt>Size</dt><dd>{it.size}</dd></div>
                      <div><dt>Stage</dt><dd>{it.stage}</dd></div>
                      <div><dt>Timing</dt><dd>{it.timing}</dd></div>
                    </dl>
                  </article>
                ))}
              </div>
            </div>
          ))}
          <p className="rt-disclaimer" style={{ marginTop: '2rem' }}>Compiled from public announcements, regulator filings and news reports, linked on each item. Project details change; always confirm the current status with the owner before planning around it. CANDRON is not involved in these projects unless stated.</p>
        </div>
      </section>

      <section id="subscribe" className="section bg-white rt-anchor">
        <div className="container rr-subscribe">
          <div>
            <div className="label">Get the Next Issue</div>
            <h2>One email a month, no sales pitch</h2>
            <p className="body mt-4">Each issue arrives in the first week of the month with every new project and a link to its source. Know a project we missed? Reply to any issue and tell us.</p>
          </div>
          <div className="rt-card"><RadarSubscribe /></div>
        </div>
      </section>

      <div className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <h2>Bidding one of these projects?</h2>
            <p className="lead !text-white/[.6] !max-w-[560px]">CANDRON designs, builds and tests switchgear, switchboards and transformers in Toronto. Send us the electrical package and we’ll price it with a lead time you can schedule around.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact?product=projects-radar" className="btn btn-primary btn-lg">Price an electrical package</Link>
              <Link href="/resources/lead-time-planner" className="btn btn-outline btn-lg">Plan your order dates →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
