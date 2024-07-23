// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Page } from './collections/Pages'
import { Locale, locales } from './locales'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Page],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  localization: {
    // @ts-ignore locales are readonly
    locales: locales,
    defaultLocale: 'en',
    fallback: false,
  },
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
    // storage-adapter-placeholder
  ],
  async onInit(payload) {
    console.log('INITIALIZED')
    const pages = await payload.find({
      collection: 'pages',
      limit: 200,
      locale: 'en'
    })
    if (pages.totalDocs === 0) {
      for (const loc in locales) {
        for (let i = 0; i < 200; i++) {

          await payload.create({
            collection: 'pages',
            data: {
              title: (Math.random() + 1).toString(36).substring(7)
            },
            locale: loc as Locale
          })
        }
      }
    }
  },
})
