import { notFound } from 'next/navigation'
import DryProductPage, { dryMetadata } from '@/components/drytype/DryProductPage'
import { findProduct, productsIn } from '@/lib/dry-type'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => productsIn('mv').map(p => ({ slug: p.slug }))

export async function generateMetadata({ params }: Props) {
  const p = findProduct('mv', (await params).slug)
  return p ? dryMetadata(p) : {}
}

export default async function Page({ params }: Props) {
  const p = findProduct('mv', (await params).slug)
  if (!p) notFound()
  return <DryProductPage p={p} />
}
