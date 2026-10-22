import DryFamilyPage, { familyMetadata } from '@/components/drytype/DryFamilyPage'
import { familyOf } from '@/lib/dry-type'

export const metadata = familyMetadata(familyOf('lv'))

export default function Page() {
  return <DryFamilyPage f={familyOf('lv')} />
}
