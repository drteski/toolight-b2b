import type { CollectionConfig } from 'payload'

export const PointOfSale: CollectionConfig = {
  slug: 'pos',
  labels: {
    plural: 'Punkty Sprzedaży',
    singular: 'Punkt Sprzedaży',
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          label: 'Nazwa',
          type: 'text',
        },
        {
          name: 'logo',
          label: 'Logo',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    { name: 'addressLine1', label: 'Adres Linia 1', type: 'text' },
    { name: 'addressLine2', label: 'Adres Linia 2', type: 'text' },

    {
      name: 'openingHours',
      label: 'Godziny otwarcia',
      type: 'group',
      fields: [
        {
          type: 'row',

          fields: [
            { name: 'workingDays', label: 'Dni robocze', type: 'text', admin: { width: '33.33%' } },
            {
              name: 'saturday',
              label: 'Sobota',
              type: 'text',
            },
            { name: 'sunday', label: 'Niedziela', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'contact',
      label: 'Kontakt',
      type: 'group',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'phone', label: 'Telefon', type: 'text' },
        { name: 'email', label: 'E-mail', type: 'text' },
        { name: 'location', label: 'Lokalizacja', type: 'text' },
      ],
    },
  ],
  admin: { useAsTitle: 'name', defaultColumns: ['logo', 'name'] },
}
