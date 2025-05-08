'use client'

import {
  ActionIcon,
  Avatar,
  Menu,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr
} from '@mantine/core'
import { MoreHorizontal, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { Person } from '../types'
import { RegisterAsCounselorDrawer } from './register-as-counselor-drawer'

interface RegistrationTableProps {
  data: Person[]
}

const REGISTRATION_TYPE = {
  votante: { value: 'votante', label: 'Oficina e Plenária' },
  ouvinte: { value: 'ouvinte', label: 'Plenária' }
} as const

export function GeneralRegistrationTable({ data }: RegistrationTableProps) {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const [drawerOpened, setDrawerOpened] = useState(false)

  return (
    <>
      <Table verticalSpacing="xs" className="w-full">
        <TableThead>
          <TableTr>
            <TableTh>Nome</TableTh>
            <TableTh>Inscrição</TableTh>
            <TableTh>Eixo</TableTh>
            <TableTh className="w-16"></TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {data.map((registration) => {
            const type =
              REGISTRATION_TYPE[registration.inscricao.tipo_inscricao]
            return (
              <TableTr key={registration.id}>
                <TableTd w="60%">
                  <div className="flex items-center gap-3">
                    <Avatar
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
                  <span className="whitespace-nowrap rounded-full border p-1.5 text-xs text-secondary-foreground">
                    {type.label}
                  </span>
                </TableTd>
                <TableTd w="25%">
                  {registration.inscricao.eixo ? (
                    <span className="rounded-full border p-1.5 text-xs text-secondary-foreground">
                      {registration.inscricao.eixo?.nome}
                    </span>
                  ) : (
                    '-'
                  )}
                </TableTd>
                <TableTd>
                  {registration.inscricao.tipo_inscricao === 'votante' && (
                    <Menu position="bottom-end">
                      <Menu.Target>
                        <ActionIcon variant="ghost">
                          <MoreHorizontal className="size-4" />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          leftSection={<UserPlus className="size-4" />}
                          onClick={() => {
                            setSelectedPerson(registration)
                            setDrawerOpened(true)
                          }}
                        >
                          Cadastrar como conselheiro
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  )}
                </TableTd>
              </TableTr>
            )
          })}
        </TableTbody>
      </Table>
      <RegisterAsCounselorDrawer
        opened={drawerOpened}
        onClose={() => {
          setDrawerOpened(false)
          setSelectedPerson(null)
        }}
        person={selectedPerson}
      />
    </>
  )
}
