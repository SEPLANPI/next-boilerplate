import { API } from '@/constants/messages'
import { clientApi } from '@/lib/client-api'

type Municipio = {
  id: number
  nome: string
}
export async function getMunicipios(): Promise<Municipio[]> {
  const response = await clientApi.get('/municipios')
  if (!response.ok) {
    const error = await response.json()
    throw Error(error.detail || API.UNEXPECTED_FETCH_ERROR)
  }

  const data = await response.json()
  const municipios: Municipio[] = data.results

  return municipios
}
