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
import { City } from '../types'

interface CitiesTableProps {
  cities: City[]
}

export function CitiesTable({ cities }: CitiesTableProps) {
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
          <TableTh>Território</TableTh>
          <TableTh>População</TableTh>
          <TableTh>Área Territorial</TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>
        {cities.map((city) => (
          <TableTr key={city.id}>
            <TableTd>{city.nome}</TableTd>
            <TableTd>{city.territorio_nome}</TableTd>
            <TableTd>{city.polulacao}</TableTd>
            <TableTd>{city.area_territorial}</TableTd>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  )
}
