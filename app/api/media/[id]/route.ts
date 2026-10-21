import { NextResponse } from 'next/server'
import type { RowDataPacket } from 'mysql2/promise'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { getDb, isDatabaseConfigured } from '@/lib/db'

export const dynamic = 'force-dynamic'

const notFound = () => new NextResponse('Not found', { status: 404 })

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  if (!isDatabaseConfigured()) return notFound()

  try {
    const { id } = await context.params
    const [rows] = await getDb().execute<
      (RowDataPacket & { image_data: Buffer | null; mime_type: string; is_active: number })[]
    >(
      `SELECT pi.image_data, pi.mime_type, p.is_active
       FROM product_images pi JOIN products p ON p.id = pi.product_id
       WHERE pi.id=? LIMIT 1`,
      [Number(id)],
    )
    const image = rows[0]
    if (!image) return notFound()

    // Images of hidden products are only for signed-in admins
    const isPublic = Boolean(image.is_active)
    if (!isPublic && !(await getCurrentAdmin())) return notFound()
    // Short public cache so hiding a product takes effect within a day; never cache admin-only images
    const cacheControl = isPublic ? 'public, max-age=86400' : 'private, no-store'

    // Only admin uploads are served. Seeded catalog photos (external_url rows) carried
    // another manufacturer's nameplate and must never be shown.
    if (!image.image_data) return notFound()

    return new NextResponse(new Uint8Array(image.image_data), {
      headers: {
        'Content-Type': image.mime_type,
        'Cache-Control': cacheControl,
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    console.warn(
      '[media] Database unavailable while loading an inventory image.',
      error instanceof Error ? error.message : error,
    )
    return notFound()
  }
}
