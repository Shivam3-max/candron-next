// Customer accounts. Passwordless: a one-time sign-in link is emailed (valid 20 minutes, single use),
// then a signed 30-day cookie. Rotating session_nonce (sign out) invalidates every cookie.
import { cookies } from 'next/headers'
import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import { getDb, isDatabaseConfigured } from '@/lib/db'
import { isMailConfigured, sendMail } from '@/lib/mailer'
import { formatPostal, isCountry, isPostalCode, isRegion } from '@/lib/shop/regions'
import { getShopSettings } from '@/lib/shop/settings'
import { SITE } from '@/lib/seo'

const COOKIE = 'candron_customer'
const SESSION_SECONDS = 60 * 60 * 24 * 30
const LINK_MINUTES = 20

export type TaxExemptStatus = 'none' | 'pending' | 'approved' | 'rejected'
export type CustomerRow = RowDataPacket & {
  id: number; email: string; name: string; company: string; phone: string; session_nonce: string
  tax_exempt_status: TaxExemptStatus; tax_exempt_note: string; admin_notes: string | null; created_at: Date; last_login_at: Date | null
}
export type AddressRow = RowDataPacket & { id: number; label: string; line1: string; line2: string; city: string; region: string; postal: string; country: string; is_default: number }

export class AccountError extends Error {}

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET
  if (!value || value.length < 32) throw new Error('ADMIN_SESSION_SECRET must contain at least 32 characters')
  return value
}
// Separate key from the admin cookie so one can never be replayed as the other
const sign = (value: string) => createHmac('sha256', `customer:${secret()}`).update(value).digest('base64url')
const sha256 = (v: string) => createHash('sha256').update(v).digest('hex')
const text = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max)
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254

/** Creates the customer if needed and emails a sign-in link. Always "succeeds" (no account enumeration). */
export async function requestLoginLink(emailInput: string, origin: string, next = '/account') {
  const email = emailInput.trim().toLowerCase()
  if (!isEmail(email)) throw new AccountError('Please enter a valid email address.')
  if (!isMailConfigured()) throw new AccountError('Sign-in by email is unavailable right now. Please call us.')
  const db = getDb()
  await db.execute('INSERT IGNORE INTO customers (email, session_nonce, created_at) VALUES (?, ?, UTC_TIMESTAMP())', [email, randomBytes(16).toString('hex')])
  const [rows] = await db.execute<CustomerRow[]>('SELECT * FROM customers WHERE email=?', [email])
  const customer = rows[0]
  const token = randomBytes(32).toString('base64url')
  await db.execute('DELETE FROM customer_login_tokens WHERE customer_id=? AND (used_at IS NOT NULL OR expires_at < UTC_TIMESTAMP())', [customer.id])
  await db.execute(
    `INSERT INTO customer_login_tokens (token_hash, customer_id, expires_at) VALUES (?, ?, DATE_ADD(UTC_TIMESTAMP(), INTERVAL ${LINK_MINUTES} MINUTE))`,
    [sha256(token), customer.id],
  )
  const safeNext = /^\/(account|checkout|cart|order\/|quote\/)/.test(next) ? next : '/account'
  const link = `${origin}/account/verify?token=${token}&next=${encodeURIComponent(safeNext)}`
  await sendMail({
    to: email,
    subject: 'Your CANDRON sign-in link',
    html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#05091F">
      <div style="background:#05091F;padding:24px 32px;border-radius:8px 8px 0 0"><p style="margin:0;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.55)">CANDRON Energy Inc.</p><h1 style="margin:8px 0 0;font-size:20px;color:#fff">Sign in to your account</h1></div>
      <div style="padding:28px 32px;background:#fff;border:1px solid #e8ecf5;border-top:none;border-radius:0 0 8px 8px;font-size:14px;line-height:1.65">
        <p style="margin:0 0 16px">Use the button below to sign in. The link works once and expires in ${LINK_MINUTES} minutes.</p>
        <p style="margin:0 0 20px"><a href="${link}" style="display:inline-block;background:#0047FF;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:700">Sign in to CANDRON</a></p>
        <p style="margin:0;font-size:12px;color:#6b7a99">If you didn’t ask for this, you can ignore this email; nobody can sign in without the link.</p>
      </div></div>`,
    text: `Sign in to your CANDRON account (link valid ${LINK_MINUTES} minutes, single use):\n${link}\n\nIf you didn't ask for this, ignore this email.`,
  })
}

