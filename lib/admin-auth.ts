import { cookies } from 'next/headers'
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'
import type { RowDataPacket } from 'mysql2/promise'
import { getDb } from '@/lib/db'

const COOKIE_NAME = 'candron_admin'
const SESSION_SECONDS = 60 * 60 * 12

type AdminRow = RowDataPacket & { id: number; email: string; password_hash: string; password_salt: string; session_nonce: string }

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET
  if (!value || value.length < 32) throw new Error('ADMIN_SESSION_SECRET must contain at least 32 characters')
  return value
}

function sign(value: string) {
  return createHmac('sha256', secret()).update(value).digest('base64url')
}

export function hashPassword(password: string, salt = randomBytes(16).toString('hex')) {
  return { salt, hash: scryptSync(password, salt, 64).toString('hex') }
}

export function verifyPassword(password: string, salt: string, expected: string) {
  const actual = scryptSync(password, salt, 64)
  const expectedBuffer = Buffer.from(expected, 'hex')
  return actual.length === expectedBuffer.length && timingSafeEqual(actual, expectedBuffer)
}

export async function authenticate(email: string, password: string) {
  const [rows] = await getDb().execute<AdminRow[]>('SELECT id, email, password_hash, password_salt, session_nonce FROM admins WHERE email = ? LIMIT 1', [email.toLowerCase().trim()])
  const admin = rows[0]
  if (!admin || !verifyPassword(password, admin.password_salt, admin.password_hash)) return null
  if (!admin.session_nonce) {
    admin.session_nonce = randomBytes(16).toString('hex')
    await getDb().execute('UPDATE admins SET session_nonce = ? WHERE id = ?', [admin.session_nonce, admin.id])
  }
  return { id: admin.id, email: admin.email, nonce: admin.session_nonce }
}

// The token carries the admin's session nonce; rotating it in the DB (logout or
// password change) invalidates every outstanding cookie.
export async function createAdminSession(adminId: number, nonce: string) {
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS
  const payload = `${adminId}.${expires}.${nonce}`
  const token = `${payload}.${sign(payload)}`
  const store = await cookies()
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_SECONDS,
  })
}

export async function clearAdminSession() {
  const admin = await getCurrentAdmin().catch(() => null)
  if (admin) await getDb().execute('UPDATE admins SET session_nonce = ? WHERE id = ?', [randomBytes(16).toString('hex'), admin.id])
  const store = await cookies()
  store.set(COOKIE_NAME, '', { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 0 })
}

export async function getCurrentAdmin() {
  const store = await cookies()
  const token = store.get(COOKIE_NAME)?.value
  if (!token) return null
  const [id, expires, nonce, signature] = token.split('.')
  if (!id || !expires || !nonce || !signature || Number(expires) < Math.floor(Date.now() / 1000)) return null
  const payload = `${id}.${expires}.${nonce}`
  const expected = Buffer.from(sign(payload))
  const actual = Buffer.from(signature)
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null
  const [rows] = await getDb().execute<(RowDataPacket & { id: number; email: string; session_nonce: string })[]>('SELECT id, email, session_nonce FROM admins WHERE id = ? LIMIT 1', [Number(id)])
  const admin = rows[0]
  if (!admin || !admin.session_nonce || admin.session_nonce !== nonce) return null
  return { id: admin.id, email: admin.email }
}
