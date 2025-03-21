import { API } from '@/constants/messages'
import { ServerResult } from '@/types/server-result'
import { Invitation } from '../types'
import { api } from '@/lib/server-api'
import { invitationsSearchParams } from '../lib/search-params'
import { buildParams } from '@/lib/api-utils'

type GetInvitationsResponse = {
  count: number
  results: Invitation[]
}

export async function getInvitations(): Promise<
  ServerResult<GetInvitationsResponse>
> {
  try {
    const { page, search } = invitationsSearchParams.all()
    const params = buildParams({ page, search })
    const response = await api.get(`/convites/?${params}`)

    if (!response.ok) {
      const data = await response.json()
      return { error: data.detail || API.UNEXPECTED_FETCH_ERROR }
    }

    const data: GetInvitationsResponse = await response.json()

    return { data }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
