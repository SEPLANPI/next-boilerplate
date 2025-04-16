import { API } from '@/constants/messages'
import { PAGINATION } from '@/constants/pagination'
import { buildParams } from '@/lib/api-utils'
import { api } from '@/lib/server-api'
import { DjangoError } from '@/types/actions'
import { ServerResult } from '@/types/server-result'
import { proposalsSearchParams } from '../lib/search-params'
import { Proposal } from '../types'

type GetProposalResponse = {
  count: number
  results: Proposal[]
}

export async function getProposals(
  eventId: string
): Promise<ServerResult<GetProposalResponse>> {
  try {
    const { page, search, sort, eixos, status } = proposalsSearchParams.all()
    const params = buildParams({
      page,
      search,
      eixo: eixos,
      status_atual: status,
      ordering: sort,
      page_size: PAGINATION.DEFAULT_PAGE_SIZE,
      evento_id: eventId
    })
    const response = await api.get(`/listar-propostas/?${params.toString()}`)

    if (!response.ok) {
      const error: DjangoError = await response.json()
      return { error }
    }

    const data: GetProposalResponse = await response.json()
    return { data }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}

export async function getProposal(
  id: string,
  eventId: string
): Promise<ServerResult<Proposal>> {
  try {
    const response = await api.get(
      `/propostas/${id}/detalhes/?evento_id=${eventId}`
    )

    if (!response.ok) {
      const error: DjangoError = await response.json()
      return { error }
    }

    const data: Proposal = await response.json()
    return { data }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
