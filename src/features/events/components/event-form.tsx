'use client'

import {
  Alert,
  Divider,
  Select,
  Switch,
  Textarea,
  TextInput,
  Button,
  Radio,
  Stack,
  ActionIcon
} from '@mantine/core'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
  > | null
  id: string
  onSubmit?: () => void
  onComplete?: (success?: boolean, action?: 'view' | 'continue') => void
}

const dateParser: DateInputProps['dateParser'] = (input) => {
  return dayjs(input, 'DD/MM/YYYY').toDate()
}

const categories = {
  Cultural: [
    'Shows/Festas',
    'Carnaval',
    'Festejos Religiosos',
    'Festivais',
    'Exposições',
    'Literatura',
    'Teatro e Arte',
    'Patrimônio Cultural'
  ],
  Esportivo: [
    'Vaquejadas',
    'Competições',
    'Corridas',
    'Lutas',
    'Futebol',
    'Esportes de Praia',
    'Torneios'
  ],
  Educacional: [
    'Congressos',
    'Seminários',
    'Cursos',
    'Workshops',
    'Capacitações',
    'Palestras'
  ],
  Institucional: [
    'Inaugurações',
    'Aniversários Municipais',
    'Conferências Governamentais',
    'Solenidades',
    'Eventos Públicos'
  ],
  Agronegócio: [
    'Feiras Agropecuárias',
    'Exposições Rurais',
    'Agricultura',
    'Pecuária',
    'Desenvolvimento Rural'
  ],
  Social: [
    'Ações Comunitárias',
    'Saúde e Bem-estar',
    'Inclusão Social',
    'Prevenção',
    'Cidadania'
  ],
  Turismo: [
    'Eventos Regionais',
    'Promoção Turística',
    'Festas Tradicionais',
    'Gastronomia',
    'Artesanato'
  ]
} as const

// Add this constant with the options
const naturezaGastoOptions = [
  'Estrutura e Logística',
  'Contratações Artísticas',
  'Serviços Técnicos',
  'Material e Equipamentos',
  'Divulgação e Marketing',
  'Alimentação e Hospedagem'
] as const

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
  naturezaGasto: z.string().min(1, 'Natureza do Gasto é obrigatória')
})

type EventFormValues = z.infer<typeof eventFormSchema>

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

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

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
      categoria: '',
      subcategoria: '',
      naturezaGasto: ''
    }
  })

  // Add this check to determine if a category has a selected subcategory
  const isCategorySelected = (category: string) => {
    return (
      form.values.subcategoria &&
      categories[category as keyof typeof categories].includes(
        form.values.subcategoria
      )
    )
  }

  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(
    values: typeof form.values,
    formEvent: React.FormEvent<HTMLFormElement> | undefined
  ) {
    if (!event?.id) return

    const action = (formEvent?.nativeEvent as SubmitEvent).submitter?.dataset
      .action as 'view' | 'continue'

    try {
      console.log(values)
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
        withAsterisk
        key={form.key('nome')}
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
        withAsterisk
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
        {...form.getInputProps('municipio')}
        filter={filterOptions}
        clearable
        withAsterisk
      />
      <TextInput
        label="Endereço"
        placeholder="Endereço do evento"
        {...form.getInputProps('local')}
      />
      <Divider />
      <h2 className="text-md font-semibold">Categorização</h2>
      <div className="relative overflow-hidden">
        <div
          className={`transition-transform duration-300 ${
            selectedCategory ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <div className="flex flex-col space-y-2">
            {Object.keys(categories).map((category) => (
              <Button
                key={category}
                variant={isCategorySelected(category) ? 'outline' : 'default'}
                justify="space-between"
                rightSection={<ChevronRight className="size-4" />}
                onClick={() => {
                  setSelectedCategory(category)
                  form.setFieldValue('categoria', category)
                }}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div
          className={`absolute top-0 w-full transition-transform duration-300 ${
            selectedCategory ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {selectedCategory && (
            <div className="flex flex-col">
              <div className="mb-2 flex items-center gap-2">
                <ActionIcon
                  variant="subtle"
                  onClick={() => {
                    setSelectedCategory(null)
                    form.setFieldValue('categoria', '')
                  }}
                >
                  <ChevronLeft className="size-4" />
                </ActionIcon>
                <p className="font-medium">{selectedCategory}</p>
              </div>

              <Radio.Group
                value={form.values.subcategoria}
                {...form.getInputProps('subcategoria')}
              >
                <div className="flex flex-col space-y-0.5">
                  {categories[selectedCategory as keyof typeof categories].map(
                    (subcategory) => (
                      <Radio
                        key={subcategory}
                        value={subcategory}
                        label={subcategory}
                        className="rounded-md p-2 hover:bg-gray-50"
                      />
                    )
                  )}
                </div>
              </Radio.Group>
            </div>
          )}
        </div>
        <p className="mt-1 text-xs text-red-500">{form.errors.subcategoria}</p>
      </div>
      <Select
        label="Natureza do Gasto"
        placeholder="Selecione a natureza do gasto"
        data={naturezaGastoOptions}
        className="max-w-64"
        {...form.getInputProps('naturezaGasto')}
        required
      />
      <Divider />
      <Switch
        defaultChecked={form.values.editado}
        color="teal"
        label="Revisado"
        {...form.getInputProps('editado')}
      />
    </form>
  )
}
