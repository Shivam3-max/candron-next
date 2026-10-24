import Link from 'next/link'
import ProductTypePage from '@/components/ProductTypePage'
import { HeroArt } from '@/components/LineArt'
import ArtSlot from '@/components/range/ArtSlot'
import RangeNav from '@/components/range/RangeNav'
import { familyOf, productHref, resolve, type RangeDef, type RangeProduct } from '@/lib/ranges/core'

export function productMetadata(r: RangeDef, p: RangeProduct) {
  return {
    title: p.meta.title,
    description: p.meta.description,
    alternates: { canonical: productHref(r, p) },
    openGraph: { title: `${p.name} | CANDRON`, description: p.meta.description },
  }
}

/** "In plain words" strip: what it does, when to pick it, and when something else fits better. */
function PlainWords({ r, p }: { r: RangeDef; p: RangeProduct }) {
  const alt = p.insteadIf ? resolve(r, p.insteadIf.slug, p.family) : undefined
  return (
    <section className="dt-plain" aria-labelledby="dt-plain-title">
      <div className="container">
        <div className="label">In Plain Words</div>
        <h2 id="dt-plain-title" className="sr-only">{p.name} in plain words</h2>
        <div className="dt-plain-grid">
          <div className="dt-plain-card dt-plain-does">
            <h3>What it does</h3>
            <p>{p.does}</p>
          </div>
          <div className="dt-plain-card">
            <h3>Pick it when</h3>
            <ul>{p.pickIf.map(t => <li key={t}>{t}</li>)}</ul>
          </div>
          {alt && p.insteadIf && (
            <Link href={productHref(r, alt)} className="dt-plain-card dt-plain-alt">
              <h3>Better choice if…</h3>
              <p>{p.insteadIf.text}</p>
              <span>See the {alt.short} →</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default function ProductPage({ r, p }: { r: RangeDef; p: RangeProduct }) {
  const fam = familyOf(r, p.family)
  const related = p.related.map(k => resolve(r, k, p.family)).filter((x): x is RangeProduct => !!x)
  const href = productHref(r, p)
  return (
    <>
      <ProductTypePage
        parentName={r.name}
        parentHref={r.hubHref}
        categoryName={fam.short}
        categoryHref={fam.href}
        typeName={p.name}
        eyebrow={p.eyebrow}
        subtitle={p.subtitle}
        heroArt={<HeroArt kind={p.art.kind} views={p.art.views} figure="FIG. 01 · 3D" />}
        badges={p.badges}
        kpis={p.kpis}
        overviewTitle={p.overviewTitle}
        overviewText={p.overviewText}
        overviewPoints={p.overviewPoints}
        overviewAside={<ArtSlot r={r} p={p} variant="aside" caption={`${p.name} · ${p.range}`} />}
        afterOverview={<PlainWords r={r} p={p} />}
        features={p.features}
        upgrades={p.upgrades}
        specRows={p.specRows}
        standards={p.standards}
        applications={p.applications}
        relatedTypes={related.map(x => ({ name: x.name, sub: x.range, href: productHref(r, x) }))}
        relatedTitle="Often Compared With"
        faqs={p.faqs}
        quoteItems={p.quoteItems}
      />
      <RangeNav r={r} current={href} />
    </>
  )
}
