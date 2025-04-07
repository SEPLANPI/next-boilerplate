import { FetchError } from '@/components/errors/fetch-error'
import { getAxisVotingInfo } from '@/features/voting/api/get-axis-voting-info'
import { ProposalVoting } from '@/features/voting/components/proposal-voting'
import { buildErrorMessage } from '@/utils/format-django-errors'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Votar'
}

interface VotingPageProps {
  params: {
    axisId: string
    registrationId: string
  }
}

export default async function VotingPage({
  params: { axisId }
}: VotingPageProps) {
  const { data, error } = await getAxisVotingInfo(axisId)

  if (error) {
    return <FetchError error={buildErrorMessage(error)} />
  }

  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center p-5">
      <div className="fixed left-0 top-0 z-0 h-[100dvh] w-full">
        <Image
          src="/conselheiro-form/bg.png"
          fill
          sizes={'100vw'}
          quality={100}
          alt="Senhor com fundo verde"
          className="object-cover"
        />
      </div>
      <div className="x relative z-10 flex w-full max-w-[672px] flex-col space-y-4 sm:mt-16">
        <Image
          src="/conselheiro-form/header.png"
          className="w-full"
          alt="Logo diálogos com listras do piauí em gradiente"
          quality={100}
          width={1350}
          height={144}
        />
        <div className="flex flex-col space-y-4 rounded-md bg-white p-6 shadow-md">
          <h1 className="font-montserrat text-lg font-bold">
            Votação das Propostas
          </h1>
          <p className="text-sm text-secondary-foreground">
            Aqui você pode participar das decisões importantes do nosso estado.
            Escolha as ideias que você acha mais importantes e coloque mais
            pontos nelas.
          </p>
        </div>
        <div className="flex flex-col space-y-4 rounded-md bg-white p-6 shadow-md">
          <ProposalVoting proposals={data.propostas} />
        </div>
      </div>
    </div>
  )
}
