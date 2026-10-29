import Link from 'next/link'
import { HeroArt } from '@/components/LineArt'
import Finder from '@/components/range/Finder'
import CompareTable from '@/components/range/CompareTable'
import MobileCollapse from '@/components/range/MobileCollapse'
import JsonLd from '@/components/JsonLd'
import RelatedArticles from '@/components/blog/RelatedArticles'
import { productHref, productsIn, type RangeDef } from '@/lib/ranges/core'
import { SITE, breadcrumbLd, faqLd, pageMeta } from '@/lib/seo'
import { PHONE } from '@/lib/inventory'

export function hubMetadata(r: RangeDef) {
  return pageMeta({ title: r.hub.meta.title, description: r.hub.meta.description, path: r.hubHref })
}

const NUMBER = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six']

/** Range landing page: what it is, a need-based finder, every family and product, a comparison, basics and FAQ. */
export default function HubPage({ r }: { r: RangeDef }) {
  const h = r.hub
  const finderItems = r.products.map(p => ({ href: productHref(r, p), short: p.short, range: p.range, does: p.does, needs: p.needs, family: p.family }))
  return (
    <>
      <JsonLd data={[
        breadcrumbLd([...h.crumbs.map(c => ({ name: c.label, href: c.href })), { name: r.name, href: r.hubHref }]),
        { '@context': 'https://schema.org', '@type': 'ItemList', name: h.meta.title, itemListElement: r.products.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: `${SITE}${productHref(r, p)}` })) },
        ...(h.faqs.length ? [faqLd(h.faqs)] : []),
      ]} />
      <div className="page-hero dt-hero">
        <div className="page-hero-bg dt-hero-bg" />
        <HeroArt kind={h.art.kind} views={h.art.views} figure="FIG. 01 · 3D" />
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            {h.crumbs.map(c => <span key={c.href}> / <Link href={c.href}>{c.label}</Link></span>)}
            {' '}/ <span>{r.name}</span>
          </div>
          <div className="label label-white">{h.label}</div>
          <h1>{h.h1[0]}<br /><em>{h.h1[1]}</em></h1>
          <p className="lead mt-4">{h.lead}</p>
          <div className="dt-hero-cta">
            <a href="#finder" className="btn btn-primary">Help me choose</a>
            <a href="#range" className="btn btn-outline">Browse the range</a>
          </div>
        </div>
      </div>

      <div className="dt-stats">
        <div className="container">
          <ul>{h.stats.map(s => <li key={s.label}><strong>{s.value}</strong><span>{s.label}</span></li>)}</ul>
        </div>
      </div>

      <section className="section bg-white">
        <div className="container">
          <div className="label">{h.why.label}</div>
          <h2 className="mb-8">{h.why.title}</h2>
          <div className="dt-why">
            {h.why.items.map((w, i) => (
              <div key={w.t} className="dt-why-card">
                <span>0{i + 1}</span>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {h.spotlight && (
        <section className="section bg-off dt-spot" aria-labelledby="dt-spot-title">
          <div className="container">
            <div className="dt-spot-grid">
              <div className="dt-spot-head">
                <div className="label">{h.spotlight.label}</div>
                <h2 id="dt-spot-title">{h.spotlight.title}</h2>
                <p>{h.spotlight.intro}</p>
                <p className="dt-spot-outcome">{h.spotlight.outcome}</p>
              </div>
              <ul className="dt-spot-list">
                {h.spotlight.points.map(pt => (
                  <li key={pt.t}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="#E8EEFF" /><path d="M5.8 10.2l2.8 2.8 5.6-6" stroke="var(--blue)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <div><strong>{pt.t}</strong><span>{pt.d}</span></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section id="finder" className={`section ${h.spotlight ? 'bg-white' : 'bg-off'} dt-anchor`}>
        <div className="container">
          <div className="dt-finder-head">
            <div>
              <div className="label">Product Finder</div>
              <h2>What do you need to do?</h2>
            </div>
            <p>{h.finderIntro} Still unsure? Call <a href={PHONE.href}>{PHONE.label}</a>.</p>
          </div>
          <Finder needs={r.needs} items={finderItems} noun={r.noun} />
        </div>
      </section>

      <section id="range" className="section bg-white dt-anchor">
        <div className="container">
          <div className="label">The Range</div>
          <h2 className="mb-8">{NUMBER[r.families.length] ?? r.families.length} {r.families.length === 1 ? 'family' : 'families'}, {r.products.length} products</h2>
          <div className="dt-family-list">
            {r.families.map((f, i) => (
              <div key={f.id} className="dt-family">
                <div className="dt-family-head">
                  <span className="dt-family-n">0{i + 1}</span>
                  <div>
                    <h3><Link href={f.href}>{f.name}</Link></h3>
                    <p>{f.tagline}</p>
                  </div>
                  <span className="dt-family-range">{f.range}</span>
                </div>
                <ul className="dt-family-items">
                  {productsIn(r, f.id).map(p => (
                    <li key={p.slug}>
                      <Link href={productHref(r, p)}>
                        <strong>{p.short}</strong>
                        <small>{p.range}</small>
                        <span>{p.does}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={f.href} className="dt-family-all">All {f.short.toLowerCase()} products →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-off">
        <div className="container">
          <div className="label">Compare</div>
          <h2 className="mb-8">The whole range, side by side</h2>
          <MobileCollapse label={`Compare all ${r.products.length} products`}><CompareTable r={r} /></MobileCollapse>
          <p className="dt-fine">Ratings shown are our standard build range. Larger, smaller and special designs are available — ask our engineers.</p>
        </div>
      </section>

      {h.basics && (
        <section className="section bg-white">
          <div className="container">
            <div className="dt-finder-head">
              <div>
                <div className="label">{h.basics.label}</div>
                <h2>{h.basics.title}</h2>
              </div>
              <p>{h.basics.intro}</p>
            </div>
            <div className="dt-basics">
              {h.basics.items.map(b => (
                <Link key={b.t} href={b.href} className="dt-basic">
                  <strong>{b.t}</strong>
                  <span>{b.d}</span>
                  <em>Read →</em>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={`section ${h.basics ? 'bg-off' : 'bg-white'}`}>
        <div className="container dt-faq-wrap">
          <div className="label">FAQ</div>
          <h2 className="mb-6">Common questions</h2>
          <div className="dt-faq">
            {h.faqs.map(f => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <h2>{h.cta.title}</h2>
            <p className="lead !text-white/[.6] !max-w-[540px]">{h.cta.text}</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href={`/contact?product=${encodeURIComponent(h.cta.product)}`} className="btn btn-primary btn-lg">Request a Quote</Link>
              <a href={PHONE.href} className="btn btn-outline btn-lg">Call {PHONE.label}</a>
            </div>
          </div>
        </div>
      </div>
      <RelatedArticles path={r.hubHref} title={`${r.name} guides`} />
    </>
  )
}
