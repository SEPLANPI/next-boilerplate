import { EventGroup } from '@/types/events'
import { PaginationFooter } from '@/components/ui/pagination-footer'
import { EventsGroupAccordion } from './events-group-accordion'
import { Accordion } from '@mantine/core'

interface EventsGroupListProps {
  groups: EventGroup[]
  totalCount: number
}

export function EventsGroupList({ groups, totalCount }: EventsGroupListProps) {
  return (
    <div className="space-y-6">
      <Accordion
        variant="separated"
        classNames={{
          item: 'relative',
          control: 'sticky top-0 bg-white'
        }}
      >
        {groups.map((group) => (
          <EventsGroupAccordion key={group.nome} group={group} />
        ))}
      </Accordion>
      <PaginationFooter totalItems={totalCount} perPage={10} />
    </div>
  )
}
