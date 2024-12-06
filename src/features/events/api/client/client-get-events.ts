import { clientApi } from '@/lib/client-api'
import { API } from '@/constants/messages'
import { logger } from '@/lib/logger'
import { EventsResponse } from '../../types'
import { buildParams } from '@/lib/api-utils'
import { dayjs } from '@/lib/dayjs'

type GetEventsParams = {
  page?: number
  perPage?: number
  search?: string | null
  fromDate?: Date | null
  toDate?: Date | null
  ugs?: number[] | null
  municipios?: string[] | null
  deputados?: string[] | null
  sort?: string | null
  group?: string | null
}

export async function clientGetEvents(
  groupUrl: string,
  {
    search,
    fromDate,
    toDate,
    sort,
    perPage,
    municipios,
    deputados,
    ...params
  }: GetEventsParams
) {
  const urlParams = buildParams({
    ...params,
    nome: search,
    data_inicio: fromDate ? dayjs(fromDate).format('YYYY-MM-DD') : undefined,
    data_fim: toDate ? dayjs(toDate).format('YYYY-MM-DD') : undefined,
    ordering: sort,
    page_size: perPage,
    municipio: municipios,
    autor_emenda: deputados
  })

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
