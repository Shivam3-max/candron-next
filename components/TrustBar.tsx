import CanadaFlag from '@/components/CanadaFlag'

const items = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Same-Day Quotes',
    sub: <span>Price and lead time today</span>,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-7 h-7">
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
    sub: <span className="inline-flex items-center gap-[.35rem]"><CanadaFlag height={13} /> Built in Toronto, Ontario</span>,
  },
]

export default function TrustBar() {
  return (
    <div className="bg-[#F8FAFF] border-y border-[#E8ECF5]">
      <div className="container">
        <div className="responsive-override-exempt grid grid-cols-3 max-md:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={i}
              className={[
                'flex items-center gap-[1.1rem] max-md:gap-2 py-[1.4rem] max-md:py-3 px-8 max-md:px-2 max-md:flex-col max-md:text-center',
                i < items.length - 1
                  ? 'border-r border-[#E8ECF5]'
                  : '',
                i === 0
                  ? 'justify-start max-md:justify-center'
                  : i === 1
                  ? 'justify-center'
                  : 'justify-end max-md:justify-center',
              ].join(' ')}
            >
              <div className="w-[50px] h-[50px] max-md:w-[32px] max-md:h-[32px] rounded-[14px] max-md:rounded-[8px] bg-[rgba(220,60,30,.09)] border border-[rgba(220,60,30,.14)] text-[#DC3C1E] flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="font-display font-extrabold text-[.92rem] max-md:text-[.6rem] text-navy tracking-[.01em] leading-[1.2] mb-[.28rem] max-md:mb-0">
                  {item.title}
                </div>
                <div className="font-mono text-[.73rem] max-md:text-[.5rem] text-gray tracking-[.01em] max-md:hidden">
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
