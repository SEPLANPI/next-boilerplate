'use client'

import { useState } from 'react'
import { Button, ActionIcon } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { submitVotes } from '../actions/submit-votes'
import { buildErrorMessage } from '@/utils/format-django-errors'
import { RemainingPointsCoins } from './remaining-points-coins'
import { Minus, Plus } from 'lucide-react'

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const totalPoints = Object.values(votes).reduce((sum, v) => sum + v, 0)
  const remainingPoints = 100 - totalPoints
  const { ref, entry } = useIntersection({
    threshold: 0
  })

  const handleVoteChange = (proposalId: string, increment: boolean) => {
    const currentVotePoints = votes[proposalId]
    const change = increment ? 5 : -5
    const availablePoints = remainingPoints + currentVotePoints
    const newPoints = Math.min(
      Math.max(0, currentVotePoints + change),
      increment ? availablePoints : currentVotePoints
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

    setIsSubmitting(false)
  }

  return (
    <>
      {entry?.isIntersecting === false && (
        <header className="fixed left-0 top-0 z-50 flex h-10 w-full items-center justify-center bg-lime-600 px-4 text-white">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Pontos restantes:</span>
            <span className="font-bold">{remainingPoints}</span>
          </div>
        </header>
      )}
      <div className="flex flex-col space-y-6">
        <div ref={ref}>
          <RemainingPointsCoins remainingPoints={remainingPoints} />
        </div>

        <p className="text-sm">
          Você tem 100 pontos para distribuir entre as propostas da oficina em
          que está inscrita.
        </p>
        <div className="divide-y border-t">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="flex flex-col gap-2 py-4">
              <h6 className="text-sm">{proposal.titulo}</h6>
              <div className="flex items-center justify-between gap-4 rounded border">
                <ActionIcon
                  variant="subtle"
                  size="md"
                  onClick={() => handleVoteChange(proposal.id, false)}
                  disabled={votes[proposal.id] === 0}
                >
                  <Minus className="size-4" />
                </ActionIcon>
                <span className="min-w-[2rem] text-center">
                  {votes[proposal.id]}
                </span>
                <ActionIcon
                  variant="subtle"
                  size="md"
                  onClick={() => handleVoteChange(proposal.id, true)}
                  disabled={remainingPoints === 0}
                >
                  <Plus className="size-4" />
                </ActionIcon>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={totalPoints !== 100}
          loading={isSubmitting}
          className="w-full"
        >
          Confirmar distribuição
        </Button>
      </div>
    </>
  )
}
