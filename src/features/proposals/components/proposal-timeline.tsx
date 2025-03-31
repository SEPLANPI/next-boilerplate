import { Text, Timeline, TimelineItem } from '@mantine/core'
import { CircleDotDashed } from 'lucide-react'

interface TimelineItemProps {
  title: string
  date: string
  description: string
}

export default function ProposalTimeline() {
  const items: TimelineItemProps[] = [
    {
      title: 'Proposta criada',
      date: '02/08/2021 às 12:36',
      description: 'Proposta criada por João Silva'
    },
    {
      title: 'Proposta enviada',
      date: '02/08/2021 às 12:59',
      description: 'Proposta enviada para revisão por Maria Souza'
    },
    {
      title: 'Proposta aprovada',
      date: '02/08/2021 às 14:42',
      description: 'Proposta aprovada por Maria Souza'
    }
  ]

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
        {items.map((item, index) => (
          <TimelineItem
            bullet={<CircleDotDashed size="44" color="gray" />}
            title={item.title}
            styles={{
              itemTitle: { fontWeight: 700 }
            }}
            className="cursor-pointer"
            key={index}
          >
            <Text className="text-gray-400" fw={400}>
              {item.description}
            </Text>
            <Text className="text-gray-400" size="xs">
              {item.date}
            </Text>
          </TimelineItem>
        ))}
      </Timeline>
    </>
  )
}
