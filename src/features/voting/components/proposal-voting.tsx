'use client'

import { useState } from 'react'
import { Input, Button } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { submitVotes } from '../actions/submit-votes'
import { buildErrorMessage } from '@/utils/format-django-errors'
import { RemainingPointsCoins } from './remaining-points-coins'
import { ProposalModal } from './proposal-modal'

interface ProposalVotingProps {
  proposals: Array<{
    id: string
    titulo: string
    conteudo: string
  }>
  registrationId: string
}

export function ProposalVoting({
  proposals,
  registrationId
}: ProposalVotingProps) {
  const [votes, setVotes] = useState<Record<string, number>>(
    Object.fromEntries(proposals.map((p) => [p.id, 0]))
  )
  const [selectedProposal, setSelectedProposal] = useState<
    (typeof proposals)[0] | null
  >(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const totalPoints = Object.values(votes).reduce((sum, v) => sum + v, 0)
  const remainingPoints = 100 - totalPoints

  const handleVoteChange = (proposalId: string, points: string) => {
    const currentVotePoints = votes[proposalId]
    const availablePoints = remainingPoints + currentVotePoints
    const newPoints = Math.min(
      Math.max(0, parseInt(points) || 0),
      availablePoints
    )

    setVotes({ ...votes, [proposalId]: newPoints })
  }

  const handleSubmit = async () => {
    if (totalPoints !== 100) {
      alert('Por favor, distribua exatamente 100 pontos')
      return
    }

    setIsSubmitting(true)
    const result = await submitVotes({
      inscricao: registrationId,
      votos: Object.entries(votes)
        .map(([id, pontos]) => ({
          proposta_id: id,
          pontos
        }))
        .filter(({ pontos }) => pontos > 0)
    })

    if (result?.error) {
      notifications.show({
        message: buildErrorMessage(result.error),
        color: 'red'
      })
      setIsSubmitting(false)

      return
    }

    notifications.show({
      message: 'Votos registrados com sucesso!',
      color: 'green'
    })

    setIsSubmitting(false)
  }

  return (
    <div className="flex flex-col space-y-6">
      <RemainingPointsCoins remainingPoints={remainingPoints} />
      <p className="text-sm text-secondary-foreground">
        Você tem 100 pontos para distribuir entre as propostas da oficina em que
        está inscrita.
      </p>
      <div className="divide-y border-t">
        {proposals.map((proposal) => (
          <div
            key={proposal.id}
            className="flex items-center justify-between gap-2 py-4"
          >
            <h6
              className="w-full cursor-pointer text-sm"
              onClick={() => setSelectedProposal(proposal)}
            >
              {proposal.titulo}
            </h6>
            <Input
              type="number"
              min={0}
              max={remainingPoints + votes[proposal.id]}
              value={votes[proposal.id]}
              onChange={(e) => handleVoteChange(proposal.id, e.target.value)}
              className="w-14 flex-shrink-0"
            />
          </div>
        ))}
      </div>

      <ProposalModal
        isOpen={!!selectedProposal}
        onClose={() => setSelectedProposal(null)}
        proposal={selectedProposal}
        currentPoints={selectedProposal ? votes[selectedProposal.id] : 0}
        remainingPoints={
          selectedProposal ? remainingPoints + votes[selectedProposal.id] : 0
        }
        onPointsConfirm={(points) =>
          selectedProposal &&
          handleVoteChange(selectedProposal.id, points.toString())
        }
      />

      <Button
        onClick={handleSubmit}
        disabled={totalPoints !== 100}
        loading={isSubmitting}
        className="w-full"
      >
        Confirmar distribuição
      </Button>
    </div>
  )
}
