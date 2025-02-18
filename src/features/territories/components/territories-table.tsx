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
import { Territory } from '../types'
import { SortableColumnHeader } from '@/components/ui/sortable-column-header'
import { useQueryState, parseAsString } from 'nuqs'

interface TerritoriesTableProps {
  territories: Territory[]
}

export function TerritoriesTable({ territories }: TerritoriesTableProps) {
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
          <TableTh>Nome</TableTh>
          <SortableColumnHeader
            column="populacao"
            title="População"
            sortKey={sort}
            onSort={setSort}
            ascendingLabel={'Menor população'}
            descendingLabel={'Maior população'}
          />{' '}
          <SortableColumnHeader
            column="area_territorial"
            title="Área Territorial"
            sortKey={sort}
            onSort={setSort}
            ascendingLabel={'Menor área'}
            descendingLabel={'Maior área'}
          />
        </TableTr>
      </TableThead>
      <TableTbody>
        {territories.map((territory) => (
          <TableTr key={territory.id}>
            <TableTd>{territory.nome}</TableTd>
            <TableTd>
              {territory.populacao.toLocaleString('pt-br', {
                maximumFractionDigits: 0
              })}
            </TableTd>
            <TableTd>
              {territory.area_territorial.toLocaleString('pt-br', {
                maximumFractionDigits: 2
              })}{' '}
              km<sup>2</sup>
            </TableTd>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  )
}
