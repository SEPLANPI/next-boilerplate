import type { Metadata } from 'next'
import { ColorSchemeScript } from '@mantine/core'
import './globals.css'
import { Figtree } from 'next/font/google'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'DITI Next.js Boilerplate'
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
        <ColorSchemeScript />
      </head>
      <body className={figtree.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
