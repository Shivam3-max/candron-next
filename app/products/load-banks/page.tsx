import HubPage, { hubMetadata } from '@/components/range/HubPage'
import { LOADBANKS } from '@/lib/ranges/loadbanks'

export const metadata = hubMetadata(LOADBANKS)

export default function LoadBanksHub() {
  return <HubPage r={LOADBANKS} />
}
