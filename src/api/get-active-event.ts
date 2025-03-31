import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { DjangoError } from '@/types/actions'
import { ServerResult } from '@/types/server-result'

export type Event = {
  id: string
}

export async function getActiveEvent(): Promise<ServerResult<Event>> {
  try {
    const response = await api.get(`/eventos/`)

    if (!response.ok) {
      const error: DjangoError = await response.json()
      return { error }
    }

    const result = await response.json()
    const event: Event = result[0]
    return { data: event }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
