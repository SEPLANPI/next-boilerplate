import { API } from '@/constants/messages'
import { clientApi } from '@/lib/client-api'

type Deputado = {
  nome: string
}
export async function getDeputados(): Promise<Deputado[]> {
  const response = await clientApi.get('/deputados')

  if (!response.ok) {
    const error = await response.json()
    throw Error(error.detail || API.UNEXPECTED_FETCH_ERROR)
  }

  const data: Deputado[] = await response.json()

  return data
}
