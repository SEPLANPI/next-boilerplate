import { SearchParamsPagination } from '@/components/ui/search-params-pagination'
import { eventsSearchParams } from '../lib/search-params'
import { GroupItem } from './events-group-view'
import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel
} from '@mantine/core'
import { EventsTableSkeleton } from './events-table-skeleton'
import { Suspense } from 'react'
import { getEvents } from '../actions/get-events'
import { EventsEmptyState } from './events-empty-state'
import { EventsTable } from './events-table'
import { DefaultFetchError } from '@/components/errors/default-fetch-error'

type EventsGroupAccordionsProps = {
  items: GroupItem[]
  count: number
}

type AccordionContentProps = {
  groupId: string
}

async function AccordionContent({ groupId }: AccordionContentProps) {
  const { data, error } = await getEvents(groupId)
  if (error || !data) {
    return <DefaultFetchError />
  }

  if (data.results.length === 0) return <EventsEmptyState />

  return <EventsTable events={data.results} count={data.count} />
}

function ItemAccordion({ item }: { item: GroupItem }) {
  const params = eventsSearchParams.all()
  return (
    <AccordionItem value={item.id} key={item.id}>
      <AccordionControl>
        <div className="flex justify-between pr-2">
          <div className="flex space-x-2">
            <h3 className="font-semibold">{item.name}</h3>
            <span className="text-muted-foreground">
              ({item.count}) eventos
            </span>
          </div>
          <span className="font-semibold">
            R${' '}
            {parseFloat(item.value.toString()).toLocaleString('pt-BR', {
              minimumFractionDigits: 2
            })}
          </span>
        </div>
      </AccordionControl>
      <AccordionPanel>
        <Suspense
          fallback={<EventsTableSkeleton />}
          key={JSON.stringify(params)}
        >
          <AccordionContent groupId={item.id} />
        </Suspense>
      </AccordionPanel>
    </AccordionItem>
  )
}

export function EventsGroupAccordions({
  items,
  count
}: EventsGroupAccordionsProps) {
  const page = eventsSearchParams.get('page')
  const startItem = (page - 1) * 5 + 1
  const endItem = Math.min(startItem + items.length - 1, count)
  return (
    <>
      <Accordion variant="separated">
        {items.map((item) => (
          <ItemAccordion item={item} key={item.id} />
        ))}
      </Accordion>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-secondary-foreground">
          <span className="font-bold">
            {startItem} - {endItem}
          </span>{' '}
          de {count} resultados
        </span>
        <SearchParamsPagination totalItems={count} perPage={15} />
      </div>
    </>
  )
}
