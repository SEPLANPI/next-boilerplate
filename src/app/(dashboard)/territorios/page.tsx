import { TerritoriesListView } from '@/features/territories/components/territories-list-view'
import { TerritoriesTableSkeleton } from '@/features/territories/components/territories-table-skeleton'
import { territoriesSearchParams } from '@/features/territories/lib/search-params'
import { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'

export default async function Territories({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = territoriesSearchParams.parse(await searchParams)
  const suspenseKey = JSON.stringify(params)

  return (
    <div className="container mx-auto">
      <div className="mb-6 flex w-full items-end justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Territórios</h1>
      </div>
      <Suspense fallback={<TerritoriesTableSkeleton />} key={suspenseKey}>
        <TerritoriesListView />
      </Suspense>
    </div>
  )
}
