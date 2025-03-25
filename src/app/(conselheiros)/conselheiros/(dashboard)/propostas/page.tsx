import { SearchInput } from '@/components/ui/search-input'
import ProposalsList from '@/features/counselors/components/proposals/proposals-list'
import ProposalsModal from '@/features/counselors/components/proposals/proposals-modal'
import { Card } from '@mantine/core'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Propostas'
}

export interface Propostas {
  titulo: string
  descricao: string
  status: string
}

export default function Propostas() {
  const propostas: Propostas[] = [
    {
      titulo: 'Proposta 1',
      descricao: 'Descrição da proposta 1',
      status: 'Reprovada'
    },
    {
      titulo: 'Proposta 2',
      descricao: 'Descrição da proposta 2',
      status: 'Aprovada'
    },
    {
      titulo: 'Proposta 3',
      descricao: 'Descrição da proposta 3',
      status: 'Pendente'
    }
  ]

  return (
    <div className="flex h-screen flex-col -mb-[32px]">
      <Card
        shadow="xs"
        padding="md"
        withBorder
        className="border-1 flex-grow rounded-t-xl bg-white p-6"
      >
        <div className="flex gap-4">
          <SearchInput className="max-w-full flex-1" />
          <ProposalsModal />
        </div>

        <ProposalsList propostas={propostas} />
      </Card>
    </div>
  )
}
