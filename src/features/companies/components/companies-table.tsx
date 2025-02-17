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
import { Company } from '../types'
import { formatCNPJ } from '@/utils/format-cnpj'

interface CompaniesTableProps {
  companies: Company[]
}

export function CompaniesTable({ companies }: CompaniesTableProps) {
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
          <TableTh className="w-min">CNPJ</TableTh>
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
        {companies.map((company) => (
          <TableTr key={company.cnpj}>
            <TableTd>{formatCNPJ(company.cnpj)}</TableTd>
            <TableTd>{company.nome}</TableTd>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  )
}
