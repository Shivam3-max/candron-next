'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

export interface DesignShot { src: string; title: string; text: string; chapter: string; w: number; h: number }

const AUTOPLAY_MS = 5200

/**
 * Engineering-model showcase: a large stage that crossfades through the shots (autoplay pauses
 * on interaction), chapter tabs, a thumbnail rail, swipe on touch, and a full-screen viewer.
 */
export default function DesignGallery({ shots, label }: { shots: DesignShot[]; label: string }) {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [lightbox, setLightbox] = useState(false)
  const railRef = useRef<HTMLDivElement>(null)
  const touchX = useRef<number | null>(null)
  const chapters = [...new Set(shots.map(s => s.chapter))]

  const go = useCallback((i: number, user = true) => {
    setActive((i + shots.length) % shots.length)
    if (user) setPlaying(false)
  }, [shots.length])

  // Autoplay, only while the gallery is on screen and motion is allowed.
  const rootRef = useRef<HTMLDivElement>(null)
  const [onScreen, setOnScreen] = useState(false)
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: .35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (!playing || !onScreen || lightbox) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setTimeout(() => go(active + 1, false), AUTOPLAY_MS)
    return () => clearTimeout(t)
  }, [active, playing, onScreen, lightbox, go])

  // Keep the active thumbnail visible in the rail.
  useEffect(() => {
    const rail = railRef.current
    const thumb = rail?.children[active] as HTMLElement | undefined
    if (rail && thumb) rail.scrollTo({ left: thumb.offsetLeft - rail.clientWidth / 2 + thumb.clientWidth / 2, behavior: 'smooth' })
  }, [active])

  // Keyboard in the viewer.
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowRight') go(active + 1)
      if (e.key === 'ArrowLeft') go(active - 1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [lightbox, active, go])

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1))
    touchX.current = null
  }

  const shot = shots[active]
  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div ref={rootRef} className="dg" aria-roledescription="carousel" aria-label={label}>
      <div className="dg-chapters" role="tablist" aria-label="Jump to a stage of the design">
        {chapters.map(c => {
          const first = shots.findIndex(s => s.chapter === c)
          const on = shot.chapter === c
          return (
            <button key={c} type="button" role="tab" aria-selected={on} className={on ? 'on' : ''} onClick={() => go(first)}>
              {c}<span>{shots.filter(s => s.chapter === c).length}</span>
            </button>
          )
        })}
      </div>

      <div className="dg-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <span className="dg-corner dg-tl" aria-hidden="true" /><span className="dg-corner dg-tr" aria-hidden="true" />
        <span className="dg-corner dg-bl" aria-hidden="true" /><span className="dg-corner dg-br" aria-hidden="true" />
        {shots.map((s, i) => (
          <button
            key={s.src}
            type="button"
            className={`dg-slide${i === active ? ' on' : ''}`}
            aria-hidden={i !== active}
            tabIndex={i === active ? 0 : -1}
            onClick={() => { setLightbox(true); setPlaying(false) }}
            aria-label={`Open ${s.title} full screen`}
          >
            <Image src={s.src} alt={s.title} width={s.w} height={s.h} sizes="(max-width: 900px) 92vw, 52vw" className="dg-print" priority={i === 0} />
          </button>
        ))}
        <div className="dg-meta" aria-live="polite">
          <span className="dg-count">{pad(active + 1)} / {pad(shots.length)}</span>
          <span className="dg-chip">{shot.chapter}</span>
        </div>
        <button type="button" className="dg-nav dg-prev" onClick={() => go(active - 1)} aria-label="Previous view">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <button type="button" className="dg-nav dg-next" onClick={() => go(active + 1)} aria-label="Next view">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </button>
        <button type="button" className="dg-expand" onClick={() => { setLightbox(true); setPlaying(false) }} aria-label="View full screen">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
        </button>
        {playing && onScreen && <span key={active} className="dg-progress" style={{ animationDuration: `${AUTOPLAY_MS}ms` }} aria-hidden="true" />}
      </div>

      <div className="dg-caption">
        <div>
          <h3>{shot.title}</h3>
          <p>{shot.text}</p>
        </div>
        <button type="button" className="dg-play" onClick={() => setPlaying(p => !p)} aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}>
          {playing
            ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" /></svg>
            : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5l12 7-12 7z" /></svg>}
        </button>
      </div>

      <div className="dg-rail" ref={railRef}>
        {shots.map((s, i) => (
          <button key={s.src} type="button" className={`dg-thumb${i === active ? ' on' : ''}`} onClick={() => go(i)} aria-label={`Show ${s.title}`} aria-current={i === active}>
            <Image src={s.src} alt="" fill sizes="120px" className="dg-img" />
            <span>{pad(i + 1)}</span>
          </button>
        ))}
      </div>

      {lightbox && createPortal(
        <div className="dg-lightbox" role="dialog" aria-modal="true" aria-label={`${shot.title} — full screen`} onClick={() => setLightbox(false)} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="dg-lb-frame" onClick={e => e.stopPropagation()}>
            <Image src={shot.src} alt={shot.title} width={shot.w} height={shot.h} className="dg-lb-img" sizes="100vw" />
            <div className="dg-lb-caption"><strong>{pad(active + 1)} · {shot.title}</strong><span>{shot.text}</span></div>
          </div>
          <button type="button" className="dg-nav dg-prev dg-lb-nav" onClick={e => { e.stopPropagation(); go(active - 1) }} aria-label="Previous view">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button type="button" className="dg-nav dg-next dg-lb-nav" onClick={e => { e.stopPropagation(); go(active + 1) }} aria-label="Next view">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
          <button type="button" className="dg-close" onClick={() => setLightbox(false)} aria-label="Close">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>,
        document.body,
      )}
    </div>
  )
}
