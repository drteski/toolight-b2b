import type { CollectionConfig } from 'payload'
import generateSlug from '@/schemas/hooks/generateSlug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    plural: 'Kategorie',
    singular: 'Kategoria',
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tytuł',
      localized: true,
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      localized: true,
      required: false,
      unique: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Generowany automatycznie na podstawie tytułu',
      },
      hooks: {
        beforeChange: [generateSlug('title')],
      },
    },
    {
      name: 'relatedMainMenuLink',
      type: 'relationship',
      label: 'Powiązany link z Menu Głównego',
      relationTo: 'main-menu',
      localized: true,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Kolejność',
      required: true,
    },
  ],
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'relatedMainMenuLink'],
  },
  upload: {
    staticDir: 'media/categories',
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
    bulkUpload: false,
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    formatOptions: {
      format: 'webp',
      options: { quality: 100, lossless: true },
    },
  },
}
