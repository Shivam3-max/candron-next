import FamilyPage, { familyMetadata } from '@/components/range/FamilyPage'
import { familyOf } from '@/lib/ranges/core'
import { LOADBANKS } from '@/lib/ranges/loadbanks'

const f = familyOf(LOADBANKS, 'dc')

export const metadata = familyMetadata(f)

export default function Page() {
  return <FamilyPage r={LOADBANKS} f={f} />
}
