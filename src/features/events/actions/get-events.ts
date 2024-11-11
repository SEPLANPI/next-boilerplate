import dayjs from 'dayjs'
import { eventsSearchParams } from '../lib/search-params'
import { api } from '@/lib/api'
import { ActionState } from '@/types/actions'

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

export async function getEvents(
  groupId?: string
): Promise<ActionState<EventsResponse>> {
  const { page, search, ugs, fromDate, toDate, group, municipios, sort } =
    eventsSearchParams.all()
  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('nome', search)
  if (fromDate) {
    params.append('data_inicio', dayjs(fromDate).format('YYYY-MM-DD'))
  }
  if (toDate) {
    params.append('data_after', dayjs(toDate).format('YYYY-MM-DD'))
  }

  if (ugs && group !== 'ugs') {
    ugs.forEach((ug) => params.append('ugs', ug.toString()))
  }
  if (municipios && group !== 'municipios') {
    console.log(municipios)
    municipios.forEach((municipio) => params.append('municipio', municipio))
  }
  if (sort) {
    params.append('ordering', sort)
  }

  if (groupId && group) {
    params.append(group, groupId)
  }

  const response = await api.get(`/eventos?${params.toString()}`)

  if (!response.ok) {
    const error = await response.json()

    return { error: error.detail }
  }

  const data: EventsResponse = await response.json()

  return { data }
}
