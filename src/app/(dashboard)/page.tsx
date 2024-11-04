import { SearchInput } from '@/components/ui/search-input'
import { ClearFilters } from '@/features/events/components/clear-filters'
import { EventsContent } from '@/features/events/components/events-content'
import { EventsContentSkeleton } from '@/features/events/components/events-content-skeleton'
import { EventsFilters } from '@/features/events/components/events-filters'
import { eventsSearchParams } from '@/features/events/lib/search-params'
import { Button, Divider } from '@mantine/core'
import { ListTree, Plus } from 'lucide-react'
import { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'

export default async function Events({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = eventsSearchParams.parse(await searchParams)
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
        <Button leftSection={<ListTree className="size-4" />} variant="default">
          Agrupar
        </Button>
        <Divider orientation="vertical" />
        <EventsFilters />
        <ClearFilters />
      </div>
      <Suspense
        key={JSON.stringify(params)}
        fallback={<EventsContentSkeleton />}
      >
        <EventsContent />
      </Suspense>
    </div>
  )
}
