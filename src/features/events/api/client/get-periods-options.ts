import { API } from '@/constants/messages'
import { clientApi } from '@/lib/client-api'

export interface FilterOptionPeriod {
  id: number
  ano: number
}

export async function getPeriodOptions(): Promise<FilterOptionPeriod[]> {
  const response = await clientApi.get('/exercicios/filtro')
  if (!response.ok) {
    const error = await response.json()
    throw Error(error.detail || API.UNEXPECTED_FETCH_ERROR)
  }

  const data = (await response.json()) as FilterOptionPeriod[]
  return data
}
