import Link from 'next/link'
import { HeroArt } from '@/components/LineArt'
import PhotoSlot from '@/components/drytype/PhotoSlot'
import RangeNav from '@/components/drytype/RangeNav'
import CompareTable from '@/components/drytype/CompareTable'
import { DRY_GUIDE, DRY_HUB, FAMILIES, productHref, productsIn, type DryFamily } from '@/lib/dry-type'

export function familyMetadata(f: DryFamily) {
  return {
    title: f.meta.title,
    description: f.meta.description,
    alternates: { canonical: f.href },
  }
}

export default function DryFamilyPage({ f }: { f: DryFamily }) {
  const items = productsIn(f.id)
  const others = FAMILIES.filter(o => o.id !== f.id)
  return (
    <>
      <div className="page-hero dt-hero">
        <div className="page-hero-bg dt-hero-bg" />
        <HeroArt kind={f.art.kind} views={f.art.views} figure="FIG. 01 · 3D" />
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/products/transformers">Transformers</Link> / <Link href={DRY_HUB}>Dry-Type</Link> / <span>{f.short}</span>
          </div>
          <div className="label label-white">Dry-Type · {f.range}</div>
          <h1>{f.h1[0]}<br /><em>{f.h1[1]}</em></h1>
          <p className="lead mt-4">{f.tagline}</p>
          <ul className="dt-hero-points">
            {f.points.map(t => <li key={t}>{t}</li>)}
          </ul>
          <div className="dt-hero-cta">
            <a href="#products" className="btn btn-primary">See all {items.length} products</a>
            <Link href={`${DRY_HUB}#finder`} className="btn btn-outline">Help me choose</Link>
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
              <p className="body mt-4">Every unit is designed, wound and tested at our Toronto facility. Not sure which one fits? Read our <Link href={DRY_GUIDE}>plain-English guide to dry-type transformers</Link> or call our engineers — we answer the same day.</p>
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
              <Link key={p.slug} href={productHref(p)} className="dt-card">
                <PhotoSlot slug={p.slug === 'standard' ? `${p.family}-standard` : p.slug} name={p.short} caption={`0${i + 1}`.slice(-2) + ' · ' + p.range} />
                <div className="dt-card-body">
                  <h3>{p.name}</h3>
                  <p>{p.does}</p>
                  <dl>
                    <div><dt>Rating</dt><dd>{p.compare.rating}</dd></div>
                    <div><dt>Voltage</dt><dd>{p.compare.voltage}</dd></div>
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
          <CompareTable family={f.id} />
        </div>
      </section>

      <section className="section bg-off">
        <div className="container">
          <div className="label">More Dry-Type Families</div>
          <h2 className="mb-8">Looking for something else?</h2>
          <div className="dt-fams">
            {others.map(o => (
              <Link key={o.id} href={o.href} className="dt-fam">
                <strong>{o.name}</strong>
                <span>{o.range}</span>
                <p>{o.tagline}</p>
                <em>{productsIn(o.id).length} products →</em>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <RangeNav />

      <div className="cta-band">
        <div className="container">
          <div className="cta-band-inner">
            <h2>Tell us what you’re powering</h2>
            <p className="lead !text-white/[.6] !max-w-[540px]">Send the rating, voltages and where it’s going. Our engineers reply the same business day with a recommendation, price and lead time.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href={`/contact?product=${encodeURIComponent(f.name)}`} className="btn btn-primary btn-lg">Request a Quote</Link>
              <Link href={DRY_HUB} className="btn btn-outline btn-lg">All Dry-Type →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
