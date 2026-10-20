import { NextResponse } from 'next/server'
import { getPublicProduct } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(_: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params
  const result = await getPublicProduct(slug)
  if (!result) return NextResponse.json({ error: 'Product not found.' }, { status: 404 })
  return NextResponse.json(result)
}
