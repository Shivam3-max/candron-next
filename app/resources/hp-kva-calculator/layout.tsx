import type { Metadata } from 'next'

// The page is a client component, so its metadata lives here
export const metadata: Metadata = {
  title: 'HP to kVA Calculator',
  description: 'Convert motor horsepower to transformer kVA, accounting for motor efficiency and power factor.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
