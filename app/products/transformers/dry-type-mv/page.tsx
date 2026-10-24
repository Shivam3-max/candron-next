import FamilyPage, { familyMetadata } from '@/components/range/FamilyPage'
import { DRY, familyOf } from '@/lib/dry-type'

export const metadata = familyMetadata(familyOf('mv'))

export default function Page() {
  return <FamilyPage r={DRY} f={familyOf('mv')} />
}
