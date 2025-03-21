import { API } from '@/constants/messages'
import { clientApi } from '@/lib/client-api'

export interface Council {
  id: number
  nome: string
}

export async function getCouncils(): Promise<Council[]> {
  const response = await clientApi.get('/conselhos/')
  if (!response.ok) {
    const error = await response.json()
    throw Error(error.detail || API.UNEXPECTED_FETCH_ERROR)
  }

  return await response.json()
}
