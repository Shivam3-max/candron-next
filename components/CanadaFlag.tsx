export default function CanadaFlag({ height = 16 }: { height?: number }) {
  return (
    <span
      className="fi fi-ca rounded-[2px] shrink-0 align-middle"
      style={{ fontSize: height }}
      aria-label="Canadian flag"
    />
  )
}
