import { SearchInput } from '@/components/ui/search-input'
import { ClearFilters } from '@/features/events/components/clear-filters'
import { EventsCards } from '@/features/events/components/events-cards'
import { EventsContent } from '@/features/events/components/events-content'
import { EventsCardsSkeleton } from '@/features/events/components/events-cards-skeleton'
import { EventsFilters } from '@/features/events/components/events-filters'
import { EventsGroupedContent } from '@/features/events/components/grouped-content'
import { eventsSearchParams } from '@/features/events/lib/search-params'
import { Button } from '@mantine/core'
import { Plus } from 'lucide-react'
import { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'
import { EventsTableSkeleton } from '@/features/events/components/events-table-skeleton'

export default async function Events({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const { sort, ...params } = eventsSearchParams.parse(await searchParams)
  const hasGrouping = !!params.group

  const cardsSuspenseKey = JSON.stringify(params) + 'cards'
  const tableSuspenseKey = JSON.stringify(params) + sort + 'table'
  const groupSuspenseKey = `${params.group}${params.groupSort}`

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
        <ClearFilters />
      </div>
      <Suspense fallback={<EventsCardsSkeleton />} key={cardsSuspenseKey}>
        <EventsCards />
      </Suspense>
      {!hasGrouping && (
        <Suspense fallback={<EventsTableSkeleton />} key={tableSuspenseKey}>
          <EventsContent />
        </Suspense>
      )}
      {hasGrouping && (
        <Suspense fallback={<>Carregando</>} key={groupSuspenseKey}>
          <EventsGroupedContent />
        </Suspense>
      )}
    </div>
  )
}
