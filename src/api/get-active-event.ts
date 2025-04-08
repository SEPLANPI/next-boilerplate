import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { DjangoError } from '@/types/actions'
import { ServerResult } from '@/types/server-result'

export type Event = {
  id: string
  nome: string
}

export async function getActiveEvent(): Promise<ServerResult<Event>> {
  try {
    const response = await api.get(`/evento-ativo/`)

    if (!response.ok) {
      const error: DjangoError = await response.json()
      return { error }
    }

    const data: Event = await response.json()
    return { data }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
