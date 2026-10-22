import DryFamilyPage, { familyMetadata } from '@/components/drytype/DryFamilyPage'
import { familyOf } from '@/lib/dry-type'

export const metadata = familyMetadata(familyOf('mv'))

export default function Page() {
  return <DryFamilyPage f={familyOf('mv')} />
}
