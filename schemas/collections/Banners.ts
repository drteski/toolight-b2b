import type { CollectionConfig } from 'payload'

export const Banners: CollectionConfig = {
  slug: 'banners',
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  labels: {
    plural: 'Banery',
    singular: 'Baner',
  },
  disableDuplicate: true,
  fields: [
    {
      name: 'title',
      label: 'Nazwa baneru',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: '---',
    },
    {
      name: 'active',
      label: 'Aktywny',
      type: 'checkbox',
      required: true,
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'priority',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'kolejność wyświetlania baneru',
      },
    },
  ],
  upload: {
    staticDir: 'media/banners',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: undefined,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: { quality: 20, lossless: false },
        },
      },
      {
        name: 'main',
        width: 1920,
        height: 1080,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: { quality: 80, lossless: true },
        },
      },
    ],
    bulkUpload: false,
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    formatOptions: {
      format: 'webp',
      options: { quality: 100, lossless: true },
    },
  },
}
