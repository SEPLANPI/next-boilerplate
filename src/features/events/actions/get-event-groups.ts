import { eventsSearchParams } from '../lib/search-params'
import { api } from '@/lib/api'
import { ActionState } from '@/types/actions'
import { EventGroup } from '@/types/events'

export type EventGroupResponse = {
  count: number
  data: EventGroup[]
}

export async function getEventGroups(): Promise<
  ActionState<EventGroupResponse>
> {
  const { group } = eventsSearchParams.all()
  const params = new URLSearchParams()

  if (!group) {
    return { error: 'Query param "group" não está definido' }
  }

  params.append('group_by', group)

  const response = await api.get(`/eventos/agrupamentos?${params.toString()}`)

  if (!response.ok) {
    const error = await response.json()
    return { error: error.detail || 'Ocorreu um erro inesperado' }
  }

  const data: EventGroupResponse = await response.json()

  return { data }
}
