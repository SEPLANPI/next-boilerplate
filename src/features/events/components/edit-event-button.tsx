'use client'

import { Button } from '@mantine/core'
import { Event } from '../types'
import { Pencil } from 'lucide-react'
import { useEventEditDrawer } from '../stores/edit-event-drawer-store'

type EditEventButtonProps = {
  event: Pick<
    Event,
    | 'id'
    | 'nome'
    | 'editado'
    | 'data'
    | 'local'
    | 'municipio_id'
    | 'descricao'
    | 'objetivo'
  >
}

export function EditEventButton({ event }: EditEventButtonProps) {
  const { openEditDrawer } = useEventEditDrawer()
  return (
    <Button
      variant="default"
      leftSection={<Pencil className="size-4" />}
      onClick={() => openEditDrawer(event)}
    >
      Editar
    </Button>
  )
}
