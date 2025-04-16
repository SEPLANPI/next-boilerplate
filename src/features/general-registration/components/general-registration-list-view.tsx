import { FetchError } from '@/components/errors/fetch-error'
import { UrlPaginationFooter } from '@/components/ui/pagination-footer/url-pagination-footer'
import { PAGINATION } from '@/constants/pagination'
import { getPeople } from '../api/get-people'
import { GeneralRegistrationTable } from './general-registration-table'

interface GeneralRegistrationListViewProps {
  params: { eventId: string }
}

export async function GeneralRegistrationListView({
  params
}: GeneralRegistrationListViewProps) {
  const { data, error } = await getPeople(params.eventId)
  if (!data || error) {
    return <FetchError title="Erro ao carregar cadastros" error={error} />
  }

  if (data.results.length === 0) {
    return (
      <div className="flex flex-col items-center p-10">
        <h2 className="text-lg font-semibold">
          Não encontramos inscrições correspondentes
        </h2>
      </div>
    )
  }

  return (
    <>
      <GeneralRegistrationTable data={data.results} params={params} />
      <UrlPaginationFooter
        totalItems={data.count}
        itemsPerPage={PAGINATION.DEFAULT_PAGE_SIZE}
      />
    </>
  )
}
