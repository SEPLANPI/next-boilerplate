import { API } from '@/constants/messages'
import { clientApi } from '@/lib/client-api'

interface FilterOptionCategory {
  id: number
  nome: string
  subcategorias: FilterOptionCategory[]
}

export async function getCategoryFilterOptions(): Promise<
  FilterOptionCategory[]
> {
  const response = await clientApi.get('/categorias')
  if (!response.ok) {
    const error = await response.json()
    throw Error(error.detail || API.UNEXPECTED_FETCH_ERROR)
  }

  const data = await response.json()

  return data
}
