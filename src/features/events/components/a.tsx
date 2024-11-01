import React from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'

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

type SortableColumn = 'nome' | 'municipio' | 'data' | 'contratos' | 'valor'

const DataTableColumnHeader = ({
  column,
  title,
  sortKey,
  onSort
}: {
  column: SortableColumn
  title: string
  sortKey: string | null
  onSort: (value: string) => void
}) => {
  const isSorted = sortKey?.split('.')[0] === column
  const sortDirection = sortKey?.split('.')[1]

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        className="data-[state=open]:bg-accent -ml-3 h-8"
        onClick={() => {
          if (!isSorted) {
            onSort(`${column}.asc`)
          } else if (sortDirection === 'asc') {
            onSort(`${column}.desc`)
          } else {
            onSort('')
          }
        }}
      >
        <span>{title}</span>
        {isSorted ? (
              sortDirection === 'desc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
                  ) : (
            <ArrowUp className="ml-2 h-4 w-4" />
                  )
            ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
      </Button>
    </div>
  )
}

export function EventsTable({
  data,
  page = 1,
  sortKey = '',
  onSortChange
}: {
  data: { count: number; results: Event[] }
  page?: number
  sortKey?: string
  onSortChange: (sort: string) => void
}) {
  const startItem = (page - 1) * 10 + 1
  const endItem = Math.min(startItem + data.results.length - 1, data.count)

  if (data.results.length === 0) return <div>No results found</div>

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <DataTableColumnHeader
                column="nome"
                title="Nome"
                sortKey={sortKey}
                onSort={onSortChange}
              />
            </TableHead>
            <TableHead>
              <DataTableColumnHeader
                column="municipio"
                title="Município"
                sortKey={sortKey}
                onSort={onSortChange}
              />
            </TableHead>
            <TableHead>
              <DataTableColumnHeader
                column="data"
                title="Data"
                sortKey={sortKey}
                onSort={onSortChange}
              />
            </TableHead>
            <TableHead className="w-1 whitespace-nowrap">
              Unidades Gestoras
            </TableHead>
            <TableHead>
              <DataTableColumnHeader
                column="contratos"
                title="Contratos"
                sortKey={sortKey}
                onSort={onSortChange}
              />
            </TableHead>
            <TableHead>
              <DataTableColumnHeader
                column="valor"
                title="Valor"
                sortKey={sortKey}
                onSort={onSortChange}
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.results.map((event) => (
            <TableRow key={event.nome}>
              <TableCell className="max-w-[500px] truncate">
                {event.nome}
              </TableCell>
              <TableCell>{event.municipio || 'Não informado'}</TableCell>
              <TableCell>{event.data || 'Não informado'}</TableCell>
              <TableCell className="w-1 whitespace-nowrap">
                {event.ugs.map(({ name, sigla }) => (
                  <TooltipProvider key={sigla}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex cursor-pointer items-center justify-between space-x-2">
                          <span>{sigla}</span>
                          <Badge
                            variant="outline"
                            className="bg-muted text-muted-foreground"
                          >
                            ?
                          </Badge>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </TableCell>
              <TableCell>{event.contratos.length} contratos</TableCell>
              <TableCell className="font-semibold">
                R${' '}
                {parseFloat(event.valor).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-secondary-foreground">
          <span className="font-bold">
            {startItem} - {endItem}
          </span>{' '}
          de {data.count} resultados
        </span>
      </div>
    </>
  )
}

export default EventsTable
