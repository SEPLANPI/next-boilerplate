import { API } from '@/constants/messages'
import { clientApi } from '@/lib/client-api'

interface FilterOptionCity {
  id: number
  nome: string
}

export async function getCityFilterOptions(): Promise<FilterOptionCity[]> {
  const response = await clientApi.get('/municipios')
  if (!response.ok) {
    const error = await response.json()
    throw Error(error.detail || API.UNEXPECTED_FETCH_ERROR)
  }

  const data = await response.json()
  const cities: FilterOptionCity[] = data.results

  return cities
}
