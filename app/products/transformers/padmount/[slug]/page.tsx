import { notFound } from 'next/navigation'
import ProductPage, { productMetadata } from '@/components/range/ProductPage'
import { familyRoute } from '@/lib/ranges/core'
import { LIQUID } from '@/lib/ranges/liquid'

type Props = { params: Promise<{ slug: string }> }

const route = familyRoute(LIQUID, 'padmount')

export const dynamicParams = false
export const generateStaticParams = route.generateStaticParams

export async function generateMetadata({ params }: Props) {
  const p = route.find((await params).slug)
  return p ? productMetadata(LIQUID, p) : {}
}

export default async function Page({ params }: Props) {
  const p = route.find((await params).slug)
  if (!p) notFound()
  return <ProductPage r={LIQUID} p={p} />
}
