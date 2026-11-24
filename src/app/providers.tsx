"use client"

import "dayjs/locale/pt-br"
import { getQueryClient } from "@/lib/react-query"
import { MantineProvider } from "@mantine/core"
import { DatesProvider } from "@mantine/dates"
import { QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { NuqsAdapter } from "nuqs/adapters/next"
import type { Session } from "next-auth"
import { PropsWithChildren } from "react"
import { Notifications } from "@mantine/notifications"
import { theme } from "@/lib/mantine"
import { PostHogProvider } from "@/components/posthog-provider"

export function Providers({
  children,
  session,
}: PropsWithChildren<{ session: Session | null }>) {
  const queryClient = getQueryClient()

  return (
    // Sessão inicial vinda do servidor: o provider não busca
    // `/api/auth/session` ao montar nem a cada foco da janela (cada busca
    // dessas roda o callback `jwt`).
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <QueryClientProvider client={queryClient}>
        <DatesProvider
          settings={{
            locale: "pt-br",
          }}
        >
          <MantineProvider theme={theme}>
            <PostHogProvider>
              <Notifications position="top-center" autoClose={4000} />
              <NuqsAdapter>{children}</NuqsAdapter>
            </PostHogProvider>
          </MantineProvider>
        </DatesProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
