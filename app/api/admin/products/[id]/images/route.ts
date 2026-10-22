import { NextResponse } from 'next/server'
import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import { getCurrentAdmin } from '@/lib/admin-auth'
import { getDb } from '@/lib/db'

const allowed = new Set(['image/jpeg', 'image/png', 'image/webp'])

// Uploads are public, so trust the file's signature rather than the browser-supplied type
function sniffImageType(b: Buffer) {
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'image/jpeg'
  if (b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'image/png'
  if (b.subarray(0, 4).toString('latin1') === 'RIFF' && b.subarray(8, 12).toString('latin1') === 'WEBP') return 'image/webp'
  return null
}
type Ctx = { params: Promise<{ id: string }> }

async function list(productId: number) {
  const [rows] = await getDb().execute<(RowDataPacket & { id: number; file_name: string })[]>(
    'SELECT id, file_name FROM product_images WHERE product_id=? AND image_data IS NOT NULL ORDER BY sort_order, id', [productId],
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
  const [found] = await db.execute<RowDataPacket[]>('SELECT 1 FROM products WHERE id=? LIMIT 1', [Number(id)])
  if (!found.length) return NextResponse.json({ error: 'Product not found.' }, { status: 404 })
  const data = Buffer.from(await file.arrayBuffer())
  const mimeType = sniffImageType(data)
  if (!mimeType) return NextResponse.json({ error: 'That file is not a valid JPG, PNG or WebP image.' }, { status: 400 })
  const [[{ next }]] = await db.execute<(RowDataPacket & { next: number })[]>(
    'SELECT COALESCE(MAX(sort_order), -1) + 1 next FROM product_images WHERE product_id=?', [Number(id)],
  )
  await db.execute<ResultSetHeader>(
    'INSERT INTO product_images (product_id,file_name,mime_type,image_data,external_url,sort_order) VALUES (?,?,?,?,NULL,?)',
    [Number(id), file.name.slice(0, 255), mimeType, data, Number(next)],
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
