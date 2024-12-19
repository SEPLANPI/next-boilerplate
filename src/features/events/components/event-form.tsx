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
import { useForm } from '@mantine/form'
import { dayjs } from '@/lib/dayjs'
import { useQuery } from '@tanstack/react-query'
import { getCityFilterOptions } from '../api/client/get-city-options'
import { useMemo, useState } from 'react'
import { filterOptions } from '@/utils/filter-options'
import { Event } from '../types'
import { notifications } from '@mantine/notifications'
import { updateEvent } from '../actions/update-event'

interface EventFormProps {
  event: Event | null
  id: string
  onSubmit?: () => void
  onComplete?: (success?: boolean, action?: 'view' | 'continue') => void
}

const dateParser: DateInputProps['dateParser'] = (input) => {
  return dayjs(input, 'DD/MM/YYYY').toDate()
}

export function EventForm({ event, id, onSubmit, onComplete }: EventFormProps) {
  const { data: cities, isLoading: isCitiesLoading } = useQuery({
    queryKey: ['cities'],
    queryFn: getCityFilterOptions,
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

  const form = useForm({
    initialValues: {
      editado: event?.editado || false,
      nome: event?.nome || '',
      descricao: event?.descricao || '',
      data: event?.data ? dayjs(event.data, 'DD-MM-YYYY').toDate() : null,
      local: event?.local || '',
      municipio: event?.municipio_id?.toString()
    },
    validate: {
      nome: (value) => (!value ? 'Nome é obrigatório' : null)
    }
  })

  const [error, setError] = useState<string | null>(null)

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
        municipio_id: values.municipio
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
        {...form.getInputProps('nome')}
      />
      <Textarea
        label="Descrição"
        placeholder="Descrição do evento"
        {...form.getInputProps('descricao')}
      />
      <Textarea
        label="Objetivo"
        placeholder="Objetivo do contrato, campo vindo do SIAFE"
        disabled
        value={event?.objetivo}
        autosize
        maxRows={4}
      />
      <DateInput
        dateParser={dateParser}
        valueFormat="DD/MM/YYYY"
        label="Data"
        placeholder="Selecione a data do evento"
        className="max-w-32"
        {...form.getInputProps('data')}
      />
      <Divider className="my-12" />
      <h2 className="text-md mb-2 font-semibold">Localização</h2>
      <Select
        className="max-w-64"
        searchable
        label="Município"
        placeholder="Selecione o município"
        data={cityOptions}
        disabled={isCitiesLoading}
        {...form.getInputProps('municipio')}
        filter={filterOptions}
        clearable
      />
      <TextInput
        label="Endereço"
        placeholder="Endereço do evento"
        {...form.getInputProps('local')}
      />
      <Divider className="my-12" />
      <Switch
        defaultChecked={form.values.editado}
        color="teal"
        label="Revisado"
        {...form.getInputProps('editado')}
      />
    </form>
  )
}
