import { NextResponse } from 'next/server'

// Simple in-memory rate limiter (resets on deploy/restart — sufficient for basic protection)
const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour
const MAX_ATTACHMENTS = 3
const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024
const ALLOWED_EXTENSIONS = new Set(['pdf', 'doc', 'docx', 'xls', 'xlsx', 'dwg', 'dxf', 'jpg', 'jpeg', 'png'])

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

// Sanitize HTML to prevent injection
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Basic email format validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254
}

export async function POST(req: Request) {
  try {
    // Rate limiting by IP
    const forwarded = req.headers.get('x-forwarded-for')
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later or call us directly.' },
        { status: 429 }
      )
    }

    const formData = await req.formData()
    const name = String(formData.get('name') ?? '').trim()
    const company = String(formData.get('company') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const phone = String(formData.get('phone') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const website = String(formData.get('website') ?? formData.get('url') ?? '')
    const attachments = formData.getAll('attachments').filter((item): item is File => item instanceof File && item.size > 0)

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
    }

    // Validate field lengths
    if (name.length > 200 || message.length > 5000 || (company && company.length > 200) ||
        (phone && phone.length > 50)) {
      return NextResponse.json({ error: 'One or more fields exceed the maximum length.' }, { status: 400 })
    }

    // Honeypot check — if a hidden field is filled, silently reject
    if (website) {
      return NextResponse.json({ success: true }) // Fake success for bots
    }

    if (attachments.length > MAX_ATTACHMENTS) {
      return NextResponse.json({ error: `Please attach no more than ${MAX_ATTACHMENTS} files.` }, { status: 400 })
    }

    const totalAttachmentBytes = attachments.reduce((sum, file) => sum + file.size, 0)
    if (totalAttachmentBytes > MAX_ATTACHMENT_BYTES) {
      return NextResponse.json({ error: 'Attachments must be 4 MB or less in total.' }, { status: 400 })
    }

    for (const file of attachments) {
      const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
      if (!ALLOWED_EXTENSIONS.has(extension)) {
        return NextResponse.json({ error: `File type not allowed: ${file.name}` }, { status: 400 })
      }
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('[Contact Form] RESEND_API_KEY is not configured — email was not sent.')
      return NextResponse.json(
        { error: 'Email service is unavailable. Please call us directly at +1 (647) 616-2595.' },
        { status: 503 }
      )
    }

    const toEmail = 'sales@candron.com'
    const fromEmail = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev'
    const submittedAt = new Date().toISOString()
    const emailAttachments = await Promise.all(attachments.map(async (file) => ({
      filename: file.name.replace(/[^a-zA-Z0-9._ -]/g, '_').slice(0, 180) || 'attachment',
      content: Buffer.from(await file.arrayBuffer()).toString('base64'),
    })))

    // Sanitize all user inputs before inserting into HTML
    const s = {
      name: escapeHtml(name),
      company: company ? escapeHtml(company) : '',
      email: escapeHtml(email),
      phone: phone ? escapeHtml(phone) : '',
      message: escapeHtml(message),
    }

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111">
        <div style="background:#05091F;padding:24px 32px;border-radius:8px 8px 0 0">
          <p style="margin:0;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.5)">CANDRON Energy Inc.</p>
          <h1 style="margin:8px 0 0;font-size:20px;color:#fff">New Contact Form Inquiry</h1>
        </div>
        <div style="padding:32px;background:#fff;border:1px solid #e8ecf5;border-top:none;border-radius:0 0 8px 8px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:12px;color:#6b7a99;width:130px">Name</td><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:14px;font-weight:600;color:#05091F">${s.name}</td></tr>
            ${s.company ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:12px;color:#6b7a99">Company</td><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:14px;color:#05091F">${s.company}</td></tr>` : ''}
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:12px;color:#6b7a99">Email</td><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:14px;color:#0047FF"><a href="mailto:${s.email}" style="color:#0047FF">${s.email}</a></td></tr>
            ${s.phone ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:12px;color:#6b7a99">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:14px;color:#05091F">${s.phone}</td></tr>` : ''}
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:12px;color:#6b7a99">Submitted</td><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:14px;color:#05091F">${submittedAt}</td></tr>
          </table>
          <div style="margin-top:24px">
            <p style="font-size:12px;color:#6b7a99;margin:0 0 8px;letter-spacing:.1em;text-transform:uppercase">Message</p>
            <div style="background:#f4f6fa;border-radius:6px;padding:16px 20px;font-size:14px;line-height:1.7;color:#05091F;white-space:pre-wrap">${s.message}</div>
          </div>
          ${emailAttachments.length ? `<div style="margin-top:16px;font-size:12px;color:#6b7a99">Attachments: ${emailAttachments.map(file => escapeHtml(file.filename)).join(', ')}</div>` : ''}
          <div style="margin-top:24px;padding-top:16px;border-top:1px solid #f0f2f8">
            <a href="mailto:${s.email}" style="display:inline-block;background:#0047FF;color:#fff;text-decoration:none;padding:10px 24px;border-radius:6px;font-size:13px;font-weight:700">Reply to ${s.name}</a>
          </div>
        </div>
      </div>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `CANDRON Website <${fromEmail}>`,
        to: [toEmail],
        reply_to: email,
        subject: `New Inquiry from ${s.name}${s.company ? ` — ${s.company}` : ''}`,
        html,
        attachments: emailAttachments,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('[Contact Form] Resend error:', err)
      return NextResponse.json({ error: 'Failed to send email. Please try again or call us directly.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Contact Form] Unexpected error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
