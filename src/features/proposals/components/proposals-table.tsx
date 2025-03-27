'use client'

import {
  Avatar,
  Badge,
  MantineColor,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Text
} from '@mantine/core'
import { useRouter } from 'next/navigation'
import { Proposal } from '../types'

const PROPOSALS_STATUS = {
  APROVADO: { color: 'green' as MantineColor, label: 'Aprovado' },
  REPROVADO: { color: 'red' as MantineColor, label: 'Reprovado' },
  PENDENTE: { color: 'amber' as MantineColor, label: 'Pendente' }
} as const

interface ProposalsTableProps {
  data: Proposal[]
}

export function ProposalsTable({ data }: ProposalsTableProps) {
  const router = useRouter()

  /* function handleNavigateToRegistration(id: string) {
    router.push(`/admin/acessos/cadastros/${id}`)
  } */

  return (
    <Table
      verticalSpacing="xs"
      className="w-full table-fixed"
      highlightOnHover
      classNames={{
        tbody: '[&>tr]:cursor-pointer'
      }}
    >
      <TableThead>
        <TableTr>
          <TableTh>Nome</TableTh>
          <TableTh>Eixo</TableTh>
          <TableTh>Status</TableTh>
          <TableTh>Responsável</TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>
        {data.map((proposal) => {
          const status = PROPOSALS_STATUS[proposal.status]

          return (
            <TableTr
              key={proposal.id}
              //   onClick={() => handleNavigateToRegistration(registration.id)}
            >
              <TableTd w='50%'>
                <Text size='sm' truncate>{proposal.titulo}</Text>
              </TableTd>
              <TableTd w='15%'>
                <span className="rounded-full border p-1.5 text-xs text-secondary-foreground">
                  {proposal.eixo.nome}
                </span>
              </TableTd>
              <TableTd w='15%'>
                <Badge color={status.color} variant="light" radius="sm">
                  {status.label}
                </Badge>
              </TableTd>
              <TableTd w='10%'>
                <Avatar
                  radius="xl"
                  size="sm"
                  name={proposal.autor}
                  color="initials"
                  variant="filled"
                />
              </TableTd>
            </TableTr>
          )
        })}
      </TableTbody>
    </Table>
  )
}
