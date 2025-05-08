import { api } from '@/lib/server-api'
import { Metadata } from 'next'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'Cadastro de conselheiro'
}

type CounselorFormLayoutProps = PropsWithChildren<{
  params: {
    token: string
  }
}>

type VerifyDataOnError = {
  error: string
}

export default async function CounselorFormLayout({
  children,
  params
}: CounselorFormLayoutProps) {
  const response = await api.get(`/verificar-convite/?token=${params.token}`)

  if (!response.ok) {
    const data: VerifyDataOnError = await response.json()

    if (data.error === 'Convite não encontrado.')
      return (
        <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center p-5 text-center">
          <h1 className="mb-4 text-2xl font-bold">Link de convite inválido</h1>
          <p className="max-w-md">
            O link de convite que você está tentando acessar não existe ou pode
            ter expirado. Por favor, entre em contato com o administrador para
            solicitar um novo convite.
          </p>
        </div>
      )

    if (data.error === 'Este convite já foi utilizado.')
      return (
        <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center p-5 text-center">
          <h1 className="mb-4 text-2xl font-bold">Convite já utilizado</h1>
          <p className="max-w-md">
            Este link de convite já foi usado para criar uma conta. Cada convite
            pode ser utilizado apenas uma vez. Se você precisa de acesso,
            solicite um novo convite ao administrador.
          </p>
        </div>
      )

    return (
      <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center p-4 text-center">
        <h1 className="mb-4 text-2xl font-semibold">Erro ao validar convite</h1>
        <p className="max-w-md">
          Ocorreu um erro ao validar seu convite. Por favor, tente novamente ou
          entre em contato com o administrador caso o problema persista.
        </p>
      </div>
    )
  }

  return children
}
