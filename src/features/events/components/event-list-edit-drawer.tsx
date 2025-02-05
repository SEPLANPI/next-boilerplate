'use client'
import React, { useState } from 'react'
import { Button } from '@mantine/core'
import { EventForm } from './event-form'
import { useEventEditDrawer } from '../stores/edit-event-drawer-store'
import { useRouter } from 'next/navigation'
import { FormDrawer } from '@/components/ui/form-drawer'

export function EventListEditDrawer() {
  const router = useRouter()
  const { isOpen, eventToEdit, closeEditDrawer } = useEventEditDrawer()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formId = 'edit-event-form'

  return (
    <FormDrawer.Root opened={isOpen} onClose={closeEditDrawer}>
      {eventToEdit && (
        <>
          <FormDrawer.Header>Editar Evento</FormDrawer.Header>
          <FormDrawer.Content>
            <EventForm
              event={eventToEdit}
              id={formId}
              mode="edit"
              onSubmit={() => setIsSubmitting(true)}
              onComplete={(success, action) => {
                setIsSubmitting(false)
                if (success) {
                  if (action === 'view' && eventToEdit?.id) {
                    router.push(`/${eventToEdit.id}`)
                  }
                  closeEditDrawer()
                }
              }}
            />
          </FormDrawer.Content>
          <FormDrawer.Footer>
            <div className="flex justify-end space-x-2">
              <Button
                variant="default"
                onClick={closeEditDrawer}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                form={formId}
                type="submit"
                loading={isSubmitting}
                variant="light"
                data-action="view"
              >
                Salvar e visualizar
              </Button>
              <Button
                form={formId}
                type="submit"
                loading={isSubmitting}
                data-action="continue"
              >
                Salvar
              </Button>
            </div>
          </FormDrawer.Footer>
        </>
      )}
    </FormDrawer.Root>
  )
}
