'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { DEFAULT_ROWS, EQUIPMENT, PHASES } from '@/lib/resources/lead-times'

interface Row { key: string; type: string; tag: string; low: number; high: number }
type Status = 'late' | 'risk' | 'ok'

const DAY = 86_400_000
const WEEK = 7 * DAY
const STORE = 'candron-lead-time-planner-v1'

const typeOf = (id: string) => EQUIPMENT.find(e => e.id === id) ?? EQUIPMENT[0]
const fmt = (d: Date) => d.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })
const iso = (d: Date) => d.toISOString().slice(0, 10)
const newRow = (type: string, n: number): Row => {
  const t = typeOf(type)
  return { key: `${type}-${n}-${Math.random().toString(36).slice(2, 7)}`, type, tag: '', low: t.low, high: t.high }
}
const STATUS_TEXT: Record<Status, string> = { late: 'Late', risk: 'At risk', ok: 'On track' }
const defaultPhases = () => Object.fromEntries(PHASES.map(p => [p.id, p.weeks]))

function loadInitial() {
  let saved: { project?: string; energize?: string; phases?: Record<string, number>; rows?: Row[] } | null = null
  try { saved = JSON.parse(localStorage.getItem(STORE) || 'null') } catch { saved = null }
  if (saved?.rows?.length && saved.energize) {
    return { project: saved.project ?? '', energize: saved.energize, phases: { ...defaultPhases(), ...saved.phases }, rows: saved.rows, isExample: false }
  }
  return { project: '', energize: iso(new Date(Date.now() + 52 * WEEK)), phases: defaultPhases(), rows: DEFAULT_ROWS.map((t, i) => newRow(t, i)), isExample: true }
}

