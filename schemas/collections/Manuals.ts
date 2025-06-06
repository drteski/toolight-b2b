import type { CollectionConfig } from 'payload'

export const Manuals: CollectionConfig = {
  slug: 'manuals',
  labels: {
    singular: 'Instrukcja montażu',
    plural: 'Instrukcje montażu',
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
    staticDir: 'media/manuals',
    adminThumbnail: 'thumbnail',
    mimeTypes: ['application/*', 'images/*'],
  },
}
