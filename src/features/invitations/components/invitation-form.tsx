'use client'

import { API } from '@/constants/messages'
import { Alert, TextInput, Modal, Button, ActionIcon } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { Check, Copy, Link } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { createInviteLink } from '../actions/create-invite-link'
import { notifications } from '@mantine/notifications'
import { useClipboard } from '@/hooks/use-clipboard'
import { buildErrorMessage } from '@/utils/format-django-errors'

const invitationSchmema = z.object({
  identificador: z.string().min(1, 'O texto é obrigatório')
})

type InvitationFormValues = z.infer<typeof invitationSchmema>

export function InvitationForm() {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [token, setToken] = useState('')
  const { copied, copy } = useClipboard()
  const [opened, { open, close: baseClose }] = useDisclosure(false)

  const form = useForm<InvitationFormValues>({
    validate: zodResolver(invitationSchmema),
    initialValues: {
      identificador: ''
    }
  })

  function close() {
    form.reset()
    setError(null)
    setToken('')
    baseClose()
  }

  async function onSubmit(values: InvitationFormValues) {
    try {
      setIsSubmitting(true)
      const { data, error } = await createInviteLink(values)

      if (error) {
        setIsSubmitting(false)
        setError(buildErrorMessage(error))
        return
      }
      setIsSubmitting(false)
      notifications.show({
        message: 'Convite gerado com sucesso',
        color: 'green'
      })
      setError('')
      setToken(data?.token || '')
    } catch (error) {
      setError(API.UNEXPECTED_FETCH_ERROR)
    }
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Gerar link de Cadastro"
        centered
        classNames={{
          title: 'text-secondary-foreground font-semibold'
        }}
      >
        {error && <Alert color="red" title={error} className="mb-4" />}
        <form
          onSubmit={form.onSubmit(onSubmit)}
          className="flex items-start space-x-4"
        >
          <TextInput
            placeholder="Ex: Convite para João da Silva - SECULT"
            withAsterisk
            className="flex-1"
            {...form.getInputProps('identificador')}
          />
          <Button type="submit" loading={isSubmitting}>
            Gerar Link
          </Button>
        </form>

        {token && (
          <div className="mt-4 flex items-start space-x-2">
            <TextInput
              readOnly
              disabled
              value={`${process.env.NEXT_PUBLIC_APP_URL}/conselheiros/cadastro/${token}`}
              className="flex-1"
            />
            <ActionIcon
              color={copied ? 'teal' : 'blue'}
              onClick={() =>
                copy(
                  `${process.env.NEXT_PUBLIC_APP_URL}/conselheiros/cadastro/${token}`
                )
              }
              variant="default"
              size="lg"
            >
              {copied ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
            </ActionIcon>
          </div>
        )}
      </Modal>
      <Button
        className="rounded-full"
        onClick={open}
        leftSection={<Link className="size-4" />}
      >
        Criar link de convite
      </Button>
    </>
  )
}
