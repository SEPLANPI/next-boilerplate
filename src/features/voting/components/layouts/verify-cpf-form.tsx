'use client'

import { Input, Button, Alert } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { IMaskInput } from 'react-imask'
import { z } from 'zod'
import { verifyCPF } from '../../actions/verify-cpf'
import { useState } from 'react'
import { buildErrorMessage } from '@/utils/format-django-errors'
import { CPF } from '@/utils/cpf'

const cpfSchema = z.object({
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve ter 11 dígitos')
    .refine((cpf) => CPF.isValid(cpf), {
      message: 'CPF inválido'
    })
})

type VerifyCPFFormValues = z.infer<typeof cpfSchema>

export function VerifyCPFForm() {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<VerifyCPFFormValues>({
    validate: zodResolver(cpfSchema),
    initialValues: {
      cpf: ''
    },
    transformValues: (values) => ({
      cpf: values.cpf.replace(/\D/g, '')
    })
  })

  async function handleSubmit(values: VerifyCPFFormValues) {
    setIsSubmitting(true)
    setError(null)

    const result = await verifyCPF(values)

    if (result?.error) {
      setError(buildErrorMessage(result.error))
      setIsSubmitting(false)
      return
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {error && <Alert color="red" title={error} className="w-full" />}
      <form onSubmit={form.onSubmit(handleSubmit)} className="w-full space-y-6">
        <Input.Wrapper label="CPF" withAsterisk error={form.errors.cpf}>
          <Input
            component={IMaskInput}
            mask="000.000.000-00"
            placeholder="000.000.000-00"
            {...form.getInputProps('cpf')}
          />
        </Input.Wrapper>
        <Button type="submit" loading={isSubmitting} fullWidth>
          Verificar CPF
        </Button>
      </form>
    </div>
  )
}
