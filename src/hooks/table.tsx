import { searchParamsCache } from '@/app/(dashboard)/page'
import { SearchParamsPagination } from '@/components/ui/search-params-pagination'
import { EventsEmptyState } from '@/features/events/components/empty-state'
import { api } from '@/lib/api'
import {
  Table,
  TableTr,
  TableTh,
  TableTd,
  TableThead,
  TableTbody,
  Tooltip,
  Badge
} from '@mantine/core'

type Event = {
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
  results: Event[]
}

export async function EventsTable() {
  const { page, search } = searchParamsCache.all()
  const response = await api.get(`/eventos?page=${page}&nome=${search}`)

  if (!response.ok) {
    return <p>Erro ao buscar dados</p>
  }

  const data: EventsResponse = await response.json()

  const startItem = (page - 1) * 10 + 1
  const endItem = Math.min(startItem + data.results.length - 1, data.count)

  if (data.results.length === 0) return <EventsEmptyState />

  return (
    <>
      <Table verticalSpacing="xs">
        <TableThead>
          <TableTr>
            <TableTh>Nome</TableTh>
            <TableTh>Município</TableTh>
            <TableTh>Data</TableTh>
            <TableTh className="w-1 whitespace-nowrap">
              Unidades Gestoras
            </TableTh>
            <TableTh>Contratos</TableTh>
            <TableTh>Valor</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {data.results.map((event) => (
            <TableTr key={event.nome}>
              <TableTd className="max-w-[500px] truncate">{event.nome}</TableTd>
              <TableTd>{event.municipio || 'Não informado'}</TableTd>
              <TableTd>{event.data || 'Não informado'}</TableTd>
              <TableTd className="w-1 whitespace-nowrap">
                {event.ugs.map(({ name, sigla }) => (
                  <Tooltip
                    key={sigla}
                    label={name}
                    openDelay={200}
                    w={300}
                    multiline
                  >
                    <div className="flex cursor-pointer items-center justify-between space-x-2">
                      <span>{sigla}</span>
                      <Badge circle className="bg-muted text-muted-foreground">
                        ?
                      </Badge>
                    </div>
                  </Tooltip>
                ))}
              </TableTd>
              <TableTd>{event.contratos.length} contratos</TableTd>
              <TableTd className="font-semibold">
                R${' '}
                {parseFloat(event.valor).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2
                })}
              </TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </Table>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-secondary-foreground">
          <span className="font-bold">
            {startItem} - {endItem}
          </span>{' '}
          de {data.count} resultados
        </span>
        <SearchParamsPagination totalItems={data.count} perPage={10} />
      </div>
    </>
  )
}
