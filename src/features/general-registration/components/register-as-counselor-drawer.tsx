'use client'

import { Button } from '@mantine/core'
import { FormDrawer } from '@/components/ui/form-drawer'
import { RegisterAsCounselorForm } from './register-as-counselor-form'
import { People } from '../types'
import { useState } from 'react'

interface Props {
  opened: boolean
  onClose: () => void
  person: People | null
}

export function RegisterAsCounselorDrawer({ opened, onClose, person }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formId = 'register-as-counselor-form'

  return (
    <FormDrawer.Root opened={opened} onClose={onClose}>
      <FormDrawer.Header>Cadastrar como Conselheiro</FormDrawer.Header>
      <FormDrawer.Content>
        <RegisterAsCounselorForm
          person={person}
          id={formId}
          onSubmit={() => setIsSubmitting(true)}
          onComplete={(success) => {
            setIsSubmitting(false)
            if (success) {
              onClose()
            }
          }}
        />
      </FormDrawer.Content>
      <FormDrawer.Footer>
        <div className="flex justify-end space-x-2">
          <Button variant="default" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" form={formId} loading={isSubmitting}>
            Cadastrar
          </Button>
        </div>
      </FormDrawer.Footer>
    </FormDrawer.Root>
  )
}
