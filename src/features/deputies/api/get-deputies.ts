import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { ServerResult } from '@/types/server-result'
import { DeputiesResponse } from '../types'
import { deputiesSearchParams } from '../lib/search-params'
import { buildParams } from '@/lib/api-utils'
import { logger } from '@/lib/logger'

type GetDeputiesInput = {
  page?: number
}

export async function getDeputies({ page = 1 }: GetDeputiesInput = {}): Promise<
  ServerResult<DeputiesResponse>
> {
  const searchParams = deputiesSearchParams.all()
  const params = buildParams({
    page,
    page_size: 15,
    search: searchParams.search,
    ordering: searchParams.sort,
    mandato: searchParams.mandatos,
    partido: searchParams.partidos
  })

  try {
    const response = await api.get(`/deputados?${params.toString()}`)

    if (!response.ok) {
      const error = await response.json()
      logger.error('Erro na API em getDeputies', {
        status: response.status,
        params: params.toString(),
        error: error.detail
      })
      return { error: error.detail || API.UNEXPECTED_FETCH_ERROR }
    }

    const data: DeputiesResponse = await response.json()
    return { data }
  } catch (error) {
    logger.error('Erro inesperado em getDeputies', {
      error,
      params: params.toString()
    })
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
