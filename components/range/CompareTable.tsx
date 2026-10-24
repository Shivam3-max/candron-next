import Link from 'next/link'
import { productHref, productsIn, type RangeDef } from '@/lib/ranges/core'

/** Specification comparison for one family, or the whole range grouped by family. */
export default function CompareTable({ r, family }: { r: RangeDef; family?: string }) {
  const fams = family ? r.families.filter(f => f.id === family) : r.families
  const cols = r.compareCols
  return (
    <div className="dt-table-wrap">
      <table className="dt-table dt-table-stack">
        <thead>
          <tr><th scope="col">Product</th>{cols.map(c => <th key={c.key} scope="col">{c.label}</th>)}</tr>
        </thead>
        {fams.map(f => (
          <tbody key={f.id}>
            {!family && <tr className="dt-table-group"><th colSpan={cols.length + 1} scope="colgroup"><Link href={f.href}>{f.name}</Link></th></tr>}
            {productsIn(r, f.id).map(p => (
              <tr key={productHref(r, p)}>
                <th scope="row"><Link href={productHref(r, p)}>{p.short}</Link></th>
                {cols.map(c => <td key={c.key} data-label={c.label}>{p.compare[c.key]}</td>)}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  )
}
