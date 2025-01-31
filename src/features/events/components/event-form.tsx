'use client'

import {
  Alert,
  MultiSelect,
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
import {
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle
} from 'react'
import { filterOptions } from '@/utils/filter-options'
import { notifications } from '@mantine/notifications'
import { updateEvent } from '../actions/update-event'
import { z } from 'zod'
import { getCategoryFilterOptions } from '../api/client/get-category-options'
import { getExpenseNatureFilterOptions } from '../api/client/get-expense-nature-options'
import { EditEvent } from '../types/edit-event'
import {
  DataListItem,
  DataListLabel,
  DataListRoot,
  DataListValue
} from '@/components/ui/data-list'
import { formatCurrency } from '@/lib/utils'
import { mergeEvents } from '../actions/merge-events'
import { formatCNPJ } from '@/utils/format-cnpj'
import { useRouter } from 'next/navigation'
import { useEditModeStore } from '../stores/edit-mode-store'

interface EventFormProps {
  event: EditEvent | null
  id: string
  mode: 'edit' | 'merge'
  eventIds?: number[]
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
  data: z.date().nullable(),
  local: z.string().nullable(),
  municipio: z.string().nullable(),
  categoria: z.string().nullable(),
  contratos: z.array(
    z.object({
      id: z.number(),
      naturezas_gasto: z.array(z.string().min(1))
    })
  )
})

type EventFormValues = {
  editado: boolean
  nome: string
  descricao: string
  data: Date | null
  local: string | null
  municipio: string | null
  categoria: string | null
  contratos: { id: number; naturezas_gasto: string[] }[]
}

function FormSection({ children }: PropsWithChildren) {
  return (
    <section className="flex flex-col space-y-6 [&:not(:last-child)]:mb-12 [&:not(:last-child)]:border-b [&:not(:last-child)]:pb-10">
      {children}
    </section>
  )
}

export const EventForm = forwardRef<
  {
    setFieldValue: (field: string, value: any) => void
    setValues: (values: any) => void
  },
  EventFormProps
