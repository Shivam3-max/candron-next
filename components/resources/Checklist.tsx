import { PUNCH_CATEGORIES, SIGNOFF_ROLES, type Sheet } from '@/lib/resources/fat-pack'

/** One checklist sheet: heading, when to use it, and grouped tick-box items. */
export function ChecklistSheet({ s, print = false }: { s: Sheet; print?: boolean }) {
  return (
    <article id={s.id} className={`rt-sheet rt-anchor${print ? ' rp-page' : ''}`}>
      <div className="rt-sheet-head">
        <div className="rt-eyebrow">Sheet {s.code} · {s.when}</div>
        <h2>{s.title}</h2>
        <p>{s.intro}</p>
        {print && (
          <div className="rp-fields">
            <span>Project</span><span>Equipment / tag</span><span>Date</span><span>Witness</span>
          </div>
        )}
      </div>
      <div className="rt-checks">
        {s.groups.map(g => (
          <section key={g.title} className="rt-check-group">
            <h3>{g.title}</h3>
            <ul>
              {g.items.map(i => (
                <li key={i.t}>
                  <span className="rt-box" aria-hidden="true" />
                  <div>{i.t}{i.d && <small>{i.d}</small>}</div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  )
}

/** Punch list and sign-off sheet with blank rows to fill in. */
export function PunchList({ rows = 12, print = false }: { rows?: number; print?: boolean }) {
  return (
    <article id="punch-list" className={`rt-sheet rt-anchor${print ? ' rp-page' : ''}`}>
      <div className="rt-sheet-head">
        <div className="rt-eyebrow">Sheet E · From FAT through handover</div>
        <h2>Punch List & Sign-Off</h2>
        <p>One list for every open item, from the factory test to handover. Give every item a category, an owner and a date, and close it with a name.</p>
        <div className="rp-cats">
          {PUNCH_CATEGORIES.map(c => <span key={c.code}><b>{c.code}</b> {c.label}</span>)}
        </div>
      </div>
      <div className="rt-table-wrap">
        <table className="rt-table rp-punch">
          <thead><tr><th>#</th><th>Tag</th><th>Description</th><th>Cat.</th><th>Owner</th><th>Due</th><th>Closed by / date</th></tr></thead>
          <tbody>
            {Array.from({ length: rows }, (_, i) => (
              <tr key={i}><td className="rt-num">{i + 1}</td><td /><td /><td /><td /><td /><td /></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rp-signoff">
        {SIGNOFF_ROLES.map(r => (
          <div key={r}><span>{r}</span><i>Name</i><i>Signature</i><i>Date</i></div>
        ))}
      </div>
    </article>
  )
}
