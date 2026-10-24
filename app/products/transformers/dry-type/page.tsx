import HubPage, { hubMetadata } from '@/components/range/HubPage'
import { DRY } from '@/lib/dry-type'

export const metadata = hubMetadata(DRY)

export default function DryTypeHub() {
  return <HubPage r={DRY} />
}
