import { cache } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { RowDataPacket } from 'mysql2/promise'
import { getDb, isDatabaseConfigured } from '@/lib/db'
import ProductDetail from './ProductDetail'

export const dynamic = 'force-dynamic'

type Summary = { name: string; short_description: string; sku: string }

// undefined = DB unreachable (let the client render its own error state); null = no such product
const getSummary = cache(async (slug: string): Promise<Summary | null | undefined> => {
  if (!isDatabaseConfigured()) return undefined
  try {
    const [rows] = await getDb().execute<(RowDataPacket & Summary)[]>('SELECT name, short_description, sku FROM products WHERE slug=? AND is_active=1 LIMIT 1', [slug])
    return rows[0] ?? null
  } catch {
    return undefined
  }
})

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = await getSummary((await params).slug)
  if (!product) return { title: 'Inventory' }
  return { title: `${product.name} (${product.sku})`, description: product.short_description || undefined }
}

export default async function InventoryProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (await getSummary(slug) === null) notFound()
  return <ProductDetail key={slug} slug={slug} />
}
