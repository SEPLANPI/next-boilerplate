import { api } from '@/lib/server-api'
import { EventGroup } from '@/types/events'
import { eventsSearchParams } from '../lib/search-params'
import { ServerResult } from '@/types/server-result'

export type EventGroupResponse = {
  count: number
  results: EventGroup[]
}

export async function getEventGroups(): Promise<
  ServerResult<EventGroupResponse>
> {
  const { group, page, groupSort } = eventsSearchParams.all()
  const params = new URLSearchParams()

  if (!group) {
    return { error: 'Query param "group" não está definido' }
  }

  params.append('group_by', group)
  params.append('page', page.toString())

  if (groupSort) {
    params.append('ordering', groupSort)
  }

  const response = await api.get(`/eventos/agrupamentos?${params.toString()}`)

  console.log(`/eventos/agrupamentos?${params.toString()}`)

  if (!response.ok) {
    const error = await response.json()
    return { error: error.detail || 'Ocorreu um erro inesperado' }
  }

  const data: EventGroupResponse = await response.json()

  return { data }
}
