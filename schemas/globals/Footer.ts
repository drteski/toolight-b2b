import type { GlobalConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Stopka',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'address',
      type: 'group',
      label: 'Dane firmy',
      fields: [
        { name: 'companyName', label: 'Nazwa firmy', type: 'text' },
        {
          name: 'address',
          label: 'Ulica i numer domu',
          type: 'text',
        },
        { name: 'postalCode', label: 'Kod pocztowy', type: 'text' },
        {
          name: 'city',
          label: 'Miasto',
          type: 'text',
        },
        {
          name: 'nip',
          label: 'NIP',
          type: 'text',
        },
      ],
    },
    {
      name: 'privacy',
      type: 'group',
      label: 'Polityka prywatności',
      localized: true,
      admin: { position: 'sidebar' },
      fields: [
        {
          name: 'title',
          label: 'Tytuł',
          type: 'text',
        },
        {
          name: 'terms',
          label: 'Opis',
          type: 'richText',
          editor: lexicalEditor(),
        },
      ],
    },
  ],
}
