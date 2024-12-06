import { api } from '@/lib/server-api'
import { EventGroupResponse } from '../types'
import { eventsSearchParams } from '../lib/search-params'
import { ServerResult } from '@/types/server-result'
import { API } from '@/constants/messages'
import { buildParams } from '@/lib/api-utils'
import { dayjs } from '@/lib/dayjs'

export async function getEventGroups(): Promise<
  ServerResult<EventGroupResponse>
> {
  const {
    groupSort,
    search,
    fromDate,
    toDate,
    municipios,
    deputados,
    ...eventsParams
  } = eventsSearchParams.all()

  if (!eventsParams.group) {
    return { error: 'Query param "group" não está definido' }
  }

  const params = buildParams({
    ...eventsParams,
    nome: search,
    data_inicio: fromDate ? dayjs(fromDate).format('YYYY-MM-DD') : undefined,
    data_fim: toDate ? dayjs(toDate).format('YYYY-MM-DD') : undefined,
    ordering: groupSort,
    municipio: municipios,
    autor_emenda: deputados
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
