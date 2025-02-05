import { PoliticalPartiesTable } from './political-parties-table'
import { FetchError } from '@/components/errors/fetch-error'
import {  politicalPartiesSearchParams } from '../lib/search-params'
import { UrlPaginationFooter } from '@/components/ui/pagination-footer/url-pagination-footer'
import { PAGINATION } from '@/constants/pagination'
import { getPoliticalParties } from '../api/get-political-parties'

export async function PoliticalPartiesListView() {
  const page = politicalPartiesSearchParams.get('page')

  const { data, error } = await getPoliticalParties({
    page
  })

  if (!data || error) {
    return <FetchError title="Erro ao carregar partidos" error={error} />
  }

  if (data.results.length === 0) {
    return (
      <div className="flex flex-col items-center p-10">
        <h2 className="text-lg font-semibold">
          Não encontramos partidos correspondentes
        </h2>
      </div>
    )
  }

  return (
    <>
      <PoliticalPartiesTable parties={data.results} />
      <UrlPaginationFooter
        totalItems={data.count}
        itemsPerPage={PAGINATION.DEFAULT_PAGE_SIZE}
      />
    </>
  )
}
