'use client'
import { useEffect, useRef, useState } from 'react'

export interface LineArtView {
  key: string
  label: string
  code: string
  src: string
}

// SVG text cache shared by every sheet on the page.
const svgCache = new Map<string, Promise<string>>()
export function loadSvg(src: string) {
  let p = svgCache.get(src)
  if (!p) {
    p = fetch(src).then(r => (r.ok ? r.text() : '')).catch(() => '')
    svgCache.set(src, p)
  }
  return p
}

interface Props {
  title: string
  figure: string
  legend: string[]
  views: LineArtView[]
  tone: 'dark' | 'light'
  className?: string
  cycleMs?: number
}

/**
 * Drawing-sheet frame for the generated line art. Starts the pen-plot animation when the
 * sheet scrolls into view, then steps through the views (isometric → elevation → schematic).
 */
export default function LineArtStage({ title, figure, legend, views, tone, className = '', cycleMs = 9000 }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const [seen, setSeen] = useState(false)
  const [active, setActive] = useState(0)
  const [manual, setManual] = useState(false)
  const [markup, setMarkup] = useState<Record<string, string>>({})

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting)
      if (e.isIntersecting) setSeen(true)
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Fetch every view once the sheet is on screen so tab clicks switch instantly.
  useEffect(() => {
    if (!seen) return
    let live = true
    views.forEach(v => {
      if (markup[v.src] !== undefined) return
      loadSvg(v.src).then(text => { if (live) setMarkup(m => ({ ...m, [v.src]: text })) })
    })
    return () => { live = false }
  }, [seen, views, markup])

  useEffect(() => {
    if (!inView || manual || views.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setTimeout(() => setActive(a => (a + 1) % views.length), cycleMs)
    return () => clearTimeout(t)
  }, [inView, manual, active, views.length, cycleMs])

  const view = views[active]

  return (
    <figure ref={ref} className={`la-sheet la-${tone}${seen ? ' is-in' : ''} ${className}`} aria-label={`${title} — technical drawing`}>
      <span className="la-corner la-tl" aria-hidden="true" />
      <span className="la-corner la-tr" aria-hidden="true" />
      <span className="la-corner la-bl" aria-hidden="true" />
      <span className="la-corner la-br" aria-hidden="true" />

      <div className="la-head">
        <span className="la-fig">{figure}</span>
        {views.length > 1 && (
          <div className="la-tabs" role="tablist" aria-label={`${title} drawing views`}>
            {views.map((v, i) => (
              <button
                key={v.key}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={i === active ? 'on' : ''}
                onClick={() => { setActive(i); setManual(true) }}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="la-stage">
        {views.map((v, i) => (
          <div
            key={v.key}
            className={`la-svg${i === active && markup[v.src] ? ' on' : ''}`}
            aria-hidden="true"
            dangerouslySetInnerHTML={i === active && markup[v.src] ? { __html: markup[v.src] } : undefined}
          />
        ))}
        {view.key === 'iso' && legend.length > 0 && (
          <ol className="la-legend">
            {legend.map((l, i) => (
              <li key={l} style={{ ['--d' as string]: `${2900 + i * 260}ms` }}>
                <span>{i + 1}</span>{l}
              </li>
            ))}
          </ol>
        )}
      </div>

      <figcaption className="la-titleblock">
        <span className="la-tb-title">{title}</span>
        <span><small>DWG</small>{view.code}</span>
        <span><small>VIEW</small>{view.label}</span>
        <span><small>SCALE</small>NTS</span>
        <span className="la-tb-brand"><small>REV A</small>CANDRON</span>
      </figcaption>
    </figure>
  )
}
