import { WelcomeVotingLayout } from '@/features/voting/components/layouts/welcome-voting-layout'
import { Button } from '@mantine/core'
import Link from 'next/link'
import { Metadata } from 'next'
import { Logo } from '@/components/ui/logo/logo'

export const metadata: Metadata = {
  title: 'Bem vindo a votação'
}

export default async function WelcomeVotingPage({
  params: { eventId }
}: {
  params: { eventId: string }
}) {
  const identificationPageUrl = `/votacao/evento/${eventId}/identificacao`
  return (
    <WelcomeVotingLayout>
      <div className="mx-auto">
        <Logo />
      </div>
      <div className="w-full">
        <h1 className="mx-auto mb-4 text-center text-lg font-bold">
          Sua Voz, Nosso Futuro.
        </h1>
        <div className="space-y-2 text-sm">
          <p>
            Aqui você pode participar das decisões importantes do nosso estado.
          </p>
          <p>
            Você tem 100 pontos para distribuir entre as propostas da oficina em
            que você está inscrito.
          </p>
          <p>
            Escolha as ideias que você acha mais importantes e coloque mais
            pontos nelas. Você pode dividir os pontos como quiser — tudo em uma
            só proposta, ou um pouco em cada.
          </p>
          <p>
            Quando terminar, clique no botão Confirmar Voto para enviar sua
            escolha.
          </p>
        </div>
      </div>

      <Button fullWidth component={Link} href={identificationPageUrl}>
        Identifique-se
      </Button>
    </WelcomeVotingLayout>
  )
}
