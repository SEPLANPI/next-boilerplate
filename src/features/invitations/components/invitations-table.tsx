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
  ActionIcon,
  Avatar,
  Tooltip
} from '@mantine/core'
import { MoreHorizontal, Copy, Trash2 } from 'lucide-react'
import { useClipboard } from '@/hooks/use-clipboard'
import { useDisclosure } from '@mantine/hooks'
import { parseAsString, useQueryState } from 'nuqs'
import { SortableColumnHeader } from '@/components/ui/sortable-column-header'
import { SORT_LABELS } from '@/constants/sort-labels'
import { Invitation } from '../types'
import { formatDate } from '@/utils/format-date'
import { DeleteInvitationModal } from './delete-invitation-modal'

const INVITATION_STATUS = {
  USED: { color: 'blue' as MantineColor, label: 'Usado' },
  AVAILABLE: { color: 'orange' as MantineColor, label: 'Pendente' }
} as const

interface InvitationsTableProps {
  data: Invitation[]
}

export function InvitationsTable({ data }: InvitationsTableProps) {
  const { copy } = useClipboard()
  const [opened, { open, close }] = useDisclosure(false)
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsString.withOptions({
      shallow: false
    })
  )

  return (
    <>
      <Table verticalSpacing="xs" className="w-full table-fixed">
        <TableThead>
          <TableTr>
            <TableTh className="w-full">Identificador</TableTh>
            <TableTh className="w-28">Conselheiro</TableTh>
            <TableTh className="w-32">Status</TableTh>
            <SortableColumnHeader
              column="criado_em"
              title="Criado em"
              sortKey={sort}
              onSort={setSort}
              ascendingLabel={SORT_LABELS.DATE.ASC}
              descendingLabel={SORT_LABELS.DATE.DESC}
              className="w-48"
            />
            <TableTh className="w-28">Responsável</TableTh>
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
                <TableTd>{invitation.identificador}</TableTd>
                <TableTd className="flex justify-center">
                  {invitation.usado ? (
                    <Tooltip label={invitation.conselheiro.nome}>
                      <Avatar
                        radius="xl"
                        size="sm"
                        name={invitation.conselheiro.nome}
                        color="initials"
                        variant="filled"
                      />
                    </Tooltip>
                  ) : (
                    '-'
                  )}
                </TableTd>
                <TableTd className="w-48">
                  <Badge color={status.color} variant="light" radius="sm">
                    {status.label}
                  </Badge>
                </TableTd>
                <TableTd>
                  {formatDate(invitation.criado_em, 'DD/MM/YYYY [às] HH:mm')}
                </TableTd>
                <TableTd className="flex w-28 justify-center">
                  <Tooltip label={invitation.admin.nome}>
                    <Avatar
                      radius="xl"
                      size="sm"
                      name={invitation.admin.nome}
                      color="initials"
                      variant="filled"
                    />
                  </Tooltip>
                </TableTd>
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
                      {!invitation.usado && (
                        <Menu.Item
                          color="red"
                          leftSection={<Trash2 className="size-4" />}
                          onClick={() => {
                            setSelectedId(invitation.id)
                            open()
                          }}
                        >
                          Excluir
                        </Menu.Item>
                      )}
                    </Menu.Dropdown>
                  </Menu>
                </TableTd>
              </TableTr>
            )
          })}
        </TableTbody>
      </Table>
      <DeleteInvitationModal
        opened={opened}
        onClose={() => {
          close()
          setSelectedId(null)
        }}
        invitationId={selectedId}
      />
    </>
  )
}
