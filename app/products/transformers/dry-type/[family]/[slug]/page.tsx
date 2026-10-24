import { notFound } from 'next/navigation'
import ProductPage, { productMetadata } from '@/components/range/ProductPage'
import { DRY, DRY_HUB, FAMILIES, findProduct, productsIn } from '@/lib/dry-type'

type Props = { params: Promise<{ family: string; slug: string }> }

const familyId = (segment: string) => FAMILIES.find(f => f.href === `${DRY_HUB}/${segment}`)?.id
const lookup = (family: string, slug: string) => {
  const id = familyId(family)
  return id ? findProduct(id, slug) : undefined
}

export const dynamicParams = false
export const generateStaticParams = () =>
  FAMILIES.filter(f => f.href.startsWith(`${DRY_HUB}/`)).flatMap(f =>
    productsIn(f.id).map(p => ({ family: f.href.split('/').pop()!, slug: p.slug })),
  )

export async function generateMetadata({ params }: Props) {
  const { family, slug } = await params
  const p = lookup(family, slug)
  return p ? productMetadata(DRY, p) : {}
}

export default async function Page({ params }: Props) {
  const { family, slug } = await params
  const p = lookup(family, slug)
  if (!p) notFound()
  return <ProductPage r={DRY} p={p} />
}
