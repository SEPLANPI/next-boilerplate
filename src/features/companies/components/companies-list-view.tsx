import { CompaniesTable } from './companies-table'
import { getCompanies } from '../api/get-companies'
import { FetchError } from '@/components/errors/fetch-error'
import { companiesSearchParams } from '../lib/search-params'
import { UrlPaginationFooter } from '@/components/ui/pagination-footer/url-pagination-footer'
import { PAGINATION } from '@/constants/pagination'

export async function CompaniesListView() {
  const page = companiesSearchParams.get('page')

  const { data, error } = await getCompanies({
    page
  })

  if (!data || error) {
    return <FetchError title="Erro ao carregar empresas" error={error} />
  }

  if (data.results.length === 0) {
    return (
      <div className="flex flex-col items-center p-10">
        <h2 className="text-lg font-semibold">
          Não encontramos empresas correspondentes
        </h2>
      </div>
    )
  }

  return (
    <>
      <CompaniesTable companies={data.results} />
      <UrlPaginationFooter
        totalItems={data.count}
        itemsPerPage={PAGINATION.DEFAULT_PAGE_SIZE}
      />
    </>
  )
}
