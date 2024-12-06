import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { ServerResult } from '@/types/server-result'
import { CompaniesResponse } from '../types'
import { companiesSearchParams } from '../lib/search-params'
import { buildParams } from '@/lib/api-utils'
import { logger } from '@/lib/logger'

type GetCompaniesInput = {
  page?: number
}

export async function getCompanies({
  page = 1
}: GetCompaniesInput = {}): Promise<ServerResult<CompaniesResponse>> {
  const searchParams = companiesSearchParams.all()
  const params = buildParams({
    page,
    search: searchParams.search,
    ordering: searchParams.sort,
    page_size: 15
  })

  try {
    const response = await api.get(`/empresas?${params.toString()}`)

    if (!response.ok) {
      const error = await response.json()
      logger.error('Erro na API em getCompanies', {
        status: response.status,
        params: params.toString(),
        error: error.detail
      })
      return { error: error.detail || API.UNEXPECTED_FETCH_ERROR }
    }

    const data: CompaniesResponse = await response.json()
    return { data }
  } catch (error) {
    logger.error('Erro inesperado em getCompanies', {
      error,
      params: params.toString()
    })
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
