export default function CanadaFlag({ height = 16 }: { height?: number }) {
  return (
    <span
      className="fi fi-ca"
      style={{ fontSize: height, borderRadius: '2px', flexShrink: 0, verticalAlign: 'middle' }}
      aria-label="Canadian flag"
    />
  )
}
