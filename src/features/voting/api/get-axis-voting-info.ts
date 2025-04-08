'use server'

import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { DjangoError } from '@/types/actions'
import { ServerResult } from '@/types/server-result'

type AxisVotingInfo = {
  nome: string
  id: string
  propostas: {
    id: string
    titulo: string
    conteudo: string
  }[]
}

export async function getAxisVotingInfo(
  registrationId: string
): Promise<ServerResult<AxisVotingInfo>> {
  try {
    const response = await api.get(
      `/votacao/eixos_propostas/?inscricao=${registrationId}`
    )

    if (!response.ok) {
      const error: DjangoError = await response.json()
      return { error }
    }

    const data: AxisVotingInfo = await response.json()
    return { data }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
