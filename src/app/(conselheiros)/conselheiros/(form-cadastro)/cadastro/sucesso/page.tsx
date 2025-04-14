import { Button } from '@mantine/core'
import { Check } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cadastro concluído'
}

export default function Successo() {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center space-y-4 p-5 text-center">
      <span className="block rounded-full bg-green-100 p-3">
        <span className="block rounded-full bg-green-700 p-3">
          <Check className="size-6 text-white" />
        </span>
      </span>
      <h1 className="text-2xl font-bold">Cadastro concluído com sucesso!</h1>
      <p className="max-w-md text-center text-secondary-foreground">
        Agradecemos sua participação. Sua inscrição foi realizada com sucesso.
      </p>
      <Button component={Link} href="/conselheiros/dados">
        Ir para meu painel de conselheiro
      </Button>
    </div>
  )
}
