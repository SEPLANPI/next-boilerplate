import dayjs from 'dayjs'
import { eventsSearchParams } from '../lib/search-params'
import { api } from '@/lib/api'
import { ActionState } from '@/types/actions'
import type { Event } from '@/types/events'

export type EventsResponse = {
  count: number
  eventos_percentage: number
  total_valor: number
  total_valor_percentage: number
  total_empresas: number
  empresas_percentage: number
  total_municipios: number
  municipios_percentage: number
  results: Event[]
}

type GetEventsInputType = Partial<{
  groupId: string
  perPage: number
}>

export async function getEvents({
  groupId,
  perPage
}: GetEventsInputType = {}): Promise<ActionState<EventsResponse>> {
  const {
    page,
    search,
    ugs,
    fromDate,
    toDate,
    group,
    municipios,
    sort,
    deputados
  } = eventsSearchParams.all()

  const appendParam = (key: string, value?: string | number | null) => {
    if (value) params.append(key, value.toString())
  }

  const appendArrayParams = (
    key: string,
    array: string[] | number[] | undefined
  ) => {
    if (array) array.forEach((item) => params.append(key, item.toString()))
  }

  const params = new URLSearchParams()
  appendParam('page', page)
  appendParam('nome', search)
  appendParam(
    'data_inicio',
    fromDate ? dayjs(fromDate).format('YYYY-MM-DD') : undefined
  )
  appendParam(
    'data_after',
    toDate ? dayjs(toDate).format('YYYY-MM-DD') : undefined
  )
  appendArrayParams('ugs', ugs && group !== 'ugs' ? ugs : undefined)
  appendArrayParams(
    'municipio',
    municipios && group !== 'municipios' ? municipios : undefined
  )
  appendArrayParams(
    'autor_emenda',
    deputados && group !== 'deputados' ? deputados : undefined
  )
  appendParam('ordering', sort)
  if (groupId && group) appendParam(group, groupId)
  appendParam('page_size', perPage)

  try {
    const response = await api.get(`/eventos?${params.toString()}`)
    if (!response.ok) {
      const error = await response.json()

      return { error: error.detail }
    }

    const data: EventsResponse = await response.json()
    return { data }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return { error: 'An unexpected error occurred.' }
  }
}

