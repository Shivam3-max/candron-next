import type { Metadata } from 'next'

// The page is a client component, so its metadata lives here
export const metadata: Metadata = {
  title: 'Transformer Inductance Calculator',
  description: 'Calculate transformer leakage reactance and inductance from kVA, voltage, and percent impedance.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
