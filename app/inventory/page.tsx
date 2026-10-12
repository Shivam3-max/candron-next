import type { Metadata } from 'next'
import InventoryClient from './InventoryClient'
export const metadata:Metadata={title:'Available Inventory',description:'Search CANDRON new, used, and remanufactured power distribution equipment by rating, voltage, condition, and application.'}
export default function InventoryPage(){return <InventoryClient/>}
