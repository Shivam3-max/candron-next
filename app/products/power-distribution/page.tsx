import HubPage, { hubMetadata } from '@/components/range/HubPage'
import { DIST } from '@/lib/ranges/dist'

export const metadata = hubMetadata(DIST)

export default function PowerDistributionHub() {
  return <HubPage r={DIST} />
}
