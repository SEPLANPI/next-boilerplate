'use client'

import { ActionIcon, Button, Transition } from '@mantine/core'
import { X } from 'lucide-react'
import Link from 'next/link'
import { useEditModeStore } from '../stores/edit-mode-store'

export function EditModeFloatingBar() {
  const { isEditMode, selectedEvents, deselectAll } = useEditModeStore()

  return (
    <Transition
      mounted={isEditMode}
      transition="slide-up"
      duration={250}
      timingFunction="ease"
    >
      {(styles) => (
        <div
          style={styles}
          className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2"
        >
          <div className="flex items-center gap-4 rounded-md border bg-white p-3 shadow-xl transition-all duration-200">
            <ActionIcon.Group>
              <ActionIcon.GroupSection
                variant="default"
                miw={80}
                className="text-sm font-medium text-secondary-foreground"
                size="lg"
              >
                {selectedEvents.length} selecionado
                {selectedEvents.length !== 1 && 's'}
              </ActionIcon.GroupSection>
              <ActionIcon
                size="lg"
                variant="default"
                onClick={deselectAll}
                title="Limpar seleção"
                disabled={selectedEvents.length === 0}
              >
                <X className="size-4" />
              </ActionIcon>
            </ActionIcon.Group>

            <Button
              component={Link}
              href={{
                pathname: '/mesclar-eventos',
                query: { ids: selectedEvents.map((e) => e.id).join(',') }
              }}
              disabled={selectedEvents.length < 2}
            >
              Mesclar eventos
            </Button>
          </div>
        </div>
      )}
    </Transition>
  )
}
