import { Text } from '@mantine/core'
import dayjs from 'dayjs'
import { Proposal } from '../types'
import ProposalEditDrawer from './proposal-edit-drawer'
import ProposalTimeline from './proposal-timeline'

export default function ProposalDetails({ proposta }: { proposta: Proposal }) {
  return (
    <div className="grid grid-cols-12 gap-10">
      <div className="col-span-9">
        <div className="mb-8 flex justify-between">
          <div>
            <Text variant="h1" fw={800} size="xl">
              {proposta.titulo}
            </Text>
            <Text variant="h2" size="xs" className="text-gray-400">
              Criado em{' '}
              {dayjs(proposta.criado_em).format(`DD/MM/YYYY [às] HH:mm`)} por{' '}
              {proposta.autor?.nome || '?'}
            </Text>
          </div>
          <ProposalEditDrawer proposal={proposta} />
        </div>
        <Text
          size="md"
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
