'use client'

import {
  Table,
  TableTr,
  TableTh,
  TableTd,
  TableThead,
  TableTbody,
  ActionIcon,
  Avatar,
  Badge
} from '@mantine/core'
import { parseAsString, useQueryState } from 'nuqs'
import { SortableColumnHeader } from '@/components/ui/sortable-column-header'
import { SORT_LABELS } from '@/constants/sort-labels'
import { Deputy } from '../types'
import { PencilLine } from 'lucide-react'
import { useEditDeputyDrawer } from '../stores/edit-deputy-drawer-store'
import { EditDeputyDrawer } from './edit-deputy-drawer'
import { ImagePlaceholder } from '@/components/ui/image-placeholder'
import Image from 'next/image'

interface DeputiesTableProps {
  deputies: Deputy[]
}

function PartyColumn({ party }: { party: Deputy['partido'] }) {
  if (!party) return 'Não informado'
  return (
    <div className="flex items-center space-x-2">
      {party.foto ? (
        <Image
          className="size-8 rounded"
          src={party.foto}
          alt={party.nome}
          width={96}
          height={96}
          quality={100}
        />
      ) : (
        <ImagePlaceholder className="size-8" iconClassName="size-4" />
      )}
      <div className="flex flex-col items-start text-xs">
        <span className="font-semibold">{party.sigla}</span>
        <span>{party.nome}</span>
      </div>
    </div>
  )
}

export function DeputiesTable({ deputies }: DeputiesTableProps) {
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsString.withOptions({
      shallow: false
    })
  )
  const { openEditDrawer } = useEditDeputyDrawer()

  function handleEditDeputy(deputy: Deputy, e: React.MouseEvent) {
    e.stopPropagation()
    openEditDrawer(deputy)
  }

  return (
    <>
      <Table verticalSpacing="xs">
        <TableThead>
          <TableTr>
            <TableTh className="w-[52px]"></TableTh>
            <SortableColumnHeader
              column="nome"
              title="Nome"
              sortKey={sort}
              onSort={setSort}
              ascendingLabel={SORT_LABELS.ALPHABETICAL.ASC}
              descendingLabel={SORT_LABELS.ALPHABETICAL.DESC}
            />
            <SortableColumnHeader
              column="ultimo_mandato"
              title="Último mandato"
              sortKey={sort}
              onSort={setSort}
              ascendingLabel={SORT_LABELS.ALPHABETICAL.ASC}
              descendingLabel={SORT_LABELS.ALPHABETICAL.DESC}
            />
            <TableTh>Partido</TableTh>
            <TableTh style={{ width: 40 }} />
          </TableTr>
        </TableThead>
        <TableTbody>
          {deputies.map((deputy) => (
            <TableTr key={deputy.id}>
              <TableTd>
                <Avatar src={deputy.foto} size="md" />
              </TableTd>
              <TableTd>{deputy.nome}</TableTd>
              <TableTd>
                {deputy.ultimo_mandato ? (
                  <div className="flex items-center space-x-2">
                    <span>
                      {deputy.ultimo_mandato?.data_inicio.split('-')[0]} -{' '}
                      {deputy.ultimo_mandato?.data_fim.split('-')[0]}
                    </span>
                    {deputy.mandato_atual && (
                      <Badge color="teal" variant="light" size="sm" radius="sm">
                        Atual
                      </Badge>
                    )}
                  </div>
                ) : (
                  'Não informado'
                )}
              </TableTd>
              <TableTd>
                {deputy.partido ? (
                  <PartyColumn party={deputy.partido} />
                ) : (
                  'Não informado'
                )}
              </TableTd>
              <TableTd>
                <ActionIcon
                  variant="default"
                  size="md"
                  onClick={(e) => handleEditDeputy(deputy, e)}
                >
                  <PencilLine className="size-4" />
                </ActionIcon>
              </TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </Table>
      <EditDeputyDrawer />
    </>
  )
}
