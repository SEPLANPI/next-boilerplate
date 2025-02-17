import { SearchInput } from '@/components/ui/search-input'
import { DeputiesFilters } from '@/features/deputies/components/deputies-filters'
import { DeputiesListView } from '@/features/deputies/components/deputies-list-view'
import { DeputiesResetFilters } from '@/features/deputies/components/deputies-reset-filters'
import { DeputiesTableSkeleton } from '@/features/deputies/components/deputies-table-skeleton'
import { deputiesSearchParams } from '@/features/deputies/lib/search-params'
import { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'

export default async function Deputies({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = deputiesSearchParams.parse(await searchParams)
  const suspenseKey = JSON.stringify(params)

  return (
    <div className="container mx-auto">
      <div className="flex w-full items-end justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Deputados</h1>
      </div>
      <div className="my-6 flex flex-wrap items-start gap-2">
        <SearchInput placeholder="Pesquisar deputados" />
        <DeputiesFilters />
        <DeputiesResetFilters />
      </div>
      <Suspense fallback={<DeputiesTableSkeleton />} key={suspenseKey}>
        <DeputiesListView />
      </Suspense>
    </div>
  )
}
