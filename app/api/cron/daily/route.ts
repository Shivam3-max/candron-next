import { NextResponse } from 'next/server'
import { timingSafeEqual } from 'node:crypto'
import { isDatabaseConfigured } from '@/lib/db'
import { runDailyTasks } from '@/lib/shop/orders'

export const dynamic = 'force-dynamic'

/**
 * Daily shop tasks (deposit balance reminders, forfeit flags). Call once a day from a scheduler
 * (e.g. a Hostinger cron job) with the header `Authorization: Bearer <CRON_SECRET>`.
 * The same tasks also run when an admin opens Orders, so a missed day only delays them.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET
  const given = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '')
  const ok = Boolean(secret && secret.length >= 16 && given.length === secret.length && timingSafeEqual(Buffer.from(given), Buffer.from(secret)))
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!isDatabaseConfigured()) return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  try {
    return NextResponse.json({ ok: true, ...(await runDailyTasks()) })
  } catch (error) {
    console.error('[cron] daily tasks failed', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'Daily tasks failed' }, { status: 500 })
  }
}
