'use client'

import { Button, MantineProvider } from '@mantine/core'
import { theme } from '@ui/mantine-config'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ErrorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const errorMessage = searchParams.get('message') || 'Erro inesperado'

  function handleRetry() {
    router.push('/')
  }

  return (
    <div className="flex h-[100dvh] w-full items-center justify-center">
      <MantineProvider theme={theme}>
        <div className="flex w-full max-w-sm flex-col items-center justify-center space-y-4">
          <h2 className="text-2xl font-bold">Ops! Algo deu errado.</h2>
          <p className="text-center text-lg text-secondary-foreground">
            {errorMessage}
          </p>
          <Button onClick={handleRetry} variant="default">
            Voltar ao início
          </Button>
        </div>
      </MantineProvider>
    </div>
  )
}
