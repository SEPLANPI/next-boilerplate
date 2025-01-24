import { API } from '@/constants/messages'
import { clientApi } from '@/lib/client-api'

export interface FilterOptionUnit {
  numero: number
  nome: string
  sigla: string
  has_events: boolean
}

export async function getUnitFilterOptions(): Promise<FilterOptionUnit[]> {
  const response = await clientApi.get('/ugs/filtro')
  if (!response.ok) {
    const error = await response.json()
    throw Error(error.detail || API.UNEXPECTED_FETCH_ERROR)
  }

  const data = (await response.json()) as FilterOptionUnit[]
  return data
}
