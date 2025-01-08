'use client'

import {
  Alert,
  Divider,
  Select,
  Switch,
  Textarea,
  TextInput
} from '@mantine/core'
import { DateInput, DateInputProps } from '@mantine/dates'
import { useForm, zodResolver } from '@mantine/form'
import { dayjs } from '@/lib/dayjs'
import { useQuery } from '@tanstack/react-query'
import { getCityFilterOptions } from '../api/client/get-city-options'
import { useMemo, useState } from 'react'
import { filterOptions } from '@/utils/filter-options'
import { Event } from '../types'
import { notifications } from '@mantine/notifications'
import { updateEvent } from '../actions/update-event'
import { z } from 'zod'
import { getCategoryFilterOptions } from '../api/client/get-category-options'

interface EventFormProps {
  event: Pick<
    Event,
    | 'id'
    | 'nome'
    | 'editado'
    | 'data'
    | 'local'
    | 'municipio_id'
    | 'descricao'
    | 'objetivo'
    | 'categoria'
    | 'subcategoria'
  > | null
  id: string
  onSubmit?: () => void
  onComplete?: (success?: boolean, action?: 'view' | 'continue') => void
}

const dateParser: DateInputProps['dateParser'] = (input) => {
  return dayjs(input, 'DD/MM/YYYY').toDate()
}

const eventFormSchema = z.object({
  editado: z.boolean(),
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string(),
  data: z
    .date()
    .nullable()
    .refine((value) => value !== null, {
      message: 'Data é obrigatória'
    }),
  local: z.string().nullable(),
  municipio: z.string().min(1, 'Município é obrigatório'),
  categoria: z.string().min(1, 'Categoria é obrigatória'),
  subcategoria: z.string().min(1, 'Selecione a categoria e subcategoria'),
  naturezaGasto: z.string()
})

type EventFormValues = z.infer<typeof eventFormSchema>

