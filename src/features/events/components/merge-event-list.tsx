'use client'

import { EventDetail } from '../types'
import { formatDate } from '@/utils/format-date'

interface EventListProps {
  events: EventDetail[]
  selected: EventDetail | null
  onSelect: (event: EventDetail) => void
}

export function MergeEventList({ events, selected, onSelect }: EventListProps) {
  console.log(events)
  return (
    <div className="flex flex-col gap-2">
      {events.map((event) => (
        <div
          key={event.id}
          className={`cursor-pointer rounded border p-2 transition ${
            selected?.id === event.id ? 'bg-white shadow' : 'border-gray-50'
          }`}
          onClick={() => onSelect(event)}
        >
          <p className="text-sm font-medium">{event.nome}</p>
          <p className="text-xs text-muted-foreground">
            {event.data ? formatDate(event.data) : 'Sem Data'}
          </p>
          <p className="text-xs text-muted-foreground">
            {event.municipio || 'Sem Município'}
          </p>
        </div>
      ))}
    </div>
  )
}
