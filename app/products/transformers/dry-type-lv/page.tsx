import FamilyPage, { familyMetadata } from '@/components/range/FamilyPage'
import { DRY, familyOf } from '@/lib/dry-type'

export const metadata = familyMetadata(familyOf('lv'))

export default function Page() {
  return <FamilyPage r={DRY} f={familyOf('lv')} />
}
