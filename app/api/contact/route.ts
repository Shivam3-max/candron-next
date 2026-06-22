import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, company, email, phone, location, project, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      // In development without a key, log and return success so the UI works
      console.log('[Contact Form] No RESEND_API_KEY set — email not sent.', { name, email })
      return NextResponse.json({ success: true })
    }

    const toEmail = process.env.CONTACT_EMAIL ?? 'sales@candron.com'

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111">
        <div style="background:#05091F;padding:24px 32px;border-radius:8px 8px 0 0">
          <p style="margin:0;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.5)">Candron Energy Inc.</p>
          <h1 style="margin:8px 0 0;font-size:20px;color:#fff">New Contact Form Inquiry</h1>
        </div>
        <div style="padding:32px;background:#fff;border:1px solid #e8ecf5;border-top:none;border-radius:0 0 8px 8px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:12px;color:#6b7a99;width:130px">Name</td><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:14px;font-weight:600;color:#05091F">${name}</td></tr>
            ${company ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:12px;color:#6b7a99">Company</td><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:14px;color:#05091F">${company}</td></tr>` : ''}
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:12px;color:#6b7a99">Email</td><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:14px;color:#0047FF"><a href="mailto:${email}" style="color:#0047FF">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:12px;color:#6b7a99">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:14px;color:#05091F">${phone}</td></tr>` : ''}
            ${location ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:12px;color:#6b7a99">Project Location</td><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:14px;color:#05091F">${location}</td></tr>` : ''}
            ${project ? `<tr><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:12px;color:#6b7a99">Project Type</td><td style="padding:10px 0;border-bottom:1px solid #f0f2f8;font-size:14px;color:#05091F">${project}</td></tr>` : ''}
          </table>
          <div style="margin-top:24px">
            <p style="font-size:12px;color:#6b7a99;margin:0 0 8px;letter-spacing:.1em;text-transform:uppercase">Message</p>
            <div style="background:#f4f6fa;border-radius:6px;padding:16px 20px;font-size:14px;line-height:1.7;color:#05091F;white-space:pre-wrap">${message}</div>
          </div>
          <div style="margin-top:24px;padding-top:16px;border-top:1px solid #f0f2f8">
            <a href="mailto:${email}" style="display:inline-block;background:#0047FF;color:#fff;text-decoration:none;padding:10px 24px;border-radius:6px;font-size:13px;font-weight:700">Reply to ${name}</a>
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
        subject: `New Inquiry from ${name}${company ? ` — ${company}` : ''}`,
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
