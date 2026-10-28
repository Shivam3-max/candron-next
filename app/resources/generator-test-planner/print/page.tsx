import type { Metadata } from 'next'
import GeneratorLogbook from '@/components/resources/GeneratorLogbook'
import { GEN_REFS, TASKS } from '@/lib/resources/generator-tests'

// Print layout used to generate the downloadable logbook PDF (scripts/resources/build-pdfs.sh).
export const metadata: Metadata = {
  title: 'Generator Test Logbook — Print',
  robots: { index: false, follow: false },
}

export default function GeneratorLogbookPrint() {
  return (
    <div className="rp-doc">
      <section className="rp-cover rp-page">
        <div className="rp-brand">CANDRON ENERGY INC.</div>
        <div>
          <div className="rt-eyebrow">Free resource · Project toolkit</div>
          <h1>Generator Test Logbook</h1>
          <p>Weekly inspections, monthly load tests and contractor service for an emergency generator, for one year. Keep it in the generator room.</p>
        </div>
        <ol className="rp-contents">
          {TASKS.map((t, i) => <li key={t.id}><b>{String(i + 1).padStart(2, '0')}</b>{t.label} · {t.who}</li>)}
        </ol>
        <div className="rp-cover-foot">
          <p>A typical programme aligned with {GEN_REFS}. Confirm intervals, loads and durations with the current edition and your authority having jurisdiction. Monthly benchmark: at least 30% of nameplate for 60 minutes.</p>
          <p>CANDRON Energy Inc. · Providers of Canadian-made electrical equipment · candron.com · +1 (647) 616-2595</p>
        </div>
      </section>
      <article className="rt-sheet rp-page">
        <div className="rt-sheet-head">
          <div className="rt-eyebrow">What to check</div>
          <h2>Inspection & Test Programme</h2>
          <p>Use these lists with the logs that follow. Note every defect in the service record and close it with a name and date.</p>
        </div>
        <div className="rt-checks gl-print-tasks">
          {TASKS.map(t => (
            <section key={t.id} className="rt-check-group">
              <h3>{t.label} · {t.who}</h3>
              <ul>{t.items.map(i => <li key={i}><span className="rt-box" aria-hidden="true" /><div>{i}</div></li>)}</ul>
            </section>
          ))}
        </div>
      </article>
      <GeneratorLogbook print />
    </div>
  )
}
