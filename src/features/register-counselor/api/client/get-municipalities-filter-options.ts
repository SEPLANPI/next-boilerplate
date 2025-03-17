import { API } from '@/constants/messages'
import { clientApi } from '@/lib/client-api'

interface FilterOptionMunicipality {
  id: number
  nome: string
}

export async function getMunicipalitiesFilterOptions(): Promise<
  FilterOptionMunicipality[]
> {
  const response = await clientApi.get('/municipios/')
  if (!response.ok) {
    const error = await response.json()
    throw Error(error.detail || API.UNEXPECTED_FETCH_ERROR)
  }

  return await response.json()
}
