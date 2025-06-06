import type { GlobalConfig } from 'payload'

export const MainMenu: GlobalConfig = {
  slug: 'main-menu',
  label: 'Menu Główne',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'mainMenu',
      label: 'Menu główne',
      type: 'array',
      localized: true,
      labels: {
        singular: 'Link menu',
        plural: 'Linki menu',
      },
      maxRows: 5,
      fields: [
        {
          name: 'mainMenuLinkTitle',
          label: 'Nazwa',
          type: 'text',
          defaultValue: 'mainMenuLink.mainMenuLinkTitle',
        },
        {
          name: 'mainMenuLinkUrl',
          label: 'Link',
          type: 'text',
          defaultValue: 'mainMenuLink.mainMenuLinkUrl',
        },
      ],
    },
  ],
}
