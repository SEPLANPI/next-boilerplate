import { API } from '@/constants/messages'
import { clientApi } from '@/lib/client-api'
import { PoliticalParty } from '../../../political-party/types'

export async function getPoliticalParties(): Promise<PoliticalParty[]> {
  const response = await clientApi.get('/partidos/filtro')
  if (!response.ok) {
    const error = await response.json()
    throw Error(error.detail || API.UNEXPECTED_FETCH_ERROR)
  }

  return response.json()
}
