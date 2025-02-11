import { CitiesTable } from './cities-table'
import { getCities } from '../api/get-cities'
import { FetchError } from '@/components/errors/fetch-error'
import { citiesSearchParams } from '../lib/search-params'
import { UrlPaginationFooter } from '@/components/ui/pagination-footer/url-pagination-footer'
import { PAGINATION } from '@/constants/pagination'

export async function CitiesListView() {
  const page = citiesSearchParams.get('page')

  const { data, error } = await getCities({
    page
  })

  if (!data || error) {
    return <FetchError title="Erro ao carregar municípios" error={error} />
  }

  if (data.results.length === 0) {
    return (
      <div className="flex flex-col items-center p-10">
        <h2 className="text-lg font-semibold">
          Não encontramos municípios correspondentes
        </h2>
      </div>
    )
  }

  return (
    <>
      <CitiesTable cities={data.results} />
      <UrlPaginationFooter
        totalItems={data.count}
        itemsPerPage={PAGINATION.DEFAULT_PAGE_SIZE}
      />
    </>
  )
}