export function EventForm({ event, id, onSubmit, onComplete }: EventFormProps) {
  const { data: cities, isLoading: isCitiesLoading } = useQuery({
    queryKey: ['cities'],
    queryFn: getCityFilterOptions,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000
  })

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoryFilterOptions,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000
  })

  const cityOptions = useMemo(
    () =>
      cities
        ?.filter((city) => city.id != null)
        .map((city) => ({
          value: city.id.toString(),
          label: city.nome
        })) || [],
    [cities]
  )

  const categoryOptions = useMemo(
    () =>
      categories?.map((category) => ({
        value: category.id.toString(),
        label: category.nome
    })) || [],
    [categories]
  )

  const form = useForm<EventFormValues>({
    mode: 'uncontrolled',
    validate: zodResolver(eventFormSchema),
    initialValues: {
      editado: event?.editado || false,
      nome: event?.nome || '',
      descricao: event?.descricao || '',
      data: event?.data ? dayjs(event.data, 'DD-MM-YYYY').toDate() : null,
      local: event?.local || '',
      municipio: event?.municipio_id?.toString() || '',
      categoria: event?.categoria?.toString() || '',
      subcategoria: event?.subcategoria?.toString() || '',
      naturezaGasto: ''
    }
  })

  const [error, setError] = useState<string | null>(null)
  const [subcategories, setSubcategories] = useState<{ value: string; label: string }[]>(
    event?.categoria
      ? categories?.find((cat) => cat.id === Number(event.categoria))?.subcategorias.map((subcat) => ({
          value: subcat.id.toString(),
          label: subcat.nome
        })) || []
      : []
  )

  form.watch('categoria', ({value:categoria}) => {
    if (categoria) {
      const selectedCategory = categories?.find(
        (cat) => cat.id === Number(categoria)
      )
      setSubcategories(
        selectedCategory?.subcategorias.map((subcat) => ({
          value: subcat.id.toString(),
          label: subcat.nome
        })) || []
      )
    } else {
      setSubcategories([])
    }

    form.setFieldValue('subcategoria', '')
  })

  async function handleSubmit(
    values: typeof form.values,
    formEvent: React.FormEvent<HTMLFormElement> | undefined
  ) {
    if (!event?.id) return

    const action = (formEvent?.nativeEvent as SubmitEvent).submitter?.dataset
      .action as 'view' | 'continue'

    try {
      onSubmit?.()

      const { error } = await updateEvent({
        id: event.id,
        editado: values.editado,
        nome: values.nome,
        descricao: values.descricao,
        data: values.data ? dayjs(values.data).format('YYYY-MM-DD') : undefined,
        local: values.local,
        municipio_id: values.municipio,
        categoria: values.categoria,
        subcategoria: values.subcategoria
      })

      if (error) {
        setError('Não foi possível atualizar o evento. Tente novamente.')
        onComplete?.(false)
        return
      }

      notifications.show({
        title: 'Evento atualizado',
        message: 'As alterações foram salvas com sucesso',
        color: 'green'
      })
      onComplete?.(true, action)
      setError(null)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Ocorreu um erro ao atualizar o evento. Tente novamente.')
      onComplete?.(false)
    }
  }

  return (
    <form
      id={id}
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex flex-col space-y-6"
    >
      {error && <Alert color="red" title={error}></Alert>}
      <h2 className="text-md font-semibold">Informações gerais</h2>
      <TextInput
        label="Nome"
        placeholder="Nome do evento"
        withAsterisk
        key={form.key('nome')}
        {...form.getInputProps('nome')}
      />
      <Textarea
        label="Descrição"
        placeholder="Descrição do evento"
        key={form.key('descricao')}
        {...form.getInputProps('descricao')}
      />
      <Textarea
        label="Objetivo"
        placeholder="Objetivo do contrato, campo vindo do SIAFE"
        disabled
        value={event?.objetivo}
        autosize
        maxRows={4}
        key="objetivo"
      />
      <DateInput
        dateParser={dateParser}
        valueFormat="DD/MM/YYYY"
        label="Data"
        placeholder="Selecione a data do evento"
        className="max-w-32"
        withAsterisk
        key={form.key('data')}
        {...form.getInputProps('data')}
      />
      <Divider />
      <h2 className="text-md font-semibold">Localização</h2>
      <Select
        className="max-w-64"
        searchable
        label="Município"
        placeholder="Selecione o município"
        data={cityOptions}
        disabled={isCitiesLoading}
        key={form.key('municipio')}
        {...form.getInputProps('municipio')}
        filter={filterOptions}
        clearable
        withAsterisk
      />
      <TextInput
        label="Endereço"
        placeholder="Endereço do evento"
        key={form.key('local')}
        {...form.getInputProps('local')}
      />
      <Divider />
      <h2 className="text-md font-semibold">Categorização</h2>
      <div className="flex space-x-4">
        <Select
          label="Categoria"
          placeholder="Selecione a categoria"
          disabled={isCategoriesLoading}
          data={categoryOptions}
          className="w-1/2"
          key={form.key('categoria')}
          {...form.getInputProps('categoria')}
          withAsterisk
        />
        <Select
          label="Subcategoria"
          placeholder="Selecione a subcategoria"
          data={subcategories}
          className="w-1/2"
          key={form.key('subcategoria')}
          {...form.getInputProps('subcategoria')}
          disabled={subcategories.length <= 0 || isCategoriesLoading}
          withAsterisk
        />
      </div>
      <Select
        label="Natureza do Gasto"
        placeholder="Selecione a natureza do gasto"
        data={[]}
        className="max-w-64"
        key={form.key('naturezaGasto')}
        {...form.getInputProps('naturezaGasto')}
        required
      />
      <Divider />
      <Switch
        defaultChecked={form.values.editado}
        color="teal"
        label="Revisado"
        key={form.key('editado')}
        {...form.getInputProps('editado')}
      />
    </form>
  )
}
