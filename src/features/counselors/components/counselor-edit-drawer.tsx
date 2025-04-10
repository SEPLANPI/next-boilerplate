'use client'

import { FormDrawer } from '@/components/ui/form-drawer'
import { Person } from '@/features/general-registration/types'
import { Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { EditCounselorForm } from './edit-counselor-form'
interface Props {
  opened: boolean
  onClose: () => void
  person: Person | null
}

export default function EditCounselorDrawer({ person }: Props) {
  const [opened, { open, close }] = useDisclosure(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formId = 'edit-counselor-form'

  return (
    <>
      <Button
        size="compact-md"
        className="text-sm"
        leftSection={<Pencil className="size-4" />}
        onClick={open}
        variant="ghost"
      >
        Editar Conselheiro
      </Button>
      <FormDrawer.Root opened={opened} onClose={close}>
        <FormDrawer.Header>Editar Conselheiro</FormDrawer.Header>
        <FormDrawer.Content>
          <EditCounselorForm
            person={person}
            id={formId}
            onComplete={(success) => {
              setIsSubmitting(false)
              if (success) {
                close()
              }
            }}
          />
        </FormDrawer.Content>
        <FormDrawer.Footer>
          <div className="flex justify-end space-x-2">
            <Button variant="light" onClick={close} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" form={formId} loading={isSubmitting}>
              Cadastrar
            </Button>
          </div>
        </FormDrawer.Footer>
      </FormDrawer.Root>
    </>
  )
}
