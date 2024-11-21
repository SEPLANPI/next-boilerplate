import { SearchInput } from '@/components/ui/search-input'
import { EventsCards } from '@/features/events/components/events-cards'
import { EventsCardsSkeleton } from '@/features/events/components/events-cards-skeleton'
import { EventsFilters } from '@/features/events/components/events-filters'
import { eventsSearchParams } from '@/features/events/lib/search-params'
import { Button } from '@mantine/core'
import { Plus } from 'lucide-react'
import { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'
import { EventsTableSkeleton } from '@/features/events/components/events-table-skeleton'
import { EventsResetFilters } from '@/features/events/components/events-reset-filters'
import { EventsListView } from '@/features/events/components/events-list-view'
import { EventsGroupView } from '@/features/events/components/groups/events-group-view'
import { EventsAccordionsSkeleton } from '@/features/events/components/groups/events-accordions-skeleton'

export default async function Events({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const { sort, groupSort, group, ...params } = eventsSearchParams.parse(
    await searchParams
  )
  const hasGrouping = !!group

  const cardsSuspenseKey = JSON.stringify(params) + 'cards'
  const tableSuspenseKey = JSON.stringify(params) + sort + 'table'
  const groupSuspenseKey = `${group}${groupSort}`

  return (
    <div>
      <div className="flex w-full items-end justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Eventos</h1>
        <Button leftSection={<Plus className="size-4" />} disabled>
          Novo evento
        </Button>
      </div>
      <div className="my-6 flex w-full space-x-2">
        <SearchInput placeholder="Pesquisar eventos" />
        <EventsFilters />
        <EventsResetFilters />
      </div>
      <Suspense fallback={<EventsCardsSkeleton />} key={cardsSuspenseKey}>
        <EventsCards />
      </Suspense>
      {!hasGrouping && (
        <Suspense fallback={<EventsTableSkeleton />} key={tableSuspenseKey}>
          <EventsListView />
        </Suspense>
      )}
      {hasGrouping && (
        <Suspense
          fallback={<EventsAccordionsSkeleton />}
          key={groupSuspenseKey}
        >
          <EventsGroupView />
        </Suspense>
      )}
    </div>
  )
}
