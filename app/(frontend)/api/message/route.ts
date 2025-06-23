import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import PayloadConfig from '@/payload.config'
import { notifyStaff } from '@/lib/notifyStaff'
import { notifyClient } from '@/lib/notifyClient'

export async function POST(request: NextRequest) {
  const data = await request.json()
  const payload = await getPayload({ config: PayloadConfig })
  const emailConfig = await payload.findGlobal({
    slug: 'layout',
  })
  const smtpOptions = {
    host: emailConfig.email.host,
    port: parseInt(emailConfig.email.port),
    secure: true,
    auth: {
      user: emailConfig.email.senderEmail,
      pass: emailConfig.email.password,
    },
  }
  await notifyStaff(smtpOptions, emailConfig, data)
  await notifyClient(smtpOptions, emailConfig, {
    email: data.email,
    message: emailConfig.email.senderReplay.subject,
  })

  return new NextResponse(JSON.stringify({ message: 'Wysłano' }), {
    status: 200,
  })
}
