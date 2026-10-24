import FamilyPage, { familyMetadata } from '@/components/range/FamilyPage'
import { familyOf } from '@/lib/ranges/core'
import { DIST } from '@/lib/ranges/dist'

const f = familyOf(DIST, 'integrated')

export const metadata = familyMetadata(f)

export default function Page() {
  return <FamilyPage r={DIST} f={f} />
}
