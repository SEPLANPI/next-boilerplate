import { AccordionControl, AccordionItem, AccordionPanel } from '@mantine/core'
import { EventsList } from './events-list'
import { formatCurrency } from '@/lib/utils'
import { EventGroup } from '../../types'

type EventsGroupAccordionProps = {
  group: EventGroup
}

export function EventsGroupAccordion({ group }: EventsGroupAccordionProps) {
  return (
    <AccordionItem value={group.nome || 'Não informado'}>
      <AccordionControl>
        <div className="flex justify-between pr-2">
          <div className="flex space-x-2">
            <h3 className="font-semibold">{group.nome || 'Não informado'}</h3>
            <span className="text-muted-foreground">
              ({group.quantidade} eventos)
            </span>
          </div>
          <span className="font-semibold">{formatCurrency(group.valor)}</span>
        </div>
      </AccordionControl>
      <AccordionPanel>
        <EventsList group={group} />
      </AccordionPanel>
    </AccordionItem>
  )
}
