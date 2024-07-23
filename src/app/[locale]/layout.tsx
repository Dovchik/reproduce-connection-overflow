import { locales } from '@/locales'

export function generateStaticParams() {
  return locales.map((x) => {
    return {
      locale: x,
    }
  })
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={params.locale}>
      <head></head>
      <body>
        <div>{children}</div>
      </body>
    </html>
  )
}
