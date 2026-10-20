'use client'
import { useState } from 'react'

export default function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      className="pd-code"
      onClick={async () => {
        try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1600) } catch { /* clipboard blocked */ }
      }}
      aria-label={`Item code ${code}, copy to clipboard`}
    >
      <span>Item</span>{code}<em>{copied ? 'Copied' : 'Copy'}</em>
    </button>
  )
}
