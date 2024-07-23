import { Locale } from '@/locales'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

export default async function Page({ params }: { params: { locale: Locale } }) {
  const payload = await getPayloadHMR({ config })
  const totalLocales = await payload.find({
    collection: 'pages',
    locale: params.locale,
  })
  return <h1>Hello: {totalLocales.totalDocs}</h1>
}
