'use client'
import { useState, type ReactNode } from 'react'

/** Always open on tablet/desktop; on phones the content starts folded behind a button. */
export default function MobileCollapse({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`dt-collapse${open ? ' is-open' : ''}`}>
      <div className="dt-collapse-body">{children}</div>
      <button type="button" className="dt-collapse-btn" aria-expanded={open} onClick={() => setOpen(o => !o)}>
        {open ? 'Show less' : label}
        <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
    </div>
  )
}
