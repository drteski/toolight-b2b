import type { CollectionConfig } from 'payload'
import { generateRmaId } from '@/schemas/hooks/generateRmaId'

export const RMA: CollectionConfig = {
  slug: 'rma',
  labels: {
    plural: 'Reklamacje',
    singular: 'Reklamacja',
  },
  access: {
    read: () => true,
    update: () => true,
    delete: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'rmaId',
      label: 'Numer zgłoszenia',
      type: 'text',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'client',
      label: 'Dane klienta',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              label: 'Imię i nazwisko',
              type: 'text',
              access: {
                update: () => false,
              },
            },
            {
              name: 'phone',
              label: 'Telefon',
              type: 'text',
              access: {
                update: () => false,
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'company',
              label: 'Firma',
              type: 'text',
              access: {
                update: () => false,
              },
            },
            {
              name: 'email',
              label: 'E-Mail',
              type: 'text',
              access: {
                update: () => false,
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'address',
              label: 'Adres',
              type: 'text',
              admin: { width: '50%' },
              access: {
                update: () => false,
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'postalcode',
              label: 'Kod pocztowy',
              type: 'text',
              admin: { width: '25%' },
              access: {
                update: () => false,
              },
            },
            {
              name: 'city',
              label: 'miasto',
              type: 'text',
              admin: { width: '25%' },
              access: {
                update: () => false,
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'nip',
              label: 'NIP',
              type: 'text',
              admin: { width: '50%' },
              access: {
                update: () => false,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'details',
      label: 'Dane zgłoszenia',
      type: 'group',
      fields: [
        {
          name: 'orderId',
          label: 'Nr Zamówienia / Faktury',
          type: 'text',
          access: {
            update: () => false,
          },
        },
        {
          name: 'description',
          label: 'Opis zgłoszenia',
          type: 'textarea',
          access: {
            update: () => false,
          },
        },
        {
          name: 'attachments',
          type: 'relationship',
          relationTo: 'media',
          access: {
            update: () => false,
          },
        },
      ],
    },
    {
      name: 'status',
      enumName: 'rmaStatus',
      label: 'Status zgłoszenia',
      type: 'select',
      options: ['Nowe', 'Trwające', 'Zakończone'],
      admin: { position: 'sidebar' },
      defaultValue: 'Nowe',
      required: true,
      access: {
        update: () => true,
      },
    },
    {
      name: 'notes',
      label: 'Uwagi',
      type: 'textarea',
      admin: { position: 'sidebar' },
      access: {
        update: () => true,
      },
    },
  ],
  admin: {
    useAsTitle: 'rmaId',
    defaultColumns: ['rmaId', 'status', 'notes'],
  },
  hooks: {
    beforeChange: [generateRmaId],
  },
}
