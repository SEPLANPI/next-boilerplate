import { API } from '@/constants/messages'
import { api } from '@/lib/server-api'
import { ServerResult } from '@/types/server-result'
import { Territory } from '../types'
import { buildParams } from '@/lib/api-utils'

interface TerritoriesResponse {
  count: number
  results: Territory[]
}

type GetTerritoriesInput = {
  page?: number
}

export async function getTeritories({
  page = 1
}: GetTerritoriesInput = {}): Promise<ServerResult<TerritoriesResponse>> {
  const params = buildParams({
    page,
    page_size: 15
  })

  try {
    const response = await api.get(`/territorios?${params.toString()}`)

    if (!response.ok) {
      const error = await response.json()

      return { error: error.detail || API.UNEXPECTED_FETCH_ERROR }
    }

    const data: TerritoriesResponse = await response.json()
    return { data }
  } catch (error) {
    return { error: API.UNEXPECTED_FETCH_ERROR }
  }
}
