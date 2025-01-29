'use client'

import React from 'react'
import {
  Table,
  TableTr,
  TableTd,
  TableThead,
  TableTbody,
  TableTh
} from '@mantine/core'
import { parseAsString, useQueryState } from 'nuqs'
import { SortableColumnHeader } from '@/components/ui/sortable-column-header'
import { SORT_LABELS } from '@/constants/sort-labels'
import { AdministrativeUnit } from '../types'

interface AdministrativeUnitsTableProps {
  units: AdministrativeUnit[]
}

export function AdministrativeUnitsTable({
  units
}: AdministrativeUnitsTableProps) {
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
          <TableTh className="w-min">Número</TableTh>
          <SortableColumnHeader
            column="sigla"
            title="Sigla"
            sortKey={sort}
            onSort={setSort}
            ascendingLabel={SORT_LABELS.ALPHABETICAL.ASC}
            descendingLabel={SORT_LABELS.ALPHABETICAL.DESC}
          />
          <SortableColumnHeader
            column="name"
            title="Nome"
            sortKey={sort}
            onSort={setSort}
            ascendingLabel={SORT_LABELS.ALPHABETICAL.ASC}
            descendingLabel={SORT_LABELS.ALPHABETICAL.DESC}
          />
        </TableTr>
      </TableThead>
      <TableTbody>
        {units.map((unit) => (
          <TableTr key={unit.numero}>
            <TableTd className="w-min">{unit.numero}</TableTd>
            <TableTd className="w-min">{unit.sigla}</TableTd>
            <TableTd>{unit.nome}</TableTd>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  )
}
