import { AdministrativeUnitsTable } from './administrative-units-table'
import { getAdministrativeUnits } from '../api/get-administrative-units'
import { FetchError } from '@/components/errors/fetch-error'
import { UrlPaginationFooter } from '@/components/ui/pagination-footer/url-pagination-footer'
import { PAGINATION } from '@/constants/pagination'

export async function AdministrativeUnitsListView() {
  const { data, error } = await getAdministrativeUnits()

  if (!data || error) {
    return (
      <FetchError title="Erro ao carregar unidades gestoras" error={error} />
    )
  }

  if (data.results.length === 0) {
    return (
      <div className="flex flex-col items-center p-10">
        <h2 className="text-lg font-semibold">
          Não encontramos unidades gestoras correspondentes
        </h2>
      </div>
    )
  }

  return (
    <>
      <AdministrativeUnitsTable units={data.results} />
      <UrlPaginationFooter
        totalItems={data.count}
        itemsPerPage={PAGINATION.DEFAULT_PAGE_SIZE}
      />
    </>
  )
}
