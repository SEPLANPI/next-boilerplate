import { API } from '@/constants/messages'
import { clientApi } from '@/lib/client-api'

type Ug = {
  number: number
  name: string
  sigla: string
}
export async function getUgs(): Promise<Ug[]> {
  const response = await clientApi.get('/ugs')
  if (!response.ok) {
    const error = await response.json()
    throw Error(error.detail || API.UNEXPECTED_FETCH_ERROR)
  }

  const data: Ug[] = await response.json()

  return data
}
