'use client'

import { ActionIcon, Button, Tooltip } from '@mantine/core'
import {
  DataListItem,
  DataListLabel,
  DataListRoot,
  DataListValue
} from '@/components/ui/data-list'
import { EventDetail } from '../types'
import { ArrowRight } from 'lucide-react'
import { dayjs } from '@/lib/dayjs'
import { formatDate } from '@/utils/format-date'

type CopyableValue = string | Date | null

interface EventDetailsProps {
  event: EventDetail | null
  onCopyField: (
    field: keyof EventDetail,
    value: NonNullable<CopyableValue>
  ) => void
  onCopyAll: () => void
}

interface FieldValue<T = any> {
  display: string
  value: T
  field: keyof EventDetail
}

interface ValueWithCopyProps {
  field: FieldValue
  onCopy: (field: keyof EventDetail, value: any) => void
}

export function MergeEventDetails({
  event,
  onCopyField,
  onCopyAll
}: EventDetailsProps) {
  if (!event) return null

  function ValueWithCopyButton({ field, onCopy }: ValueWithCopyProps) {
    return (
      <DataListValue className="flex items-start justify-between gap-2">
        <span>{field.display || '-'}</span>
        {field.value && (
          <Tooltip label="Usar este valor" position="left">
            <ActionIcon
              onClick={() => onCopy(field.field, field.value)}
              size="sm"
              variant="light"
            >
              <ArrowRight size={16} />
            </ActionIcon>
          </Tooltip>
        )}
      </DataListValue>
    )
  }

  const fields: FieldValue[] = [
    {
      display: event.nome || '-',
      value: event.nome,
      field: 'nome'
    },
    {
      display: event.descricao || '-',
      value: event.descricao,
      field: 'descricao'
    },
    {
      display: event.data ? formatDate(event.data) : '-',
      value: event.data ? dayjs(event.data, 'DD-MM-YYYY').toDate() : null,
      field: 'data'
    },
    {
      display: event.categoria_nome || '-',
      value: event.categoria_nome,
      field: 'categoria'
    },
    {
      display: event.municipio || '-',
      value: event.municipio_id?.toString(),
      field: 'municipio'
    },
    {
      display: event.local || '-',
      value: event.local,
      field: 'local'
    }
  ]

  return (
    <div className="space-y-6">
      <Button onClick={onCopyAll} variant="light">
        Preencher formulário com este evento
      </Button>
      <DataListRoot>
        {fields.map((field) => (
          <DataListItem key={field.field}>
            <DataListLabel>
              {field.field.charAt(0).toUpperCase() + field.field.slice(1)}
            </DataListLabel>
            <ValueWithCopyButton field={field} onCopy={onCopyField} />
          </DataListItem>
        ))}
        <DataListItem>
          <DataListLabel>Objetivo</DataListLabel>
          <DataListValue>{event.objetivo || '-'}</DataListValue>
        </DataListItem>
      </DataListRoot>
    </div>
  )
}
