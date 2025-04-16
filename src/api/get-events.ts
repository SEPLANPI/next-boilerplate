import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { ServerResult } from '@/types/server-result'
import { Event } from '@/api/client/get-events'

export async function getEvents(): Promise<ServerResult<Event[]>> {
  try {
    const response = await api.get('/eventos/')

    if (!response.ok) {
      const error = await response.json()
      return { error }
    }

    const data: Event[] = await response.json()
    return { data }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
