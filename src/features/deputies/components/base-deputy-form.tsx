'use client'

import { Alert, TextInput, FileInput, Select, MultiSelect } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useEffect, useMemo } from 'react'
import { z } from 'zod'
import { useQuery } from '@tanstack/react-query'
import { getPoliticalParties } from '@/features/deputies/api/client/get-political-parties'
import { CPF } from '@/utils/cpf'
import { getTermsOptions } from '../api/client/get-terms-options'

const deputySchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  partido: z.string(),
  foto: z.instanceof(File).nullable(),
  cpf: z
    .string()
    .length(11, 'CPF deve ter 11 dígitos')
    .refine(CPF.isValid, 'CPF inválido')
    .or(z.literal('')),
  vigencias: z.array(z.string().min(1))
})

type DeputyFormValues = z.infer<typeof deputySchema>

type DeputyInitialValues = {
  nome?: string
  partido?: string
  foto?: string
  cpf?: string
  vigencias: string[]
}

interface BaseDeputyFormProps {
  id: string
  initialValues?: DeputyInitialValues
  onSubmit: (values: DeputyFormValues) => void
  error?: string | null
  parties: { value: string; label: string }[]
}

async function urlToFile(url: string): Promise<File | null> {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const filename = url.split('/').pop() || 'image.jpg'
    return new File([blob], filename, { type: blob.type })
  } catch (error) {
    console.error('Error converting URL to File:', error)
    return null
  }
}

export function BaseDeputyForm({
  id,
  initialValues,
  onSubmit,
  error
}: Omit<BaseDeputyFormProps, 'parties'>) {
  const { data: parties, isLoading: isPartiesLoading } = useQuery({
    queryKey: ['parties'],
    queryFn: getPoliticalParties,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000
  })

  const { data: terms, isLoading: isTermsLoading } = useQuery({
    queryKey: ['terms'],
    queryFn: getTermsOptions,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000
  })

  const partyOptions = useMemo(
    () =>
      parties?.map((party) => ({
        value: party.id.toString(),
        label: `${party.sigla} - ${party.nome}`
      })) || [],
    [parties]
  )

  const termOptions = useMemo(
    () =>
      terms?.map((term) => ({
        value: term.id.toString(),
        label: `${term.data_inicio.split('-')[0]} - ${term.data_fim.split('-')[0]}`
      })) || [],
    [terms]
  )

  const form = useForm<DeputyFormValues>({
    validate: zodResolver(deputySchema),
    initialValues: {
      nome: initialValues?.nome ?? '',
      foto: null,
      cpf: initialValues?.cpf ?? '',
      partido: '', // Será setado pelo useEffect
      vigencias: [] // Será setado pelo useEffect
    },
    transformValues: (values) => ({
      ...values,
      cpf: CPF.hide(values.cpf)
    })
  })

  useEffect(() => {
    if (typeof initialValues?.foto === 'string') {
      urlToFile(initialValues.foto).then((file) => {
        form.setFieldValue('foto', file)
      })
    }
  }, [initialValues?.foto])

  useEffect(() => {
    form.setFieldValue('partido', initialValues?.partido ?? '')
  }, [parties])

  useEffect(() => {
    if (terms) {
      form.setFieldValue('vigencias', initialValues?.vigencias ?? [])
    }
  }, [terms])

  function handleCpfChange(event: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = event.target.value.replace(/\D/g, '').slice(0, 11)
    form.setFieldValue('cpf', rawValue)
  }

  return (
    <form
      id={id}
      onSubmit={form.onSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      {error && <Alert color="red" title={error} className="mb-4" />}
      <div>
        <FileInput
          label="Foto"
          placeholder="Selecione uma imagem"
          accept="image/*"
          value={form.values.foto}
          onChange={(file) => form.setFieldValue('foto', file)}
          clearable
        />
      </div>
      <TextInput
        label="Nome"
        placeholder="Nome do deputado"
        withAsterisk
        {...form.getInputProps('nome')}
      />
      <Select
        label="Partido"
        placeholder="Selecione um partido"
        data={partyOptions}
        disabled={isPartiesLoading}
        {...form.getInputProps('partido')}
      />
      <TextInput
        label="CPF"
        {...form.getInputProps('cpf')}
        value={CPF.mask(form.getValues().cpf)}
        onChange={handleCpfChange}
      />
      <MultiSelect
        label="Mandatos"
        placeholder="Selecione os mandatos"
        className="w-full max-w-96"
        data={termOptions}
        disabled={isTermsLoading}
        {...form.getInputProps('vigencias')}
      />
    </form>
  )
}