/** Exchanges a sign-in token for a session cookie. Returns the customer, or null if the link is invalid/expired/used. */
export async function redeemLoginToken(token: string) {
  if (!/^[A-Za-z0-9_-]{43}$/.test(token)) return null
  const db = getDb()
  const [res] = await db.execute<ResultSetHeader>(
    'UPDATE customer_login_tokens SET used_at=UTC_TIMESTAMP() WHERE token_hash=? AND used_at IS NULL AND expires_at > UTC_TIMESTAMP()', [sha256(token)],
  )
  if (!res.affectedRows) return null
  const [rows] = await db.execute<CustomerRow[]>('SELECT c.* FROM customers c JOIN customer_login_tokens t ON t.customer_id=c.id WHERE t.token_hash=?', [sha256(token)])
  const customer = rows[0]
  if (!customer) return null
  if (!customer.session_nonce) {
    customer.session_nonce = randomBytes(16).toString('hex')
    await db.execute('UPDATE customers SET session_nonce=? WHERE id=?', [customer.session_nonce, customer.id])
  }
  await db.execute('UPDATE customers SET last_login_at=UTC_TIMESTAMP() WHERE id=?', [customer.id])
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS
  const payload = `${customer.id}.${expires}.${customer.session_nonce}`
  const store = await cookies()
  store.set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: SESSION_SECONDS,
  })
  return customer
}

/** The signed-in customer, or null. */
export async function getCurrentCustomer(): Promise<CustomerRow | null> {
  if (!isDatabaseConfigured()) return null
  const store = await cookies()
  const token = store.get(COOKIE)?.value
  if (!token) return null
  const [id, expires, nonce, signature] = token.split('.')
  if (!id || !expires || !nonce || !signature || Number(expires) < Math.floor(Date.now() / 1000)) return null
  const payload = `${id}.${expires}.${nonce}`
  const expected = Buffer.from(sign(payload)), actual = Buffer.from(signature)
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null
  try {
    const [rows] = await getDb().execute<CustomerRow[]>('SELECT * FROM customers WHERE id=? LIMIT 1', [Number(id)])
    const c = rows[0]
    return c && c.session_nonce && c.session_nonce === nonce ? c : null
  } catch { return null }
}

/** Signs out everywhere (rotates the nonce) and clears this browser's cookie. */
export async function signOut() {
  const c = await getCurrentCustomer()
  if (c) await getDb().execute('UPDATE customers SET session_nonce=? WHERE id=?', [randomBytes(16).toString('hex'), c.id])
  const store = await cookies()
  store.set(COOKIE, '', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 0 })
}

export async function updateProfile(customerId: number, body: Record<string, unknown>) {
  await getDb().execute('UPDATE customers SET name=?, company=?, phone=? WHERE id=?', [text(body.name, 160), text(body.company, 160), text(body.phone, 40), customerId])
}

// ── Addresses ────────────────────────────────────────────────────────────

export function parseAddress(body: Record<string, unknown>) {
  const a = {
    label: text(body.label, 80), line1: text(body.line1, 200), line2: text(body.line2, 200), city: text(body.city, 120),
    region: text(body.region, 4).toUpperCase(), postal: text(body.postal, 20), country: text(body.country, 2).toUpperCase(), is_default: body.is_default === true,
  }
  if (!isCountry(a.country)) throw new AccountError('Choose a country.')
  if (!a.line1 || !a.city) throw new AccountError('Enter the street address and city.')
  if (!isRegion(a.country, a.region)) throw new AccountError('Choose a province or state.')
  if (!isPostalCode(a.country, a.postal)) throw new AccountError('Enter a valid postal or ZIP code.')
  return { ...a, postal: formatPostal(a.country, a.postal) }
}

