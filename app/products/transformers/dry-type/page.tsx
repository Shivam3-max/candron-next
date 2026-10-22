import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroArt } from '@/components/LineArt'
import DryFinder from '@/components/drytype/DryFinder'
import CompareTable from '@/components/drytype/CompareTable'
import { DRY_GUIDE, DRY_HUB, FAMILIES, NEEDS, PRODUCTS, productHref, productsIn } from '@/lib/dry-type'
import { PHONE } from '@/lib/inventory'

export const metadata: Metadata = {
  title: 'Dry-Type Transformers — Made in Canada',
  description: 'The full CANDRON dry-type range: low-voltage distribution, medium-voltage power up to 15,000 kVA and 46 kV, control and motor-starting transformers, reactors, filters and RC snubbers. Designed, built and tested in Toronto.',
  alternates: { canonical: DRY_HUB },
}

const WHY = [
  { t: 'No oil, no fire risk', d: 'Air and solid insulation do the cooling. Nothing to leak, spill or burn — so no containment pit or fire vault.' },
  { t: 'Install it right where you need it', d: 'Safe indoors, near people and equipment. Shorter cable runs mean less voltage drop and lower cost.' },
  { t: 'Very little upkeep', d: 'No oil tests, no gaskets, no pumps. A yearly look, a vacuum of the coils and a tightness check is usually enough.' },
  { t: 'Built here, supported here', d: 'Designed, wound and tested in Toronto. Our own field team commissions and services what we build.' },
]

const BASICS = [
  { id: 'what-is', t: 'What is a dry-type transformer?', d: 'How it works and why there’s no oil.' },
  { id: 'construction', t: 'Dip & bake, VPI, cast coil, encapsulated', d: 'Four ways to protect a coil, and when each makes sense.' },
  { id: 'temperature', t: 'Insulation class & temperature rise', d: 'What “220 °C, 150 °C rise” actually means for you.' },
  { id: 'harmonics', t: 'K-factor & harmonics', d: 'Why electronics make transformers run hot.' },
  { id: 'enclosures', t: 'Enclosure types', d: 'Type 1, 3R, 4, 4X and 12 in one table.' },
  { id: 'sizing', t: 'Sizing in four steps', d: 'From your load list to the right kVA.' },
]

const FAQS = [
  { q: 'Dry-type or oil-filled — which should I choose?', a: 'Choose dry-type when the transformer goes inside a building, near people, or anywhere fire and spill rules matter. Oil-filled (liquid) units cost less at very large ratings and suit outdoor utility pads. Our guide has a side-by-side table.' },
  { q: 'What sizes do you build?', a: 'Control transformers from 25 VA, low-voltage distribution transformers up to 1,000 kVA, and medium-voltage power transformers up to 15,000 kVA three-phase at up to 46 kV class. Reactors run from 2 A to 1,250 A at low voltage and up to 10,000 kVAR at medium voltage.' },
  { q: 'Are your transformers energy efficient?', a: 'Yes. Our distribution and power transformers meet the U.S. DOE 2016 efficiency levels and the Canadian NRCan 2019 regulations. Lower temperature-rise options cut losses further.' },
  { q: 'Can a dry-type transformer go outdoors?', a: 'Yes — with a Type 3R or Type 4/4X enclosure. Encapsulated and cast-coil designs are the best fit for wet, dusty or salty sites.' },
  { q: 'How fast can I get one?', a: 'It depends on the rating and options. Common low-voltage ratings can ship quickly; check our in-stock inventory or call us and we will give you a firm date the same day.' },
  { q: 'Do you build special voltages?', a: 'Yes. Every unit is built to order in Toronto, so non-standard voltages, dual-voltage windings, special taps and custom enclosures are routine for us.' },
]

