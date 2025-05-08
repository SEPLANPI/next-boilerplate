'use client'

import { Button } from '@mantine/core'
import { useRouter, useSearchParams } from 'next/navigation'

export function ErrorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const errorMessage = searchParams.get('message') || 'Erro inesperado'

  function handleRetry() {
    router.push('/')
  }

  return (
    <div className="flex w-full max-w-sm flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-bold">Ops! Algo deu errado.</h2>
      <p className="text-center text-lg">{errorMessage}</p>
      <Button onClick={handleRetry} variant="default">
        Voltar ao início
      </Button>
    </div>
  )
}
