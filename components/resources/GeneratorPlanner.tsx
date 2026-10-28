'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import GeneratorLogbook from '@/components/resources/GeneratorLogbook'
import { MIN_LOAD_FRACTION, OCCUPANCIES, ORDINALS, TASKS, WEEKDAYS } from '@/lib/resources/generator-tests'

const STORE = 'candron-generator-test-planner-v1'
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const ICS_DAYS = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']

interface Plan {
  site: string; kw: number; load: number; occupancy: string; start: string
  inspectDay: number; testWeek: number; testDay: number; serviceMonth: number; bankHours: number
}

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const fmt = (d: Date) => d.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })
const fmtLong = (d: Date) => d.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })

function firstOfMonth() { const d = new Date(); return iso(new Date(d.getFullYear(), d.getMonth(), 1)) }
const EXAMPLE: Plan = { site: '', kw: 500, load: 120, occupancy: 'general', start: '', inspectDay: 1, testWeek: 0, testDay: 2, serviceMonth: 4, bankHours: 2 }

function loadInitial(): { plan: Plan; isExample: boolean } {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE) || 'null') as Plan | null
    if (saved?.start) return { plan: { ...EXAMPLE, ...saved }, isExample: false }
  } catch { /* storage unavailable */ }
  return { plan: { ...EXAMPLE, start: firstOfMonth() }, isExample: true }
}

/** The nth given weekday of a month (n is 0-based). */
function nthWeekday(year: number, month: number, weekday: number, n: number) {
  const first = new Date(year, month, 1)
  const offset = (weekday - first.getDay() + 7) % 7
  return new Date(year, month, 1 + offset + n * 7)
}

