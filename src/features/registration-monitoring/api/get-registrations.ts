import { API } from '@/constants/messages'
import { ServerResult } from '@/types/server-result'
import { Registration } from '../types'
import { PAGINATION } from '@/constants/pagination'
import { buildParams } from '@/lib/api-utils'
import { api } from '@/lib/server-api'
import { DjangoError } from '@/types/actions'
import { registrationSearchParams } from '../lib/search-params'

type GetRegistrationsResponse = {
  count: number
  results: Registration[]
}

export async function getRegistrations(): Promise<
  ServerResult<GetRegistrationsResponse>
> {
  try {
    const { page, search, sort, eixos, status } = registrationSearchParams.all()
    const params = buildParams({
      page,
      search,
      eixo: eixos,
      status_atual: status,
      ordering: sort,
      page_size: PAGINATION.DEFAULT_PAGE_SIZE
    })
    const response = await api.get(
      `/validacao-conselheiro/listar-conselheiros/?${params.toString()}`
    )

    if (!response.ok) {
      console.log(await response.text())
      const error: DjangoError = await response.json()
      return { error }
    }

    const data: GetRegistrationsResponse = await response.json()
    console.log(data)
    return { data }
  } catch (error) {
    console.log(error)
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
