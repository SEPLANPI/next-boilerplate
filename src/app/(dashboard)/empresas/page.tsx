import { SearchInput } from '@/components/ui/search-input'
import { CompaniesListView } from '@/features/companies/components/companies-list-view'
import { CompaniesTableSkeleton } from '@/features/companies/components/companies-table-skeleton'
import { companiesSearchParams } from '@/features/companies/lib/search-params'
import { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'

export default async function Companies({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = companiesSearchParams.parse(await searchParams)
  const suspenseKey = JSON.stringify(params)

  return (
    <div className='container mx-auto'>
      <div className="flex w-full items-end justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Empresas</h1>
      </div>
      <div className="my-6 flex flex-wrap items-start gap-2">
        <SearchInput placeholder="Pesquisar nome ou CNPJ" />
      </div>
      <Suspense fallback={<CompaniesTableSkeleton />} key={suspenseKey}>
        <CompaniesListView />
      </Suspense>
    </div>
  )
}
