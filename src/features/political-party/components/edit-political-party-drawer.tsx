'use client'

import { FormDrawer } from '@/components/ui/form-drawer'
import { useEditPoliticalPartyDrawer } from '../stores/edit-political-party-drawer-store'
import { EditPoliticalPartyForm } from './edit-political-party-form'
import { useState } from 'react'
import { Button } from '@mantine/core'

export function EditPoliticalPartyDrawer() {
  const { isOpen, closeEditDrawer, partyToEdit } = useEditPoliticalPartyDrawer()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formId = 'edit-political-party-form'

  return (
    <FormDrawer.Root opened={isOpen} onClose={closeEditDrawer} size="sm">
      {partyToEdit && (
        <>
          <FormDrawer.Header>Editar Partido</FormDrawer.Header>
          <FormDrawer.Content>
            <EditPoliticalPartyForm
              id={formId}
              politicalParty={partyToEdit}
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
