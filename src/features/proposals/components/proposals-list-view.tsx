import { FetchError } from '@/components/errors/fetch-error'
import { UrlPaginationFooter } from '@/components/ui/pagination-footer/url-pagination-footer'
import { PAGINATION } from '@/constants/pagination'
import { getProposals } from '../api/get-propostas'
import { ProposalsTable } from './proposals-table'

export async function ProposalsListView() {
  const { data, error } = await getProposals()

  if (!data || error) {
    return <FetchError title="Erro ao carregar propostas" error={error} />
  }

  if (data.results.length === 0) {
    return (
      <div className="flex flex-col items-center p-10">
        <h2 className="text-lg font-semibold">
          Não encontramos propostas correspondentes
        </h2>
      </div>
    )
  }

  return (
    <>
      <ProposalsTable data={data.results} />
      <UrlPaginationFooter
        totalItems={data.count}
        itemsPerPage={PAGINATION.DEFAULT_PAGE_SIZE}
      />
    </>
  )
}
