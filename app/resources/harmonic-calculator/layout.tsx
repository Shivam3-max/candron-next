import type { Metadata } from 'next'

// The page is a client component, so its metadata lives here
export const metadata: Metadata = {
  title: 'Harmonic Calculator',
  description: 'Calculate total harmonic distortion (THD) and K-factor to choose the right K-rated transformer for non-linear loads.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
