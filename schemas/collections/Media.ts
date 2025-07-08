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
        height: undefined,
        position: 'centre',
        withoutEnlargement: false,
        formatOptions: {
          format: 'webp',
          options: { quality: 80, lossless: false },
        },
      },
      {
        name: 'main',
        height: 1500,
        width: undefined,
        position: 'centre',
        withoutEnlargement: false,
        formatOptions: {
          format: 'webp',
          options: { quality: 80, lossless: true },
        },
      },
    ],
  },
}
