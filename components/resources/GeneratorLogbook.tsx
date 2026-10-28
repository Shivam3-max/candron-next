/** Printable logbook sheets for generator inspections and load tests. Dates are optional. */

const WEEKLY_COLS = ['Date', 'Fuel %', 'Oil', 'Coolant', 'Battery V', 'Charger', 'Heater', 'Auto', 'Leaks', 'Initials']
const MONTHLY_COLS = ['Date', 'Run (min)', 'kW', '% load', 'Volts', 'Hz', 'Oil psi', 'Coolant °C', 'Transfer (s)', 'Initials']
const SERVICE_COLS = ['Date', 'Visit', 'Contractor', 'Work done / defects found', 'Corrected?', 'Signature']

function LogTable({ cols, rows, dates = [], cls = '' }: { cols: string[]; rows: number; dates?: string[]; cls?: string }) {
  return (
    <div className="rt-table-wrap">
      <table className={`rt-table gl-log ${cls}`}>
        <thead><tr>{cols.map(c => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>
          {Array.from({ length: Math.max(rows, dates.length) }, (_, i) => (
            <tr key={i}>{cols.map((c, j) => <td key={c} className={j === 0 ? 'rt-num' : undefined}>{j === 0 ? dates[i] ?? '' : ''}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function GeneratorLogbook({ site = '', weekly = [], monthly = [], print = false }: { site?: string; weekly?: string[]; monthly?: string[]; print?: boolean }) {
  const page = print ? ' rp-page' : ''
  const head = (
    <div className="rp-fields">
      <span>{site ? `Site: ${site}` : 'Site'}</span><span>Generator / tag</span><span>kW rating</span><span>Year</span>
    </div>
  )
  return (
    <>
      <article className={`rt-sheet${page}`}>
        <div className="rt-sheet-head">
          <div className="rt-eyebrow">Log A · Every week</div>
          <h2>Weekly Inspection Log</h2>
          <p>Tick or note each check. Write any defect in the service record and who will fix it.</p>
          {head}
        </div>
        <LogTable cols={WEEKLY_COLS} rows={print ? 22 : 8} dates={weekly} cls="gl-weekly" />
      </article>
      <article className={`rt-sheet${page}`}>
        <div className="rt-sheet-head">
          <div className="rt-eyebrow">Log B · Every month</div>
          <h2>Monthly Load Test Log</h2>
          <p>Readings taken near the end of the run, once temperatures are stable. A run below 30% of nameplate should be flagged for a load bank test.</p>
          {head}
        </div>
        <LogTable cols={MONTHLY_COLS} rows={12} dates={monthly} cls="gl-monthly" />
      </article>
      <article className={`rt-sheet${page}`}>
        <div className="rt-sheet-head">
          <div className="rt-eyebrow">Log C · Contractor visits and repairs</div>
          <h2>Service & Defect Record</h2>
          <p>Semi-annual, annual and five-year visits, load bank tests, and every defect from the weekly and monthly logs until it is closed.</p>
          {head}
        </div>
        <LogTable cols={SERVICE_COLS} rows={print ? 14 : 6} cls="gl-service" />
      </article>
    </>
  )
}
