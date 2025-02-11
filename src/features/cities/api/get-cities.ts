import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { ServerResult } from '@/types/server-result'
import { City } from '../types'
import { citiesSearchParams } from '../lib/search-params'
import { buildParams } from '@/lib/api-utils'
import { logger } from '@/lib/logger'

interface CitiesResponse {
  count: number
  results: City[]
}

type GetCitiesInput = {
  page?: number
}

export async function getCities({ page = 1 }: GetCitiesInput = {}): Promise<
  ServerResult<CitiesResponse>
> {
  const searchParams = citiesSearchParams.all()
  const params = buildParams({
    search: searchParams.search,
    ordering: searchParams.sort,
    territorio: searchParams.territories,
    page,
    page_size: 15
  })

  try {
    const response = await api.get(`/municipios?${params.toString()}`)

    if (!response.ok) {
      const error = await response.json()
      logger.error('Erro na API em getCities', {
        status: response.status,
        params: params.toString(),
        error: error.detail
      })
      return { error: error.detail || API.UNEXPECTED_FETCH_ERROR }
    }

    const data: CitiesResponse = await response.json()
    return { data }
  } catch (error) {
    logger.error('Erro inesperado em getCities', {
      error,
      params: params.toString()
    })
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
