import type { Metadata } from 'next'
import { ChecklistSheet } from '@/components/resources/Checklist'
import { COLD_REFS, COLD_SHEETS, COLD_TITLE } from '@/lib/resources/cold-climate'

// Print layout used to generate the downloadable PDF (scripts/resources/build-pdfs.sh).
export const metadata: Metadata = {
  title: `${COLD_TITLE} — Print`,
  robots: { index: false, follow: false },
}

export default function ColdClimatePrint() {
  return (
    <div className="rp-doc">
      <section className="rp-cover rp-page">
        <div className="rp-brand">CANDRON ENERGY INC.</div>
        <div>
          <div className="rt-eyebrow">Free resource · Project toolkit</div>
          <h1>{COLD_TITLE}</h1>
          <p>What to specify, test, ship, install, energize and maintain so switchgear, transformers and e-houses work at northern and Arctic sites.</p>
        </div>
        <ol className="rp-contents">
          {COLD_SHEETS.map(s => <li key={s.id}><b>{s.code}</b>{s.title}</li>)}
        </ol>
        <div className="rp-cover-foot">
          <p>General guidance only. Follow the manufacturer’s instructions, the project specification and the authority having jurisdiction. References: {COLD_REFS}.</p>
          <p>CANDRON Energy Inc. · Providers of Canadian-made electrical equipment · candron.com · +1 (647) 616-2595</p>
        </div>
      </section>
      {COLD_SHEETS.map(s => <ChecklistSheet key={s.id} s={s} print />)}
    </div>
  )
}
