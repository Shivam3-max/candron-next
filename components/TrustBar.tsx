import CanadaFlag from '@/components/CanadaFlag'

const items = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" style={{ width: 28, height: 28 }}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Same-Day Quotes',
    sub: <span>Price and lead time today</span>,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" style={{ width: 28, height: 28 }}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: '2-Year Warranty',
    sub: <span>Backed by our engineering team</span>,
  },
  {
    icon: <CanadaFlag height={28} />,
    title: 'North America Made',
    sub: <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem' }}><CanadaFlag height={13} /> Built in Toronto, Ontario</span>,
  },
]

export default function TrustBar() {
  return (
    <div style={{ background: '#F8FAFF', borderBottom: '1px solid #E8ECF5', borderTop: '1px solid #E8ECF5' }}>
      <div className="container">
        <div className="trust-bar-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.1rem',
                padding: '1.4rem 2rem',
                borderRight: i < items.length - 1 ? '1px solid #E8ECF5' : 'none',
                justifyContent: i === 0 ? 'flex-start' : i === 1 ? 'center' : 'flex-end',
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                background: 'rgba(220,60,30,.09)',
                border: '1px solid rgba(220,60,30,.14)',
                color: '#DC3C1E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--fd)',
                  fontWeight: 800,
                  fontSize: '.92rem',
                  color: 'var(--ink)',
                  letterSpacing: '.01em',
                  lineHeight: 1.2,
                  marginBottom: '.28rem',
                }}>
                  {item.title}
                </div>
                <div style={{
                  fontFamily: 'var(--fm)',
                  fontSize: '.73rem',
                  color: 'var(--gray)',
                  letterSpacing: '.01em',
                }}>
                  {item.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
