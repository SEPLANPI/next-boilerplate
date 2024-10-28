import { SearchInput } from '@/components/ui/search-input'
import { EventsFilters } from '@/features/events/components/filters'
import { EventsTableSkeleton } from '@/features/events/components/table-skeleton'
import { EventsTable } from '@/hooks/table'
import { Button, Divider } from '@mantine/core'
import { ListTree, Plus } from 'lucide-react'
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  SearchParams
} from 'nuqs/server'
import { Suspense } from 'react'

export const searchParamsCache = createSearchParamsCache({
  search: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
  ugs: parseAsArrayOf(parseAsInteger)
})
export default async function Eventos({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = searchParamsCache.parse(await searchParams)
  console.log(params)
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
      </div>
      <Suspense key={JSON.stringify(params)} fallback={<EventsTableSkeleton />}>
        <EventsTable />
      </Suspense>
    </div>
  )
}
