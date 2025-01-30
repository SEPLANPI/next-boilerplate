'use client'

import { Button } from '@mantine/core'
import { Check, Pen } from 'lucide-react'
import { useEditModeStore } from '../stores/edit-mode-store'

export function EditModeToggle() {
  const { isEditMode, toggleEditMode } = useEditModeStore()
  const editIcon = <Pen className="size-4" />
  const doneIcon = <Check className="size-4" />

  return (
    <Button
      onClick={toggleEditMode}
      variant={isEditMode ? 'filled' : 'default'}
      leftSection={isEditMode ? doneIcon : editIcon}
    >
      {isEditMode ? 'Concluir' : 'Editar'}
    </Button>
  )
}
