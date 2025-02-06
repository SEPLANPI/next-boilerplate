'use client'

import { Alert, TextInput, FileInput, Select } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useEffect, useMemo } from 'react'
import { z } from 'zod'
import { useQuery } from '@tanstack/react-query'
import { getPoliticalParties } from '@/features/deputies/api/client/get-political-parties'

const deputySchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  partido: z.string(),
  foto: z.instanceof(File).nullable()
})

type DeputyFormValues = z.infer<typeof deputySchema>

type DeputyInitialValues = {
  nome?: string
  partido?: string
  foto?: string
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

  const partyOptions = useMemo(
    () =>
      parties?.map((party) => ({
        value: party.id.toString(),
        label: `${party.sigla} - ${party.nome}`
      })) || [],
    [parties]
  )

  const form = useForm<DeputyFormValues>({
    validate: zodResolver(deputySchema),
    initialValues: {
      nome: initialValues?.nome ?? '',
      partido: '', // Will be set by useEffect
      foto: null
    }
  })

  useEffect(() => {
    if (typeof initialValues?.foto === 'string') {
      urlToFile(initialValues.foto).then((file) => {
        form.setFieldValue('foto', file)
      })
    }
  }, [initialValues?.foto])

  useEffect(() => {
    if (initialValues?.partido && parties) {
      const party = parties.find(
        (p) => p.id.toString() === initialValues.partido
      )
      if (party) {
        form.setFieldValue('partido', initialValues.partido)
      }
    }
  }, [parties, initialValues?.partido])

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
        withAsterisk
        {...form.getInputProps('partido')}
      />
    </form>
  )
}
