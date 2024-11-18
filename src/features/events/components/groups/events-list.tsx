import { DefaultFetchError } from '@/components/errors/default-fetch-error'
import { EventsEmptyState } from '../events-empty-state'
import { EventsTable } from '../events-table'
import { getEvents } from '../../actions/get-events'

interface EventsListProps {
  groupId: string
}

export async function EventsList({ groupId }: EventsListProps) {
  const result = await getEvents()

  if (result.error || !result.data) {
    return <DefaultFetchError />
  }

  if (result.data.results.length === 0) {
    return <EventsEmptyState />
  }

  return (
    <EventsTable
      events={result.data.results}
      count={result.data.count}
      perPage={10}
    />
  )
}
