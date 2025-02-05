import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { ServerResult } from '@/types/server-result'
import { PoliticalParty } from '../types'
import { politicalPartiesSearchParams } from '../lib/search-params'
import { buildParams } from '@/lib/api-utils'

type GetPoliticalPartiesInput = {
  page?: number
}

export interface PoliticalPartiesResponse {
  count: number
  results: PoliticalParty[]
}

export async function getPoliticalParties({ page = 1 }: GetPoliticalPartiesInput = {}): Promise<
  ServerResult<PoliticalPartiesResponse>
> {
  const searchParams = politicalPartiesSearchParams.all()
  const params = buildParams({
    page,
    search: searchParams.search,
    ordering: searchParams.sort,
    page_size: 15
  })

  try {
    const response = await api.get(`/partidos?${params.toString()}`)

    if (!response.ok) {
      const error = await response.json()
      return { error: error.detail || API.UNEXPECTED_FETCH_ERROR }
    }
    const data: PoliticalPartiesResponse = await response.json()
    return { data }
  } catch (error) {

    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
