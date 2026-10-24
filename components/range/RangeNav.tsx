import Link from 'next/link'
import { productHref, productsIn, type RangeDef } from '@/lib/ranges/core'

/** Every page of a range in one place, grouped by family, with the current page marked. */
export default function RangeNav({ r, current }: { r: RangeDef; current?: string }) {
  return (
    <section className="dt-range" aria-labelledby={`range-nav-${r.id}`}>
      <div className="container">
        <div className="dt-range-head">
          <div>
            <div className="label">Full {r.name} Range</div>
            <h2 id={`range-nav-${r.id}`}>Jump to any product</h2>
          </div>
          <div className="dt-range-links">
            <Link href={`${r.hubHref}#finder`} className="btn btn-outline-blue">Help me choose</Link>
            {r.guide && <Link href={r.guide.href} className="btn btn-outline-blue">{r.guide.label}</Link>}
          </div>
        </div>
        <div className={`dt-range-grid dt-range-grid-${r.families.length}`}>
          {r.families.map(f => (
            <div key={f.id} className="dt-range-col">
              <Link href={f.href} className="dt-range-fam">{f.short}<span>{f.range}</span></Link>
              <ul>
                {productsIn(r, f.id).map(p => {
                  const href = productHref(r, p)
                  return (
                    <li key={href}>
                      <Link href={href} aria-current={current === href ? 'page' : undefined}>
                        {p.short}
                        <small>{p.range}</small>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
