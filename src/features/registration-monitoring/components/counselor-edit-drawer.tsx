'use client'

import { FormDrawer } from '@/components/ui/form-drawer'
import { CounselorInfo } from '@/features/counselors/types'
import { Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { EditCounselorForm } from './edit-counselor-form'
interface Props {
  opened?: boolean
  counselor: CounselorInfo | undefined
  onClose?: () => void
}

export default function EditCounselorDrawer({ counselor }: Props) {
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
            counselor={counselor}
            id={formId}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
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
              Salvar
            </Button>
          </div>
        </FormDrawer.Footer>
      </FormDrawer.Root>
    </>
  )
}
