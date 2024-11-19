import dayjs from 'dayjs'

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
  group: string | null
  groupId?: string
}>

export function buildEventsParams({
  page = 1,
  perPage,
  search,
  fromDate,
  toDate,
  ugs,
  municipios,
  deputados,
  sort,
  group,
  groupId
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
  appendArrayParams('ugs', group !== 'ugs' ? ugs : undefined)

  appendArrayParams(
    'municipio',
    group !== 'municipios' ? municipios : undefined
  )
  appendArrayParams(
    'autor_emenda',
    group !== 'deputados' ? deputados : undefined
  )
  appendParam('ordering', sort)
  if (groupId && group) appendParam(group, groupId)

  appendParam('page_size', perPage)

  return params
}
