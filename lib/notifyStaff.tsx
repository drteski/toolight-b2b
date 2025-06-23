import EmailTemplate, { EmailTemplateProps } from '@/components/EmailTemplate'
import { sendEmail } from '@/lib/mailer'
import { render } from 'jsx-email'

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

export const notifyStaff = async (
  smtp: SmtpProps,
  config: ConfigProps,
  data: EmailTemplateProps,
): Promise<string> => {
  const { name, city, postalCode, email, phone, message } = data
  const html = await render(
    <EmailTemplate
      name={name}
      city={city}
      postalCode={postalCode}
      email={email}
      phone={phone}
      message={message}
    />,
  )
  const text = await render(
    <EmailTemplate
      name={name}
      city={city}
      postalCode={postalCode}
      email={email}
      phone={phone}
      message={message}
    />,
    { plainText: true },
  )

  return await sendEmail(
    smtp,
    `"${config.email.senderName}" <${config.email.senderEmail}>`,
    data.email,
    config.email.subject,
    text,
    html,
  ).then((res) => res)
}
