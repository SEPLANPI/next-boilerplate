import { RegistrationTable } from './registration-table'
import { getRegistrations } from '../api/get-registrations'
import { FetchError } from '@/components/errors/fetch-error'
import { UrlPaginationFooter } from '@/components/ui/pagination-footer/url-pagination-footer'
import { PAGINATION } from '@/constants/pagination'

interface RegistrationListViewProps {
  params: { eventId: string }
}

export async function RegistrationListView({
  params
}: RegistrationListViewProps) {
  const { data, error } = await getRegistrations(params.eventId)

  if (!data || error) {
    return <FetchError title="Erro ao carregar cadastros" error={error} />
  }

  if (data.results.length === 0) {
    return (
      <div className="flex flex-col items-center p-10">
        <h2 className="text-lg font-semibold">
          Não encontramos cadastros correspondentes
        </h2>
      </div>
    )
  }

  return (
    <>
      <RegistrationTable data={data.results} params={params} />
      <UrlPaginationFooter
        totalItems={data.count}
        itemsPerPage={PAGINATION.DEFAULT_PAGE_SIZE}
      />
    </>
  )
}
