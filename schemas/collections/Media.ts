import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Plik',
    plural: 'Pliki',
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  fields: [],
  upload: {
    staticDir: 'media/files',
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 400,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: { quality: 20, lossless: false },
        },
      },
      {
        name: 'main',
        width: 1500,
        height: 1500,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: { quality: 80, lossless: true },
        },
      },
    ],
  },
}
