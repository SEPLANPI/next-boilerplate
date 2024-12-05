import { api } from '@/lib/server-api'
import { EventGroup } from '@/types/events'
import { eventsSearchParams } from '../lib/search-params'
import { ServerResult } from '@/types/server-result'
import { buildEventsParams } from '../utils/build-events-params'
import { API } from '@/constants/messages'

export type EventGroupResponse = {
  count: number
  results: EventGroup[]
}

export async function getEventGroups(): Promise<
  ServerResult<EventGroupResponse>
> {
  const { groupSort, ...eventsParams } = eventsSearchParams.all()

  if (!eventsParams.group) {
    return { error: 'Query param "group" não está definido' }
  }

  const params = buildEventsParams({
    ...eventsParams,
    sort: groupSort
  })

  try {
    const response = await api.get(`/eventos/agrupamentos?${params.toString()}`)

    if (!response.ok) {
      const error = await response.json()
      return { error: error.detail || 'Ocorreu um erro inesperado' }
    }

    const data: EventGroupResponse = await response.json()

    return { data }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
