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
  TableTr
} from '@mantine/core'
import { useRouter } from 'next/navigation'
import { Registration } from '../types'

const REGISTRATION_STATUS = {
  APROVADO: { color: 'green' as MantineColor, label: 'Aprovado' },
  REJEITADO: { color: 'red' as MantineColor, label: 'Rejeitado' },
  PENDENTE: { color: 'amber' as MantineColor, label: 'Pendente' }
} as const

interface RegistrationTableProps {
  data: Registration[]
  params: { eventId: string }
}

export function RegistrationTable({ data, params }: RegistrationTableProps) {
  const router = useRouter()

  function handleNavigateToRegistration(id: string) {
    router.push(`/${params.eventId}/admin/acessos/conselheiros/${id}/dados`)
  }

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
          <TableTh>Conselheiro</TableTh>
          <TableTh>Status</TableTh>
          <TableTh>Eixo</TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>
        {data.map((registration) => {
          const status = REGISTRATION_STATUS[registration.status.atual]

          return (
            <TableTr
              key={registration.id}
              onClick={() => handleNavigateToRegistration(registration.id)}
            >
              <TableTd>
                <div className="flex items-center gap-3">
                  <Avatar
                    radius="xl"
                    size="sm"
                    name={registration.nome}
                    color="initials"
                    variant="filled"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{registration.nome}</span>
                    <span className="text-sm text-gray-600">
                      {registration.cpf || 'CPF não informado'}
                    </span>
                  </div>
                </div>
              </TableTd>
              <TableTd>
                <Badge color={status.color} variant="light" radius="sm">
                  {status.label}
                </Badge>
              </TableTd>
              <TableTd>
                <span className="rounded-full border p-1.5 text-xs text-secondary-foreground">
                  {registration.eixo.nome}
                </span>
              </TableTd>
            </TableTr>
          )
        })}
      </TableTbody>
    </Table>
  )
}
