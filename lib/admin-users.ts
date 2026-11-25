// Additional administrators. The owner (ADMIN_EMAIL, set in Hostinger) invites people by email;
// each invitee sets their own password from a single-use link (valid 48 hours). Invited admins
// survive restarts; anyone not invited by the owner is still removed at start-up (scripts/init-db.mjs).
import { createHash, randomBytes } from 'node:crypto'
import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import { getDb } from '@/lib/db'
import { hashPassword } from '@/lib/admin-auth'
import { isMailConfigured, sendMail } from '@/lib/mailer'

const LINK_HOURS = 48
const sha256 = (v: string) => createHash('sha256').update(v).digest('hex')

export class AdminUserError extends Error {}

export const ownerEmail = () => (process.env.ADMIN_EMAIL ?? '').toLowerCase().trim()
export const isOwner = (email: string) => Boolean(ownerEmail()) && email.toLowerCase() === ownerEmail()

export type AdminUserRow = RowDataPacket & { id: number; email: string; added_by: string | null; setup_expires: Date | null; has_password: number; created_at: Date }

export async function listAdmins() {
  const [rows] = await getDb().execute<AdminUserRow[]>(
    `SELECT id, email, added_by, setup_expires, (setup_token_hash IS NULL) has_password, created_at FROM admins ORDER BY id`,
  )
  return rows.map(r => ({ id: r.id, email: r.email, owner: isOwner(r.email), addedBy: r.added_by, pending: !r.has_password, linkExpires: r.setup_expires, created: r.created_at }))
}

/** Creates (or re-invites) an admin and emails a set-password link. Returns whether the email went out. */
export async function inviteAdmin(emailInput: string, by: string, origin: string) {
  if (!isOwner(by)) throw new AdminUserError('Only the main administrator can add admin users.')
  const email = emailInput.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 190) throw new AdminUserError('Enter a valid email address.')
  if (isOwner(email)) throw new AdminUserError('That’s the main administrator.')
  if (!isMailConfigured()) throw new AdminUserError('Email (SMTP) isn’t configured, so the invitation can’t be sent.')
  const token = randomBytes(32).toString('base64url')
  // Unusable password until the invitee sets one; a fresh nonce signs out any old session
  const { hash, salt } = hashPassword(randomBytes(32).toString('hex'))
  const db = getDb()
  const [existing] = await db.execute<(RowDataPacket & { id: number; setup_token_hash: string | null })[]>('SELECT id, setup_token_hash FROM admins WHERE email=?', [email])
  if (existing[0] && !existing[0].setup_token_hash) throw new AdminUserError('This person is already an admin. Remove them first to send a new invitation.')
  await db.execute(
    `INSERT INTO admins (email, password_hash, password_salt, session_nonce, added_by, setup_token_hash, setup_expires)
     VALUES (?, ?, ?, ?, ?, ?, DATE_ADD(UTC_TIMESTAMP(), INTERVAL ${LINK_HOURS} HOUR))
     ON DUPLICATE KEY UPDATE setup_token_hash=VALUES(setup_token_hash), setup_expires=VALUES(setup_expires), added_by=VALUES(added_by)`,
    [email, hash, salt, randomBytes(16).toString('hex'), by, sha256(token)],
  )
  const link = `${origin}/admin/set-password?token=${token}`
  await sendMail({
    to: email,
    subject: 'You’ve been added as a CANDRON website admin',
    text: `${by} added you as an administrator of the CANDRON website (inventory, orders, quotes and customers).\n\nSet your password here (link valid ${LINK_HOURS} hours, single use):\n${link}\n\nThen sign in at ${origin}/admin/login with this email address.\n\nIf you weren't expecting this, ignore this email.`,
  })
  return true
}

/** Removes an invited admin (never the owner, never yourself). */
export async function removeAdmin(id: number, by: string) {
  if (!isOwner(by)) throw new AdminUserError('Only the main administrator can remove admin users.')
  const [rows] = await getDb().execute<(RowDataPacket & { email: string })[]>('SELECT email FROM admins WHERE id=?', [id])
  const email = rows[0]?.email
  if (!email) throw new AdminUserError('Admin not found.')
  if (isOwner(email)) throw new AdminUserError('The main administrator can’t be removed here (it’s set by ADMIN_EMAIL).')
  await getDb().execute('DELETE FROM admins WHERE id=?', [id])
}

/** Sets an invitee's password from their link. Returns the admin for signing in, or null if the link is invalid. */
export async function redeemSetupLink(token: string, password: string) {
  if (!/^[A-Za-z0-9_-]{43}$/.test(token)) return null
  if (password.length < 12) throw new AdminUserError('Use at least 12 characters.')
  if (password.length > 200) throw new AdminUserError('That password is too long.')
  const { hash, salt } = hashPassword(password)
  const nonce = randomBytes(16).toString('hex')
  const db = getDb()
  const [res] = await db.execute<ResultSetHeader>(
    `UPDATE admins SET password_hash=?, password_salt=?, session_nonce=?, setup_token_hash=NULL, setup_expires=NULL
     WHERE setup_token_hash=? AND setup_expires > UTC_TIMESTAMP()`,
    [hash, salt, nonce, sha256(token)],
  )
  if (!res.affectedRows) return null
  const [rows] = await db.execute<(RowDataPacket & { id: number; email: string })[]>('SELECT id, email FROM admins WHERE session_nonce=? LIMIT 1', [nonce])
  return rows[0] ? { id: rows[0].id, email: rows[0].email, nonce } : null
}
