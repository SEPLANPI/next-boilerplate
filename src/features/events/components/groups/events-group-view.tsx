import { DefaultFetchError } from '@/components/errors/default-fetch-error'
import { getEventGroups } from '../../lib/fetchers/get-event-groups'
import { Accordion } from '@mantine/core'
import { UrlPaginationFooter } from '@/components/ui/pagination-footer/url-pagination-footer'
import { EventsGroupAccordion } from './events-group-accordion'

export async function EventsGroupView() {
  const { data, error } = await getEventGroups()

  if (error || !data) {
    return <DefaultFetchError />
  }

  return (
    <div className="space-y-6">
      <Accordion variant="separated">
        {data.results.map((group) => (
          <EventsGroupAccordion key={group.nome} group={group} />
        ))}
      </Accordion>
      <UrlPaginationFooter totalItems={data.count} itemsPerPage={10} />
    </div>
  )
}
