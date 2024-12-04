import { clientApi } from '@/lib/client-api'
import { buildEventsParams } from '../../utils/build-events-params'
import { EventsResponse } from '../types'
import { API } from '@/constants/messages'
import { logger } from '@/lib/logger'

export async function clientGetEvents(
  groupUrl: string,
  params: Parameters<typeof buildEventsParams>[0]
) {
  const urlParams = buildEventsParams(params)

  try {
    const response = await clientApi.get(`${groupUrl}&${urlParams.toString()}`)
    if (!response.ok) {
      const error = await response.json()
      logger.error('Erro na API em clientGetEvents', {
        status: response.status,
        url: groupUrl,
        params: urlParams.toString(),
        error: error.detail
      })
      throw new Error(error.detail || API.UNEXPECTED_FETCH_ERROR)
    }

    return (await response.json()) as EventsResponse
  } catch (error) {
    logger.error('Erro inesperado em clientGetEvents', {
      error,
      url: groupUrl,
      params: urlParams.toString()
    })
    throw error
  }
}
