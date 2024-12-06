import { SearchInput } from '@/components/ui/search-input'
import { AdministrativeUnitsListView } from '@/features/administrative-units/components/administrative-units-list-view'
import { AdministrativeUnitsTableSkeleton } from '@/features/administrative-units/components/administrative-units-table-skeleton'
import { administrativeUnitsSearchParams } from '@/features/administrative-units/lib/search-params'
import { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'

export default async function AdministrativeUnits({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = administrativeUnitsSearchParams.parse(await searchParams)
  const suspenseKey = JSON.stringify({ ...params })

  return (
    <div>
      <div className="flex w-full items-end justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Unidades Gestoras
        </h1>
      </div>
      <div className="my-6 flex flex-wrap items-start gap-2">
        <SearchInput placeholder="Pesquisar unidades nome, sigla ou número" />
      </div>
      <Suspense
        fallback={<AdministrativeUnitsTableSkeleton />}
        key={suspenseKey}
      >
        <AdministrativeUnitsListView />
      </Suspense>
    </div>
  )
}
