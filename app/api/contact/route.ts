import { NextResponse } from 'next/server'

// Simple in-memory rate limiter (resets on deploy/restart — sufficient for basic protection)
const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour

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

    const body = await req.json()
    const { name, company, email, phone, location, project, message } = body

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
        (phone && phone.length > 50) || (location && location.length > 200) || (project && project.length > 500)) {
      return NextResponse.json({ error: 'One or more fields exceed the maximum length.' }, { status: 400 })
    }

    // Honeypot check — if a hidden field is filled, silently reject
    if (body.website || body.url) {
      return NextResponse.json({ success: true }) // Fake success for bots
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[Contact Form] No RESEND_API_KEY — email not sent.')
      }
      return NextResponse.json({ success: true })
    }

    const toEmail = process.env.CONTACT_EMAIL ?? 'sales@candron.com'

    // Sanitize all user inputs before inserting into HTML
    const s = {
      name: escapeHtml(name),
      company: company ? escapeHtml(company) : '',
      email: escapeHtml(email),
      phone: phone ? escapeHtml(phone) : '',
      location: location ? escapeHtml(location) : '',
      project: project ? escapeHtml(project) : '',
      message: escapeHtml(message),
    }

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111">
        <div style="background:#05091F;padding:24px 32px;border-radius:8px 8px 0 0">
          <p style="margin:0;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.5)">Candron Energy Inc.</p>
          <h1 style="margin:8px 0 0;font-size:20px;color:#fff">New Contact Form Inquiry</h1>
        </div>
        <div style="padding:32px;background:#fff;border:1px solid #e8ecf5;border-top:none;border-radius:0 0 8px 8px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:12px;color:#6b7a99;width:130px">Name</td><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:14px;font-weight:600;color:#05091F">${s.name}</td></tr>
            ${s.company ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:12px;color:#6b7a99">Company</td><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:14px;color:#05091F">${s.company}</td></tr>` : ''}
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:12px;color:#6b7a99">Email</td><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:14px;color:#0047FF"><a href="mailto:${s.email}" style="color:#0047FF">${s.email}</a></td></tr>
            ${s.phone ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:12px;color:#6b7a99">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:14px;color:#05091F">${s.phone}</td></tr>` : ''}
            ${s.location ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:12px;color:#6b7a99">Project Location</td><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:14px;color:#05091F">${s.location}</td></tr>` : ''}
            ${s.project ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:12px;color:#6b7a99">Project Type</td><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:14px;color:#05091F">${s.project}</td></tr>` : ''}
          </table>
          <div style="margin-top:24px">
            <p style="font-size:12px;color:#6b7a99;margin:0 0 8px;letter-spacing:.1em;text-transform:uppercase">Message</p>
            <div style="background:#f4f6fa;border-radius:6px;padding:16px 20px;font-size:14px;line-height:1.7;color:#05091F;white-space:pre-wrap">${s.message}</div>
          </div>
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
        from: 'Candron Contact Form <onboarding@resend.dev>',
        to: [toEmail],
        reply_to: email,
        subject: `New Inquiry from ${s.name}${s.company ? ` — ${s.company}` : ''}`,
        html,
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
