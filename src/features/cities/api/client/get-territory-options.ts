import { API } from '@/constants/messages'
import { clientApi } from '@/lib/client-api'

interface FilterOptionTerritory {
  id: number
  nome: string
}

export async function getTerritoryFilterOptions(): Promise<
  FilterOptionTerritory[]
> {
  const response = await clientApi.get('/territorios')
  if (!response.ok) {
    const error = await response.json()
    throw Error(error.detail || API.UNEXPECTED_FETCH_ERROR)
  }

  const data = await response.json()

  return data.results as FilterOptionTerritory[]
}
