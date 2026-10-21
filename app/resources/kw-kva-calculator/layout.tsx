import type { Metadata } from 'next'

// The page is a client component, so its metadata lives here
export const metadata: Metadata = {
  title: 'kW to kVA Converter',
  description: 'Convert between real power (kW), apparent power (kVA), and power factor to size transformers correctly.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
