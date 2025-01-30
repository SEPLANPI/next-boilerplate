'use client'

import React from 'react'
import {
  Table,
  TableTr,
  TableTh,
  TableTd,
  TableThead,
  TableTbody,
  Tooltip,
  ActionIcon,
  Checkbox
} from '@mantine/core'
import { Info, PencilLine } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { parseAsString, useQueryState } from 'nuqs'
import { SortableColumnHeader } from '@/components/ui/sortable-column-header'
import { SORT_LABELS } from '@/constants/sort-labels'
import { Event } from '../types'
import { useEventEditDrawer } from '../stores/edit-event-drawer-store'
import { formatDate } from '@/utils/format-date'
import { formatCurrency } from '@/lib/utils'
import { useEditModeStore } from '../stores/edit-mode-store'
import { EditModeFloatingBar } from './edit-mode-floating-bar'

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
  const { isEditMode, isSelected, toggleEventSelection } = useEditModeStore()
  const { openEditDrawer } = useEventEditDrawer()

  function handleNavigateToEvent(id: number) {
    router.push(`/${id}`)
  }

  function handleEditEvent(event: Event, e: React.MouseEvent) {
    e.stopPropagation()
    openEditDrawer(event)
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
            {isEditMode && <TableTh style={{ width: 40 }} />}
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
            {isEditMode && <TableTh className="w-[48px]" />}
          </TableTr>
        </TableThead>
        <TableTbody>
          {events.map((event) => (
            <TableTr
              key={event.id}
              onClick={() => !isEditMode && handleNavigateToEvent(event.id)}
            >
              {isEditMode && (
                <TableTd onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={isSelected(event.id)}
                    onChange={() =>
                      toggleEventSelection({ id: event.id, name: event.nome })
                    }
                  />
                </TableTd>
              )}
              <TableTd className="max-w-[500px] truncate" title={event.nome}>
                {event.nome}
              </TableTd>
              <TableTd className="whitespace-nowrap">
                {event.municipio || 'Não informado'}
              </TableTd>
              <TableTd>{formatDate(event.data)}</TableTd>
              <TableTd className="w-1 whitespace-nowrap">
                {event.ugs.map(({ nome, sigla }) => (
                  <Tooltip
                    key={sigla}
                    label={nome}
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
                {formatCurrency(event.valor)}
              </TableTd>
              {isEditMode && (
                <TableTd className="relative w-[26px]">
                  <ActionIcon
                    variant="default"
                    size="md"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={(e) => handleEditEvent(event, e)}
                  >
                    <PencilLine className="size-4" />
                  </ActionIcon>
                </TableTd>
              )}
            </TableTr>
          ))}
        </TableTbody>
      </Table>
      <EditModeFloatingBar />
    </>
  )
}
