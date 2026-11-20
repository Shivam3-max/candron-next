// In-memory fixed-window rate limiter (per process; resets on restart). Enough to stop
// casual abuse of public POST endpoints on a single Hostinger Node instance.
const buckets = new Map<string, { count: number; resetAt: number }>()

export function clientIp(req: Request) {
  // The right-most X-Forwarded-For entry is the one our proxy added
  const forwarded = req.headers.get('x-forwarded-for')?.split(',').map(p => p.trim()).filter(Boolean)
  return forwarded?.at(-1) || req.headers.get('x-real-ip') || 'unknown'
}

export function rateLimited(key: string, max: number, windowMs: number) {
  const now = Date.now()
  if (buckets.size > 5000) for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k)
  const entry = buckets.get(key)
  if (!entry || now > entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return false
  }
  entry.count += 1
  return entry.count > max
}

/** Absolute site origin for links sent to Stripe and emails. */
export function siteOrigin(req: Request) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '')
  if (process.env.NODE_ENV === 'production') return 'https://candron.com'
  return new URL(req.url).origin
}
