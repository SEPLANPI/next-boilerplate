'use client'

import 'dayjs/locale/pt-br'
import { getQueryClient } from '@/lib/react-query'
import { MantineProvider } from '@mantine/core'
import { DatesProvider } from '@mantine/dates'
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
        <DatesProvider
          settings={{
            locale: 'pt-br'
          }}
        >
          <MantineProvider theme={theme}>
            <NuqsAdapter>{children}</NuqsAdapter>
          </MantineProvider>
        </DatesProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
