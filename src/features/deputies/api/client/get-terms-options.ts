import { API } from '@/constants/messages'
import { clientApi } from '@/lib/client-api'
import { Term } from '../../types'

export async function getTermsOptions(): Promise<Term[]> {
  const response = await clientApi.get('/vigencias/filtro')
  if (!response.ok) {
    const error = await response.json()
    throw Error(error.detail || API.UNEXPECTED_FETCH_ERROR)
  }

  return response.json()
}
