import { SearchInput } from '@/components/ui/search-input'
import { CitiesFilters } from '@/features/cities/components/cities-filters'
import { CitiesListView } from '@/features/cities/components/cities-list-view'
import { CitiesResetFilters } from '@/features/cities/components/cities-reset-filters'
import { CitiesTableSkeleton } from '@/features/cities/components/cities-table-skeleton'
import { citiesSearchParams } from '@/features/cities/lib/search-params'
import { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'

export default async function Cities({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = citiesSearchParams.parse(await searchParams)
  const suspenseKey = JSON.stringify(params)

  return (
    <div className="container mx-auto">
      <div className="flex w-full items-end justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Municípios</h1>
      </div>
      <div className="my-6 flex flex-wrap items-start gap-2">
        <SearchInput placeholder="Pesquisar município" />
        <CitiesFilters />
        <CitiesResetFilters />
      </div>
      <Suspense fallback={<CitiesTableSkeleton />} key={suspenseKey}>
        <CitiesListView />
      </Suspense>
    </div>
  )
}
