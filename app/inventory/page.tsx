import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { breadcrumbLd } from '@/lib/seo'
import InventoryClient from './InventoryClient'

export const metadata: Metadata = {
  title: 'In-Stock Inventory',
  description: 'CANDRON transformers, switchgear and power distribution equipment in stock in Toronto — new, surplus and remanufactured.',
  alternates: { canonical: '/inventory' },
}

export default function InventoryPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Inventory', href: '/inventory' }])} />
      <InventoryClient />
    </>
  )
}
