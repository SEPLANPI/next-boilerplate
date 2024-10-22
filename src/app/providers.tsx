'use client'

import { MantineProvider } from '@mantine/core'
import { theme } from '@ui/mantine-config'
import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'

export function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </SessionProvider>
  )
}
