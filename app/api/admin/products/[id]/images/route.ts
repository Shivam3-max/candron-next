import { NextResponse } from 'next/server'
import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { getDb } from '@/lib/db'

const allowed = new Set(['image/jpeg', 'image/png', 'image/webp'])
type Ctx = { params: Promise<{ id: string }> }

async function list(productId: number) {
  const [rows] = await getDb().execute<(RowDataPacket & { id: number; file_name: string })[]>(
    'SELECT id, file_name FROM product_images WHERE product_id=? ORDER BY sort_order, id', [productId],
  )
  return rows.map(r => ({ id: r.id, name: r.file_name, url: `/api/media/${r.id}` }))
}

/** List a product's images in display order. */
export async function GET(_: Request, context: Ctx) {
  if (!await getCurrentAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await context.params
  return NextResponse.json({ images: await list(Number(id)) })
}

/** Upload one image; it is added at the end of the gallery. */
export async function POST(request: Request, context: Ctx) {
  if (!await getCurrentAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await context.params
  const form = await request.formData()
  const file = form.get('image')
  if (!(file instanceof File)) return NextResponse.json({ error: 'Select an image.' }, { status: 400 })
  if (!allowed.has(file.type)) return NextResponse.json({ error: 'Use JPG, PNG or WebP.' }, { status: 400 })
  if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: 'Images must be 5 MB or smaller.' }, { status: 400 })
  const db = getDb()
  const [[{ next }]] = await db.execute<(RowDataPacket & { next: number })[]>(
    'SELECT COALESCE(MAX(sort_order), -1) + 1 next FROM product_images WHERE product_id=?', [Number(id)],
  )
  await db.execute<ResultSetHeader>(
    'INSERT INTO product_images (product_id,file_name,mime_type,image_data,external_url,sort_order) VALUES (?,?,?,?,NULL,?)',
    [Number(id), file.name.slice(0, 255), file.type, Buffer.from(await file.arrayBuffer()), Number(next)],
  )
  return NextResponse.json({ images: await list(Number(id)) }, { status: 201 })
}

/** Reorder: body { order: number[] } — first id becomes the main photo. */
export async function PATCH(request: Request, context: Ctx) {
  if (!await getCurrentAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await context.params
  const body = await request.json().catch(() => ({}))
  const order: number[] = Array.isArray(body.order) ? body.order.map(Number).filter(Number.isFinite) : []
  const db = getDb()
  for (const [i, imageId] of order.entries()) {
    await db.execute('UPDATE product_images SET sort_order=? WHERE id=? AND product_id=?', [i, imageId, Number(id)])
  }
  return NextResponse.json({ images: await list(Number(id)) })
}

/** Delete one image: ?imageId=123 */
export async function DELETE(request: Request, context: Ctx) {
  if (!await getCurrentAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await context.params
  const imageId = Number(new URL(request.url).searchParams.get('imageId'))
  await getDb().execute('DELETE FROM product_images WHERE id=? AND product_id=?', [imageId, Number(id)])
  return NextResponse.json({ images: await list(Number(id)) })
}
