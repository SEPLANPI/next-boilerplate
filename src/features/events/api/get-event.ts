import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { ServerResult } from '@/types/server-result'
import { EventDetail } from '@/features/events/types'

export async function getEvent(id: string): Promise<ServerResult<EventDetail>> {
  const response = await api.get(`/eventos/${id}`)

  if (!response.ok) {
    const error = await response.json()
    return { error: error.detail || API.UNEXPECTED_FETCH_ERROR }
  }

  const event: EventDetail = await response.json()
  return {
    data: event
  }
}