export default function DryTypeHub() {
  const finderItems = PRODUCTS.map(p => ({ href: productHref(p), short: p.short, range: p.range, does: p.does, needs: p.needs, family: p.family }))
  return (
    <>
      <div className="page-hero dt-hero">
        <div className="page-hero-bg dt-hero-bg" />
        <HeroArt kind="dt-range" figure="FIG. 01 · 3D" />
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="/products">Products</Link> / <Link href="/products/transformers">Transformers</Link> / <span>Dry-Type</span>
          </div>
          <div className="label label-white">Designed, Built & Tested in Toronto</div>
          <h1>Dry-Type<br /><em>Transformers</em></h1>
          <p className="lead mt-4">Oil-free transformers for every job inside a building — from a 25 VA control transformer to a 15,000 kVA, 46 kV power transformer. {PRODUCTS.length} products, explained in plain words.</p>
          <div className="dt-hero-cta">
            <a href="#finder" className="btn btn-primary">Help me choose</a>
            <a href="#range" className="btn btn-outline">Browse the range</a>
          </div>
        </div>
      </div>

      <div className="dt-stats">
        <div className="container">
          <ul>
            <li><strong>{PRODUCTS.length}</strong><span>Dry-type products</span></li>
            <li><strong>25 VA → 15 MVA</strong><span>Rating range</span></li>
            <li><strong>46 kV</strong><span>Highest voltage class</span></li>
            <li><strong>Toronto</strong><span>Designed & tested</span></li>
          </ul>
        </div>
      </div>

      <section className="section bg-white">
        <div className="container">
          <div className="label">Why Dry-Type</div>
          <h2 className="mb-8">Four reasons buildings choose dry-type</h2>
          <div className="dt-why">
            {WHY.map((w, i) => (
              <div key={w.t} className="dt-why-card">
                <span>0{i + 1}</span>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="finder" className="section bg-off dt-anchor">
        <div className="container">
          <div className="dt-finder-head">
            <div>
              <div className="label">Product Finder</div>
              <h2>What do you need to do?</h2>
            </div>
            <p>No jargon needed. Pick what you’re trying to do and we’ll point you to the right transformer. Still unsure? Call <a href={PHONE.href}>{PHONE.label}</a>.</p>
          </div>
          <DryFinder needs={NEEDS} items={finderItems} />
        </div>
      </section>

      <section id="range" className="section bg-white dt-anchor">
        <div className="container">
          <div className="label">The Range</div>
          <h2 className="mb-8">Four families, {PRODUCTS.length} products</h2>
          <div className="dt-family-list">
            {FAMILIES.map((f, i) => (
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
                  {productsIn(f.id).map(p => (
                    <li key={p.slug}>
                      <Link href={productHref(p)}>
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
          <CompareTable />
          <p className="dt-fine">Ratings shown are our standard build range. Larger, smaller and special designs are available — ask our engineers.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="dt-finder-head">
            <div>
              <div className="label">Dry-Type Basics</div>
              <h2>New to dry-type? Start here.</h2>
            </div>
            <p>Short, plain-English explanations of the terms you’ll meet on drawings and spec sheets.</p>
          </div>
          <div className="dt-basics">
            {BASICS.map(b => (
              <Link key={b.id} href={`${DRY_GUIDE}#${b.id}`} className="dt-basic">
                <strong>{b.t}</strong>
                <span>{b.d}</span>
                <em>Read →</em>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-off">
        <div className="container dt-faq-wrap">
          <div className="label">FAQ</div>
          <h2 className="mb-6">Common questions</h2>
          <div className="dt-faq">
            {FAQS.map(f => (
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
            <h2>Not sure which one you need?</h2>
            <p className="lead !text-white/[.6] !max-w-[540px]">Send us the load, the voltages and where it’s going. A CANDRON engineer will recommend the right transformer and quote it the same business day.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact?product=Dry-Type%20Transformer" className="btn btn-primary btn-lg">Request a Quote</Link>
              <a href={PHONE.href} className="btn btn-outline btn-lg">Call {PHONE.label}</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
