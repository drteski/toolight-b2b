import type { CollectionConfig } from 'payload'

export const ProductCards: CollectionConfig = {
  slug: 'product-cards',
  labels: {
    singular: 'Karta produktu',
    plural: 'Karty produktowe',
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
    staticDir: 'media/products-cards',
    adminThumbnail: 'thumbnail',
    mimeTypes: ['application/pdf'],
  },
}
