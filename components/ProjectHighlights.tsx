'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PROJECTS, PROJECT_FILTERS, type Project, type ProjectCategory } from '@/lib/projects'

const INITIAL = 6

const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  transformers: 'Transformers',
  switchgear: 'Switchgear',
  expedited: 'Expedited',
  field: 'Field Service',
}

export default function ProjectHighlights() {
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all')
  const [expanded, setExpanded] = useState(false)
  const [open, setOpen] = useState<Project | null>(null)
  const [shot, setShot] = useState(0)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const list = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.categories.includes(filter))),
    [filter],
  )
  const visible = expanded ? list : list.slice(0, INITIAL)

  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  const openProject = (p: Project) => { setShot(0); setOpen(p) }

  return (
    <section className="ph-section" id="projects" aria-labelledby="ph-title">
      <div className="container">
        <div className="ph-head">
          <div>
            <div className="label">Project Highlights</div>
            <h2 id="ph-title">Real Projects. <em>Delivered.</em></h2>
            <p className="ph-lead">
              Custom transformers, Arctic-rated switchgear, overnight emergency dispatch and 24-hour supply —
              a look at the Canadian-made equipment CANDRON has engineered, provided, tested and delivered.
            </p>
          </div>
          <div className="ph-filters" role="group" aria-label="Filter projects">
            {PROJECT_FILTERS.map(f => {
              const count = f.key === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.categories.includes(f.key as ProjectCategory)).length
              return (
                <button
                  key={f.key}
                  type="button"
                  className={filter === f.key ? 'on' : ''}
                  aria-pressed={filter === f.key}
                  onClick={() => { setFilter(f.key); setExpanded(false) }}
                >
                  {f.label}<span>{count}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="ph-grid">
          {visible.map((p, i) => (
            <article key={p.id} className={`ph-card${i === 0 ? ' ph-feature' : ''}`}>
              <button type="button" className="ph-card-btn" onClick={() => openProject(p)} aria-label={`View project: ${p.title}`}>
                <div className="ph-media">
                  <Image
                    src={p.images[0].src}
                    alt={p.images[0].alt}
                    fill
                    sizes={i === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                    className="ph-img"
                  />
                  <div className="ph-tags">
                    {p.categories.map(c => <span key={c}>{CATEGORY_LABEL[c]}</span>)}
                  </div>
                  {p.images.length > 1 && (
                    <span className="ph-count">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="m21 17-5-5-9 7" /></svg>
                      {p.images.length} photos
                    </span>
                  )}
                </div>
                <div className="ph-body">
                  <div className="ph-eyebrow">{p.eyebrow}</div>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                  <dl className="ph-stats">
                    {p.stats.slice(0, i === 0 ? 4 : 3).map(s => (
                      <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>
                    ))}
                  </dl>
                  <span className="ph-more">View project <span aria-hidden="true">→</span></span>
                </div>
              </button>
            </article>
          ))}
        </div>

        {list.length > INITIAL && (
          <div className="ph-foot">
            <button type="button" className="btn btn-outline-blue" onClick={() => setExpanded(e => !e)}>
              {expanded ? 'Show fewer projects' : `Show all ${list.length} projects`}
            </button>
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        className="ph-dialog"
        onClose={() => setOpen(null)}
        onClick={e => { if (e.target === dialogRef.current) setOpen(null) }}
        aria-labelledby="ph-dialog-title"
      >
        {open && (
          <div className="ph-dialog-inner">
            <button type="button" className="ph-close" onClick={() => setOpen(null)} aria-label="Close project">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
            </button>
            <div className="ph-gallery">
              <div className="ph-gallery-main">
                <Image src={open.images[shot].src} alt={open.images[shot].alt} fill sizes="(max-width: 900px) 100vw, 55vw" className="ph-img" />
              </div>
              {open.images.length > 1 && (
                <div className="ph-thumbs">
                  {open.images.map((img, i) => (
                    <button key={img.src} type="button" className={i === shot ? 'on' : ''} onClick={() => setShot(i)} aria-label={`Photo ${i + 1}: ${img.alt}`}>
                      <Image src={img.src} alt="" fill sizes="120px" className="ph-img" />
                    </button>
                  ))}
                </div>
              )}
              <p className="ph-caption">{open.images[shot].alt}</p>
            </div>
            <div className="ph-detail">
              <div className="ph-eyebrow">{open.eyebrow}</div>
              <h3 id="ph-dialog-title">{open.title}</h3>
              {open.body.map(t => <p key={t}>{t}</p>)}
              <dl className="ph-stats ph-stats-lg">
                {open.stats.map(s => (
                  <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>
                ))}
              </dl>
              <ul className="ph-list">
                {open.highlights.map(h => <li key={h}>{h}</li>)}
              </ul>
              <div className="ph-actions">
                <Link href={open.cta.href} className="btn btn-primary">{open.cta.label} →</Link>
                {open.product && <Link href={open.product.href} className="btn btn-outline-blue">{open.product.label}</Link>}
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
