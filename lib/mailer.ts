import nodemailer from 'nodemailer'

type MailerOptionsProps = {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

export const sendEmail = async (
  options: MailerOptionsProps,
  from: string,
  to: string,
  subject: string,
  text: string,
  html?: string,
): Promise<string> => {
  const transporter = nodemailer.createTransport({
    ...options,
  })

  const message = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  })
  return message.envelope.to[0]
}
