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
import { Registration } from '../types'

const REGISTRATION_STATUS = {
  APROVADO: { color: 'green' as MantineColor, label: 'Aprovado' },
  REPROVADO: { color: 'red' as MantineColor, label: 'Reprovado' },
  PENDENTE: { color: 'yellow' as MantineColor, label: 'Pendente' }
} as const

interface RegistrationTableProps {
  data: Registration[]
}

export function RegistrationTable({ data }: RegistrationTableProps) {
  return (
    <Table verticalSpacing="xs" className="w-full table-fixed">
      <TableThead>
        <TableTr>
          <TableTh className="w-full">Usuário</TableTh>
          <TableTh className="w-48">Eixo</TableTh>
          <TableTh className="w-48">Situação</TableTh>
          <TableTh className="w-28">Responsável</TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>
        {data.map((registration) => {
          const statusConfig = REGISTRATION_STATUS[registration.ultimo_status]

          return (
            <TableTr key={registration.id}>
              <TableTd className="w-full">
                <div className="flex items-center gap-2">
                  <Avatar
                    radius="xl"
                    size="sm"
                    src={registration.usuario.avatar}
                    name={registration.usuario.nome}
                  />
                  {registration.usuario.nome}
                </div>
              </TableTd>
              <TableTd className="w-48">
                <span className="rounded-full border p-1.5 text-xs text-secondary-foreground">
                  {registration.eixo}
                </span>
              </TableTd>
              <TableTd className="w-48">
                <Badge color={statusConfig.color} variant="light" radius="sm">
                  {statusConfig.label}
                </Badge>
              </TableTd>
              <TableTd className="w-28">
                <Tooltip label={registration.responsavel.nome}>
                  <Avatar
                    radius="xl"
                    size="sm"
                    src={registration.responsavel.avatar}
                    name={registration.responsavel.nome}
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
