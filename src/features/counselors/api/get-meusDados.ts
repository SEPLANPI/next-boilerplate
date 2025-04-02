import { API } from '@/constants/messages'
import { CounselorInfo } from '@/features/counselors/types'
import { api } from '@/lib/server-api'
import { DjangoError } from '@/types/actions'
import { ServerResult } from '@/types/server-result'

export async function getMeusDados(): Promise<ServerResult<CounselorInfo>> {
  try {
    const response = await api.get('/meus-dados/', {
      cache: 'no-store'
    })
    if (!response.ok) {
      const error: DjangoError = await response.json()
      return { error: error }
    }
    const data = await response.json()
    return { data }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
