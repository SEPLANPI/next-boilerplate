'use client'

import { Button } from '@mantine/core'
import { FormDrawer } from '@/components/ui/form-drawer'
import { EventForm } from './event-form'
import { useEventEditDrawer } from '../stores/edit-event-drawer-store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function EventDetailEditDrawer() {
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
              mode="edit"
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
              <Button type="submit" form={formId} loading={isSubmitting}>
                Salvar
              </Button>
            </div>
          </FormDrawer.Footer>
        </>
      )}
    </FormDrawer.Root>
  )
}
