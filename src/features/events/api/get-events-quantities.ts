import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { ServerResult } from '@/types/server-result'

type GetQuantitiesResponse = {
  total_eventos: number
  eventos_revisados: number
  eventos_pendentes: number
}

export async function getEventsQuantities(): Promise<
  ServerResult<GetQuantitiesResponse>
> {
  const response = await api.get('/eventos/quantidades/', {
    next: {
      tags: ['events-quantities']
    }
  })
  if (!response.ok) {
    const error = await response.json()
    return { error: error.detail || API.UNEXPECTED_FETCH_ERROR }
  }

  const data = (await response.json()) as GetQuantitiesResponse
  return { data }
}
