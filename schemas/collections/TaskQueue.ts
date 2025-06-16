import { CollectionConfig } from 'payload'

const TaskQueue: CollectionConfig = {
  slug: 'task-queue',
  labels: {
    plural: 'Zadania w tle',
    singular: 'Zadanie w tle',
  },
  access: {
    update: ({ req }) => !req.user,
    create: ({ req }) => !req.user,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'logs',
          type: 'json',
          admin: {
            style: {
              height: '200px',
              width: '50%',
            },
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'text',
      label: 'Status',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'startedAt',
      label: 'Rozpoczęcie zadania',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          displayFormat: 'dd/MM/yyyy HH:mm:ss',
        },
      },
    },
    {
      name: 'finishedAt',
      label: 'Zakończenie zadania',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          displayFormat: 'dd/MM/yyyy HH:mm:ss',
        },
      },
    },
  ],
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'startedAt', 'finishedAt'],
  },
}

export default TaskQueue
