import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { ServerResult } from '@/types/server-result'
import { AdministrativeUnitsResponse } from '../types'
import { administrativeUnitsSearchParams } from '../lib/search-params'
import { buildParams } from '@/lib/api-utils'
import { logger } from '@/lib/logger'

export async function getAdministrativeUnits(): Promise<
  ServerResult<AdministrativeUnitsResponse>
> {
  const searchParams = administrativeUnitsSearchParams.all()

  const params = buildParams({
    page: searchParams.page,
    search: searchParams.search,
    ordering: searchParams.sort,
    page_size: 15
  })

  try {
    const response = await api.get(`/ugs?${params.toString()}`)

    if (!response.ok) {
      const error = await response.json()
      logger.error('Erro na API em getAdministrativeUnits', {
        status: response.status,
        params: params.toString(),
        error: error.detail
      })
      return { error: error.detail || API.UNEXPECTED_FETCH_ERROR }
    }

    const data: AdministrativeUnitsResponse = await response.json()
    return { data }
  } catch (error) {
    logger.error('Erro inesperado em getAdministrativeUnits', {
      error,
      params: params.toString()
    })
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
