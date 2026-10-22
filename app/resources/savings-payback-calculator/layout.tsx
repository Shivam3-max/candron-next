import type { Metadata } from 'next'

// The page is a client component, so its metadata lives here
export const metadata: Metadata = {
  title: 'Transformer Savings & Payback Calculator',
  description: 'Compare the energy losses of two transformers and calculate how quickly a more efficient unit pays back its price premium.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
