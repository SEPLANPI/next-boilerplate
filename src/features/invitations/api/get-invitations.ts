import { API } from '@/constants/messages'
import { ServerResult } from '@/types/server-result'
import { Invitation } from '../types'
import { api } from '@/lib/server-api'
import { invitationsSearchParams } from '../lib/search-params'
import { buildParams } from '@/lib/api-utils'
import { PAGINATION } from '@/constants/pagination'
import { DjangoError } from '@/types/actions'

type GetInvitationsResponse = {
  count: number
  results: Invitation[]
}

export async function getInvitations(
  eventId: string
): Promise<ServerResult<GetInvitationsResponse>> {
  try {
    const { page, search, usado, sort } = invitationsSearchParams.all()
    const params = buildParams({
      page,
      search,
      usado,
      ordering: sort,
      page_size: PAGINATION.DEFAULT_PAGE_SIZE,
      evento_id: eventId
    })

    const response = await api.get(`/convites/?${params.toString()}`)

    if (!response.ok) {
      const error: DjangoError = await response.json()
      return { error }
    }

    const data: GetInvitationsResponse = await response.json()

    console.log(data)
    return { data }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
