import { existsSync } from 'node:fs'
import path from 'node:path'
import LineArt from '@/components/LineArt'
import { LINEART_META } from '@/lib/lineart-meta'
import type { RangeDef, RangeProduct } from '@/lib/ranges/core'

const EXTS = ['webp', 'jpg', 'png']

/** A real photo for this product: its own `photo`, or /public/images/<photoDir>/<key>.{webp,jpg,png}. */
export function photoFor(r: RangeDef, p: RangeProduct) {
  if (p.photo) return p.photo
  const key = p.slug === 'standard' ? `${p.family}-standard` : p.slug
  for (const ext of EXTS) {
    const rel = `/images/${r.photoDir}/${key}.${ext}`
    if (existsSync(path.join(process.cwd(), 'public', rel))) return { src: rel, alt: p.name }
  }
  return null
}

/** The drawing's views, starting from the second so the aside differs from the hero. */
function asideViews(p: RangeProduct) {
  const meta = LINEART_META[p.art.kind]
  const keys = p.art.views ?? ('views' in meta && meta.views ? meta.views.map(v => v.key) : ['iso', 'ga', 'sld'])
  return keys.length > 1 ? [...keys.slice(1), keys[0]] : keys
}

/**
 * Product picture frame. Shows CANDRON's own photo when one exists; otherwise the product's
 * animated drawing — the 3D model on cards, a second view (schematic / wiring) beside the overview.
 */
export default function ArtSlot({ r, p, variant, caption }: { r: RangeDef; p: RangeProduct; variant: 'aside' | 'card'; caption?: string }) {
  const photo = photoFor(r, p)
  return (
    <figure className={`dt-photo dt-photo-${variant}${photo ? '' : ' is-art'}`}>
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo.src} alt={photo.alt} loading="lazy" />
      ) : variant === 'card' ? (
        <div className="dt-art"><LineArt kind={p.art.kind} views={['iso']} tone="light" compact title={p.name} /></div>
      ) : (
        <div className="dt-art dt-art-aside"><LineArt kind={p.art.kind} views={asideViews(p)} tone="light" figure="FIG. 02" title={p.name} /></div>
      )}
      <figcaption>{caption ?? p.name}</figcaption>
    </figure>
  )
}
