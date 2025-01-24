import { API } from '@/constants/messages'
import { clientApi } from '@/lib/client-api'

interface FilterOptionDeputy {
  nome: string
}

export async function getDeputyFilterOptions(): Promise<FilterOptionDeputy[]> {
  const response = await clientApi.get('/deputados/filtro')

  if (!response.ok) {
    const error = await response.json()
    throw Error(error.detail || API.UNEXPECTED_FETCH_ERROR)
  }

  const data: FilterOptionDeputy[] = await response.json()
  return data
}
