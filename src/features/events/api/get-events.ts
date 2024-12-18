import { api } from '@/lib/server-api'
import { EventsResponse } from '../types'
import { eventsSearchParams } from '../lib/search-params'
import { ServerResult } from '@/types/server-result'
import { API } from '@/constants/messages'
import { logger } from '@/lib/logger'
import { buildParams } from '@/lib/api-utils'
import { dayjs } from '@/lib/dayjs'

type GetEventsInputType = Partial<{
  groupId: string
  perPage: number
  page?: number
}>

export async function getEvents({
  perPage,
  page = 1
}: GetEventsInputType = {}): Promise<ServerResult<EventsResponse>> {
  const {
    search,
    fromDate,
    toDate,
    sort,
    municipios,
    deputados,
    status,
    ...eventsParams
  } = eventsSearchParams.all()

  const params = buildParams({
    ...eventsParams,
    page,
    page_size: perPage,
    nome: search,
    data_inicio: fromDate ? dayjs(fromDate).format('YYYY-MM-DD') : undefined,
    data_fim: toDate ? dayjs(toDate).format('YYYY-MM-DD') : undefined,
    ordering: sort,
    municipio: municipios,
    autor_emenda: deputados,
    ...(status === 'reviewed'
      ? { editado: true }
      : status === 'pending'
        ? { editado: false }
        : {})
  })

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
  } catch (error) {
    logger.error('Erro inesperado em getEvents', {
      error,
      params: params.toString()
    })
    return { error: 'Ocorreu um erro inesperado.' }
  }
}
