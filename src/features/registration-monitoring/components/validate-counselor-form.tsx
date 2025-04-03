'use client'

import { API } from '@/constants/messages'
import { buildErrorMessage } from '@/utils/format-django-errors'
import { Alert, Button, Radio, Textarea } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'
import { z } from 'zod'
import { validateCounselor } from '../actions/validate-counselor'
import { ValidationRadioCard } from './validation-radio-card'

const validationSchema = z
  .object({
    status: z.enum(['APROVADO', 'REJEITADO']).optional(),
    motivo: z.string()
  })
  .refine(
    (data) => {
      if (data.status === 'REJEITADO' && !data.motivo) {
        return false
      }
      return true
    },
    {
      message: 'Motivo é obrigatório para rejeição',
      path: ['motivo']
    }
  )

interface ValidateCounselorFormProps {
  id: string
  counselorId: string
  onComplete?: (success: boolean) => void
}

export function ValidateCounselorForm({
  id,
  counselorId,
  onComplete
}: ValidateCounselorFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    validate: zodResolver(validationSchema),
    initialValues: {
      status: undefined,
      motivo: ''
    }
  })

  async function handleSubmit(values: typeof form.values) {
    try {
      setIsSubmitting(true)
      const { error } = await validateCounselor({
        counselorId,
        status: values.status!,
        motivo_rejeicao: values.motivo
      })

      if (error) {
        setIsSubmitting(false)
        setError(buildErrorMessage(error))
        onComplete?.(false)
        return
      }

      setIsSubmitting(false)
      notifications.show({
        message: `Cadastro ${values.status === 'APROVADO' ? 'aprovado' : 'rejeitado'} com sucesso`,
        color: 'green'
      })
      onComplete?.(true)
    } catch (error) {
      setError(API.UNEXPECTED_FETCH_ERROR)
      onComplete?.(false)
    }
  }

  return (
    <>
      {error && <Alert color="red" title={error} className="mb-4" />}
      <form id={id} onSubmit={form.onSubmit(handleSubmit)} className='flex flex-col gap-4'>
        <Radio.Group {...form.getInputProps('status')}>
          <div className="flex gap-4">
            <ValidationRadioCard
              value="APROVADO"
              label="Aprovar"
              variant="approve"
            />
            <ValidationRadioCard
              value="REJEITADO"
              label="Rejeitar"
              variant="reject"
            />
          </div>
        </Radio.Group>

        {form.values.status === 'REJEITADO' && (
          <Textarea
            label="Motivo da rejeição"
            placeholder="Descreva o motivo da rejeição"
            {...form.getInputProps('motivo')}
          />
        )}

        <div className="flex justify-end gap-2">
          <Button variant="default" onClick={() => onComplete?.(false)}>
            Cancelar
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={!form.values.status}
          >
            Confirmar
          </Button>
        </div>
      </form>
    </>
  )
}