export async function listAddresses(customerId: number) {
  const [rows] = await getDb().execute<AddressRow[]>('SELECT * FROM customer_addresses WHERE customer_id=? ORDER BY is_default DESC, id DESC', [customerId])
  return rows
}

export async function saveAddress(customerId: number, a: ReturnType<typeof parseAddress>, id?: number) {
  const db = getDb()
  const [count] = await db.execute<(RowDataPacket & { n: number })[]>('SELECT COUNT(*) n FROM customer_addresses WHERE customer_id=?', [customerId])
  if (!id && Number(count[0].n) >= 20) throw new AccountError('You can save up to 20 addresses.')
  const makeDefault = a.is_default || Number(count[0].n) === 0
  if (makeDefault) await db.execute('UPDATE customer_addresses SET is_default=0 WHERE customer_id=?', [customerId])
  if (id) {
    const [res] = await db.execute<ResultSetHeader>(
      'UPDATE customer_addresses SET label=?, line1=?, line2=?, city=?, region=?, postal=?, country=?, is_default=? WHERE id=? AND customer_id=?',
      [a.label, a.line1, a.line2, a.city, a.region, a.postal, a.country, makeDefault ? 1 : 0, id, customerId],
    )
    if (!res.affectedRows) throw new AccountError('Address not found.')
    return id
  }
  // Skip exact duplicates (e.g. the same site saved again at checkout)
  const [dupe] = await db.execute<AddressRow[]>('SELECT id FROM customer_addresses WHERE customer_id=? AND line1=? AND city=? AND postal=? LIMIT 1', [customerId, a.line1, a.city, a.postal])
  if (dupe[0]) return dupe[0].id
  const [res] = await db.execute<ResultSetHeader>(
    'INSERT INTO customer_addresses (customer_id, label, line1, line2, city, region, postal, country, is_default, created_at) VALUES (?,?,?,?,?,?,?,?,?,UTC_TIMESTAMP())',
    [customerId, a.label, a.line1, a.line2, a.city, a.region, a.postal, a.country, makeDefault ? 1 : 0],
  )
  return res.insertId
}

export async function deleteAddress(customerId: number, id: number) {
  await getDb().execute('DELETE FROM customer_addresses WHERE id=? AND customer_id=?', [id, customerId])
}

// ── Tax exemption ────────────────────────────────────────────────────────

const DOC_TYPES: Record<string, string> = { 'application/pdf': 'pdf', 'image/jpeg': 'jpg', 'image/png': 'png' }
const MAX_DOC_BYTES = 5 * 1024 * 1024

/** Stores an exemption certificate and marks the account pending review. */
export async function addTaxDocument(customerId: number, file: File, note: string) {
  if (!DOC_TYPES[file.type]) throw new AccountError('Upload a PDF, JPG or PNG.')
  if (file.size > MAX_DOC_BYTES) throw new AccountError('Files must be 5 MB or smaller.')
  const [count] = await getDb().execute<(RowDataPacket & { n: number })[]>('SELECT COUNT(*) n FROM customer_documents WHERE customer_id=?', [customerId])
  if (Number(count[0].n) >= 10) throw new AccountError('Too many documents on file. Please contact us.')
  const name = file.name.replace(/[^a-zA-Z0-9._ -]/g, '_').slice(0, 200) || `certificate.${DOC_TYPES[file.type]}`
  await getDb().execute(
    'INSERT INTO customer_documents (customer_id, kind, file_name, mime_type, data, note, created_at) VALUES (?, ?, ?, ?, ?, ?, UTC_TIMESTAMP())',
    [customerId, 'tax_exempt', name, file.type, Buffer.from(await file.arrayBuffer()), text(note, 500)],
  )
  await getDb().execute("UPDATE customers SET tax_exempt_status='pending' WHERE id=? AND tax_exempt_status<>'approved'", [customerId])
  await notifyAccountingOfCertificate(customerId, name)
}

