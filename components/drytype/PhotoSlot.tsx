import { existsSync } from 'node:fs'
import path from 'node:path'

const EXTS = ['webp', 'jpg', 'png']

/** First photo found in /public/images/dry-type/<slug>.{webp,jpg,png}, if any. */
export function photoFor(slug: string) {
  for (const ext of EXTS) {
    const rel = `/images/dry-type/${slug}.${ext}`
    if (existsSync(path.join(process.cwd(), 'public', rel))) return rel
  }
  return null
}

/**
 * Product photo frame. Drop a file at public/images/dry-type/<slug>.webp (or .jpg/.png)
 * and it replaces the placeholder automatically.
 */
export default function PhotoSlot({ slug, name, caption, wide = false }: { slug: string; name: string; caption?: string; wide?: boolean }) {
  const src = photoFor(slug)
  return (
    <figure className={`dt-photo${wide ? ' dt-photo-wide' : ''}${src ? '' : ' is-empty'}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} loading="lazy" />
      ) : (
        <div className="dt-photo-empty" data-photo-slot={`public/images/dry-type/${slug}.webp`}>
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <rect x="5" y="11" width="38" height="28" rx="3" />
            <path d="M17 11l3-5h8l3 5" />
            <circle cx="24" cy="25" r="8" />
            <circle cx="24" cy="25" r="3.5" />
          </svg>
          <strong>{name}</strong>
          <span>Product photo coming soon</span>
        </div>
      )}
      <figcaption>{caption ?? name}</figcaption>
    </figure>
  )
}
