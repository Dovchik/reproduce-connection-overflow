import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { Locale, locales } from '@/locales'
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { lang: Locale; slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const slug = params.slug
  const lang = params.lang
  const payload = await getPayloadHMR({ config })
  const page = await payload.findByID({
    collection: 'pages',
    id: slug,
    locale: lang,
  })

  return {
    title: page.title,
    openGraph: {
      // can add more images ['path to image']
      images: [],
    },
  }
}

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config })

  const query = await payload.find({
    collection: 'pages',
    limit: 200,
  })

  return query.docs.map((doc) => ({
    id: doc.id,
  }))
}

export default async function Page({ params }: { params: { locale: Locale; slug: string } }) {
  const payload = await getPayloadHMR({ config })

  const page = await payload.findByID({
    collection: 'pages',
    id: params.slug,
    locale: params.locale,
  })

  return <h1>{page.title}</h1>
}
