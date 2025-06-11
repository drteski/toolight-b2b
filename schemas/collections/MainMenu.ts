import type { CollectionConfig } from 'payload'
import generateSlug from '@/schemas/hooks/generateSlug'

export const MainMenu: CollectionConfig = {
  slug: 'main-menu',
  labels: {
    plural: 'Menu Główne',
    singular: 'Menu Główne',
  },
  access: {
    read: () => true,
    update: () => true,
    create: async ({ req }) => {
      const result = await req.payload.find({
        collection: 'main-menu',
        limit: 0,
        depth: 0,
      })

      return result.totalDocs < 5
    },
    delete: () => true,
  },
  fields: [
    {
      name: 'mainMenuLinkTitle',
      label: 'Nazwa',
      type: 'text',
      localized: true,
      defaultValue: 'mainMenuLink.mainMenuLinkTitle',
    },
    {
      name: 'mainMenuLinkUrl',
      label: 'Link',
      type: 'text',
      localized: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'mainMenuOrder',
      label: 'Kolejność',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 1,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  admin: {
    useAsTitle: 'mainMenuLinkTitle',
    defaultColumns: ['mainMenuLinkTitle', 'mainMenuLinkUrl', 'mainMenuOrder'],
  },
}
