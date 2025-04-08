'use server'

import { api } from '@/lib/server-api'
import { ActionState, DjangoError } from '@/types/actions'
import { redirect } from 'next/navigation'

type VoteInput = {
  inscricao: string
  votos: Array<{
    proposta_id: string
    pontos: number
  }>
}

export async function submitVotes(
  input: VoteInput
): Promise<ActionState<never>> {
  const response = await api.post('/votacao/votar_proposta/', {
    body: input
  })

  if (!response.ok) {
    const error: DjangoError = await response.json()
    console.log(error)
    return { error }
  }

  redirect('/votacao/obrigado')
}
