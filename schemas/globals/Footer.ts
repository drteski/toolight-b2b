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
        { name: 'companyName', label: 'Nazwa firmy', type: 'text', defaultValue: '---' },
        {
          name: 'address',
          label: 'Ulica i numer domu',
          type: 'text',
          defaultValue: '---',
        },
        { name: 'postalCode', label: 'Kod pocztowy', type: 'text', defaultValue: '---' },
        {
          name: 'city',
          label: 'Miasto',
          type: 'text',
          defaultValue: '---',
        },
        {
          name: 'nip',
          label: 'NIP',
          type: 'text',
          defaultValue: '---',
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
          defaultValue: '---',
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
