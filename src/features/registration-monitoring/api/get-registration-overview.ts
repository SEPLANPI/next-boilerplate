import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { DjangoError } from '@/types/actions'
import { ServerResult } from '@/types/server-result'

export interface RegistrationOverview {
  total_inscritos: number
  ouvintes: number
  total_votantes: number
  inscritos_por_eixo: {
    nome: string
    descricao: string
    total: number
  }[]
  inscritos_por_municipio: {
    nome: string
    total: number
  }[]
}

export async function getRegistrationOverview(): Promise<
  ServerResult<RegistrationOverview>
> {
  try {
    const response = await api.get('/monitoramento/inscricoes/')
    if (!response.ok) {
      const error: DjangoError = await response.json()
      return { error: error }
    }
    const data = await response.json()
    return { data }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
