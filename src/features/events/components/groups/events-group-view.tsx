import { DefaultFetchError } from '@/components/errors/default-fetch-error'

import { EventsGroupList } from './events-group-list'
import { getEventGroups } from '../../lib/fetchers/get-event-groups'

export async function EventsGroupView() {
  const result = await getEventGroups()

  if (result.error || !result.data) {
    return <DefaultFetchError />
  }
  return (
    <EventsGroupList groups={result.data.data} totalCount={result.data.count} />
  )
}
