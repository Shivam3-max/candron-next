import { NextResponse } from 'next/server'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { getShopSettings, parseSettings, saveShopSettings, stripeConfigured, stripeLiveMode } from '@/lib/shop/settings'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json({ settings: await getShopSettings(), stripe: { configured: stripeConfigured(), live: stripeLiveMode() } })
}

export async function PUT(req: Request) {
  if (!(await getCurrentAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const settings = parseSettings(await req.json())
    if (settings.enabled && !stripeConfigured()) {
      return NextResponse.json({ error: 'Add STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET in Hostinger before switching online ordering on.' }, { status: 400 })
    }
    await saveShopSettings(settings)
    return NextResponse.json({ ok: true, settings })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Could not save settings.' }, { status: 400 })
  }
}
