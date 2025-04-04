'use client'

import {
  Avatar,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr
} from '@mantine/core'
import { useRouter } from 'next/navigation'
import { People } from '../types'

interface RegistrationTableProps {
  data: People[]
}

const REGISTRATION_TYPE = {
  votante: { value: 'votante', label: 'Votante' },
  ouvinte: { value: 'ouvinte', label: 'Ouvinte' }
} as const

export function GeneralRegistrationTable({ data }: RegistrationTableProps) {
  const router = useRouter()

  return (
    <Table
      verticalSpacing="xs"
      className="w-full"
    >
      <TableThead>
        <TableTr>
          <TableTh>Nome</TableTh>
          <TableTh>Inscrição</TableTh>
          <TableTh>Eixo</TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>
        {data.map((registration) => {
          const type = REGISTRATION_TYPE[registration.inscricao.tipo_inscricao]
          return (
            <TableTr
              key={registration.id}
            >
              <TableTd w="60%">
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
              <TableTd w="15%">
                <span className="rounded-full border p-1.5 text-xs text-secondary-foreground">
                  {type.label}
                </span>
              </TableTd>
              <TableTd w="25%">
                <span className="rounded-full border p-1.5 text-xs text-secondary-foreground">
                  {registration.inscricao.eixo?.nome || 'Eixo não informado'}
                </span>
              </TableTd>
            </TableTr>
          )
        })}
      </TableTbody>
    </Table>
  )
}
