'use client'

import { Button } from '@mantine/core'
import { useCreatePoliticalPartyDrawer } from '../stores/create-political-party-drawer-store'
import { Plus } from 'lucide-react'

export function CreatePoliticalPartyButton() {
  const { openCreateDrawer } = useCreatePoliticalPartyDrawer()
  return (
    <Button
      leftSection={<Plus className="size-4" />}
      onClick={() => openCreateDrawer()}
    >
      Adicionar partido
    </Button>
  )
}
