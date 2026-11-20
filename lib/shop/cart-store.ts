'use client'
// Browser cart: product ids + quantities (plus display snapshots) in localStorage.
// Prices and stock are always re-checked on the server (/api/shop/cart) before checkout.
import { useSyncExternalStore } from 'react'

export interface CartItem { id: number; slug: string; sku: string; name: string; price: number; currency: string; image: string | null; quantity: number; max: number }

const KEY = 'candron_cart_v1'
const listeners = new Set<() => void>()
let cache: CartItem[] | null = null
const EMPTY: CartItem[] = []

function read(): CartItem[] {
  if (cache) return cache
  try {
    const raw = JSON.parse(window.localStorage.getItem(KEY) || '[]')
    cache = Array.isArray(raw) ? raw.filter(i => i && Number(i.id) > 0 && Number(i.quantity) > 0) : []
  } catch { cache = [] }
  return cache
}

function write(items: CartItem[]) {
  cache = items
  try { window.localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* private mode: cart lives for this page only */ }
  listeners.forEach(l => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onStorage = (e: StorageEvent) => { if (e.key === KEY) { cache = null; listener() } }
  window.addEventListener('storage', onStorage)
  return () => { listeners.delete(listener); window.removeEventListener('storage', onStorage) }
}

export function useCart() {
  return useSyncExternalStore(subscribe, read, () => EMPTY)
}

export const cartCount = (items: CartItem[]) => items.reduce((s, i) => s + i.quantity, 0)

export function addToCart(item: Omit<CartItem, 'quantity'>, quantity: number) {
  const items = read()
  const existing = items.find(i => i.id === item.id)
  const next = existing
    ? items.map(i => (i.id === item.id ? { ...i, ...item, quantity: Math.min(i.quantity + quantity, item.max) } : i))
    : [...items, { ...item, quantity: Math.min(quantity, item.max) }]
  write(next)
}

export const setQuantity = (id: number, quantity: number) =>
  write(read().map(i => (i.id === id ? { ...i, quantity: Math.max(1, Math.min(quantity, i.max || quantity)) } : i)))

export const removeFromCart = (id: number) => write(read().filter(i => i.id !== id))
export const clearCart = () => write([])

/** Refreshes display snapshots from a server re-price (drops items that no longer exist). */
export function syncCart(lines: { id: number; unitPrice: number; available: number; name: string; currency: string; image: string | null }[]) {
  const items = read()
  const next = items
    .filter(i => lines.some(l => l.id === i.id))
    .map(i => {
      const l = lines.find(x => x.id === i.id)!
      return { ...i, price: l.unitPrice, name: l.name, currency: l.currency, image: l.image, max: l.available }
    })
  if (JSON.stringify(next) !== JSON.stringify(items)) write(next)
}