/** Lets accounting know a certificate is waiting for review (Admin → Customers). Never throws. */
async function notifyAccountingOfCertificate(customerId: number, fileName: string) {
  if (!isMailConfigured()) return
  try {
    const settings = await getShopSettings()
    const to = (settings.accountingEmail || settings.notifyEmail).split(',').map(s => s.trim()).filter(Boolean)
    if (!to.length) return
    const [rows] = await getDb().execute<CustomerRow[]>('SELECT * FROM customers WHERE id=?', [customerId])
    const c = rows[0]
    if (!c) return
    await sendMail({
      to, replyTo: c.email,
      subject: `Tax exemption certificate to review: ${c.company || c.name || c.email}`,
      text: `${c.name || c.email}${c.company ? ` (${c.company})` : ''} uploaded a tax exemption certificate (${fileName}).\n\nReview and approve or reject it: ${SITE}/admin/customers\n\nApproved customers aren't charged the exempt tax on new orders and invoices.`,
    })
  } catch (error) {
    console.warn('[account] certificate notification failed', error instanceof Error ? error.message : error)
  }
}

export async function listDocuments(customerId: number) {
  const [rows] = await getDb().execute<(RowDataPacket & { id: number; kind: string; file_name: string; mime_type: string; note: string; created_at: Date; size: number })[]>(
    'SELECT id, kind, file_name, mime_type, note, created_at, LENGTH(data) size FROM customer_documents WHERE customer_id=? ORDER BY id DESC', [customerId],
  )
  return rows
}

/** True when this email belongs to a customer whose tax exemption an admin approved. */
export async function isTaxExempt(email: string) {
  if (!email) return false
  const [rows] = await getDb().execute<(RowDataPacket & { s: string })[]>('SELECT tax_exempt_status s FROM customers WHERE email=? LIMIT 1', [email.toLowerCase()])
  return rows[0]?.s === 'approved'
}

// ── Order and quote history ──────────────────────────────────────────────

export type AccountOrderRow = RowDataPacket & { id: number; order_number: string; access_token: string; status: string; currency: string; total: string; created_at: Date; payment_terms: string; items: string }
export type AccountQuoteRow = RowDataPacket & { id: number; quote_number: string; access_token: string; status: string; currency: string; total: string; valid_until: Date | string | null; created_at: Date }

/** Orders placed while signed in, or with the account's (verified) email. */
export async function listCustomerOrders(c: CustomerRow) {
  const [rows] = await getDb().execute<AccountOrderRow[]>(
    `SELECT o.id, o.order_number, o.access_token, o.status, o.currency, o.total, o.created_at, o.payment_terms,
            (SELECT GROUP_CONCAT(CONCAT(i.quantity, ' × ', i.name) SEPARATOR '; ') FROM order_items i WHERE i.order_id=o.id) items
     FROM orders o WHERE (o.customer_id=? OR o.email=?) AND o.status NOT IN ('pending_payment','expired') ORDER BY o.id DESC LIMIT 100`,
    [c.id, c.email],
  )
  return rows
}

export async function listCustomerQuotes(c: CustomerRow) {
  const [rows] = await getDb().execute<AccountQuoteRow[]>(
    `SELECT q.id, q.quote_number, q.access_token, q.status, q.currency, q.valid_until, q.created_at,
            q.freight + COALESCE((SELECT SUM(line_total) FROM quote_items i WHERE i.quote_id=q.id), 0) total
     FROM quotes q WHERE q.email=? AND q.status <> 'draft' ORDER BY q.id DESC LIMIT 100`,
    [c.email],
  )
  return rows
}

/** Order lines for "Order again" (only lines that are inventory listings). */
export async function reorderItems(c: CustomerRow, orderId: number) {
  const [rows] = await getDb().execute<(RowDataPacket & { product_id: number; quantity: number })[]>(
    `SELECT i.product_id, i.quantity FROM order_items i JOIN orders o ON o.id=i.order_id
     WHERE o.id=? AND (o.customer_id=? OR o.email=?) AND i.product_id IS NOT NULL`,
    [orderId, c.id, c.email],
  )
  return rows.map(r => ({ id: r.product_id, quantity: r.quantity }))
}

