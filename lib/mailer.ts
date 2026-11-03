import nodemailer, { type Transporter } from 'nodemailer'
import type Mail from 'nodemailer/lib/mailer'

// Website email goes out through the company's Google Workspace mailbox (candron.com
// mail is hosted by Google, so SPF/DKIM already authorize it). SMTP_USER is the
// mailbox address and SMTP_PASSWORD a Google "app password" for it.

declare global {
  var __candronMailer: Transporter | undefined
}

export function isMailConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASSWORD)
}

function transporter(): Transporter {
  if (!global.__candronMailer) {
    const port = Number(process.env.SMTP_PORT || 465)
    global.__candronMailer = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    })
  }
  return global.__candronMailer
}

// Gmail only sends as the authenticated mailbox or one of its verified aliases
export function fromAddress() {
  return { name: 'CANDRON Energy Inc.', address: process.env.SMTP_FROM || process.env.SMTP_USER || '' }
}

export function teamAddress() {
  return process.env.CONTACT_TO_EMAIL || 'sales@candron.com'
}

export async function sendMail(message: Omit<Mail.Options, 'from'>) {
  return transporter().sendMail({ from: fromAddress(), ...message })
}
