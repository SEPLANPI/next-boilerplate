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
import { formatCurrency } from '@/lib/utils'
import { formatDate } from '@/utils/format-date'

interface EventDetailsProps {
  event: EventDetail | null
  onCopyField: (field: string, value: any) => void
  onCopyAll: () => void
}

interface ValueWithCopyProps {
  value: { display: string; value: any } | string | null
  field: string
}

export function MergeEventDetails({
  event,
  onCopyField,
  onCopyAll
}: EventDetailsProps) {
  if (!event) return null

  function ValueWithCopyButton({ value, field }: ValueWithCopyProps) {
    const display = typeof value === 'object' ? value?.display : value
    const copyValue = typeof value === 'object' ? value?.value : value

    return (
      <DataListValue className="flex items-start justify-between gap-2">
        <span>{display || '-'}</span>
        {copyValue && (
          <Tooltip label="Usar este valor" position="left">
            <ActionIcon
              onClick={() => onCopyField(field, copyValue)}
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

  return (
    <div className="space-y-6">
      <Button onClick={onCopyAll} variant="light">
        Preencher formulário com este evento
      </Button>
      <DataListRoot>
        <DataListItem>
          <DataListLabel>Nome</DataListLabel>
          <ValueWithCopyButton value={event.nome} field="nome" />
        </DataListItem>
        <DataListItem>
          <DataListLabel>Descrição</DataListLabel>
          <ValueWithCopyButton value={event.descricao} field="descricao" />
        </DataListItem>
        <DataListItem>
          <DataListLabel>Objetivo</DataListLabel>
          <DataListValue>{event.objetivo || '-'}</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>Data</DataListLabel>
          <ValueWithCopyButton
            value={
              event.data
                ? {
                    display: formatDate(event.data),
                    value: dayjs(event.data, 'DD-MM-YYYY').toDate()
                  }
                : null
            }
            field="data"
          />
        </DataListItem>
      
        <DataListItem>
          <DataListLabel>Município</DataListLabel>
          <ValueWithCopyButton
            value={
              event.municipio_id
                ? {
                    display: event.municipio,
                    value: event.municipio_id.toString()
                  }
                : null
            }
            field="municipio"
          />
        </DataListItem>
        <DataListItem>
          <DataListLabel>Endereço</DataListLabel>
          <ValueWithCopyButton value={event.local} field="local" />
        </DataListItem>
        <DataListItem>
          <DataListLabel>Categoria</DataListLabel>
          <ValueWithCopyButton value={event.categoria_nome} field="categoria" />
        </DataListItem>
      </DataListRoot>
    </div>
  )
}
