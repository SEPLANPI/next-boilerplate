import { EventsTable } from './events-table'
import { getEvents } from '../lib/fetchers/get-events'
import { DefaultFetchError } from '@/components/errors/default-fetch-error'
import { EventsEmptyState } from './events-empty-state'
import { eventsSearchParams } from '../lib/search-params'

export async function EventsListView() {
  const page = eventsSearchParams.get('page')
  const { data, error } = await getEvents({
    page
  })

  if (!data || error) {
    return <DefaultFetchError />
  }

  if (data.results.length === 0) return <EventsEmptyState />

  return <EventsTable events={data.results} count={data.count} perPage={15} />
}
