'use client'

import { Divider, Select, Textarea, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { Event } from '../types'
import { useForm } from '@mantine/form'
import { dayjs } from '@/lib/dayjs'

type EventFormProps = {
  event: Event | null
  id: string
}

export function EventForm({ event, id = 'edit-event-form' }: EventFormProps) {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      nome: event?.nome,
      descricao: event?.descricao,
      data: event?.data && dayjs(event.data, 'DD-MM-YYYY').toDate(),
      local: event?.local,
      municipio: event?.municipio
    }
  })

  return (
    <form id={id} className="flex flex-col space-y-6">
      <TextInput
        label="Nome"
        placeholder="Nome do evento"
        key={form.key('nome')}
        {...form.getInputProps('nome')}
      />
      <Textarea
        label="Descrição"
        placeholder="Descrição do evento"
        key={form.key('descricao')}
        {...form.getInputProps('descricao')}
      />
      <DateInput
        label="Data"
        placeholder="Selecione a data do evento"
        key={form.key('data')}
        {...form.getInputProps('data')}
      />
      <Divider className="my-12" />
      <h2 className="text-md mb-2 font-semibold">Localização</h2>
      <TextInput
        label="Endereço"
        placeholder="Endereço do evento"
        key={form.key('local')}
        {...form.getInputProps('local')}
      />
      <Select
        searchable
        label="Município"
        placeholder="Selecione o município"
        data={['Água Branca', 'Bom Jesus', 'Teresina']}
        key={form.key('municipio')}
        {...form.getInputProps('municipio')}
      />
    </form>
  )
}
