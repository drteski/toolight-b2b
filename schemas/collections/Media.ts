import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Plik',
    plural: 'Pliki',
  },
  access: {
    read: () => true,
    update: () => false,
    create: () => true,
    delete: () => false,
  },
  fields: [],
  upload: {
    staticDir: 'media/files',
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/svg', 'image/png'],
  },
}