// ── Admin ────────────────────────────────────────────────────────────────

export type AdminCustomerRow = CustomerRow & { orders: number; spent: string | null; docs: number }

export async function adminListCustomers(q = '', status = '') {
  const where: string[] = [], values: string[] = []
  if (q) { where.push('(c.email LIKE ? OR c.name LIKE ? OR c.company LIKE ?)'); const like = `%${q.replace(/[%_\\]/g, '')}%`; values.push(like, like, like) }
  if (status) { where.push('c.tax_exempt_status=?'); values.push(status) }
  const [rows] = await getDb().query<AdminCustomerRow[]>(
    `SELECT c.*, (SELECT COUNT(*) FROM orders o WHERE (o.customer_id=c.id OR o.email=c.email) AND o.status NOT IN ('pending_payment','expired')) orders,
            (SELECT SUM(o.amount_paid) FROM orders o WHERE o.customer_id=c.id OR o.email=c.email) spent,
            (SELECT COUNT(*) FROM customer_documents d WHERE d.customer_id=c.id) docs
     FROM customers c ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
     ORDER BY (c.tax_exempt_status='pending') DESC, c.id DESC LIMIT 300`, values,
  )
  return rows
}

export async function adminLoadCustomer(id: number) {
  const [rows] = await getDb().execute<CustomerRow[]>('SELECT * FROM customers WHERE id=?', [id])
  const c = rows[0]
  if (!c) return null
  const [orders, addresses, documents] = await Promise.all([listCustomerOrders(c), listAddresses(c.id), listDocuments(c.id)])
  return { customer: c, orders, addresses, documents }
}

/** Approve or reject a tax exemption (emails the customer). Takes effect on new checkouts and invoices. */
export async function adminSetTaxExemption(id: number, status: TaxExemptStatus, note: string): Promise<boolean> {
  const [res] = await getDb().execute<ResultSetHeader>('UPDATE customers SET tax_exempt_status=?, tax_exempt_note=? WHERE id=?', [status, text(note, 255), id])
  if (!res.affectedRows) throw new AccountError('Customer not found.')
  // Returns true only when the customer was actually emailed
  if (!((status === 'approved' || status === 'rejected') && isMailConfigured())) return false
  const [rows] = await getDb().execute<CustomerRow[]>('SELECT * FROM customers WHERE id=?', [id])
  const c = rows[0]
  const approved = status === 'approved'
  const sent = await sendMail({
    to: c.email,
    subject: approved ? 'Your tax exemption is approved' : 'About your tax exemption certificate',
    text: approved
      ? `Hi ${c.name || 'there'},\n\nWe've approved your sales tax exemption${note ? ` (${note})` : ''}. New online orders and invoices to ${c.email} won't be charged the exempt tax.\n\nCANDRON Energy Inc. · +1 (647) 616-2595`
      : `Hi ${c.name || 'there'},\n\nWe couldn't approve the exemption certificate you uploaded${note ? `: ${note}` : ''}. Please reply to this email or upload an updated certificate in your account.\n\nCANDRON Energy Inc. · +1 (647) 616-2595`,
  }).catch(error => { console.warn('[account] exemption email failed', error instanceof Error ? error.message : error); return null })
  return sent !== null
}

export async function adminSetCustomerNotes(id: number, notes: string) {
  await getDb().execute('UPDATE customers SET admin_notes=? WHERE id=?', [text(notes, 5000), id])
}

export async function adminGetDocument(id: number) {
  const [rows] = await getDb().execute<(RowDataPacket & { file_name: string; mime_type: string; data: Buffer })[]>('SELECT file_name, mime_type, data FROM customer_documents WHERE id=?', [id])
  return rows[0] ?? null
}
