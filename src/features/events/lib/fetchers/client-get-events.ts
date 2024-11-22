import { clientApi } from '@/lib/client-api'
import { buildEventsParams } from '../../utils/build-events-params'
import { EventsResponse } from './types'

export async function clientGetEvents(
  params: Parameters<typeof buildEventsParams>[0]
) {
  const urlParams = buildEventsParams(params)

  try {
    const response = await clientApi.get(`/eventos?${urlParams.toString()}`)
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail)
    }
    return (await response.json()) as EventsResponse
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Ocorreu um erro inesperado.')
  }
}
