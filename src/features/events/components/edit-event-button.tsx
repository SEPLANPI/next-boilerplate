'use client'

import { Button } from '@mantine/core'
import { Pencil } from 'lucide-react'
import { useEventEditDrawer } from '../stores/edit-event-drawer-store'
import { EditEvent } from '../types/edit-event'

type EditEventButtonProps = {
  event: EditEvent
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
