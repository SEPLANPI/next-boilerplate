import { API } from '@/constants/messages'
import { PAGINATION } from '@/constants/pagination'
import { buildParams } from '@/lib/api-utils'
import { api } from '@/lib/server-api'
import { DjangoError } from '@/types/actions'
import { ServerResult } from '@/types/server-result'
import { generalRegistrationSearchParams } from '../lib/search-params'
import { Person } from '../types'

type GetGeneralRegistrationsResponse = {
  count: number
  results: Person[]
}

export async function getPeople(
  eventId: string
): Promise<ServerResult<GetGeneralRegistrationsResponse>> {
  try {
    const {
      page,
      search,
      sort,
      cadastrado_presencialmente,
      tipo_inscricao,
      tipo_membro,
      eixos
    } = generalRegistrationSearchParams.all()
    const params = buildParams({
      page,
      search,
      ordering: sort,
      cadastrado_presencialmente: cadastrado_presencialmente,
      tipo_inscricao: tipo_inscricao,
      tipo_membro: tipo_membro,
      page_size: PAGINATION.DEFAULT_PAGE_SIZE,
      eixos: eixos,
      evento_id: eventId
    })
    const response = await api.get(`/pessoas/?${params.toString()}`)

    if (!response.ok) {
      const error: DjangoError = await response.json()
      return { error }
    }

    const data: GetGeneralRegistrationsResponse = await response.json()
    return { data }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
