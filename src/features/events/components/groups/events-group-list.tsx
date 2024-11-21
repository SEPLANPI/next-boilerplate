import { EventGroup } from '@/types/events'
import { EventsGroupAccordion } from './events-group-accordion'
import { Accordion } from '@mantine/core'
import { UrlPaginationFooter } from '@/components/ui/pagination-footer/url-pagination-footer'

interface EventsGroupListProps {
  groups: EventGroup[]
  totalCount: number
}

export function EventsGroupList({ groups, totalCount }: EventsGroupListProps) {
  return (
    <div className="space-y-6">
      <Accordion variant="separated">
        {groups.slice(0, 1).map((group) => (
          <EventsGroupAccordion key={group.nome} group={group} />
        ))}
      </Accordion>
      <UrlPaginationFooter
        totalItems={totalCount}
        itemsPerPage={10}
        queryKey="group-page"
      />
    </div>
  )
}
