import { Text } from '@mantine/core'
import { Proposal } from '../types'
import ProposalEditDrawer from './proposal-edit-drawer'

export default function ProposalDetails({ proposta }: { proposta: Proposal }) {
  return (
    <>
      <div className="flex justify-between">
        <Text variant="h1" fw={800} size="xl">
          {proposta.titulo}
        </Text>
        <ProposalEditDrawer proposal={proposta} />
      </div>
      <div>
        <Text variant="h2" size="md" mt={8} className="text-gray-500">
          {proposta.conteudo}
        </Text>
      </div>
    </>
  )
}
