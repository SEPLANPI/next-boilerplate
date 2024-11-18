import { AccordionControl, AccordionItem, AccordionPanel } from '@mantine/core'
import { EventsList } from './events-list'
import { formatCurrency } from '@/lib/utils'
import { EventGroup } from '@/types/events'
import { Suspense } from 'react'
import { EventsTableSkeleton } from '../events-table-skeleton'

type EventsGroupAccordionProps = {
  group: EventGroup
}

export function EventsGroupAccordion({ group }: EventsGroupAccordionProps) {
  return (
    <AccordionItem value={group.nome}>
      <AccordionControl>
        <div className="flex justify-between pr-2">
          <div className="flex space-x-2">
            <h3 className="font-semibold">{group.nome}</h3>
            <span className="text-muted-foreground">
              ({group.quantidade} eventos)
            </span>
          </div>
          <span className="font-semibold">
            {formatCurrency(group.valor_total)}
          </span>
        </div>
      </AccordionControl>

      <AccordionPanel>
        <Suspense fallback={<EventsTableSkeleton />}>
          <EventsList groupId={group.nome} />
        </Suspense>
      </AccordionPanel>
    </AccordionItem>
  )
}
