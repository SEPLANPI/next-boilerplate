import { API } from '@/constants/messages'
import { CounselorInfo } from '@/features/counselors/types'
import { api } from '@/lib/server-api'
import { DjangoError } from '@/types/actions'
import { ServerResult } from '@/types/server-result'

export async function getCounselorById(
  id: string
): Promise<ServerResult<CounselorInfo>> {
  try {
    const response = await api.get(`/validacao-conselheiro/${id}/detalhes/`)
    if (!response.ok) {
      const error: DjangoError = await response.json()
      return { error: error }
    }
    const data: CounselorInfo = await response.json()
    return { data }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
