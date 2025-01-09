import { API } from '@/constants/messages'
import { clientApi } from '@/lib/client-api'
import { FilterOptionExpenseNature } from '../../types'

export async function getExpenseNatureFilterOptions(): Promise<
  FilterOptionExpenseNature[]
> {
  const response = await clientApi.get('/naturezas-gasto')
  if (!response.ok) {
    const error = await response.json()
    throw Error(error.detail || API.UNEXPECTED_FETCH_ERROR)
  }

  const data = await response.json()

  return data
}
