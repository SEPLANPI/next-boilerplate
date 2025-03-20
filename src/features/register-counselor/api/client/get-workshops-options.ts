import { API } from '@/constants/messages'
import { clientApi } from '@/lib/client-api'

interface OptionWorkshop {
  id: number
  nome: string
  vagas_disponiveis: boolean
}

export async function getWorkshopsOptions(): Promise<OptionWorkshop[]> {
  const response = await clientApi.get('/eixos/')
  if (!response.ok) {
    const error = await response.json()
    throw Error(error.detail || API.UNEXPECTED_FETCH_ERROR)
  }

  return await response.json()
}
