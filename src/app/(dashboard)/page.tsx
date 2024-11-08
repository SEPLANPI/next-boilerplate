import { SearchInput } from '@/components/ui/search-input'
import { ClearFilters } from '@/features/events/components/clear-filters'
import { EventsContent } from '@/features/events/components/events-content'
import { EventsContentSkeleton } from '@/features/events/components/events-content-skeleton'
import { EventsFilters } from '@/features/events/components/events-filters'
import { EventsGroupedContent } from '@/features/events/components/grouped-content'
import { eventsSearchParams } from '@/features/events/lib/search-params'
import { Button } from '@mantine/core'
import { Plus } from 'lucide-react'
import { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'

export default async function Events({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = eventsSearchParams.parse(await searchParams)

  const hasGrouping = !!params.group
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
      {!hasGrouping && (
        <Suspense
          fallback={<EventsContentSkeleton />}
          key={JSON.stringify(params)}
        >
          <EventsContent />
        </Suspense>
      )}
      {hasGrouping && (
        <Suspense
          fallback={<>Carregando</>}
          key={`${params.group}${params.groupSort}`}
        >
          <EventsGroupedContent />
        </Suspense>
      )}
    </div>
  )
}
