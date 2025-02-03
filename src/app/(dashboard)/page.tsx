import { SearchInput } from '@/components/ui/search-input'
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
import { EventListEditDrawer } from '@/features/events/components/event-list-edit-drawer'
import { EventsTabs } from '@/features/events/components/events-tabs'
import { getEventsQuantities } from '@/features/events/api/get-events-quantities'
import { EventsCards } from '@/features/events/components/events-cards'
import { EditModeToggle } from '@/features/events/components/edit-mode-toggle'
import { EventsCardsSkeleton } from '@/features/events/components/events-cards-skeleton'

export default async function Events({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = eventsSearchParams.parse(await searchParams)
  const { data: quantities } = await getEventsQuantities()

  const suspenseKey = JSON.stringify(params)
  const groupKey = 'group' + suspenseKey
  const tableKey = 'table' + suspenseKey
  const cardsKey = 'cards' + suspenseKey

  const hasGrouping = !!params.group

  return (
    <>
      <div>
        <div className="mb-6">
          <div className="mb-1 flex w-full items-end justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Eventos</h1>
            <div className="space-x-2">
              <EditModeToggle />
              <Button leftSection={<Plus className="size-4" />} disabled>
                Novo evento
              </Button>
            </div>
          </div>
          <EventsTabs
            quantities={{
              all: quantities?.total_eventos,
              pending: quantities?.eventos_pendentes,
              reviewed: quantities?.eventos_revisados
            }}
          />
        </div>
        <div className="mb-6 flex flex-wrap items-start gap-2">
          <SearchInput placeholder="Pesquisar eventos" className="max-w-64" />
          <EventsFilters />
          <EventsResetFilters />
        </div>
        <Suspense fallback={<EventsCardsSkeleton />} key={cardsKey}>
          <EventsCards />
        </Suspense>
        {hasGrouping ? (
          <Suspense fallback={<EventsAccordionsSkeleton />} key={groupKey}>
            <EventsGroupView />
          </Suspense>
        ) : (
          <Suspense fallback={<EventsTableSkeleton />} key={tableKey}>
            <EventsListView />
          </Suspense>
        )}
      </div>
      <EventListEditDrawer />
    </>
  )
}
