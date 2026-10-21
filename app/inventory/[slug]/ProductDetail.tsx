'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Product = {
  slug: string
  sku: string
  name: string
  description: string
  short_description: string
  category: string
  condition_name: string
  kva: number | null
  input_voltage: string
  output_voltage: string
  phase: string
  special_type: string
  price_min: number | null
  price_max: number | null
  currency: string
  stock_quantity: number
  lead_time: string
  specs: Record<string, string>
  image: string
  images: string[]
}

const money = (value: number, currency: string) => {
  // Bad currency codes must not crash the page
  try {
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value)
  } catch {
    return `${currency} ${Math.round(value).toLocaleString('en-CA')}`
  }
}

const cleanDescription = (value: string) => value
  .replace(/\u00a0/g, ' ')
  .replace(/[ \t]+\n/g, '\n')
  .replace(/\n{3,}/g, '\n\n')
  .trim()

function ProductDescription({ value }: { value: string }) {
  const cleaned = cleanDescription(value || '')
  const technicalStart = cleaned.search(/(?:^|\n)\s*Size Guide\s*(?:\n|$)/i)
  const overview = technicalStart >= 0 ? cleaned.slice(0, technicalStart).trim() : cleaned
  const technical = technicalStart >= 0
    ? cleaned.slice(technicalStart).replace(/\n\s*\n/g, '\n').trim()
    : ''

  const paragraphs = overview
    .split(/\n\s*\n/)
    .map(part => part.trim())
    .filter(Boolean)

  return (
    <div className="catalog-description mt-5">
      <div className="catalog-description-copy">
        {paragraphs.map((paragraph, index) => (
          <p key={`${paragraph.slice(0, 24)}-${index}`} className="body whitespace-pre-line break-words">
            {paragraph}
          </p>
        ))}
      </div>
      {technical && (
        <details className="catalog-technical-data">
          <summary>Technical sizing and dimensions</summary>
          <div className="catalog-technical-scroll" tabIndex={0} aria-label="Technical sizing and dimensional data">
            <pre>{technical}</pre>
          </div>
        </details>
      )}
    </div>
  )
}

