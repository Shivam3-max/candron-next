import { notFound } from 'next/navigation'
import ProductPage, { productMetadata } from '@/components/range/ProductPage'
import { familyRoute } from '@/lib/ranges/core'
import { LOADBANKS } from '@/lib/ranges/loadbanks'

type Props = { params: Promise<{ slug: string }> }

const route = familyRoute(LOADBANKS, 'dc')

export const dynamicParams = false
export const generateStaticParams = route.generateStaticParams

export async function generateMetadata({ params }: Props) {
  const p = route.find((await params).slug)
  return p ? productMetadata(LOADBANKS, p) : {}
}

export default async function Page({ params }: Props) {
  const p = route.find((await params).slug)
  if (!p) notFound()
  return <ProductPage r={LOADBANKS} p={p} />
}