/** Builds a 12-month inspection and test calendar from the inputs. */
export default function GeneratorPlanner() {
  const [initial] = useState(loadInitial)
  const [p, setP] = useState<Plan>(initial.plan)
  const [isExample, setIsExample] = useState(initial.isExample)

  useEffect(() => {
    if (isExample) return
    try { localStorage.setItem(STORE, JSON.stringify(p)) } catch { /* storage unavailable */ }
  }, [isExample, p])

  const set = <K extends keyof Plan>(k: K, v: Plan[K]) => { setP(x => ({ ...x, [k]: v })); setIsExample(false) }
  const num = (v: string, max: number) => Math.min(max, Math.max(0, Number(v) || 0))

  const start = useMemo(() => new Date(`${p.start || firstOfMonth()}T00:00:00`), [p.start])
  const minLoad = Math.round(p.kw * MIN_LOAD_FRACTION)
  const loadPct = p.kw > 0 ? Math.round((p.load / p.kw) * 100) : 0
  const needsBank = p.kw > 0 && p.load < minLoad
  const occ = OCCUPANCIES.find(o => o.id === p.occupancy) ?? OCCUPANCIES[0]

  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => {
    const y = start.getFullYear() + Math.floor((start.getMonth() + i) / 12)
    const m = (start.getMonth() + i) % 12
    const weekly: Date[] = []
    for (let d = nthWeekday(y, m, p.inspectDay, 0); d.getMonth() === m; d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7)) {
      if (d >= start) weekly.push(d)
    }
    const test = nthWeekday(y, m, p.testDay, p.testWeek)
    const visits: string[] = []
    if (m === p.serviceMonth) visits.push('Annual service & load test')
    else if (m === (p.serviceMonth + 6) % 12) visits.push('Semi-annual service')
    return { y, m, weekly, test: test >= start ? test : null, visits }
  }), [start, p.inspectDay, p.testDay, p.testWeek, p.serviceMonth])

  const weeklyDates = months.flatMap(x => x.weekly)
  const monthlyDates = months.flatMap(x => (x.test ? [x.test] : []))
  const label = p.site || 'Generator'

  function download(name: string, body: string, type: string) {
    const url = URL.createObjectURL(new Blob([body], { type }))
    const a = document.createElement('a')
    a.href = url
    a.download = name
    a.click()
    URL.revokeObjectURL(url)
  }
  const slug = (p.site || 'generator').toLowerCase().replace(/[^a-z0-9]+/g, '-')

  function ics() {
    const stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z'
    const firstTest = monthlyDates[0] ?? start
    const firstWeekly = weeklyDates[0] ?? start
    const service = months.find(x => x.m === p.serviceMonth) ?? months[0]
    const semi = months.find(x => x.m === (p.serviceMonth + 6) % 12) ?? months[0]
    const day = (d: Date) => iso(d).replace(/-/g, '')
    const ev = (uid: string, d: Date, rrule: string, title: string, desc: string) => [
      'BEGIN:VEVENT', `UID:${uid}-${slug}@candron.com`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${day(d)}`, rrule,
      `SUMMARY:${label}: ${title}`, `DESCRIPTION:${desc.replace(/,/g, '\\,')}`, 'END:VEVENT']
    const lines = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//CANDRON Energy//Generator Test Planner//EN', 'CALSCALE:GREGORIAN',
      ...ev('weekly', firstWeekly, `RRULE:FREQ=WEEKLY;BYDAY=${ICS_DAYS[p.inspectDay]}`, 'Weekly generator inspection', 'Walk-round checks and log entry.'),
      ...ev('monthly', firstTest, `RRULE:FREQ=MONTHLY;BYDAY=${p.testWeek + 1}${ICS_DAYS[p.testDay]}`, 'Monthly generator load test', `Run on load for at least 60 minutes at ${minLoad} kW (30% of nameplate) or more. Record readings.`),
      ...ev('semiannual', new Date(semi.y, semi.m, 1), 'RRULE:FREQ=YEARLY', 'Book semi-annual generator service', 'Qualified contractor visit.'),
      ...ev('annual', new Date(service.y, service.m, 1), 'RRULE:FREQ=YEARLY', 'Book annual generator service and load test', `Annual service. Load bank test for ${p.bankHours} h if monthly tests ran under 30% load.`),
      'END:VCALENDAR',
    ]
    download(`generator-test-calendar-${slug}.ics`, lines.join('\r\n'), 'text/calendar')
  }

  function csv() {
    const rows = [['Date', 'Task', 'Who']]
    months.forEach(x => {
      x.weekly.forEach(d => rows.push([iso(d), 'Weekly inspection', 'Owner / operator']))
      if (x.test) rows.push([iso(x.test), `Monthly load test (min ${minLoad} kW, 60 min)`, 'Owner / operator'])
      x.visits.forEach(v => rows.push([`${x.y}-${String(x.m + 1).padStart(2, '0')}`, v, 'Qualified contractor']))
    })
    rows.sort((a, b) => (a[0] < b[0] ? -1 : 1))
    const body = [[`Site: ${label}`], [`Nameplate: ${p.kw} kW`], [], ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
    download(`generator-test-schedule-${slug}.csv`, body, 'text/csv')
  }

  function reset() {
    try { localStorage.removeItem(STORE) } catch { /* ignore */ }
    setP({ ...EXAMPLE, start: firstOfMonth() })
    setIsExample(true)
  }

  return (
    <div className="rt-planner">
      <div className="rt-card rt-inputs">
        <div className="rt-card-head">
          <div className="rt-eyebrow">1 · Your generator</div>
          {isExample && <span className="rt-pill rt-pill-info">Example set, edit anything</span>}
        </div>
        <div className="rt-fields">
          <label className="rt-field"><span>Site or generator name</span><input id="gtp-site" value={p.site} placeholder="e.g. 120 King St · GEN-1" onChange={e => set('site', e.target.value)} /></label>
          <label className="rt-field"><span>Building type</span>
            <select id="gtp-occ" value={p.occupancy} onChange={e => set('occupancy', e.target.value)}>
              {OCCUPANCIES.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
            </select>
          </label>
          <label className="rt-field"><span>Nameplate rating (kW)</span><input id="gtp-kw" type="number" min={0} max={5000} value={p.kw} onChange={e => set('kw', num(e.target.value, 5000))} /></label>
          <label className="rt-field"><span>Building load on transfer (kW)</span><input id="gtp-load" type="number" min={0} max={5000} value={p.load} onChange={e => set('load', num(e.target.value, 5000))} /><small>What the set actually carries during a monthly test.</small></label>
        </div>

        <div className={`rt-callout gl-load ${needsBank ? 'is-low' : 'is-ok'}`}>
          <strong>Building load is {loadPct}% of nameplate.</strong>{' '}
          {needsBank
            ? <>The monthly benchmark is {minLoad} kW (30%). Running lighter than that lets unburnt fuel build up (wet-stacking), so plan a load bank test, or <Link href="/products/load-banks">add a permanent load bank</Link> for monthly runs.</>
            : <>That meets the 30% benchmark of {minLoad} kW, so monthly tests on building load should load the engine properly.</>}
        </div>

        <div className="rt-eyebrow mt">2 · When tests happen</div>
        <div className="rt-fields">
          <label className="rt-field"><span>Programme starts</span><input id="gtp-start" type="date" value={p.start} onChange={e => set('start', e.target.value)} /></label>
          <label className="rt-field"><span>Weekly inspection day</span>
            <select id="gtp-inspect" value={p.inspectDay} onChange={e => set('inspectDay', Number(e.target.value))}>{WEEKDAYS.map((d, i) => <option key={d} value={i}>{d}</option>)}</select>
          </label>
          <label className="rt-field"><span>Monthly load test</span>
            <div className="gl-pair">
              <select id="gtp-week" aria-label="Week of the month" value={p.testWeek} onChange={e => set('testWeek', Number(e.target.value))}>{ORDINALS.map((o, i) => <option key={o} value={i}>{o}</option>)}</select>
              <select id="gtp-day" aria-label="Day of the week" value={p.testDay} onChange={e => set('testDay', Number(e.target.value))}>{WEEKDAYS.map((d, i) => <option key={d} value={i}>{d}</option>)}</select>
            </div>
          </label>
          <label className="rt-field"><span>Annual service month</span>
            <select id="gtp-month" value={p.serviceMonth} onChange={e => set('serviceMonth', Number(e.target.value))}>{MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}</select>
            <small>The semi-annual visit falls six months later.</small>
          </label>
          <label className="rt-field"><span>Annual load bank test (hours)</span><input id="gtp-hours" type="number" min={0.5} max={8} step={0.5} value={p.bankHours} onChange={e => set('bankHours', Math.min(8, Math.max(0.5, Number(e.target.value) || 0.5)))} /><small>Confirm the duration in the C282 edition your inspector enforces.</small></label>
        </div>
        <p className="rt-note gl-occ">{occ.note}</p>
      </div>

      <div className="rt-card rt-results">
        <div className="rt-card-head">
          <div className="rt-eyebrow">12-month test calendar · {label}</div>
          <span className={`rt-pill ${needsBank ? 'rt-pill-risk' : 'rt-pill-ok'}`}>{needsBank ? 'Load bank needed' : 'Building load OK'}</span>
        </div>
        <p className="rt-target">{p.kw} kW set · monthly test at <strong>{minLoad} kW or more for 60 min</strong> · {weeklyDates.length} weekly inspections</p>

        <div className="rt-table-wrap">
          <table className="rt-table gl-cal">
            <thead><tr><th>Month</th><th>Weekly inspections</th><th>Load test</th><th>Contractor</th></tr></thead>
            <tbody>
              {months.map(x => (
                <tr key={`${x.y}-${x.m}`}>
                  <th scope="row">{MONTHS[x.m].slice(0, 3)} {x.y}</th>
                  <td className="gl-days">{x.weekly.map(d => d.getDate()).join(', ') || '—'}</td>
                  <td className="rt-num">{x.test ? fmt(x.test) : '—'}</td>
                  <td>{x.visits.length ? x.visits.map(v => <span key={v} className={`rt-status ${v.startsWith('Annual') ? 'rt-status-risk' : 'rt-status-ok'}`}>{v.startsWith('Annual') ? 'Annual' : 'Semi-annual'}</span>) : <span className="rt-muted">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rt-actions">
          <button type="button" className="btn btn-primary" onClick={ics}>Add to calendar (.ics)</button>
          <button type="button" className="btn btn-outline-blue" onClick={() => window.print()}>Print logbook</button>
          <button type="button" className="btn btn-outline-blue" onClick={csv}>Download CSV</button>
          <button type="button" className="rt-text-btn" onClick={reset}>Start over</button>
        </div>

        {needsBank && (
          <div className="rt-callout">
            <strong>Building too light to load the set?</strong> CANDRON provides Canadian-made load banks and runs load bank tests with our field team. <Link href="/contact?product=generator-test-planner">Ask for a load bank test</Link> and we&rsquo;ll reply the same business day.
          </div>
        )}
        <p className="rt-disclaimer">A typical programme aligned with CSA C282{p.occupancy === 'health' ? ' and CSA Z32' : ''}. Confirm intervals, loads and durations with the current edition and your authority having jurisdiction. Your entries stay in this browser only. First calendar date {weeklyDates[0] ? fmtLong(weeklyDates[0]) : '—'}.</p>
      </div>

      <div className="gl-print-log">
        <GeneratorLogbook site={p.site} weekly={weeklyDates.slice(0, 13).map(fmtLong)} monthly={monthlyDates.map(fmtLong)} />
      </div>
      <div className="gl-tasks rt-no-print">
        {TASKS.map(t => (
          <section key={t.id} className="rt-check-group">
            <h3>{t.label} <small>· {t.who}</small></h3>
            <p className="gl-task-sum">{t.id === 'annual' ? `${t.summary} This plan uses ${p.bankHours} h.` : t.summary}</p>
            <ul>{t.items.map(i => <li key={i}><span className="rt-box" aria-hidden="true" /><div>{i}</div></li>)}</ul>
          </section>
        ))}
      </div>
    </div>
  )
}
