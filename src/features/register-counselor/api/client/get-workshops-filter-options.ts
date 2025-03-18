import { API } from '@/constants/messages'
import { clientApi } from '@/lib/client-api'

interface FilterOptionWorkshop {
  id: number
  nome: string
  esgotado: boolean
}

export async function getWorkshopsFilterOptions(): Promise<
  FilterOptionWorkshop[]
> {
  const response = await clientApi.get('/eixos/')
  if (!response.ok) {
    const error = await response.json()
    throw Error(error.detail || API.UNEXPECTED_FETCH_ERROR)
  }

  return await response.json()
}
