import { API } from '@/constants/messages'
import { ServerResult } from '@/types/server-result'
import { api } from '@/lib/server-api'
import { buildParams } from '@/lib/api-utils'
import { DjangoError } from '@/types/actions'
import { GetVotingResponse } from '../types'
import { votingSearchParams } from '../lib/search-params'

export async function getVoting(
  eventId: string
): Promise<ServerResult<GetVotingResponse>> {
  try {
    const { search, eixo, sort } = votingSearchParams.all()
    const params = buildParams({
      search,
      eixo,
      order_by: sort,
      evento_id: eventId
    })
    const response = await api.get(`/votacao-admin/relatorio/?${params}`)

    if (!response.ok) {
      const error: DjangoError = await response.json()
      return { error }
    }

    const data: GetVotingResponse = await response.json()
    return { data }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
