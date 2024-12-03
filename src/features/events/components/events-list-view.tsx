import { EventsTable } from './events-table'
import { getEvents } from '../api/get-events'
import { EventsEmptyState } from './events-empty-state'
import { eventsSearchParams } from '../lib/search-params'
import { UrlPaginationFooter } from '@/components/ui/pagination-footer/url-pagination-footer'
import { FetchError } from '@/components/errors/fetch-error'

export async function EventsListView() {
  const page = eventsSearchParams.get('page')
  
  const { data, error } = await getEvents({
    page
  })

  if (!data || error) {
    return <FetchError title="Erro ao carregar eventos" />
  }

  if (data.results.length === 0) return <EventsEmptyState />

  return (
    <>
      <EventsTable events={data.results} />
      <UrlPaginationFooter totalItems={data.count} itemsPerPage={15} />
    </>
  )
}
