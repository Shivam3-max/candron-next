'use client'
import { useEffect, useState } from 'react'
import { loadSvg } from '@/components/LineArtStage'
import type { LineArtKind } from '@/lib/lineart-meta'

/**
 * Static (non-animated) line drawing used as the picture for a product that has no photos yet.
 * Shares the SVG cache with the animated hero sheets.
 */
export default function InventoryArt({ kind, className = '' }: { kind: LineArtKind; className?: string }) {
  const [svg, setSvg] = useState('')
  useEffect(() => {
    let live = true
    loadSvg(`/lineart/${kind}-iso.svg`).then(text => { if (live) setSvg(text) })
    return () => { live = false }
  }, [kind])
  return <div className={`inv-art ${className}`} aria-hidden="true" dangerouslySetInnerHTML={svg ? { __html: svg } : undefined} />
}
