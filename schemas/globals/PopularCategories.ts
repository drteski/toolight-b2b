import type { GlobalConfig } from 'payload'

export const PopularCategories: GlobalConfig = {
  slug: 'popular-categories',
  label: 'Popularne kategorie',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'popularCategories',
      type: 'array',
      label: 'Popularne kategorie',
      labels: { plural: 'Popularne kategorie', singular: 'Popularna kategoria' },
      minRows: 1,
      maxRows: 8,
      fields: [{ name: 'popularCategory', type: 'relationship', relationTo: 'categories' }],
    },
  ],
}
