import type { GlobalConfig } from 'payload'

export const TopBar: GlobalConfig = {
  slug: 'top-bar',
  label: 'Górny Pasek',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'topBar',
      label: '',
      type: 'group',
      fields: [
        {
          name: 'topBarText',
          label: 'Tytuł',
          type: 'text',
          localized: true,
          defaultValue: '---',
        },
        {
          name: 'languageSelect',
          type: 'group',
          label: 'Wybór języka',
          localized: true,
          fields: [
            {
              name: 'topBarLocaleText',
              label: 'Etykieta wyboru języka',
              type: 'text',
              defaultValue: 'Wybierz język',
            },
          ],
        },
      ],
    },
  ],
}
