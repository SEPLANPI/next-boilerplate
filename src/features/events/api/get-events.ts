import { api } from '@/lib/server-api'
import { EventsResponse } from './types'
import { eventsSearchParams } from '../lib/search-params'
import { buildEventsParams } from '../utils/build-events-params'
import { ServerResult } from '@/types/server-result'

type GetEventsInputType = Partial<{
  groupId: string
  perPage: number
  page?: number
}>

export async function getEvents({
  groupId,
  perPage,
  page = 1
}: GetEventsInputType = {}): Promise<ServerResult<EventsResponse>> {
  const eventsParams = eventsSearchParams.all()

  const params = buildEventsParams({ ...eventsParams, groupId, perPage, page })
  try {
    const response = await api.get(`/eventos?${params.toString()}`)

    if (!response.ok) {
      const error = await response.json()
      return { error: error.detail }
    }

    const data: EventsResponse = await response.json()
    return { data }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: 'Ocorreu um erro inesperado.' }
  }
}
