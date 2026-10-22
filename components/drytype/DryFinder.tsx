'use client'
import { useState } from 'react'
import Link from 'next/link'

export interface FinderItem { href: string; short: string; range: string; does: string; needs: string[]; family: string }
export interface FinderNeed { id: string; label: string; hint: string }

/** "What do you need to do?" — tap a need, see the products that fit, best match first. */
export default function DryFinder({ needs, items }: { needs: FinderNeed[]; items: FinderItem[] }) {
  const [picked, setPicked] = useState<string[]>([])
  const toggle = (id: string) => setPicked(p => (p.includes(id) ? p.filter(x => x !== id) : [...p, id]))
  const scored = items
    .map(it => ({ it, score: picked.filter(n => it.needs.includes(n)).length, primary: picked.includes(it.needs[0]) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score || Number(b.primary) - Number(a.primary))

  return (
    <div className="dt-finder">
      <div className="dt-finder-needs" role="group" aria-label="What do you need to do?">
        {needs.map(n => (
          <button key={n.id} type="button" aria-pressed={picked.includes(n.id)} className={picked.includes(n.id) ? 'on' : ''} onClick={() => toggle(n.id)}>
            <strong>{n.label}</strong>
            <span>{n.hint}</span>
          </button>
        ))}
      </div>
      <div className="dt-finder-out" aria-live="polite">
        {picked.length === 0 ? (
          <p className="dt-finder-empty">Tap one or more needs above — we’ll show the transformers that fit, best match first.</p>
        ) : scored.length === 0 ? (
          <p className="dt-finder-empty">No single product covers that mix. Call us and an engineer will put the right combination together.</p>
        ) : (
          <>
            <div className="dt-finder-count">
              <span>{scored.length} {scored.length === 1 ? 'match' : 'matches'}</span>
              <button type="button" onClick={() => setPicked([])}>Clear</button>
            </div>
            <ol className="dt-finder-list">
              {scored.map(({ it, score }, i) => (
                <li key={it.href}>
                  <Link href={it.href}>
                    <em>{i === 0 ? 'Best match' : score === picked.length ? 'Also fits' : 'Partly fits'}</em>
                    <strong>{it.short}</strong>
                    <small>{it.range}</small>
                    <p>{it.does}</p>
                    <span>View details →</span>
                  </Link>
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  )
}
