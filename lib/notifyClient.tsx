import { sendEmail } from '@/lib/mailer'

type SmtpProps = {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}
type ConfigProps = {
  email: {
    senderEmail: string
    subject: string
    senderName: string
  }
}

export const notifyClient = async (
  smtp: SmtpProps,
  config: ConfigProps,
  data: { message: string; email: string },
): Promise<string> => {
  const { message, email } = data

  return await sendEmail(
    smtp,
    `"${config.email.senderName}" <${config.email.senderEmail}>`,
    email,
    config.email.subject,
    message,
  ).then((res) => res)
}