export default function ProductDetail({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState('')
  const [activeImage, setActiveImage] = useState('')

  // The page remounts this component per slug (key={slug}), so state starts fresh
  useEffect(() => {
    fetch(`/api/catalog/${encodeURIComponent(slug)}`, { cache: 'no-store' })
      .then(async response => {
        const data = await response.json()
        if (!response.ok) throw new Error(data.error)
        setProduct(data.product)
      })
      .catch(cause => setError(cause.message))
  }, [slug])

  if (error) {
    return (
      <div className="section pt-36 sm:pt-40 container min-h-[60dvh]">
        <h1 className="break-words">Product not found</h1>
        <Link href="/inventory" className="btn btn-primary mt-5">Back to Inventory</Link>
      </div>
    )
  }

  if (!product) {
    return <div className="section pt-36 sm:pt-40 container min-h-[60dvh] text-center text-gray">Loading product…</div>
  }

  const price = product.price_min !== null
    ? product.price_max && product.price_max !== product.price_min
      ? `${money(product.price_min, product.currency)} – ${money(product.price_max, product.currency)}`
      : money(product.price_min, product.currency)
    : 'Request a Quote'

  const images = product.images?.length ? product.images : [product.image]
  const primaryImage = activeImage || images[0]

  const specifications = [
    ['Condition', product.condition_name],
    ['kVA', product.kva],
    ['Input Voltage', product.input_voltage],
    ['Output Voltage', product.output_voltage],
    ['Phase', product.phase],
    ['Special Type', product.special_type],
    ...Object.entries(product.specs || {}),
  ].filter(([, value]) => value !== '' && value !== null)

  return (
    <>
      <section className="section !pt-28 sm:!pt-36 bg-off max-sm:!pb-10">
        <div className="container">
          <div className="breadcrumb mb-6 sm:mb-8 flex flex-wrap gap-x-1 break-words">
            <Link href="/">Home</Link> / <Link href="/inventory">Inventory</Link> / <span className="break-all">{product.sku}</span>
          </div>
          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-8 lg:gap-12 items-start">
          <div className="min-w-0">
            <div className="aspect-[4/3] max-sm:aspect-square rounded-[14px] sm:rounded-[18px] overflow-hidden bg-white border border-[#E4E9F3]">
              {/* eslint-disable-next-line @next/next/no-img-element -- served from /api/media (DB or local redirect) */}
              <img src={primaryImage} alt={product.name} className="w-full h-full object-contain p-3" />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-5 max-sm:grid-cols-4 gap-2 sm:gap-3 mt-3">
                {images.map((src, index) => (
                  <button
                    type="button"
                    key={src}
                    onClick={() => setActiveImage(src)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={primaryImage === src}
                    className={`aspect-square p-0 rounded-[8px] overflow-hidden bg-white border cursor-pointer ${primaryImage === src ? 'border-blue ring-2 ring-blue/15' : 'border-[#E4E9F3]'}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" loading="lazy" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="label break-words">{product.condition_name} · {product.category}</div>
            <h1 className="!text-navy !text-[clamp(1.75rem,6vw,3.3rem)] leading-[1.08] break-words">{product.name}</h1>
            <p className="font-mono text-[.9375rem] text-blue tracking-[.06em] mt-3 break-all">SKU {product.sku}</p>
            <p className="lead mt-5 !text-gray max-w-[780px] max-sm:!text-[1.125rem] break-words">{product.short_description}</p>
            <div className="rounded-[14px] bg-white border border-[#E4E9F3] p-5 sm:p-6 my-6 sm:my-7 max-w-[700px]">
              <div className="font-display font-black text-[1.265rem] sm:text-[1.485rem] text-navy break-words">{price}</div>
              <div className="flex gap-2 sm:gap-3 flex-wrap mt-4">
                <span className={`rounded-full px-3 py-1.5 text-[.9375rem] font-bold ${product.stock_quantity ? 'bg-[#DCFCE7] text-[#08783E]' : 'bg-[#FEF3C7] text-[#92400E]'}`}>
                  {product.stock_quantity ? `${product.stock_quantity} available` : 'Built to order'}
                </span>
                {product.lead_time && <span className="rounded-full px-3 py-1.5 text-[.9375rem] bg-blue/[.08] text-blue break-words">{product.lead_time}</span>}
              </div>
            </div>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3 max-w-[700px]">
              <Link href={`/contact?product=${encodeURIComponent(product.name)}&sku=${encodeURIComponent(product.sku)}`} className="btn btn-primary btn-lg min-h-12 justify-center text-center">Request a Quote</Link>
              <a href="tel:+16476162595" className="btn btn-outline-blue btn-lg min-h-12 justify-center text-center">Call +1 (647) 616-2595</a>
            </div>
          </div>
          </div>
        </div>
      </section>
      <section className="section bg-white max-sm:py-10">
        <div className="container grid grid-cols-[1.1fr_.9fr] max-lg:grid-cols-1 gap-9 lg:gap-14">
          <div className="min-w-0">
            <div className="label">Product Details</div>
            <h2 className="break-words">Built for Reliable Service</h2>
            <ProductDescription value={product.description} />
          </div>
          <div className="min-w-0 rounded-[16px] bg-off border border-[#E4E9F3] p-4 sm:p-6 overflow-hidden">
            <h3 className="font-display font-black text-[1.125rem] mb-5">Specifications</h3>
            <dl className="m-0">
              {specifications.map(([key, value]) => (
                <div key={String(key)} className="grid grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] max-sm:grid-cols-1 gap-2 sm:gap-4 py-3 border-t border-[#DDE3EF]">
                  <dt className="font-mono text-[.875rem] text-gray break-words">{key}</dt>
                  <dd className="m-0 text-right max-sm:text-left font-title text-[1.0625rem] font-bold text-navy break-words">{String(value)}{key === 'kVA' ? ' kVA' : ''}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  )
}
