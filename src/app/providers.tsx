"use client"

import "dayjs/locale/pt-br"
import { getQueryClient } from "@/lib/react-query"
import { MantineProvider } from "@mantine/core"
import { DatesProvider } from "@mantine/dates"
import { QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { NuqsAdapter } from "nuqs/adapters/next"
import { PropsWithChildren } from "react"
import { Notifications } from "@mantine/notifications"
import { cssVariablesResolver, theme } from "@/lib/mantine"
import { PostHogProvider } from "@/components/posthog-provider"

export function Providers({ children }: PropsWithChildren) {
  const queryClient = getQueryClient()

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <DatesProvider
          settings={{
            locale: "pt-br",
          }}
        >
          <MantineProvider
            theme={theme}
            cssVariablesResolver={cssVariablesResolver}
          >
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
