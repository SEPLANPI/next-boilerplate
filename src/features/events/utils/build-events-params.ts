import { dayjs } from '@/lib/dayjs'
import { PAGINATION } from '@/constants/pagination'

type Params = Partial<{
  page?: number
  perPage?: number
  search?: string | null
  fromDate?: Date | null
  toDate?: Date | null
  ugs?: number[] | null
  municipios?: string[] | null
  deputados?: string[] | null
  sort?: string | null
  group?: string | null
}>

export function buildEventsParams({
  page = 1,
  perPage = PAGINATION.EVENTS_PAGE_SIZE,
  search,
  fromDate,
  toDate,
  ugs,
  municipios,
  deputados,
  sort,
  group
}: Params) {
  const params = new URLSearchParams()
  const appendParam = (key: string, value?: string | number | null) => {
    if (value) params.append(key, value.toString())
  }
  const appendArrayParams = (
    key: string,
    array: string[] | number[] | undefined | null
  ) => {
    if (array) array.forEach((item) => params.append(key, item.toString()))
  }

  appendParam('page', page)
  appendParam('nome', search)
  appendParam(
    'data_inicio',
    fromDate ? dayjs(fromDate).format('YYYY-MM-DD') : undefined
  )
  appendParam(
    'data_fim',
    toDate ? dayjs(toDate).format('YYYY-MM-DD') : undefined
  )
  appendArrayParams('ugs', ugs)
  appendArrayParams('municipio', municipios)
  appendArrayParams('autor_emenda', deputados)
  appendParam('ordering', sort)
  appendParam('page_size', perPage)
  appendParam('group_by', group)

  return params
}
