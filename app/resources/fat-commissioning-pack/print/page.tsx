import type { Metadata } from 'next'
import { ChecklistSheet, PunchList } from '@/components/resources/Checklist'
import { PACK_REFS, PACK_TITLE, SHEETS } from '@/lib/resources/fat-pack'

// Print layout used to generate the downloadable PDF (scripts/resources/build-pdfs.sh).
export const metadata: Metadata = {
  title: `${PACK_TITLE} — Print`,
  robots: { index: false, follow: false },
}

export default function FatPackPrint() {
  return (
    <div className="rp-doc">
      <section className="rp-cover rp-page">
        <div className="rp-brand">CANDRON ENERGY INC.</div>
        <div>
          <div className="rt-eyebrow">Free resource · Project toolkit</div>
          <h1>{PACK_TITLE}</h1>
          <p>Factory acceptance test agendas, pre-energization checklists and a punch list for medium-voltage switchgear and transformers.</p>
        </div>
        <ol className="rp-contents">
          {SHEETS.map(s => <li key={s.id}><b>{s.code}</b>{s.title}</li>)}
          <li><b>E</b>Punch List & Sign-Off</li>
        </ol>
        <div className="rp-cover-foot">
          <p>General guidance only. Follow the manufacturer’s instructions, the project specification and the authority having jurisdiction. References: {PACK_REFS}.</p>
          <p>CANDRON Energy Inc. · Providers of Canadian-made electrical equipment · candron.com · +1 (647) 616-2595</p>
        </div>
      </section>
      {SHEETS.map(s => <ChecklistSheet key={s.id} s={s} print />)}
      <PunchList rows={10} print />
    </div>
  )
}
