import { notFound } from 'next/navigation'
import ProductPage, { productMetadata } from '@/components/range/ProductPage'
import { DRY, findProduct, productsIn } from '@/lib/dry-type'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => productsIn('lv').map(p => ({ slug: p.slug }))

export async function generateMetadata({ params }: Props) {
  const p = findProduct('lv', (await params).slug)
  return p ? productMetadata(DRY, p) : {}
}

export default async function Page({ params }: Props) {
  const p = findProduct('lv', (await params).slug)
  if (!p) notFound()
  return <ProductPage r={DRY} p={p} />
}
