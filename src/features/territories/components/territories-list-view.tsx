import { TerritoriesTable } from './territories-table'
import { getTeritories } from '../api/get-territories'
import { FetchError } from '@/components/errors/fetch-error'
import { UrlPaginationFooter } from '@/components/ui/pagination-footer/url-pagination-footer'
import { PAGINATION } from '@/constants/pagination'
import { territoriesSearchParams } from '../lib/search-params'

export async function TerritoriesListView() {
  const page = territoriesSearchParams.get('page')

  const { data, error } = await getTeritories({
    page
  })

  if (!data || error) {
    return <FetchError title="Erro ao carregar territórios" error={error} />
  }

  if (data.results.length === 0) {
    return (
      <div className="flex flex-col items-center p-10">
        <h2 className="text-lg font-semibold">
          Não encontramos territórios correspondentes
        </h2>
      </div>
    )
  }

  return (
    <>
      <TerritoriesTable territories={data.results} />
      <UrlPaginationFooter
        totalItems={data.count}
        itemsPerPage={PAGINATION.DEFAULT_PAGE_SIZE}
      />
    </>
  )
}
