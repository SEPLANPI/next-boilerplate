import { FetchError } from '@/components/errors/fetch-error'
import { getEventGroups } from '../../api/get-event-groups'
import { Accordion } from '@mantine/core'
import { UrlPaginationFooter } from '@/components/ui/pagination-footer/url-pagination-footer'
import { EventsGroupAccordion } from './events-group-accordion'
import { EventsEmptyState } from '../events-empty-state'
import { PAGINATION } from '@/constants/pagination'

export async function EventsGroupView() {
  const { data, error } = await getEventGroups()

  if (error || !data) {
    return (
      <FetchError error={error} title="Erro ao carregar grupos de eventos" />
    )
  }

  if (data.results.length === 0) {
    return <EventsEmptyState />
  }

  return (
    <div className="space-y-6">
      <Accordion variant="separated">
        {data.results.map((group) => (
          <EventsGroupAccordion key={group.nome} group={group} />
        ))}
      </Accordion>
      <UrlPaginationFooter
        totalItems={data.count}
        itemsPerPage={PAGINATION.EVENTS_GROUPS_PAGE_SIZE}
      />
    </div>
  )
}
