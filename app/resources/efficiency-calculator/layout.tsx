import type { Metadata } from 'next'

// The page is a client component, so its metadata lives here
export const metadata: Metadata = {
  title: 'Transformer Efficiency Calculator',
  description: 'Calculate transformer efficiency at any load level and all-day efficiency from kVA and loss data.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
