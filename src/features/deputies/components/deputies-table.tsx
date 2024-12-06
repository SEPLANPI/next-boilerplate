'use client'

import React from 'react'
import { Table, TableTr, TableTd, TableThead, TableTbody } from '@mantine/core'
import { parseAsString, useQueryState } from 'nuqs'
import { SortableColumnHeader } from '@/components/ui/sortable-column-header'
import { SORT_LABELS } from '@/constants/sort-labels'
import { Deputy } from '../types'

interface DeputiesTableProps {
  deputies: Deputy[]
}

export function DeputiesTable({ deputies }: DeputiesTableProps) {
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsString.withOptions({
      shallow: false
    })
  )

  return (
    <Table verticalSpacing="xs">
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
        </TableTr>
      </TableThead>
      <TableTbody>
        {deputies.map((deputy) => (
          <TableTr key={deputy.nome}>
            <TableTd>{deputy.nome}</TableTd>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  )
}
