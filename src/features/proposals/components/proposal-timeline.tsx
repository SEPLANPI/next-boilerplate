import { Text, Timeline, TimelineItem } from '@mantine/core'
import { CircleDotDashed } from 'lucide-react'
import { History, Proposal } from '../types'


export default function ProposalTimeline({ proposta }: { proposta: Proposal }) {
  const historyItems: History[] = proposta.historicos

  return (
    <>
      <Timeline
        bulletSize="32px"
        styles={{
          itemBullet: {
            borderWidth: '5px',
            borderColor: '#f3f4f6',
            backgroundColor: '#f3f4f6'
          },
          itemTitle: { paddingTop: '5px', marginBottom: '0px' }
        }}
        lineWidth="1px"
        color="gray-50"
      >
        {historyItems.map((item, index) => (
          <TimelineItem
            bullet={<CircleDotDashed size="44" color="gray" />}
            title={item.alterado_por}
            styles={{
              itemTitle: { fontWeight: 700 }
            }}
            className="cursor-pointer"
            key={index}
          >
            <Text className="text-gray-400" fw={400}>
              {item.dados_antigos.conteudo}
            </Text>
            <Text className="text-gray-400" size="xs">
              {item.criado_em}
            </Text>
          </TimelineItem>
        ))}
      </Timeline>
    </>
  )
}
