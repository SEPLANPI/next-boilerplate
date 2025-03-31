import { signIn } from '@/auth'
import { Button } from '@mantine/core'
import { AlertCircle } from 'lucide-react'

export default async function SessionExpired({
  searchParams: { redirectTo }
}: {
  searchParams: {
    redirectTo?: string
  }
}) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="space-y-6 text-center">
        <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Sessão Expirada</h1>
          <p className="text-gray-600">
            Sua sessão expirou. Por favor, faça login novamente para continuar.
          </p>
        </div>
        <Button
          onClick={async () => {
            'use server'
            signIn('keycloak', { redirectTo })
          }}
          className="w-full max-w-[200px]"
        >
          Atualizar Sessão
        </Button>
      </div>
    </div>
  )
}
