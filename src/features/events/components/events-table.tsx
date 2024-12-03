'use client'

import React from 'react'
import {
  Table,
  TableTr,
  TableTh,
  TableTd,
  TableThead,
  TableTbody,
  Tooltip
} from '@mantine/core'
import { Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { parseAsString, useQueryState } from 'nuqs'
import type { Event } from '@/types/events'
import { SortableColumnHeader } from '@/components/ui/sortable-column-header'
import { SORT_LABELS } from '@/constants/sort-labels'

interface EventsTableProps {
  events: Event[]
  queryKey?: string
  shallowSort?: boolean
}

export function EventsTable({
  events,
  queryKey = 'sort',
  shallowSort = false
}: EventsTableProps) {
  const router = useRouter()
  const [sort, setSort] = useQueryState(
    queryKey,
    parseAsString.withOptions({
      shallow: shallowSort
    })
  )

  function handleNavigateToEvent(id: number) {
    router.push(`/${id}`)
  }

  return (
    <>
      <Table
        verticalSpacing="xs"
        highlightOnHover
        classNames={{
          tbody: '[&>tr]:cursor-pointer'
        }}
      >
        <TableThead>
          <TableTr>
            <SortableColumnHeader
              column="nome"
              title="Nome"
              sortKey={sort}
              onSort={setSort}
              ascendingLabel={SORT_LABELS.ALPHABETICAL.ASC}
              descendingLabel={SORT_LABELS.ALPHABETICAL.DESC}
            />
            <SortableColumnHeader
              column="municipio"  
              title="Município"
              sortKey={sort}
              onSort={setSort}
              ascendingLabel={SORT_LABELS.ALPHABETICAL.ASC}
              descendingLabel={SORT_LABELS.ALPHABETICAL.DESC}
            />
            <SortableColumnHeader
              column="data"
              title="Data"
              sortKey={sort}
              onSort={setSort}
              ascendingLabel={SORT_LABELS.DATE.ASC}
              descendingLabel={SORT_LABELS.DATE.DESC}
            />
            <TableTh className="w-1 whitespace-nowrap">
              Unidades Gestoras
            </TableTh>
            <SortableColumnHeader
              column="valor"
              title="Valor"
              sortKey={sort}
              onSort={setSort}
              ascendingLabel={SORT_LABELS.NUMERIC.ASC}
              descendingLabel={SORT_LABELS.NUMERIC.DESC}
            />
          </TableTr>
        </TableThead>
        <TableTbody>
          {events.map((event) => (
            <TableTr
              key={event.id}
              onClick={() => handleNavigateToEvent(event.id)}
            >
              <TableTd className="max-w-[500px] truncate" title={event.nome}>
                {event.nome}
              </TableTd>
              <TableTd className="whitespace-nowrap">
                {event.municipio || 'Não informado'}
              </TableTd>
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
                    <div className="flex cursor-pointer items-center space-x-2">
                      <Info className="size-4 text-muted-foreground" />
                      <span>{sigla}</span>
                    </div>
                  </Tooltip>
                ))}
              </TableTd>
              <TableTd className="whitespace-nowrap font-semibold">
                R${' '}
                {parseFloat(event.valor).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2
                })}
              </TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </Table>
    </>
  )
}
