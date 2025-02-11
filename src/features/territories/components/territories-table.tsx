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

interface TerritoriesTableProps {
  territories: Territory[]
}

export function TerritoriesTable({ territories }: TerritoriesTableProps) {
  return (
    <Table verticalSpacing="xs">
      <TableThead>
        <TableTr>
          <TableTh>Nome</TableTh>
          <TableTh>População</TableTh>
          <TableTh>Área Territorial</TableTh>
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
                minimumFractionDigits: 2
              })}{' '}
              km<sup>2</sup>
            </TableTd>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  )
}
