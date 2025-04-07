'use server'

import { API } from '@/constants/messages'
import { DjangoError } from '@/types/actions'
import { ServerResult } from '@/types/server-result'

type AxisVotingInfo = {
  nome: string
  id: string
  propostas: {
    id: string
    nome: string
    descricao: string
  }[]
}

const mockAxisVotingInfo: AxisVotingInfo = {
  nome: 'Eixo Exemplo',
  id: '1',
  propostas: [
    {
      id: '1',
      nome: 'Proposta 1 dasjdash dkasj hdjksah dkajsdhas jkdahdsjk dsha k',
      descricao: 'Descrição da proposta 1'
    },
    {
      id: '2',
      nome: 'Proposta 2',
      descricao: 'Descrição da proposta 2'
    },
    {
      id: '3',
      nome: 'Proposta 3',
      descricao: 'Descrição da proposta 3'
    }
  ]
}

export async function getAxisVotingInfo(
  axisId: string
): Promise<ServerResult<AxisVotingInfo>> {
  // Simulating a delay to mimic API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  return { data: mockAxisVotingInfo }
}
