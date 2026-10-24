import HubPage, { hubMetadata } from '@/components/range/HubPage'
import { LIQUID } from '@/lib/ranges/liquid'

export const metadata = hubMetadata(LIQUID)

export default function LiquidFilledHub() {
  return <HubPage r={LIQUID} />
}
