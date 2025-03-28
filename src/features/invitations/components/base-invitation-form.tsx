'use client'

import { Alert, TextInput, Button, ActionIcon } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { Check, Copy } from 'lucide-react'
import { z } from 'zod'
import { useClipboard } from '@/hooks/use-clipboard'

const invitationSchema = z.object({
  identificador: z.string().min(1, 'O texto é obrigatório')
})

type InvitationFormValues = z.infer<typeof invitationSchema>

interface BaseInvitationFormProps {
  id: string
  initialValues?: Partial<InvitationFormValues>
  onSubmit: (values: InvitationFormValues) => void
  error?: string | null
  isSubmitting?: boolean
  token?: string
  submitLabel?: string
}

export function BaseInvitationForm({
  id,
  initialValues,
  onSubmit,
  error,
  isSubmitting,
  token,
  submitLabel = 'Gerar Link'
}: BaseInvitationFormProps) {
  const { copied, copy } = useClipboard()

  const form = useForm<InvitationFormValues>({
    validate: zodResolver(invitationSchema),
    initialValues: {
      identificador: initialValues?.identificador || ''
    }
  })

  return (
    <>
      {error && <Alert color="red" title={error} className="mb-4" />}
      <form
        id={id}
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
          {submitLabel}
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
    </>
  )
}
