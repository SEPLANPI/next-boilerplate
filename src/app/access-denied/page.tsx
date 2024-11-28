import { Button } from '@mantine/core'
import { Lock, LogOut } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Acesso Negado'
}

export default function AccessDenied() {
  return (
    <main className="mx-auto mt-8 flex items-start max-w-2xl flex-col  justify-center px-5 py-12">
      <div className="rounded bg-muted p-4">
      <Lock className="size-12 text-muted-foreground "/>
      </div>
      <h1 className="mb-4 mt-6 text-4xl font-bold">
        Acesso Negado
      </h1>
      <div className="space-y-2">
        <p>
          Você não possui as permissões necessárias para acessar este sistema.
        </p>
        <p>
          Se você acredita que isso é um erro ou precisa de acesso, entre em
          contato com o administrador do sistema.
        </p>
      </div>
      <Button
        className="mt-8"
        component={Link}
        href="/api/auth/sign-out"
        rightSection={<LogOut className="size-4" />}
      >
        Sair
      </Button>
    </main>
  )
}
