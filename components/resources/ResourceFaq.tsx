import JsonLd from '@/components/JsonLd'
import { faqLd } from '@/lib/seo'

/** Plain disclosure FAQ for resource pages (no client JS needed), with FAQPage structured data. */
export default function ResourceFaq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="dt-faq">
      <JsonLd data={faqLd(items)} />
      {items.map(f => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  )
}
