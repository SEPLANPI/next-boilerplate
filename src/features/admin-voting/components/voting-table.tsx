'use client'

import { SortableColumnHeader } from '@/components/ui/sortable-column-header'
import {
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Progress
} from '@mantine/core'
import { parseAsString, useQueryState } from 'nuqs'
import { ProposalVotingInfo } from '../types'

interface VotingTableProps {
  data: ProposalVotingInfo[]
  totalPontos: number
}

export function VotingTable({ data, totalPontos }: VotingTableProps) {
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
          <TableTh>Título</TableTh>
          <SortableColumnHeader
            column="eixo"
            title="Eixo"
            sortKey={sort}
            onSort={setSort}
          />
          <TableTh>Porcentagem</TableTh>
          <SortableColumnHeader
            className="w-24"
            column="pontos"
            title="Pontos"
            sortKey={sort}
            onSort={setSort}
            ascendingLabel={'Menos pontos'}
            descendingLabel={'Mais pontos'}
          />
        </TableTr>
      </TableThead>
      <TableTbody>
        {data.map((proposal) => {
          const percentage = (proposal.total_pontos / totalPontos) * 100

          return (
            <TableTr key={proposal.titulo}>
              <TableTd className="text-content-emphasis">
                {proposal.titulo}
              </TableTd>
              <TableTd>
                <span className="whitespace-nowrap rounded-full border p-1.5 text-xs">
                  {proposal.eixo.descricao}
                </span>
              </TableTd>
              <TableTd>
                <div className="flex w-40 items-center space-x-2 text-sm">
                  <Progress
                    size="md"
                    color="green"
                    value={percentage}
                    className="flex-1"
                  />
                  <span>{percentage.toFixed(1)}%</span>
                </div>
              </TableTd>
              <TableTd>{proposal.total_pontos}</TableTd>
            </TableTr>
          )
        })}
      </TableTbody>
    </Table>
  )
}
