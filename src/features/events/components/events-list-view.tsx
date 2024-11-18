import { EventsTable } from './events-table'
import { getEvents } from '../actions/get-events'
import { DefaultFetchError } from '@/components/errors/default-fetch-error'
import { EventsEmptyState } from './events-empty-state'

export async function EventsListView() {
  const { data, error } = await getEvents()
  if (!data || error) {
    return <DefaultFetchError />
  }

  if (data.results.length === 0) return <EventsEmptyState />

  return <EventsTable events={data.results} count={data.count} perPage={15} />
}
