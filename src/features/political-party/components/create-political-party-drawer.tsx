'use client'

import { FormDrawer } from '@/components/ui/form-drawer'
import { useCreatePoliticalPartyDrawer } from '../stores/create-political-party-drawer-store'
import { CreatePoliticalPartyForm } from './create-political-party-form'
import { useState } from 'react'
import { Button } from '@mantine/core'

export function CreatePoliticalPartyDrawer() {
  const { isOpen, closeCreateDrawer } = useCreatePoliticalPartyDrawer()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formId = 'create-political-party-form'

  return (
    <FormDrawer.Root opened={isOpen} onClose={closeCreateDrawer} size="sm">
      <>
        <FormDrawer.Header>Criar Partido</FormDrawer.Header>
        <FormDrawer.Content>
          <CreatePoliticalPartyForm
            id={formId}
            onSubmit={() => setIsSubmitting(true)}
            onComplete={(success) => {
              setIsSubmitting(false)
              if (success) closeCreateDrawer()
            }}
          />
        </FormDrawer.Content>
        <FormDrawer.Footer>
          <div className="flex justify-end space-x-2">
            <Button
              variant="default"
              onClick={closeCreateDrawer}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" form={formId} loading={isSubmitting}>
              Criar
            </Button>
          </div>
        </FormDrawer.Footer>
      </>
    </FormDrawer.Root>
  )
}
