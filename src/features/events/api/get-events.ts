import { api } from '@/lib/server-api'
import { EventsResponse } from './types'
import { eventsSearchParams } from '../lib/search-params'
import { buildEventsParams } from '../utils/build-events-params'
import { ServerResult } from '@/types/server-result'
import { API } from '@/constants/messages'
import { logger } from '@/lib/logger'

type GetEventsInputType = Partial<{
  groupId: string
  perPage: number
  page?: number
}>

export async function getEvents({
  perPage,
  page = 1
}: GetEventsInputType = {}): Promise<ServerResult<EventsResponse>> {
  const eventsParams = eventsSearchParams.all()

  const params = buildEventsParams({ ...eventsParams, perPage, page })
  try {
    const response = await api.get(`/eventos?${params.toString()}`)

    if (!response.ok) {
      const error = await response.json()
      logger.error('Erro na API em getEvents', {
        status: response.status,
        params: params.toString(),
        error: error.detail
      })
      return { error: error.detail || API.UNEXPECTED_FETCH_ERROR }
    }

    const data: EventsResponse = await response.json()
    return { data }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    logger.error('Erro inesperado em getEvents', {
      error,
      params: params.toString()
    })
    return { error: 'Ocorreu um erro inesperado.' }
  }
}
