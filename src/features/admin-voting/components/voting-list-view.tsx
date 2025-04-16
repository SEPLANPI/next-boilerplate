import { FetchError } from '@/components/errors/fetch-error'
import { getVoting } from '../api/get-voting'
import { VotingTable } from './voting-table'
import { VotingStats } from './voting-stats'

interface VotingListViewProps {
  params: { eventId: string }
}

export async function VotingListView({ params }: VotingListViewProps) {
  const { data, error } = await getVoting(params.eventId)

  if (!data || error) {
    return <FetchError title="Erro ao carregar votações" error={error} />
  }

  if (data.propostas.length === 0) {
    return (
      <div className="flex flex-col items-center p-10">
        <h2 className="text-lg font-semibold">
          Não encontramos votações correspondentes
        </h2>
      </div>
    )
  }

  return (
    <>
      <VotingStats
        totalPontos={data.total_geral_pontos}
        totalVotantes={data.total_geral_votantes}
        totalPropostas={data.total_propostas}
      />
      <VotingTable
        data={data.propostas}
        totalPontos={data.total_geral_pontos}
      />
    </>
  )
}
