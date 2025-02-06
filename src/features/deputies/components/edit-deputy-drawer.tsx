'use client'

import { FormDrawer } from '@/components/ui/form-drawer'
import { useEditDeputyDrawer } from '../stores/edit-deputy-drawer-store'
import { EditDeputyForm } from './edit-deputy-form'
import { useState } from 'react'
import { Button } from '@mantine/core'

export function EditDeputyDrawer() {
  const { isOpen, closeEditDrawer, deputyToEdit } = useEditDeputyDrawer()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formId = 'edit-deputy-form'

  return (
    <FormDrawer.Root opened={isOpen} onClose={closeEditDrawer} size="sm">
      {deputyToEdit && (
        <>
          <FormDrawer.Header>Editar Deputado</FormDrawer.Header>
          <FormDrawer.Content>
            <EditDeputyForm
              id={formId}
              deputy={deputyToEdit}
              onSubmit={() => setIsSubmitting(true)}
              onComplete={(success) => {
                setIsSubmitting(false)
                if (success) closeEditDrawer()
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
