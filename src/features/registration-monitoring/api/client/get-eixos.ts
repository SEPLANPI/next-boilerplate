import { API } from '@/constants/messages'
import { clientApi } from '@/lib/client-api'

export interface EixoFilterOption {
  id: string
  nome: string
}

export async function getEixosFilterOptions(): Promise<EixoFilterOption[]> {
  const response = await clientApi.get('/eixos/')
  if (!response.ok) {
    const error = await response.json()
    throw Error(error.detail || API.UNEXPECTED_FETCH_ERROR)
  }

  return await response.json()
}
