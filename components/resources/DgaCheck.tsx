'use client'
import { useState } from 'react'
import { GASES, ZONES, duvalZone, type GasId } from '@/lib/resources/dga'

// Triangle corners in SVG units: CH4 at the top, C2H2 bottom-left, C2H4 bottom-right.
const TOP = [150, 12], LEFT = [12, 252], RIGHT = [288, 252]
const pt = (m: number, e: number, a: number) => [
  (m * TOP[0] + e * RIGHT[0] + a * LEFT[0]) / 100,
  (m * TOP[1] + e * RIGHT[1] + a * LEFT[1]) / 100,
]

const EXAMPLE: Record<GasId, number> = { h2: 45, ch4: 60, c2h6: 38, c2h4: 25, c2h2: 0.5, co: 310, co2: 2600 }

/** Quick Duval Triangle 1 read of a mineral-oil DGA result, in the browser only. */
export default function DgaCheck() {
  const [g, setG] = useState<Record<GasId, number>>(EXAMPLE)
  const [example, setExample] = useState(true)
  const zoneId = duvalZone(g.ch4, g.c2h4, g.c2h2)
  const zone = ZONES.find(z => z.id === zoneId)
  const sum = g.ch4 + g.c2h4 + g.c2h2
  const pct = sum > 0 ? [g.ch4, g.c2h4, g.c2h2].map(v => (v / sum) * 100) : [0, 0, 0]
  const [px, py] = pt(pct[0], pct[1], pct[2])
  const tdcg = g.h2 + g.ch4 + g.c2h6 + g.c2h4 + g.c2h2 + g.co
  const ratio = g.co > 0 ? g.co2 / g.co : 0

  return (
    <div className="rt-planner dga">
      <div className="rt-card rt-inputs">
        <div className="rt-card-head">
          <div className="rt-eyebrow">1 · Gas results (ppm)</div>
          {example && <span className="rt-pill rt-pill-info">Example result, type yours</span>}
        </div>
        <div className="dga-gases">
          {GASES.map(x => (
            <label key={x.id} className="rt-field" title={x.note}>
              <span>{x.f} · {x.name}</span>
              <input id={`dga-${x.id}`} type="number" min={0} step="any" inputMode="decimal" value={g[x.id]}
                onChange={e => { setG(v => ({ ...v, [x.id]: Math.max(0, Number(e.target.value) || 0) })); setExample(false) }} />
            </label>
          ))}
        </div>
        <ul className="dga-notes">
          {GASES.map(x => <li key={x.id}><b>{x.f}</b> {x.note}</li>)}
        </ul>
      </div>

      <div className="rt-card rt-results">
        <div className="rt-card-head">
          <div className="rt-eyebrow">Duval Triangle 1 · mineral oil</div>
          {zone && <span className="rt-pill dga-pill" style={{ background: zone.colour }}>{zone.id}</span>}
        </div>
        <div className="dga-out">
          <svg viewBox="0 0 300 280" className="dga-tri" role="img" aria-label={zone ? `Result plots in zone ${zone.id}, ${zone.name}` : 'No result yet'}>
            {ZONES.map(z => (
              <polygon key={z.id} points={z.poly.map(c => pt(...c).join(',')).join(' ')} fill={z.colour} stroke="#fff" strokeWidth="1" />
            ))}
            {ZONES.map(z => {
              const c = z.poly.reduce((s, p) => [s[0] + p[0], s[1] + p[1], s[2] + p[2]], [0, 0, 0]).map(v => v / z.poly.length) as [number, number, number]
              const [x, y] = pt(...c)
              return z.id === 'PD' ? null : <text key={z.id} x={x} y={y + 4} className="dga-zl">{z.id}</text>
            })}
            <text x={TOP[0]} y={TOP[1] - 2} className="dga-ax" textAnchor="middle">CH₄</text>
            <text x={LEFT[0]} y={LEFT[1] + 18} className="dga-ax">C₂H₂</text>
            <text x={RIGHT[0]} y={RIGHT[1] + 18} className="dga-ax" textAnchor="end">C₂H₄</text>
            {sum > 0 && <><circle cx={px} cy={py} r="7" className="dga-halo" /><circle cx={px} cy={py} r="4" className="dga-dot" /></>}
          </svg>
          <div>
            <p className="dga-zone">{zone ? <><b>{zone.id}</b> {zone.name}</> : 'Enter methane, ethylene and acetylene to plot the result.'}</p>
            {zone && <p className="dga-mean">{zone.meaning}</p>}
            <dl className="rr-facts dga-facts">
              <div><dt>CH₄ / C₂H₄ / C₂H₂</dt><dd>{pct.map(v => `${v.toFixed(0)}%`).join(' / ')}</dd></div>
              <div><dt>Total dissolved combustible gas</dt><dd>{Math.round(tdcg).toLocaleString('en-CA')} ppm</dd></div>
              <div><dt>CO₂ / CO ratio</dt><dd>{g.co > 0 ? ratio.toFixed(1) : '—'}{g.co > 0 && ratio < 3 ? ' · low, check paper' : ''}</dd></div>
            </dl>
          </div>
        </div>
        <p className="rt-disclaimer">The triangle says what kind of fault the gases look like, not whether there is one. A healthy transformer with low gas levels can plot anywhere, so use it only when levels or rates of increase are above normal for the unit, and judge with the trend, the fluid type and IEEE C57.104. Natural ester (FR3) fluids need different limits. Nothing you type here is sent anywhere.</p>
      </div>
    </div>
  )
}
