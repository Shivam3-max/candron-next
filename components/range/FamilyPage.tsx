import Link from 'next/link'
import { HeroArt } from '@/components/LineArt'
import ArtSlot from '@/components/range/ArtSlot'
import RangeNav from '@/components/range/RangeNav'
import CompareTable from '@/components/range/CompareTable'
import MobileCollapse from '@/components/range/MobileCollapse'
import { productHref, productsIn, type RangeDef, type RangeFamily } from '@/lib/ranges/core'

export function familyMetadata(f: RangeFamily) {
  return {
    title: f.meta.title,
    description: f.meta.description,
    alternates: { canonical: f.href },
  }
}

export default function FamilyPage({ r, f }: { r: RangeDef; f: RangeFamily }) {
  const items = productsIn(r, f.id)
  const others = r.families.filter(o => o.id !== f.id)
  const [c1, c2] = r.cardCols.map(k => r.compareCols.find(c => c.key === k)!)
  return (
    <>
      <div className="page-hero dt-hero">
        <div className="page-hero-bg dt-hero-bg" />
        <HeroArt kind={f.art.kind} views={f.art.views} figure="FIG. 01 · 3D" />
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            {r.hub.crumbs.map(c => <span key={c.href}> / <Link href={c.href}>{c.label}</Link></span>)}
            {' '}/ <Link href={r.hubHref}>{r.name}</Link> / <span>{f.short}</span>
          </div>
          <div className="label label-white">{r.name} · {f.range}</div>
          <h1>{f.h1[0]}<br /><em>{f.h1[1]}</em></h1>
          <p className="lead mt-4">{f.tagline}</p>
          <ul className="dt-hero-points">
            {f.points.map(t => <li key={t}>{t}</li>)}
          </ul>
          <div className="dt-hero-cta">
            <a href="#products" className="btn btn-primary">See all {items.length} products</a>
            <Link href={`${r.hubHref}#finder`} className="btn btn-outline">Help me choose</Link>
          </div>
        </div>
      </div>

      <section className="section bg-white">
        <div className="container">
          <div className="intro-split">
            <div>
              <div className="label">Overview</div>
              <h2>{f.short}, simply explained</h2>
            </div>
            <div>
              <p className="body">{f.intro}</p>
              <p className="body mt-4">
                Every unit is engineered to order, made and tested in Canada, and provided by CANDRON.
                {r.guide ? <> Not sure which one fits? Read our <Link href={r.guide.href}>{r.guide.label.toLowerCase()}</Link> or call our engineers.</> : <> Not sure which one fits? Use the <Link href={`${r.hubHref}#finder`}>product finder</Link> or call our engineers.</>}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="section bg-off dt-anchor">
        <div className="container">
          <div className="label">{items.length} Products</div>
          <h2 className="mb-8">Pick the right one for the job</h2>
          <div className="dt-cards">
            {items.map((p, i) => (
              <Link key={p.slug} href={productHref(r, p)} className="dt-card">
                <ArtSlot r={r} p={p} variant="card" caption={`0${i + 1}`.slice(-2) + ' · ' + p.range} />
                <div className="dt-card-body">
                  <h3>{p.name}</h3>
                  <p>{p.does}</p>
                  <dl>
                    <div><dt>{c1.label}</dt><dd>{p.compare[c1.key]}</dd></div>
                    <div><dt>{c2.label}</dt><dd>{p.compare[c2.key]}</dd></div>
                  </dl>
                  <span className="dt-card-go">View details →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="label">Side by Side</div>
          <h2 className="mb-8">Compare at a glance</h2>
          <MobileCollapse label={`Compare all ${items.length} products`}><CompareTable r={r} family={f.id} /></MobileCollapse>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section bg-off">
          <div className="container">
            <div className="label">More {r.name}</div>
            <h2 className="mb-8">Looking for something else?</h2>
            <div className="dt-fams">
              {others.map(o => (
                <Link key={o.id} href={o.href} className="dt-fam">
                  <strong>{o.name}</strong>
                  <span>{o.range}</span>
                  <p>{o.tagline}</p>
                  <em>{productsIn(r, o.id).length} products →</em>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <RangeNav r={r} />

      <div className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <h2>Tell us what you’re powering</h2>
            <p className="lead !text-white/[.6] !max-w-[540px]">Send the rating, voltages and where it’s going. Our engineers reply the same business day with a recommendation, price and lead time.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href={`/contact?product=${encodeURIComponent(f.name)}`} className="btn btn-primary btn-lg">Request a Quote</Link>
              <Link href={r.hubHref} className="btn btn-outline btn-lg">All {r.name} →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
