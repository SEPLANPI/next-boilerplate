import { DeputiesTable } from './deputies-table'
import { getDeputies } from '../api/get-deputies'
import { FetchError } from '@/components/errors/fetch-error'
import { deputiesSearchParams } from '../lib/search-params'
import { UrlPaginationFooter } from '@/components/ui/pagination-footer/url-pagination-footer'
import { PAGINATION } from '@/constants/pagination'

export async function DeputiesListView() {
  const page = deputiesSearchParams.get('page')

  const { data, error } = await getDeputies({
    page
  })

  if (!data || error) {
    return <FetchError title="Erro ao carregar deputados" error={error} />
  }

  if (data.results.length === 0) {
    return (
      <div className="flex flex-col items-center p-10">
        <h2 className="text-lg font-semibold">
          Não encontramos deputados correspondentes
        </h2>
      </div>
    )
  }

  return (
    <>
      <DeputiesTable deputies={data.results} />
      <UrlPaginationFooter
        totalItems={data.count}
        itemsPerPage={PAGINATION.DEFAULT_PAGE_SIZE}
      />
    </>
  )
}
