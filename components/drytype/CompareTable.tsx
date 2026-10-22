import Link from 'next/link'
import { FAMILIES, PRODUCTS, productHref, type FamilyId } from '@/lib/dry-type'

/** Specification comparison for one family, or the whole range grouped by family. */
export default function CompareTable({ family }: { family?: FamilyId }) {
  const fams = family ? FAMILIES.filter(f => f.id === family) : FAMILIES
  return (
    <div className="dt-table-wrap">
      <table className="dt-table dt-table-stack">
        <thead>
          <tr><th scope="col">Product</th><th scope="col">Rating</th><th scope="col">Voltage class</th><th scope="col">Insulation / rise</th><th scope="col">Enclosure</th></tr>
        </thead>
        {fams.map(f => (
          <tbody key={f.id}>
            {!family && <tr className="dt-table-group"><th colSpan={5} scope="colgroup"><Link href={f.href}>{f.name}</Link></th></tr>}
            {PRODUCTS.filter(p => p.family === f.id).map(p => (
              <tr key={productHref(p)}>
                <th scope="row"><Link href={productHref(p)}>{p.short}</Link></th>
                <td data-label="Rating">{p.compare.rating}</td>
                <td data-label="Voltage">{p.compare.voltage}</td>
                <td data-label="Insulation">{p.compare.insulation}</td>
                <td data-label="Enclosure">{p.compare.enclosure}</td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  )
}
