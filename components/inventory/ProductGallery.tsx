'use client'
import { useCallback, useEffect, useState } from 'react'
import LineArt from '@/components/LineArt'
import type { LineArtKind } from '@/lib/lineart-meta'

/** Photo gallery with thumbnails and a full-screen zoom view; falls back to the animated drawing. */
export default function ProductGallery({ images, name, art }: { images: string[]; name: string; art: LineArtKind }) {
  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState(false)
  const count = images.length
  const step = useCallback((d: number) => setActive(a => (a + d + count) % count), [count])

  useEffect(() => {
    if (!zoom) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoom(false)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey) }
  }, [zoom, step])

  if (!count) {
    return (
      <div className="pd-gallery pd-gallery-art">
        <LineArt kind={art} tone="light" figure="TYPICAL" title={`${name} — typical arrangement`} />
        <p className="pd-art-note">Photos of this unit are available on request.</p>
      </div>
    )
  }

  return (
    <div className="pd-gallery">
      <div className="pd-stage">
        <button type="button" className="pd-main" onClick={() => setZoom(true)} aria-label="Open photo full screen">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={images[active]} src={images[active]} alt={`${name} — photo ${active + 1} of ${count}`} />
          <span className="pd-zoom-hint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4M11 8v6M8 11h6" /></svg>
            Zoom
          </span>
        </button>
        {count > 1 && (
          <>
            <button type="button" className="pd-arrow pd-prev" onClick={() => step(-1)} aria-label="Previous photo">‹</button>
            <button type="button" className="pd-arrow pd-next" onClick={() => step(1)} aria-label="Next photo">›</button>
            <span className="pd-counter">{active + 1} / {count}</span>
          </>
        )}
      </div>
      {count > 1 && (
        <div className="pd-thumbs">
          {images.map((src, i) => (
            <button key={src} type="button" className={i === active ? 'on' : ''} onClick={() => setActive(i)} aria-label={`Show photo ${i + 1}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {zoom && (
        <div className="pd-lightbox" role="dialog" aria-modal="true" aria-label={`${name} photos`} onClick={() => setZoom(false)}>
          <button type="button" className="pd-lb-close" aria-label="Close" onClick={() => setZoom(false)}>×</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[active]} alt={`${name} — photo ${active + 1}`} onClick={e => e.stopPropagation()} />
          {count > 1 && (
            <>
              <button type="button" className="pd-arrow pd-prev" onClick={e => { e.stopPropagation(); step(-1) }} aria-label="Previous photo">‹</button>
              <button type="button" className="pd-arrow pd-next" onClick={e => { e.stopPropagation(); step(1) }} aria-label="Next photo">›</button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
