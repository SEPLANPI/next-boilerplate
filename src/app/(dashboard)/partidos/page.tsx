import { SearchInput } from '@/components/ui/search-input'
import { PoliticalPartiesTableSkeleton } from '@/features/political-party/components/political-parties-table-skeleton'
import { PoliticalPartiesListView } from '@/features/political-party/components/political-parties-list-view'
import { politicalPartiesSearchParams } from '@/features/political-party/lib/search-params'
import { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'
import { CreatePoliticalPartyButton } from '@/features/political-party/components/create-political-party-button'
import { CreatePoliticalPartyDrawer } from '@/features/political-party/components/create-political-party-drawer'

export default async function PoliticalParties({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = politicalPartiesSearchParams.parse(await searchParams)
  const suspenseKey = JSON.stringify(params)

  return (
    <div className="container mx-auto">
      <div className="flex w-full items-end justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Partidos</h1>
        <CreatePoliticalPartyButton />
      </div>
      <div className="my-6 flex flex-wrap items-start gap-2">
        <SearchInput placeholder="Pesquisar partidos" />
      </div>
      <Suspense fallback={<PoliticalPartiesTableSkeleton />} key={suspenseKey}>
        <PoliticalPartiesListView />
      </Suspense>
      <CreatePoliticalPartyDrawer />
    </div>
  )
}
