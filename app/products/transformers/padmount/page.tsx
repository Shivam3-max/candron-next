import FamilyPage, { familyMetadata } from '@/components/range/FamilyPage'
import { familyOf } from '@/lib/ranges/core'
import { LIQUID } from '@/lib/ranges/liquid'

const f = familyOf(LIQUID, 'padmount')

export const metadata = familyMetadata(f)

export default function Page() {
  return <FamilyPage r={LIQUID} f={f} />
}
