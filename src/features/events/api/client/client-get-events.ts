import { clientApi } from '@/lib/client-api'
import { buildEventsParams } from '../../utils/build-events-params'
import { EventsResponse } from '../types'
import { API } from '@/constants/messages'

export async function clientGetEvents(
  params: Parameters<typeof buildEventsParams>[0]
) {
  const urlParams = buildEventsParams(params)

  const response = await clientApi.get(`/eventos?${urlParams.toString()}`)
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || API.UNEXPECTED_FETCH_ERROR)
  }

  return (await response.json()) as EventsResponse
}
