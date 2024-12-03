import { EventsTable } from './events-table'
import { getEvents } from '../api/get-events'
import { DefaultFetchError } from '@/components/errors/default-fetch-error'
import { EventsEmptyState } from './events-empty-state'
import { eventsSearchParams } from '../lib/search-params'
import { UrlPaginationFooter } from '@/components/ui/pagination-footer/url-pagination-footer'

export async function EventsListView() {
  const page = eventsSearchParams.get('page')
  
  const { data, error } = await getEvents({
    page
  })

  if (!data || error) {
    return <DefaultFetchError />
  }

  if (data.results.length === 0) return <EventsEmptyState />

  return (
    <>
      <EventsTable events={data.results} />
      <UrlPaginationFooter totalItems={data.count} itemsPerPage={15} />
    </>
  )
}
