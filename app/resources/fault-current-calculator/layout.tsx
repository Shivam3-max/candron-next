import type { Metadata } from 'next'

// The page is a client component, so its metadata lives here
export const metadata: Metadata = {
  title: 'Fault Current Calculator',
  description: 'Calculate available short-circuit current at the transformer secondary from kVA, secondary voltage, and percent impedance.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
