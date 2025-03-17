import { API } from '@/constants/messages'
import { ServerResult } from '@/types/server-result'
import { Invitation } from '../types'

type GetInvitationsResponse = {
  count: number
  results: Invitation[]
}

const mockData: GetInvitationsResponse = {
  count: 3,
  results: [
    {
      id: '1',
      nome: 'Empresa A',
      situacao: 'PENDENTE',
      criado_em: '03-02-2025',
      responsavel: {
        nome: 'João Silva',
        avatar: 'https://i.pravatar.cc/150?u=1'
      }
    },
    {
      id: '2',
      nome: 'Empresa B',
      criado_em: '01-02-2025',

      situacao: 'SUBMETIDO',
      responsavel: {
        nome: 'Maria Santos'
      }
    },
    {
      id: '3',
      nome: 'Empresa C',
      situacao: 'PENDENTE',
      criado_em: '05-02-2025',
      responsavel: {
        nome: 'Carlos Oliveira',
        avatar: 'https://i.pravatar.cc/150?u=3'
      }
    }
  ]
}

export async function getInvitations(): Promise<
  ServerResult<GetInvitationsResponse>
> {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { data: mockData }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
