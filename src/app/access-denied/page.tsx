import { Lock } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acesso Negado'
}

export default function AccessDenied() {
  return (
    <main className="mx-auto mt-4 flex max-w-3xl flex-col items-start justify-center px-5 py-8">
      <Lock className="size-12" />
      <h1 className="mb-2 mt-8 text-6xl font-bold">Acesso Negado</h1>
      <div className="space-y-2 text-lg">
        <p>
          Infelizmente, você não possui permissão para acessar este sistema.
        </p>
        <p>
          Se você acredita que isso é um erro ou precisa de acesso, entre em
          contato com o administrador do sistema.
        </p>
      </div>
    </main>
  )
}
