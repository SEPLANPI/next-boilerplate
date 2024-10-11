import type { Metadata } from 'next'
import { ColorSchemeScript } from '@mantine/core'
import './globals.css'
import { Figtree, Montserrat } from 'next/font/google'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'DITI Next.js Boilerplate'
}

const figtree = Figtree({ subsets: ['latin'] })
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '800'],
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
      <body className={`${figtree.className} ${montserrat.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
