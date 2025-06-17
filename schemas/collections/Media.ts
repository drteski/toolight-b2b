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
  },
}
