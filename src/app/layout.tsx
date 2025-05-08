import type { Metadata } from 'next'
import { ColorSchemeScript } from '@mantine/core'
import './globals.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/charts/styles.css'
import { Figtree } from 'next/font/google'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'DITI Next Boilerplate'
}

const figtree = Figtree({ subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <ColorSchemeScript />
      </head>
      <body className={`${figtree.className} antialised`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
