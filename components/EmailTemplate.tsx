import { Html, Section, Text, Tailwind } from 'jsx-email'
import { format } from 'date-fns'

export type EmailTemplateProps = {
  name: string
  city: string
  postalCode: string
  email: string
  phone: string
  message: string
}

const EmailTemplate = ({ name, city, postalCode, email, phone, message }: EmailTemplateProps) => {
  return (
    <Html>
      <Tailwind>
        <Text className="inline">
          <Text className="inline font-bold">{name}</Text> ({email}){' - '}
          {format(new Date(), 'HH:mm | dd-MM-yyyy')}
        </Text>
        <Section className="p-1">
          <Text className="font-bold">Dane kontaktowe:</Text>
          <Text>{name}</Text>
          <Text>
            {city} {postalCode}
          </Text>
          <Text>{phone}</Text>
          <Text>{email}</Text>
        </Section>
        <Section>
          <Text className="font-bold">Treść wiadomości:</Text>
          <Text>{message}</Text>
        </Section>
      </Tailwind>
    </Html>
  )
}

export default EmailTemplate
