import { API } from '@/constants/messages'
import { ServerResult } from '@/types/server-result'
import { Registration } from '../types'

type GetRegistrationsResponse = {
  count: number
  results: Registration[]
}

const mockData: GetRegistrationsResponse = {
  count: 3,
  results: [
    {
      id: '1',
      usuario: {
        nome: 'João Silva',
        avatar: 'https://i.pravatar.cc/150?u=1'
      },
      eixo: 'Economia',
      ultimo_status: 'PENDENTE',
      responsavel: {
        nome: 'Ana Costa',
        avatar: 'https://i.pravatar.cc/150?u=4'
      }
    },
    {
      id: '2',
      usuario: {
        nome: 'Maria Santos'
      },
      eixo: 'Saúde',
      ultimo_status: 'APROVADO',
      responsavel: {
        nome: 'Pedro Lima'
      }
    },
    {
      id: '3',
      usuario: {
        nome: 'Carlos Oliveira',
        avatar: 'https://i.pravatar.cc/150?u=3'
      },
      eixo: 'Educação',
      ultimo_status: 'REPROVADO',
      responsavel: {
        nome: 'Julia Mendes',
        avatar: 'https://i.pravatar.cc/150?u=6'
      }
    }
  ]
}

export async function getRegistrations(): Promise<
  ServerResult<GetRegistrationsResponse>
> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { data: mockData }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
