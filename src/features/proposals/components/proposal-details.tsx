import { Text } from '@mantine/core'
import { Proposal } from '../types'
import ProposalEditDrawer from './proposal-edit-drawer'
import ProposalTimeline from './proposal-timeline'

export default function ProposalDetails({ proposta }: { proposta: Proposal }) {
  return (
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-9">
        <div className="flex justify-between">
          <Text variant="h1" fw={800} size="xl">
            {proposta.titulo}
          </Text>
          <ProposalEditDrawer proposal={proposta} />
        </div>
        <Text
          size="md"
          mt={8}
          className="block w-full whitespace-break-spaces font-sans text-gray-500"
          component="pre"
        >
          {proposta.conteudo}
        </Text>
      </div>
      <div className="col-span-3">
        <ProposalTimeline proposta={proposta} />
      </div>
    </div>
  )
}