/** Works back from the energization date through each project phase to an order-by date per item. */
export default function LeadTimePlanner() {
  // Rendered in the browser only (see LeadTimePlannerLoader), so the starting state can read
  // today's date and any saved project directly.
  const [initial] = useState(loadInitial)
  const [project, setProject] = useState(initial.project)
  const [energize, setEnergize] = useState(initial.energize)
  const [phases, setPhases] = useState<Record<string, number>>(initial.phases)
  const [rows, setRows] = useState<Row[]>(initial.rows)
  const [isExample, setIsExample] = useState(initial.isExample)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isExample) return
    try { localStorage.setItem(STORE, JSON.stringify({ project, energize, phases, rows })) } catch { /* storage unavailable */ }
  }, [isExample, project, energize, phases, rows])

  const edit = () => setIsExample(false)
  const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d }, [])
  const target = energize ? new Date(`${energize}T00:00:00`) : null
  const afterBuild = PHASES.filter(p => PHASES.indexOf(p) > PHASES.findIndex(x => x.id === 'build')).reduce((s, p) => s + (phases[p.id] || 0), 0)
  const beforeBuild = (phases.submittal || 0) + (phases.approval || 0)

  const results = rows.map(r => {
    const t = typeOf(r.type)
    const back = (lead: number) => beforeBuild + lead + afterBuild
    const safe = target ? new Date(target.getTime() - back(r.high) * WEEK) : null
    const best = target ? new Date(target.getTime() - back(r.low) * WEEK) : null
    let status: Status = 'ok'
    if (best && today > best) status = 'late'
    else if (safe && today > safe) status = 'risk'
    const float = safe ? Math.round((safe.getTime() - today.getTime()) / WEEK) : 0
    return { r, t, safe, best, status, float, total: back(r.high) }
  })
  const worst = results.reduce<Status>((w, x) => (x.status === 'late' ? 'late' : x.status === 'risk' && w !== 'late' ? 'risk' : w), 'ok')
  const counts = { late: results.filter(x => x.status === 'late').length, risk: results.filter(x => x.status === 'risk').length, ok: results.filter(x => x.status === 'ok').length }

  // Timeline scale: from the earliest safe order date (or today) to energization.
  const start = results.reduce((m, x) => (x.safe && x.safe < m ? x.safe : m), today)
  const span = target ? Math.max(target.getTime() - start.getTime(), WEEK) : WEEK
  const pct = (d: Date) => ((d.getTime() - start.getTime()) / span) * 100

  function csv() {
    const head = ['Item', 'Tag', 'Lead time low (wk)', 'Lead time high (wk)', 'Order by (safe)', 'Order by (best case)', 'Status', 'Float (wk)']
    const lines = results.map(x => [x.t.name, x.r.tag, x.r.low, x.r.high, x.safe ? iso(x.safe) : '', x.best ? iso(x.best) : '', STATUS_TEXT[x.status], x.float])
    const body = [[`Project: ${project || 'Untitled'}`], [`Energization: ${energize}`], [], head, ...lines]
      .map(l => l.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([body], { type: 'text/csv' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `order-by-schedule-${(project || 'project').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function copy() {
    const text = [`Order-by schedule${project ? ` — ${project}` : ''} (energization ${target ? fmt(target) : '—'})`,
      ...results.map(x => `• ${x.t.name}${x.r.tag ? ` [${x.r.tag}]` : ''}: order by ${x.safe ? fmt(x.safe) : '—'} (${STATUS_TEXT[x.status]})`),
      '', 'Made with the CANDRON Long-Lead Equipment Planner — candron.com/resources/lead-time-planner'].join('\n')
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { setCopied(false) }
  }

  function reset() {
    try { localStorage.removeItem(STORE) } catch { /* ignore */ }
    setProject('')
    setEnergize(iso(new Date(Date.now() + 52 * WEEK)))
    setPhases(defaultPhases())
    setRows(DEFAULT_ROWS.map((t, i) => newRow(t, i)))
    setIsExample(true)
  }

  return (
    <div className="rt-planner">
      {/* ── inputs ── */}
      <div className="rt-card rt-inputs">
        <div className="rt-card-head">
          <div className="rt-eyebrow">1 · Your project</div>
          {isExample && <span className="rt-pill rt-pill-info">Example project, edit anything</span>}
        </div>
        <div className="rt-fields">
          <label className="rt-field">
            <span>Project name (optional)</span>
            <input id="ltp-project" value={project} placeholder="e.g. Plant 3 expansion" onChange={e => { setProject(e.target.value); edit() }} />
          </label>
          <label className="rt-field">
            <span>Target energization date</span>
            <input id="ltp-energize" type="date" value={energize} onChange={e => { setEnergize(e.target.value); edit() }} />
          </label>
        </div>

        <div className="rt-eyebrow mt">2 · Equipment on the job</div>
        <div className="rt-rows">
          {rows.map((r, i) => {
            const t = typeOf(r.type)
            return (
              <div className="rt-row" key={r.key}>
                <label className="rt-field rt-field-type">
                  <span>Item {i + 1}</span>
                  <select id={`ltp-type-${r.key}`} value={r.type} onChange={e => { const nt = typeOf(e.target.value); setRows(rs => rs.map(x => x.key === r.key ? { ...x, type: nt.id, low: nt.low, high: nt.high } : x)); edit() }}>
                    {(['Transformers', 'Switchgear & distribution', 'Critical & standby power'] as const).map(g => (
                      <optgroup key={g} label={g}>{EQUIPMENT.filter(e => e.group === g).map(e => <option key={e.id} value={e.id}>{e.name}</option>)}</optgroup>
                    ))}
                  </select>
                </label>
                <label className="rt-field rt-field-tag">
                  <span>Tag</span>
                  <input id={`ltp-tag-${r.key}`} value={r.tag} placeholder="T-1" onChange={e => { setRows(rs => rs.map(x => x.key === r.key ? { ...x, tag: e.target.value } : x)); edit() }} />
                </label>
                <label className="rt-field rt-field-num">
                  <span>Lead time (wk)</span>
                  <div className="rt-range">
                    <input id={`ltp-low-${r.key}`} type="number" min={0} max={260} value={r.low} aria-label="Shortest lead time in weeks" onChange={e => { const v = Math.max(0, Number(e.target.value) || 0); setRows(rs => rs.map(x => x.key === r.key ? { ...x, low: v, high: Math.max(v, x.high) } : x)); edit() }} />
                    <em>to</em>
                    <input id={`ltp-high-${r.key}`} type="number" min={0} max={260} value={r.high} aria-label="Longest lead time in weeks" onChange={e => { const v = Math.max(0, Number(e.target.value) || 0); setRows(rs => rs.map(x => x.key === r.key ? { ...x, high: v, low: Math.min(v, x.low) } : x)); edit() }} />
                  </div>
                </label>
                <button type="button" className="rt-icon-btn" aria-label={`Remove ${t.name}`} onClick={() => { setRows(rs => rs.filter(x => x.key !== r.key)); edit() }} disabled={rows.length === 1}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
                </button>
                <p className="rt-note">{t.note}</p>
              </div>
            )
          })}
        </div>
        <button type="button" className="rt-add" onClick={() => { setRows(rs => [...rs, newRow('lv-dry', rs.length)]); edit() }}>+ Add equipment</button>

        <details className="rt-phases">
          <summary><span className="rt-eyebrow">3 · Project phases (weeks)</span><em>Adjust if your submittal, inspection or install times differ</em></summary>
          <div className="rt-phase-grid">
            {PHASES.filter(p => p.id !== 'build').map(p => (
              <label key={p.id} className="rt-field" title={p.tip}>
                <span>{p.label}</span>
                <input id={`ltp-phase-${p.id}`} type="number" min={0} max={52} value={phases[p.id]} onChange={e => { setPhases(ph => ({ ...ph, [p.id]: Math.max(0, Number(e.target.value) || 0) })); edit() }} />
                <small>{p.tip}</small>
              </label>
            ))}
          </div>
        </details>
      </div>

      {/* ── results ── */}
      <div className="rt-card rt-results">
        <div className="rt-card-head">
          <div className="rt-eyebrow">Order-by schedule{project ? ` · ${project}` : ''}</div>
          <span className={`rt-pill rt-pill-${worst}`}>{worst === 'ok' ? 'All items on track' : worst === 'risk' ? `${counts.risk + counts.late} item${counts.risk + counts.late > 1 ? 's' : ''} need attention` : `${counts.late} item${counts.late > 1 ? 's' : ''} already late`}</span>
        </div>
        <p className="rt-target">Energization <strong>{target ? fmt(target) : '—'}</strong> · Today {fmt(today)}</p>

        <div className="rt-table-wrap">
          <table className="rt-table">
            <thead><tr><th>Equipment</th><th>Order by</th><th>Best case</th><th>Status</th></tr></thead>
            <tbody>
              {results.map(x => (
                <tr key={x.r.key}>
                  <th scope="row">{x.t.name}{x.r.tag && <small>{x.r.tag}</small>}<small>{x.r.low}–{x.r.high} wk build · {x.total} wk total</small></th>
                  <td className="rt-num">{x.safe ? fmt(x.safe) : '—'}</td>
                  <td className="rt-num rt-muted">{x.best ? fmt(x.best) : '—'}</td>
                  <td><span className={`rt-status rt-status-${x.status}`}>{STATUS_TEXT[x.status]}</span><small className="rt-float">{x.status === 'ok' ? `${x.float} wk float` : x.status === 'risk' ? `${Math.abs(x.float)} wk past safe date` : 'Even best case misses'}</small></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* timeline */}
        <div className="rt-gantt" aria-label="Timeline from order to energization for each item">
          <div className="rt-gantt-axis">
            <span>{fmt(start)}</span><span>{target ? fmt(target) : ''}</span>
          </div>
          {results.map(x => {
            if (!x.safe || !target) return null
            let cursor = x.safe.getTime()
            const segs = PHASES.map(p => {
              const w = p.id === 'build' ? x.r.high : phases[p.id] || 0
              const s = cursor
              cursor += w * WEEK
              return { id: p.id, label: p.label, left: pct(new Date(s)), width: (w * WEEK / span) * 100 }
            })
            return (
              <div className="rt-gantt-row" key={x.r.key}>
                <span className="rt-gantt-label">{x.r.tag || x.t.name}</span>
                <div className="rt-gantt-track">
                  {segs.map(sg => sg.width > 0 && <span key={sg.id} className={`rt-seg rt-seg-${sg.id}`} style={{ left: `${sg.left}%`, width: `${sg.width}%` }} title={sg.label} />)}
                  <span className="rt-today" style={{ left: `${Math.min(100, Math.max(0, pct(today)))}%` }} aria-hidden="true" />
                </div>
              </div>
            )
          })}
          <div className="rt-legend">
            {PHASES.map(p => <span key={p.id}><i className={`rt-seg-${p.id}`} />{p.label}</span>)}
            <span><i className="rt-today-key" />Today</span>
          </div>
        </div>

        <div className="rt-actions">
          <button type="button" className="btn btn-primary" onClick={csv}>Download CSV</button>
          <button type="button" className="btn btn-outline-blue" onClick={() => window.print()}>Print / save PDF</button>
          <button type="button" className="btn btn-outline-blue" onClick={copy}>{copied ? 'Copied' : 'Copy summary'}</button>
          <button type="button" className="rt-text-btn" onClick={reset}>Start over</button>
        </div>

        {worst !== 'ok' && (
          <div className="rt-callout">
            <strong>A date showing red or amber?</strong> CANDRON builds switchgear, switchboards and transformers in Toronto. <Link href="/contact?product=lead-time-planner">Ask for a current build slot</Link> and we&rsquo;ll reply the same business day.
          </div>
        )}
        <p className="rt-disclaimer">Lead times are indicative Canadian market ranges and change month to month. Replace them with your own quotes. Your entries stay in this browser only.</p>
      </div>
    </div>
  )
}
