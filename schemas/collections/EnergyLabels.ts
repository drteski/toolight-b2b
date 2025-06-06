import type { CollectionConfig } from 'payload'

export const EnergyLabels: CollectionConfig = {
  slug: 'energy-labels',
  labels: {
    singular: 'Etykieta energetyczna',
    plural: 'Etykiety energetyczne',
  },
  access: {
    read: () => true,
    update: () => false,
    create: () => true,
    delete: () => false,
  },
  fields: [
    {
      name: 'relatedProduct',
      label: 'Produkt',
      type: 'relationship',
      relationTo: 'products',
      hasMany: false,
      admin: {
        description: 'Produkt, do którego przypisana jest ta etykieta energetyczna',
      },
    },
  ],
  upload: {
    staticDir: 'media/labels',
    adminThumbnail: 'thumbnail',
    mimeTypes: ['application/pdf'],
  },
}
