import { API } from '@/constants/messages'
import { clientApi } from '@/lib/client-api'

interface FilterOptionBank {
  id: number
  full_name: string
  code: string | null
}

export async function getBanksFilterOptions(): Promise<FilterOptionBank[]> {
  const response = await clientApi.get('/bancos/')
  if (!response.ok) {
    const error = await response.json()
    throw Error(error.detail || API.UNEXPECTED_FETCH_ERROR)
  }

  return await response.json()
}
