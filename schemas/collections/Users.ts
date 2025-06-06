import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    plural: 'Użytkownicy',
    singular: 'Użytkownik',
  },
  admin: {
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      label: 'Imię i Nazwisko',
      type: 'text',
      required: true,
    },
    { name: 'email', label: 'E-Mail', type: 'email', required: true },
  ],
}
