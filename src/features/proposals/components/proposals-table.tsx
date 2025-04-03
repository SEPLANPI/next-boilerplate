'use client'

import {
  Avatar,
  Badge,
  Drawer,
  MantineColor,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Text,
  Tooltip
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Proposal } from '../types'
import ProposalsForm from './proposals-form'

const PROPOSALS_STATUS = {
  APROVADA: { color: 'green' as MantineColor, label: 'Aprovada' },
  EM_VOTACAO: { color: 'blue' as MantineColor, label: 'Em votação' },
  CANCELADA: { color: 'gray' as MantineColor, label: 'Cancelada' },
  REJEITADA: { color: 'red' as MantineColor, label: 'Rejeitada' },
  PENDENTE: { color: 'amber' as MantineColor, label: 'Pendente' }
} as const

interface ProposalsTableProps {
  data: Proposal[]
}

export function ProposalsTable({ data }: ProposalsTableProps) {
  const [opened, { open, close }] = useDisclosure(false)
  const [item, setItem] = useState<Proposal>()

  const router = useRouter()

  function handleRowClick(proposal: Proposal) {
    router.push(`/admin/propostas/${proposal.id}`)
  }

  return (
    <>
      <Table
        verticalSpacing="xs"
        className="w-full"
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
                onClick={() => handleRowClick(proposal)}
              >
                <TableTd w="50%">
                  <Text size="sm" truncate className="max-w-[650px]">
                    {proposal.titulo}
                  </Text>
                </TableTd>
                <TableTd w="40%">
                  <span className="rounded-full border p-1.5 text-xs text-secondary-foreground">
                    {proposal.eixo.nome}
                  </span>
                </TableTd>
                <TableTd w="15%">
                  <Badge color={status.color} variant="light" radius="sm">
                    {status.label}
                  </Badge>
                </TableTd>
                <TableTd w="10%">
                  <Tooltip label={proposal.autor.nome}>
                    <Avatar
                      radius="xl"
                      size="sm"
                      name={proposal.autor.nome}
                      color="initials"
                      variant="filled"
                    />
                  </Tooltip>
                </TableTd>
              </TableTr>
            )
          })}
        </TableTbody>
      </Table>
      <Drawer
        title="Visualizar Proposta"
        size="md"
        position="right"
        opened={opened}
        onClose={close}
        styles={{
          header: {
            paddingLeft: '24px',
            paddingRight: '24px'
          },
          title: {
            fontWeight: 600,
            fontSize: '14px',
            fontStyle: 'normal'
          },
          body: { paddingLeft: '24px', paddingRight: '24px' }
        }}
      >
        <ProposalsForm onClose={close} items={item} edit={true} />
      </Drawer>
    </>
  )
}
