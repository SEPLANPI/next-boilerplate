'use client'

import {
  Table,
  TableTr,
  TableTh,
  TableTd,
  TableThead,
  TableTbody,
  ActionIcon
} from '@mantine/core'
import { PencilLine } from 'lucide-react'
import { PoliticalParty } from '../types'
import { useEditPoliticalPartyDrawer } from '../stores/edit-political-party-drawer-store'
import { CreatePoliticalPartyDrawer } from './create-political-party-drawer'
import { EditPoliticalPartyDrawer } from './edit-political-party-drawer'
import { SortableColumnHeader } from '@/components/ui/sortable-column-header'
import { SORT_LABELS } from '@/constants/sort-labels'
import { useQueryState, parseAsString } from 'nuqs'
import { ImagePlaceholder } from '@/components/ui/image-placeholder'
import Image from 'next/image'

interface PoliticalPartiesTableProps {
  parties: PoliticalParty[]
}

export function PoliticalPartiesTable({ parties }: PoliticalPartiesTableProps) {
  const { openEditDrawer } = useEditPoliticalPartyDrawer()
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsString.withOptions({
      shallow: false
    })
  )

  function handleEditParty(party: PoliticalParty, e: React.MouseEvent) {
    e.stopPropagation()
    openEditDrawer(party)
  }

  return (
    <>
      <Table verticalSpacing="xs">
        <TableThead>
          <TableTr>
            <TableTh className="w-[52px]"></TableTh>
            <SortableColumnHeader
              column="sigla"
              title="Sigla"
              sortKey={sort}
              onSort={setSort}
              ascendingLabel={SORT_LABELS.ALPHABETICAL.ASC}
              descendingLabel={SORT_LABELS.ALPHABETICAL.DESC}
              className="w-24"
            />
            <SortableColumnHeader
              column="nome"
              title="Nome"
              sortKey={sort}
              onSort={setSort}
              ascendingLabel={SORT_LABELS.ALPHABETICAL.ASC}
              descendingLabel={SORT_LABELS.ALPHABETICAL.DESC}
            />
            <TableTh style={{ width: 40 }} />
          </TableTr>
        </TableThead>
        <TableTbody>
          {parties.map((party) => (
            <TableTr key={party.id} className="cursor-pointer">
              <TableTd>
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
              </TableTd>
              <TableTd className="font-semibold">{party.sigla}</TableTd>
              <TableTd>{party.nome}</TableTd>
              <TableTd>
                <ActionIcon
                  variant="default"
                  size="md"
                  onClick={(e) => handleEditParty(party, e)}
                >
                  <PencilLine className="size-4" />
                </ActionIcon>
              </TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </Table>
      <CreatePoliticalPartyDrawer />
      <EditPoliticalPartyDrawer />
    </>
  )
}
