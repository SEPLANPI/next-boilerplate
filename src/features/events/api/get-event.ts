import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { ServerResult } from '@/types/server-result'

export async function getEvent(id: string): Promise<ServerResult<Event>> {
  const response = await api.get(`/eventos/${id}`)

  if (!response.ok) {
    const error = await response.json()
    return { error: error.detail || API.UNEXPECTED_FETCH_ERROR }
  }

  const event: Event = await response.json()
  return {
    data: event
  }
}
