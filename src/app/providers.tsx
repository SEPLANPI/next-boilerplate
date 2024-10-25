'use client'

import { getQueryClient } from '@/lib/react-query'
import { MantineProvider } from '@mantine/core'
import { QueryClientProvider } from '@tanstack/react-query'
import { theme } from '@ui/mantine-config'
import { SessionProvider } from 'next-auth/react'
import { NuqsAdapter } from 'nuqs/adapters/next'
import { PropsWithChildren } from 'react'

export function Providers({ children }: PropsWithChildren) {
  const queryClient = getQueryClient()

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <NuqsAdapter>{children}</NuqsAdapter>
        </MantineProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
