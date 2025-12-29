import "@mantine/carousel/styles.css"
import "@mantine/charts/styles.css"
import { ColorSchemeScript } from "@mantine/core"
import "@mantine/dates/styles.css"
import "@mantine/notifications/styles.css"
import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Next Boilerplate",
}

const figtree = Figtree({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-mantine-color-scheme="light">
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
