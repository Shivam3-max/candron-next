/** Front and side elevation outline drawn to the product's real proportions, with dimension lines. */
export default function DimensionDrawing({ h, w, d, unit }: { h: number | null; w: number | null; d: number | null; unit: string }) {
  if (!h || !w) return null
  const depth = d || w * 0.6
  const scale = 170 / Math.max(h, w + depth)
  const W = w * scale, H = h * scale, D = depth * scale
  const gap = 34
  const fmt = (v: number) => `${v.toLocaleString('en-CA', { maximumFractionDigits: 1 })} ${unit}`
  const x0 = 30, y0 = 20
  const sx = x0 + W + gap
  const vbW = sx + D + 52, vbH = y0 + H + 52
  return (
    <svg className="pd-dims" viewBox={`0 0 ${vbW} ${vbH}`} role="img" aria-label={`Height ${fmt(h)}, width ${fmt(w)}${d ? `, depth ${fmt(d)}` : ''}`}>
      <rect x={x0} y={y0} width={W} height={H} className="pd-dims-body" />
      <line x1={x0 + W / 2} y1={y0 + 4} x2={x0 + W / 2} y2={y0 + H - 4} className="pd-dims-center" />
      {d ? <rect x={sx} y={y0} width={D} height={H} className="pd-dims-body" /> : null}
      <line x1={x0 - 12} y1={y0 + H + 1} x2={sx + (d ? D : 0) + 12} y2={y0 + H + 1} className="pd-dims-floor" />
      {/* width */}
      <line x1={x0} y1={y0 + H + 18} x2={x0 + W} y2={y0 + H + 18} className="pd-dims-line" />
      <line x1={x0} y1={y0 + H + 12} x2={x0} y2={y0 + H + 24} className="pd-dims-line" />
      <line x1={x0 + W} y1={y0 + H + 12} x2={x0 + W} y2={y0 + H + 24} className="pd-dims-line" />
      <text x={x0 + W / 2} y={y0 + H + 34} className="pd-dims-text">W {fmt(w)}</text>
      {/* height */}
      <line x1={x0 - 16} y1={y0} x2={x0 - 16} y2={y0 + H} className="pd-dims-line" />
      <line x1={x0 - 22} y1={y0} x2={x0 - 10} y2={y0} className="pd-dims-line" />
      <line x1={x0 - 22} y1={y0 + H} x2={x0 - 10} y2={y0 + H} className="pd-dims-line" />
      <text x={x0 - 20} y={y0 + H / 2} className="pd-dims-text" transform={`rotate(-90 ${x0 - 20} ${y0 + H / 2})`}>H {fmt(h)}</text>
      {d ? (
        <>
          <line x1={sx} y1={y0 + H + 18} x2={sx + D} y2={y0 + H + 18} className="pd-dims-line" />
          <line x1={sx} y1={y0 + H + 12} x2={sx} y2={y0 + H + 24} className="pd-dims-line" />
          <line x1={sx + D} y1={y0 + H + 12} x2={sx + D} y2={y0 + H + 24} className="pd-dims-line" />
          <text x={sx + D / 2} y={y0 + H + 34} className="pd-dims-text">D {fmt(d)}</text>
        </>
      ) : null}
      <text x={x0 + W / 2} y={y0 - 6} className="pd-dims-label">FRONT</text>
      {d ? <text x={sx + D / 2} y={y0 - 6} className="pd-dims-label">SIDE</text> : null}
    </svg>
  )
}
