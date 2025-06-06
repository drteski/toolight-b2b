import type { GlobalConfig } from 'payload'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Kontakt',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'departments',
      type: 'array',
      label: 'Działy',
      localized: true,
      labels: { plural: 'Działy', singular: 'Dział' },
      minRows: 1,
      fields: [
        {
          name: 'icon',
          label: 'Ikona',
          type: 'relationship',
          relationTo: 'media',
        },
        { name: 'title', label: 'Nazwa działu', type: 'text' },
        {
          name: 'personel',
          label: 'Personel',
          type: 'array',
          fields: [
            { name: 'person', label: 'Imię i nazwisko', type: 'text' },
            {
              name: 'function',
              label: 'Funkcja',
              type: 'text',
            },
            { name: 'phone', label: 'Telefon', type: 'text' },
            { name: 'email', label: 'E-mail', type: 'text' },
          ],
        },

        { name: 'workingHours', label: 'Godziny pracy', type: 'text' },
      ],
    },
  ],
}
