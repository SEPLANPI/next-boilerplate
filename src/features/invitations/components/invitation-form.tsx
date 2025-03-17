'use client'

import { Alert, TextInput, Modal, Button } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { UserPlus } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'

const invitationSchmema = z.object({
  identificador: z.string().min(1, 'O texto é obrigatório')
})

type InvitationFormValues = z.infer<typeof invitationSchmema>

export function InvitationForm() {
  const [error, setError] = useState<string | null>(null)
  const [opened, { open, close }] = useDisclosure(false)
  const form = useForm<InvitationFormValues>({
    validate: zodResolver(invitationSchmema),
    initialValues: {
      identificador: ''
    }
  })

  function onSubmit(values: InvitationFormValues) {
    console.log(values)
    close()
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Convide um conselheiro a..."
        centered
      >
        <form
          onSubmit={form.onSubmit(onSubmit)}
          className="flex items-start space-x-4"
        >
          {error && <Alert color="red" title={error} className="mb-4" />}
          <TextInput
            placeholder="Ex: Convite para João da Silva - SECULT"
            withAsterisk
            className="flex-1"
            {...form.getInputProps('identificador')}
          />
          <Button type="submit">Gerar Link</Button>
        </form>
      </Modal>

      <Button
        leftSection={<UserPlus className="size-4" />}
        size="compact-sm"
        variant="subtle"
        onClick={open}
      >
        Gerar Convite
      </Button>
    </>
  )
}
