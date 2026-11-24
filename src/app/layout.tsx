import "@mantine/carousel/styles.css"
import "@mantine/charts/styles.css"
import { ColorSchemeScript } from "@mantine/core"
import "@mantine/dates/styles.css"
import "@mantine/notifications/styles.css"
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

const figtree = Figtree({ subsets: ["latin"], display: "swap" })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" data-mantine-color-scheme="light">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${figtree.className} antialised`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
