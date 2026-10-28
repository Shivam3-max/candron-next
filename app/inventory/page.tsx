import type { Metadata } from 'next'
import InventoryClient from './InventoryClient'

export const metadata: Metadata = {
  title: 'In-Stock Inventory',
  description: 'CANDRON transformers, switchgear and power distribution equipment in stock in Toronto — new, surplus and remanufactured, factory-tested and ready to ship from CANDRON, providers of Canadian-made electrical equipment.',
  alternates: { canonical: '/inventory' },
}

export default function InventoryPage() {
  return <InventoryClient />
}
