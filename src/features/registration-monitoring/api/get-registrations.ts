import { API } from '@/constants/messages'
import { PAGINATION } from '@/constants/pagination'
import { buildParams } from '@/lib/api-utils'
import { api } from '@/lib/server-api'
import { DjangoError } from '@/types/actions'
import { ServerResult } from '@/types/server-result'
import { registrationSearchParams } from '../lib/search-params'
import { Registration } from '../types'

type GetRegistrationsResponse = {
  count: number
  results: Registration[]
}

export async function getRegistrations(
  eventId: string
): Promise<ServerResult<GetRegistrationsResponse>> {
  try {
    const { page, search, sort, eixos, status } = registrationSearchParams.all()
    const params = buildParams({
      page,
      search,
      eixo: eixos,
      status_atual: status,
      ordering: sort,
      page_size: PAGINATION.DEFAULT_PAGE_SIZE,
      evento_id: eventId
    })

    const response = await api.get(
      `/validacao-conselheiro/listar-conselheiros/?${params.toString()}`
    )

    if (!response.ok) {
      const error: DjangoError = await response.json()
      console.log(error)
      return { error }
    }

    const data: GetRegistrationsResponse = await response.json()
    return { data }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
