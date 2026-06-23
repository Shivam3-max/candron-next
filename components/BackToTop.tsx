'use client'
import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      className={[
        'fixed bottom-8 right-8 z-[999]',
        'w-11 h-11 rounded-full',
        'bg-blue text-white border-0',
        'flex items-center justify-center cursor-pointer',
        'shadow-[0_4px_20px_rgba(0,71,255,.4)]',
        'transition-[opacity,transform,background,box-shadow] duration-300',
        'hover:bg-blue-h hover:shadow-[0_6px_28px_rgba(0,71,255,.55)] hover:-translate-y-0.5',
        'max-sm:bottom-5 max-sm:right-5 max-sm:w-10 max-sm:h-10',
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none',
      ].join(' ')}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 14V4M4 9l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}
