'use client'

import { Alert, TextInput, FileInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useEffect } from 'react'
import { z } from 'zod'
import { Upload } from 'lucide-react'

const politicalPartySchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  sigla: z.string().min(2, 'Sigla é obrigatória').max(10, 'Sigla muito longa'),
  foto: z.instanceof(File).nullable()
})

type PoliticalPartyFormValues = z.infer<typeof politicalPartySchema>

type PoliticalPartyInitialValues = Omit<
  Partial<PoliticalPartyFormValues>,
  'foto'
> & {
  foto?: string | null
}

interface BasePoliticalPartyFormProps {
  id: string
  initialValues?: PoliticalPartyInitialValues
  onSubmit: (values: PoliticalPartyFormValues) => void
  error?: string | null
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

export function BasePoliticalPartyForm({
  id,
  initialValues,
  onSubmit,
  error
}: BasePoliticalPartyFormProps) {
  const form = useForm<PoliticalPartyFormValues>({
    validate: zodResolver(politicalPartySchema),
    initialValues: {
      nome: initialValues?.nome || '',
      sigla: initialValues?.sigla || '',
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

  return (
    <form
      id={id}
      onSubmit={form.onSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      {error && <Alert color="red" title={error} className="mb-4" />}
      <div>
        <FileInput
          label="Símbolo"
          placeholder="Selecione uma imagem"
          accept="image/*"
          value={form.values.foto}
          onChange={(file) => form.setFieldValue('foto', file)}
          clearable
        />
      </div>
      <TextInput
        label="Sigla"
        placeholder="Sigla do partido"
        withAsterisk
        {...form.getInputProps('sigla')}
      />
      <TextInput
        label="Nome"
        placeholder="Nome do partido"
        withAsterisk
        {...form.getInputProps('nome')}
      />
    </form>
  )
}
