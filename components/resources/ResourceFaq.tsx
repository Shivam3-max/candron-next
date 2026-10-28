/** Plain disclosure FAQ for resource pages (no client JS needed). */
export default function ResourceFaq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="dt-faq">
      {items.map(f => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  )
}
