import { InvitationsTable } from './invitations-table'
import { getInvitations } from '../api/get-invitations'
import { FetchError } from '@/components/errors/fetch-error'
import { UrlPaginationFooter } from '@/components/ui/pagination-footer/url-pagination-footer'
import { PAGINATION } from '@/constants/pagination'

interface InvitationsListViewProps {
  params: { eventId: string }
}

export async function InvitationsListView({
  params
}: InvitationsListViewProps) {
  const { data, error } = await getInvitations(params.eventId)

  if (!data || error) {
    return <FetchError title="Erro ao carregar convites" error={error} />
  }

  if (data.results.length === 0) {
    return (
      <div className="flex flex-col items-center p-10">
        <h2 className="text-lg font-semibold">
          Não encontramos convites correspondentes
        </h2>
      </div>
    )
  }

  return (
    <>
      <InvitationsTable data={data.results} params={params} />
      <UrlPaginationFooter
        totalItems={data.count}
        itemsPerPage={PAGINATION.DEFAULT_PAGE_SIZE}
      />
    </>
  )
}
