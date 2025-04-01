'use client'
import { Text, Timeline, TimelineItem } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import dayjs from 'dayjs'
import { CircleDotDashed } from 'lucide-react'
import { useState } from 'react'
import { Log, Proposal } from '../types'
import ProposalDetailsModal from './proposal-details-modal'

export default function ProposalTimeline({ proposta }: { proposta: Proposal }) {
  const logItems: Log[] = proposta.historicos
  const [item, setItem] = useState<Log>()
  const [opened, { open, close }] = useDisclosure(false)
  const onItemClick = (item: Log) => {
    if (item.dados_antigos) {
      setItem(item)
      open()
    }
  }

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
        {logItems.map((item, index) => (
          <TimelineItem
            bullet={<CircleDotDashed size="44" color="gray" />}
            title={
              index === logItems.length - 1
                ? item.alterado_por + ' criou a proposta.'
                : item.alterado_por + ' alterou a proposta.'
            }
            styles={{
              itemTitle: { fontWeight: 700 }
            }}
            className="cursor-pointer"
            key={index}
            onClick={() => onItemClick(item)}
          >
            <div className="flex max-w-full overflow-auto">
              <Text className="text-gray-400" truncate fw={400}>
                {item.dados_antigos?.conteudo || 'Sem conteúdo'}
              </Text>
            </div>
            <Text className="text-gray-400" size="xs">
              {dayjs(item.criado_em).format('DD/MM/YYYY - HH:mm')}
            </Text>
          </TimelineItem>
        ))}
      </Timeline>
      {item?.dados_antigos && (
        <ProposalDetailsModal opened={opened} onClose={close} log={item} />
      )}
    </>
  )
}
