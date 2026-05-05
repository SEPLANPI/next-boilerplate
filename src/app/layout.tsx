import "@mantine/carousel/styles.layer.css"
import "@mantine/charts/styles.layer.css"
import "@mantine/core/styles.layer.css"
import "@mantine/dates/styles.layer.css"
import "@mantine/notifications/styles.layer.css"


import { ColorSchemeScript } from "@mantine/core"
import type { Metadata, Viewport } from "next"
import { Figtree } from "next/font/google"

import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Next Boilerplate",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>

      <body className={`${figtree.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}