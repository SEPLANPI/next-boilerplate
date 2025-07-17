'use client'

import { MantineProvider } from '@mantine/core'
import { theme } from '@ui/mantine-config'
import { Suspense } from 'react'
import { ErrorContent } from './error-content'

export default function ErrorPage() {
  return (
    <div className="flex h-[100dvh] w-full items-center justify-center">
      <MantineProvider theme={theme}>
        <Suspense fallback={<div>Carregando...</div>}>
          <ErrorContent />
        </Suspense>
      </MantineProvider>
    </div>
  )
}