>(
  (
    { event, id, mode, eventIds, onSubmit, onComplete }: EventFormProps,
    ref
  ) => {
    const router = useRouter()
    const { deselectAll } = useEditModeStore()

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

    const { data: expenseNatureData, isLoading: isExpenseNatureLoading } =
      useQuery({
        queryKey: ['expense-nature'],
        queryFn: getExpenseNatureFilterOptions,
        staleTime: 24 * 60 * 60 * 100,
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

    const expenseNatureOptions = useMemo(
      () =>
        expenseNatureData?.map((nature) => ({
          value: nature.id.toString(),
          label: nature.nome
        })) || [],
      [expenseNatureData]
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
        municipio: null,
        categoria: null,
        contratos:
          event?.contratos.map(({ id, naturezas_gasto }) => ({
            id,
            naturezas_gasto: naturezas_gasto
              ? naturezas_gasto.map(({ id }) => String(id))
              : []
          })) || []
      }
    })

    useImperativeHandle(
      ref,
      () => ({
        setFieldValue: form.setFieldValue,
        setValues: form.setValues
      }),
      [form]
    )

    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(
      values: typeof form.values,
      formEvent: React.FormEvent<HTMLFormElement> | undefined
    ) {
      if (!event?.id && mode === 'edit') return

      const action = (formEvent?.nativeEvent as SubmitEvent).submitter?.dataset
        .action as 'view' | 'continue'

      onSubmit?.()

      try {
        if (mode === 'edit') {
          const { error } = await updateEvent({
            id: event!.id,
            editado: values.editado,
            nome: values.nome,
            descricao: values.descricao,
            data: values.data
              ? dayjs(values.data).format('YYYY-MM-DD')
              : undefined,
            local: values.local,
            municipio: values.municipio,
            categoria: values.categoria,
            contratos_naturezas: values.contratos
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
        } else {
          if (!eventIds?.length) {
            setError('Não há eventos selecionados para mesclar.')
            onComplete?.(false)
            return
          }

          const { error, data } = await mergeEvents({
            eventos_ids: eventIds,
            editado: values.editado,
            nome: values.nome,
            descricao: values.descricao,
            data: values.data
              ? dayjs(values.data).format('YYYY-MM-DD')
              : undefined,
            local: values.local,
            municipio: values.municipio,
            categoria: values.categoria,
            contratos_naturezas: values.contratos
          })

          if (error) {
            setError('Não foi possível mesclar os eventos. Tente novamente.')
            onComplete?.(false)
            return
          }

          notifications.show({
            title: 'Eventos mesclados',
            message: 'Os eventos foram mesclados com sucesso',
            color: 'green'
          })

          if (data) {
            deselectAll()
            router.push(`/${data}`)
          }
        }

        onComplete?.(true, action)
        setError(null)
      } catch (err) {
        setError('Ocorreu um erro. Tente novamente.')
        onComplete?.(false)
      }
    }

    useEffect(() => {
      if (event && cities && categories && expenseNatureData) {
        form.setFieldValue('municipio', String(event.municipio_id || ''))
        form.setFieldValue('categoria', String(event.categoria || ''))

        event.contratos.forEach((contract, index) => {
          form.setFieldValue(
            `contratos.${index}.naturezas_gasto`,
            contract.naturezas_gasto.map((ng) => ng.id.toString())
          )
        })
      }
    }, [cities, categories, expenseNatureData, event])

    return (
      <form
        id={id}
        onSubmit={form.onSubmit(handleSubmit)}
        className="flex flex-col"
      >
        {error && <Alert color="red" title={error} className="mb-4"></Alert>}
        <FormSection>
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
            autosize
            maxRows={4}
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
          <Select
            label="Categoria"
            placeholder="Selecione a categoria"
            disabled={isCategoriesLoading}
            data={categoryOptions}
            className="w-full max-w-96"
            key={form.key('categoria')}
            {...form.getInputProps('categoria')}
            withAsterisk
          />
        </FormSection>
        <FormSection>
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
        </FormSection>
        <FormSection>
          <h3 className="text-md font-semibold">Contratos</h3>
          <div className="space-y-6">
            {form.getValues().contratos.map((item, index) => (
              <>
                <div className="space-y-2" key={item.id}>
                  <h3 className="text-sm font-semibold">
                    Contrato N° {event?.contratos[index].numero}
                  </h3>
                  <DataListRoot>
                    <DataListItem>
                      <DataListLabel>Valor</DataListLabel>
                      <DataListValue>
                        {formatCurrency(event?.contratos[index].valor || 0)}
                      </DataListValue>
                    </DataListItem>
                    <DataListItem>
                      <DataListLabel>Título</DataListLabel>
                      <DataListValue>
                        {event?.contratos[index].titulo}
                      </DataListValue>
                    </DataListItem>
                    <DataListItem>
                      <DataListLabel>Empresa</DataListLabel>
                      <DataListValue>
                        {formatCNPJ(event?.contratos[index].empresa.cnpj || '')}{' '}
                        - {event?.contratos[index].empresa.nome}
                      </DataListValue>
                    </DataListItem>
                  </DataListRoot>
                  <MultiSelect
                    label="Natureza do Gasto"
                    placeholder="Selecione a natureza do gasto"
                    disabled={isExpenseNatureLoading}
                    data={expenseNatureOptions}
                    className="w-full max-w-96"
                    key={form.key(`contratos.${index}.naturezas_gasto`)}
                    {...form.getInputProps(
                      `contratos.${index}.naturezas_gasto`
                    )}
                    required
                  />
                </div>
              </>
            ))}
          </div>
        </FormSection>
        <FormSection>
          <h2 className="text-m block font-semibold">Revisão</h2>
          <Switch
            defaultChecked={form.values.editado}
            color="teal"
            label="Revisado"
            key={form.key('editado')}
            {...form.getInputProps('editado')}
          />
        </FormSection>
      </form>
    )
  }
)

EventForm.displayName = 'EventForm'
