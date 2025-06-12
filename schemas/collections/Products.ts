import type { CollectionConfig } from 'payload'
import generateSlug from '@/schemas/hooks/generateSlug'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    plural: 'Produkty',
    singular: 'Produkt',
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
          name: 'title',
          type: 'text',
          label: 'Nazwa produktu',
          localized: true,
          required: true,
          admin: {
            width: '33.33%',
          },
        },
        {
          name: 'category',
          type: 'relationship',
          label: 'Kategoria',
          relationTo: 'categories',
          admin: {
            width: '33.33%',
          },
        },
        {
          name: 'new',
          type: 'checkbox',
          label: 'Nowość',
          admin: { style: { alignSelf: 'end', justifyContent: 'center', paddingBottom: 6 } },
        },
        {
          name: 'sale',
          type: 'checkbox',
          label: 'Wyprzedaż',
          admin: { style: { alignSelf: 'end', justifyContent: 'center', paddingBottom: 6 } },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'sku',
          type: 'text',
          label: 'SKU',
        },
        {
          name: 'ean',
          type: 'text',
          label: 'EAN',
        },
      ],
    },
    { name: 'description', type: 'textarea', label: 'Opis', localized: true },
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
      name: 'attachments',
      type: 'group',
      label: 'Załączniki',
      admin: { position: 'sidebar' },
      fields: [
        {
          name: 'energyLabel',
          label: 'Etykieta energetyczna',
          type: 'relationship',
          relationTo: 'energy-labels',
          hasMany: false,
        },
        {
          name: 'manual',
          label: 'Instrukcja',
          type: 'relationship',
          relationTo: 'manuals',
          hasMany: false,
        },
        {
          name: 'productCard',
          label: 'Karta Produktu',
          type: 'relationship',
          relationTo: 'product-cards',
          hasMany: false,
        },
        {
          name: 'otherAttachments',
          type: 'array',
          label: 'Pozostałe załączniki',
          localized: true,
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'name', type: 'text', label: 'Nazwa' },
                {
                  name: 'attachment',
                  label: 'Plik',
                  type: 'relationship',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
      ],
    },

    {
      name: 'parameters',
      type: 'array',
      label: 'Parametry techniczne',
      localized: true,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', label: 'Nazwa', type: 'text' },
            { name: 'value', label: 'Wartość', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'mainImage',
      label: 'Główne zdjęcie',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },

    {
      name: 'gallery',
      type: 'array',
      label: 'Zdjęcia',
      labels: {
        plural: 'Zdjęcia',
        singular: 'Zdjęcie',
      },
      minRows: 0,
      maxRows: 50,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Zdjęcie wyróżnione',
          admin: {
            description: 'Zaznacz, jeśli to zdjęcie ma być używane jako główne zdjęcie produktu',
          },
        },
      ],
    },
  ],
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['mainImage', 'title', 'sku', 'ean'],
  },
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create' && !data.mainImage && data.gallery?.length > 0) {
          // Ustaw pierwsze zdjęcie jako główne
          data.mainImage = data.gallery[0].image
        }
        return data
      },
      ({ data, req }) => {
        const isDuplicate =
          req.pathname.split('/').filter(Boolean)[
            req.pathname.split('/').filter(Boolean).length - 1
          ] === 'duplicate'
        if (req && isDuplicate && data.title) {
          data.title = `Kopia ${data.title}`
        }

        return data
      },
    ],
  },
}
