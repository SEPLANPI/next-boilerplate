import { searchParamsCache } from '@/app/(dashboard)/page'
import { SearchParamsPagination } from '@/components/ui/search-params-pagination'
import { EventsEmptyState } from '@/features/events/components/empty-state'
import { api } from '@/lib/api'
import { EventsTable } from './events-table'
import { EventsCards } from './events-cards'

export type Event = {
  nome: string
  municipio?: string
  data?: string
  ugs: {
    name: string
    sigla: string
  }[]
  contratos: number[]
  valor: string
}

type EventsResponse = {
  count: number
  eventos_percentage: number
  total_valor: number
  total_valor_percentage: number
  total_empresas: number
  empresas_percentage: number
  results: Event[]
}

export async function EventsContent() {
  const { page, search, ugs } = searchParamsCache.all()
  const params = new URLSearchParams()
  params.append('page', page.toString())
  params.append('nome', search)

  if (ugs) {
    ugs.forEach((ug) => params.append('ugs', ug.toString()))
  }

  const response = await api.get(`/eventos?${params.toString()}`)

  if (!response.ok) {
    return <p>Erro ao buscar dados</p>
  }

  const data: EventsResponse = await response.json()

  const startItem = (page - 1) * 5 + 1
  const endItem = Math.min(startItem + data.results.length - 1, data.count)

  if (data.results.length === 0) return <EventsEmptyState />

  return (
    <>
      <EventsCards
        quantity={data.count}
        quantityPercentage={data.eventos_percentage}
        value={data.total_valor}
        valuePercentage={data.total_valor_percentage}
        empresas={data.total_empresas}
        empresasPercentage={data.empresas_percentage}
        municipios="100"
      />
      <EventsTable events={data.results} />
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-secondary-foreground">
          <span className="font-bold">
            {startItem} - {endItem}
          </span>{' '}
          de {data.count} resultados
        </span>
        <SearchParamsPagination totalItems={data.count} perPage={15} />
      </div>
    </>
  )
}
