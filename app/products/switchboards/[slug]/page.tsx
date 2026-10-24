import { notFound } from 'next/navigation'
import ProductPage, { productMetadata } from '@/components/range/ProductPage'
import { familyRoute } from '@/lib/ranges/core'
import { DIST } from '@/lib/ranges/dist'

type Props = { params: Promise<{ slug: string }> }

const route = familyRoute(DIST, 'lv')

export const dynamicParams = false
export const generateStaticParams = route.generateStaticParams

export async function generateMetadata({ params }: Props) {
  const p = route.find((await params).slug)
  return p ? productMetadata(DIST, p) : {}
}

export default async function Page({ params }: Props) {
  const p = route.find((await params).slug)
  if (!p) notFound()
  return <ProductPage r={DIST} p={p} />
}
