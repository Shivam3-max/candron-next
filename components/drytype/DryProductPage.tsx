import Link from 'next/link'
import ProductTypePage from '@/components/ProductTypePage'
import { HeroArt } from '@/components/LineArt'
import PhotoSlot from '@/components/drytype/PhotoSlot'
import RangeNav from '@/components/drytype/RangeNav'
import { DRY_HUB, familyOf, productHref, resolve, type DryProduct } from '@/lib/dry-type'

export function dryMetadata(p: DryProduct) {
  return {
    title: p.meta.title,
    description: p.meta.description,
    alternates: { canonical: productHref(p) },
    openGraph: { title: `${p.name} | CANDRON`, description: p.meta.description },
  }
}

/** "In plain words" strip: what it does, when to pick it, and when something else fits better. */
function PlainWords({ p }: { p: DryProduct }) {
  const alt = p.insteadIf ? resolve(p.insteadIf.slug, p.family) : undefined
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
            <Link href={productHref(alt)} className="dt-plain-card dt-plain-alt">
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

export default function DryProductPage({ p }: { p: DryProduct }) {
  const fam = familyOf(p.family)
  const related = p.related.map(k => resolve(k, p.family)).filter((r): r is DryProduct => !!r)
  return (
    <>
      <ProductTypePage
        parentName="Dry-Type"
        parentHref={DRY_HUB}
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
        overviewAside={<PhotoSlot slug={p.slug === 'standard' ? `${p.family}-standard` : p.slug} name={p.name} caption={`${p.name} · ${p.range}`} />}
        afterOverview={<PlainWords p={p} />}
        features={p.features}
        upgrades={p.upgrades}
        specRows={p.specRows}
        standards={p.standards}
        applications={p.applications}
        relatedTypes={related.map(r => ({ name: r.name, sub: r.range, href: productHref(r) }))}
        relatedTitle="Often Compared With"
        faqs={p.faqs}
        quoteItems={p.quoteItems}
      />
      <RangeNav current={productHref(p)} />
    </>
  )
}
