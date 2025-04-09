'use client'

interface VotingStatsProps {
  totalPontos: number
  totalVotantes: number
  totalPropostas: number
}

export function VotingStats({
  totalPontos,
  totalVotantes,
  totalPropostas
}: VotingStatsProps) {
  return (
    <div className="mb-6 flex w-full space-x-4">
      <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-md border p-6 shadow">
        <span className="text-4xl font-semibold">{totalPontos}</span>
        <span className="text-sm text-secondary-foreground">
          Total de Pontos
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-md border p-6 shadow">
        <span className="text-4xl font-semibold">{totalVotantes}</span>
        <span className="text-sm text-secondary-foreground">
          Total de Votantes
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-md border p-6 shadow">
        <span className="text-4xl font-semibold">{totalPropostas}</span>
        <span className="text-sm text-secondary-foreground">
          Total de Propostas
        </span>
      </div>
    </div>
  )
}
