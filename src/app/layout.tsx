import type { Metadata } from 'next'
import { ColorSchemeScript } from '@mantine/core'
import './globals.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import { Montserrat } from 'next/font/google'
import localFont from 'next/font/local'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: {
    default: 'Diálogos',
    template: '%s | Diálogos'
  }
}

const roboto = localFont({
  src: [
    {
      path: './roboto-italic.ttf',
      style: 'italic'
    },
    {
      path: './roboto-normal.ttf',
      style: 'normal'
    }
  ]
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat'
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${roboto.className} ${montserrat.variable} antialised`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
