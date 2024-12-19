'use client'
import React, { useState } from 'react'
import { Drawer, Button } from '@mantine/core'
import { EventForm } from './event-form'
import { useEventEditDrawer } from '../stores/edit-event-drawer-store'
import { useRouter } from 'next/navigation'

export function EventDetailEditDrawer() {
  const router = useRouter()
  const { isOpen, eventToEdit, closeEditDrawer } = useEventEditDrawer()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formId = 'edit-event-form'

  const handleSubmit = () => {
    setIsSubmitting(true)
  }

  const handleComplete = (success?: boolean, action?: 'view' | 'continue') => {
    setIsSubmitting(false)

    if (success) {
      if (action === 'view' && eventToEdit?.id) {
        router.push(`/${eventToEdit.id}`)
      }
      closeEditDrawer()
    }
  }

  return (
    <Drawer.Root
      opened={isOpen}
      onClose={closeEditDrawer}
      position="right"
      size="lg"
    >
      <Drawer.Overlay />
      <Drawer.Content>
        <div className="flex h-full flex-col">
          <Drawer.Header className="border-b px-5 py-4">
            <Drawer.Title className="text-lg font-semibold">
              Editar Evento
            </Drawer.Title>
            <Drawer.CloseButton disabled={isSubmitting} />
          </Drawer.Header>
          <Drawer.Body className="flex flex-1 flex-col p-5">
            <EventForm
              event={eventToEdit}
              id={formId}
              onSubmit={handleSubmit}
              onComplete={handleComplete}
            />
          </Drawer.Body>
          <footer className="sticky bottom-0 border-t bg-white p-5">
            <div className="flex justify-end space-x-2">
              <Button
                variant="default"
                onClick={closeEditDrawer}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button form={formId} type="submit" loading={isSubmitting}>
                Salvar
              </Button>
            </div>
          </footer>
        </div>
      </Drawer.Content>
    </Drawer.Root>
  )
}
