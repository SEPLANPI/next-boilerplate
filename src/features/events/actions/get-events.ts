import dayjs from 'dayjs'
import { eventsSearchParams } from '../lib/search-params'
import { api } from '@/lib/api'

export async function getEvents(groupId?: string) {
  const { page, search, ugs, fromDate, toDate, group } =
    eventsSearchParams.all()
  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('nome', search)
  if (fromDate) {
    params.append('data_inicio', dayjs(fromDate).format('YYYY-MM-DD'))
  }
  if (toDate) {
    params.append('data_after', dayjs(toDate).format('YYYY-MM-DD'))
  }

  if (ugs && group !== 'ugs') {
    ugs.forEach((ug) => params.append('ugs', ug.toString()))
  }

  if (groupId && group) {
    params.append(group, groupId)
  }

  return api.get(`/eventos?${params.toString()}`)
}
