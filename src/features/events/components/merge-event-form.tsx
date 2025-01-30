'use client'

import { useRef, useState, useMemo } from 'react'
import { EventForm } from './event-form'
import { MergeEventList } from './merge-event-list'
import { MergeEventDetails } from './merge-event-details'
import { dayjs } from '@/lib/dayjs'
import { EventDetail } from '../types'

interface MergeEventFormProps {
  events: EventDetail[]
}

type FormRef = {
  setFieldValue: (field: string, value: any) => void
  setValues: (values: any) => void
} | null

export function MergeEventForm({ events }: MergeEventFormProps) {
  const formRef = useRef<FormRef>(null)
  const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(
    events.length > 0 ? events[0] : null
  )

  const allContracts = useMemo(() => {
    const contractMap = new Map()
    events.forEach(event => {
      event.contratos.forEach(contract => {
        contractMap.set(contract.id, contract)
      })
    })
    return Array.from(contractMap.values())
  }, [events])

  const baseEvent = useMemo(() => {
    if (!events.length) return null
    return {
      ...events[0],
      contratos: allContracts
    }
  }, [events, allContracts])

  const handleCopyField = (field: string, value: any) => {
    if (formRef.current && selectedEvent) {
      formRef.current.setFieldValue(field, value)
    }
  }

  const handleCopyAll = () => {
    if (formRef.current && selectedEvent) {
      formRef.current.setValues({
        editado: selectedEvent.editado,
        nome: selectedEvent.nome,
        descricao: selectedEvent.descricao,
        data: selectedEvent.data
          ? dayjs(selectedEvent.data, 'DD-MM-YYYY').toDate()
          : null,
        local: selectedEvent.local,
        municipio: selectedEvent.municipio_id?.toString(),
        categoria: selectedEvent.categoria,
        contratos: allContracts.map((c) => ({
          id: c.id,
          naturezas_gasto: c.naturezas_gasto.map((n) => n.id.toString())
        }))
      })
    }
  }

  return (
    <div className="grid grid-cols-[350px_1fr_1fr] divide-x">
      <div className="bg-gray-50 p-5">
        <MergeEventList
          events={events}
          selected={selectedEvent}
          onSelect={setSelectedEvent}
        />
      </div>
      <div className="p-5">
        <MergeEventDetails
          event={selectedEvent}
          onCopyField={handleCopyField}
          onCopyAll={handleCopyAll}
        />
      </div>
      <div className="p-5">
        <EventForm event={baseEvent} id="merge-form" ref={formRef} />
      </div>
    </div>
  )
}
