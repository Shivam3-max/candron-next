import Link from 'next/link'
import { DRY_GUIDE, DRY_HUB, FAMILIES, productHref, productsIn } from '@/lib/dry-type'

/** Every dry-type page in one place, grouped by family, with the current page marked. */
export default function RangeNav({ current }: { current?: string }) {
  return (
    <section className="dt-range" aria-labelledby="dt-range-title">
      <div className="container">
        <div className="dt-range-head">
          <div>
            <div className="label">Full Dry-Type Range</div>
            <h2 id="dt-range-title">Jump to any product</h2>
          </div>
          <div className="dt-range-links">
            <Link href={`${DRY_HUB}#finder`} className="btn btn-outline-blue">Help me choose</Link>
            <Link href={DRY_GUIDE} className="btn btn-outline-blue">Dry-type basics</Link>
          </div>
        </div>
        <div className="dt-range-grid">
          {FAMILIES.map(f => (
            <div key={f.id} className="dt-range-col">
              <Link href={f.href} className="dt-range-fam">{f.short}<span>{f.range}</span></Link>
              <ul>
                {productsIn(f.id).map(p => {
                  const href = productHref(p)
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
