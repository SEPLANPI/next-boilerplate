'use client'

import { queryClient } from '@/lib/react-query'
import { MantineProvider } from '@mantine/core'
import { QueryClientProvider } from '@tanstack/react-query'
import { theme } from '@ui/mantine-config'
import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'

export function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
