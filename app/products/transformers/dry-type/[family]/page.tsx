import { notFound } from 'next/navigation'
import DryFamilyPage, { familyMetadata } from '@/components/drytype/DryFamilyPage'
import { DRY_HUB, FAMILIES } from '@/lib/dry-type'

type Props = { params: Promise<{ family: string }> }

// Families that live under /dry-type/<family>; LV and MV keep their own top-level URLs.
const nested = () => FAMILIES.filter(f => f.href.startsWith(`${DRY_HUB}/`))
const find = (id: string) => nested().find(f => f.href === `${DRY_HUB}/${id}`)

export const dynamicParams = false
export const generateStaticParams = () => nested().map(f => ({ family: f.href.split('/').pop()! }))

export async function generateMetadata({ params }: Props) {
  const f = find((await params).family)
  return f ? familyMetadata(f) : {}
}

export default async function Page({ params }: Props) {
  const f = find((await params).family)
  if (!f) notFound()
  return <DryFamilyPage f={f} />
}
