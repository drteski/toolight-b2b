// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { searchPlugin } from '@payloadcms/plugin-search'
import { pl } from '@payloadcms/translations/languages/pl'

import { Users } from '@/schemas/collections/Users'
import { Banners } from '@/schemas/collections/Banners'
import { Categories } from '@/schemas/collections/Categories'
import { Layout } from '@/schemas/globals/Layout'
import { PopularCategories } from '@/schemas/globals/PopularCategories'
import { TopBar } from '@/schemas/globals/TopBar'
import { MainMenu } from '@/schemas/collections/MainMenu'
import { AboutUs } from '@/schemas/globals/AboutUs'
import { Media } from '@/schemas/collections/Media'
import { Footer } from '@/schemas/globals/Footer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Contact } from '@/schemas/globals/Contact'
import { PointOfSale } from '@/schemas/collections/PointOfSale'
import { RMA } from '@/schemas/collections/RMA'
import { Products } from '@/schemas/collections/Products'
import { EnergyLabels } from '@/schemas/collections/EnergyLabels'
import { Manuals } from '@/schemas/collections/Manuals'
import { ProductCards } from '@/schemas/collections/ProductCards'
import { locales } from '@/middleware'
import TaskQueue from '@/schemas/collections/TaskQueue'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,

    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Products,
    Categories,
    ProductCards,
    Manuals,
    EnergyLabels,
    RMA,
    Banners,
    MainMenu,
    PointOfSale,
    Users,
    Media,
    TaskQueue,
  ],
  globals: [TopBar, PopularCategories, AboutUs, Contact, Footer, Layout],

  // jobs: {
  //   tasks: [
  //     {
  //       slug: 'products-sync',
  //       label: 'Synchronizacja produktów',
  //       inputSchema: [],
  //       outputSchema: [],
  //       handler: async ({ req }) => {
  //         const category = await req.payload.create({
  //           collection: 'categories',
  //           req,
  //           data: {
  //             slug: 'test-testtest',
  //             relatedMainMenuLink: 1,
  //             title: 'test',
  //           },
  //         })
  //         return { output: { category } }
  //       },
  //     } as TaskConfig<'products-sync'>,
  //   ],
  //   autoRun: [
  //     // {
  //     //   cron: '* */4 * * *',
  //     //   queue: 'products-sync',
  //     //   limit: 10,
  //     // },
  //     {
  //       cron: '*/1 * * * *',
  //       queue: 'products-sync',
  //     },
  //   ],
  //   shouldAutoRun: async () => {
  //     return true
  //   },
  //   jobsCollectionOverrides: ({ defaultJobsCollection }) => {
  //     if (!defaultJobsCollection.admin) {
  //       defaultJobsCollection.admin = {}
  //     }
  //
  //     defaultJobsCollection.admin.hidden = false
  //     return defaultJobsCollection
  //   },
  // },
  i18n: {
    supportedLanguages: { pl },
  },

  localization: {
    locales,
    defaultLocale: 'pl',
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // searchPlugin({
    //   collections: ['categories'],
    //   defaultPriorities: {
    //     // products: 10,
    //     categories: 20,
    //   },
    // }),
    // storage-adapter-placeholder
  ],
})
