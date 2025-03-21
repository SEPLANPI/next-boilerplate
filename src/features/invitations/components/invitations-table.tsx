'use client'

import React from 'react'
import {
  Table,
  TableTr,
  TableTd,
  TableThead,
  TableTbody,
  TableTh,
  Badge,
  MantineColor,
  Menu,
  ActionIcon
} from '@mantine/core'
import { MoreHorizontal, Copy } from 'lucide-react'
import { useClipboard } from '@/hooks/use-clipboard'
import { Invitation } from '../types'
import { formatDate } from '@/utils/format-date'

const INVITATION_STATUS = {
  USED: { color: 'blue' as MantineColor, label: 'Usado' },
  AVAILABLE: { color: 'orange' as MantineColor, label: 'Pendente' }
} as const

interface InvitationsTableProps {
  data: Invitation[]
}

export function InvitationsTable({ data }: InvitationsTableProps) {
  const { copy } = useClipboard()

  return (
    <Table verticalSpacing="xs" className="w-full table-fixed">
      <TableThead>
        <TableTr>
          <TableTh className="w-full">Identificador</TableTh>
          <TableTh className="w-48">Status</TableTh>
          <TableTh className="w-48">Criado em</TableTh>
          <TableTh className="w-28 truncate">Responsável</TableTh>
          <TableTh className="w-16"></TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>
        {data.map((invitation) => {
          const status = invitation.usado
            ? INVITATION_STATUS.USED
            : INVITATION_STATUS.AVAILABLE

          return (
            <TableTr key={invitation.id}>
              <TableTd className="w-full">{invitation.identificador}</TableTd>
              <TableTd className="w-48">
                <Badge color={status.color} variant="light" radius="sm">
                  {status.label}
                </Badge>
              </TableTd>
              <TableTd>{formatDate(invitation.criado_em)}</TableTd>
              <TableTd className="w-28 truncate">{invitation.admin}</TableTd>
              <TableTd>
                <Menu position="bottom-end">
                  <Menu.Target>
                    <ActionIcon variant="ghost">
                      <MoreHorizontal className="size-4" />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={<Copy className="size-4" />}
                      onClick={() =>
                        copy(
                          `${process.env.NEXT_PUBLIC_APP_URL}/conselheiros/cadastro/${invitation.token}`
                        )
                      }
                    >
                      Copiar URL
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </TableTd>
            </TableTr>
          )
        })}
      </TableTbody>
    </Table>
  )
}
