'use client'

import { Button, MantineProvider } from '@mantine/core'
import { theme } from '@ui/mantine-config'
import { startTransition } from 'react'

export default function GlobalError({ reset }: { reset: () => void }) {
  function handleReset() {
    startTransition(() => {
      reset()
      window.location.reload()
    })
  }
  return (
    <html>
      <body className="flex h-[100dvh] w-full items-center justify-center">
        <MantineProvider theme={theme}>
          <div className="flex w-full max-w-sm flex-col items-center justify-center space-y-4">
            <h1 className="m-0 max-w-sm text-8xl font-black text-content-muted">
              500
            </h1>
            <h2 className="text-lg font-semibold">Ops! Algo deu errado.</h2>
            <p className="text-center text-lg">
              Houve um problema inesperado. Por favor, tente novamente em alguns
              instantes.
            </p>
            <Button onClick={handleReset} variant="default">
              Tentar novamente
            </Button>
          </div>
        </MantineProvider>
      </body>
    </html>
  )
}
