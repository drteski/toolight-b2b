import type { GlobalConfig } from 'payload'

export const AboutUs: GlobalConfig = {
  slug: 'about-us',
  label: 'O nas',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'aboutUs',
      type: 'array',
      label: 'Teksty',
      localized: true,
      labels: { plural: 'Teksty', singular: 'Tekst' },
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'icon',
          label: 'Ikona',
          type: 'relationship',
          relationTo: 'media',
        },
        { name: 'title', label: 'Tytuł', type: 'text', defaultValue: '---' },
        { name: 'description', label: 'Opis', type: 'textarea', defaultValue: '---' },
      ],
    },
  ],
}
