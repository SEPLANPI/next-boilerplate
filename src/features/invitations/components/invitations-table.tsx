'use client'

import React from 'react'
import {
  Table,
  TableTr,
  TableTd,
  TableThead,
  TableTbody,
  TableTh,
  Avatar,
  Tooltip,
  Badge,
  MantineColor
} from '@mantine/core'
import { Invitation } from '../types'
import dayjs from 'dayjs'
import { formatDate } from '@/utils/format-date'

const INVITATION_STATUS = {
  SUBMETIDO: { color: 'blue' as MantineColor, label: 'Submetido' },
  PENDENTE: { color: 'orange' as MantineColor, label: 'Pendente' }
} as const

interface InvitationsTableProps {
  data: Invitation[]
}

export function InvitationsTable({ data }: InvitationsTableProps) {
  return (
    <Table verticalSpacing="xs" className="w-full table-fixed">
      <TableThead>
        <TableTr>
          <TableTh className="w-full">Nome</TableTh>
          <TableTh className="w-48">Situação</TableTh>
          <TableTh className="w-48">Criado em</TableTh>
          <TableTh className="w-28">Responsável</TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>
        {data.map((invitation) => {
          const statusConfig = INVITATION_STATUS[invitation.situacao]

          return (
            <TableTr key={invitation.id}>
              <TableTd className="w-full">{invitation.nome}</TableTd>
              <TableTd className="w-48">
                <Badge color={statusConfig.color} variant="light" radius="sm">
                  {statusConfig.label}
                </Badge>
              </TableTd>
              <TableTd>{formatDate(invitation.criado_em)}</TableTd>
              <TableTd className="w-28">
                <Tooltip label={invitation.responsavel.nome}>
                  <Avatar
                    radius="xl"
                    color="initials"
                    key={invitation.responsavel.nome}
                    name={invitation.responsavel.nome}
                    alt="Avatar do responsável"
                    variant="filled"
                    size="sm"
                  />
                </Tooltip>
              </TableTd>
            </TableTr>
          )
        })}
      </TableTbody>
    </Table>
  )
}
