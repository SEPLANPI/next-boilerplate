'use client'

import { useForm, zodResolver } from '@mantine/form'
import {
  createInitialFormValues,
  InitialFormValues
} from '@/lib/form-initial-values'
import { registerAsCounselorSchema } from '../data/register-as-counselor-schema'
import { AddressType } from '@/features/register-counselor/types/counselor'
import {
  TextInput,
  Select,
  RadioGroup,
  Radio,
  Input,
  FileInput,
  Checkbox,
  Divider,
  InputDescription
} from '@mantine/core'
import { IMaskInput } from 'react-imask'
import { useQuery } from '@tanstack/react-query'
import { getMunicipalitiesFilterOptions } from '@/features/register-counselor/api/client/get-municipalities-filter-options'
import { getBanksFilterOptions } from '@/features/register-counselor/api/client/get-banks-filter-options'
import { getWorkshopsOptions } from '@/features/register-counselor/api/client/get-workshops-options'
import { getCouncils } from '@/features/register-counselor/api/client/get-councils'
import { filterOptions } from '@/utils/filter-options'
import { useZipCode } from '@/features/register-counselor/hooks/use-zip-code'
import { PropsWithChildren, useEffect, useMemo } from 'react'
import { notifications } from '@mantine/notifications'
import { RadioCard } from '@/components/ui/radio-card'
import { DateInput, DateInputProps } from '@mantine/dates'
import { dayjs } from '@/lib/dayjs'
import { convertPersonToCounselor } from '../actions/convert-person-to-counselor'
import { buildErrorMessage } from '@/utils/format-django-errors'
import { Person } from '../types'

const dateParser: DateInputProps['dateParser'] = (input) => {
  return dayjs(input, 'DD/MM/YYYY').toDate()
}

interface Props {
  id?: string
  person: Person | null
  onSubmit?: () => void
  onComplete?: (success: boolean) => void
}

export type FormValues = Omit<
  InitialFormValues<typeof registerAsCounselorSchema>,
  'endereco'
> & {
  endereco:
    | {
        tipo_endereco: 'URBANA'
        rua: string
        numero: string
        complemento: string
        bairro: string
        cep: string
        municipio_id: string
      }
    | {
        tipo_endereco: 'RURAL'
        referencia: string
        cep: string
        municipio_id: string
      }
}

function Section({ children }: PropsWithChildren) {
  return <section className="grid grid-cols-2 gap-4">{children}</section>
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="col-span-2 mb-4 flex flex-row items-center justify-between gap-2 rounded-sm bg-gray-100 px-3 py-2">
      <div>
        <h2 className="text-sm font-bold text-secondary-foreground">{title}</h2>
      </div>
    </div>
  )
}

export function RegisterAsCounselorForm({
  id,
  person,
  onSubmit,
  onComplete
}: Props) {
  const initialValues = useMemo(
    () => ({
      ...createInitialFormValues(registerAsCounselorSchema),
      email: person?.email || '',
      data_nascimento: person?.data_nascimento
        ? dayjs(person.data_nascimento).toDate()
        : null,
      telefone: person?.telefone
        ? person.telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
        : '',
      nome_titular: person?.nome || '',
      endereco: {
        tipo_endereco: AddressType.URBAN,
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        referencia: '',
        cep: '',
        municipio_id: ''
      }
    }),
    [person]
  )

  const form = useForm<FormValues>({
    initialValues,
    validate: zodResolver(registerAsCounselorSchema),
    transformValues: (values) => ({
      ...values,
      telefone: values.telefone.replace(/\D/g, ''),
      endereco: {
        ...values.endereco,
        cep: values.endereco.cep.replace(/\D/g, '')
      }
    })
  })

  const { data: municipalities, isLoading: isMunicipalitiesLoading } = useQuery(
    {
      queryKey: ['municipalities'],
      queryFn: getMunicipalitiesFilterOptions
    }
  )

  const { data: banks, isLoading: isBanksLoading } = useQuery({
    queryKey: ['banks'],
    queryFn: getBanksFilterOptions
  })

  const { data: workshops } = useQuery({
    queryKey: ['workshops'],
    queryFn: getWorkshopsOptions
  })

  const { data: councils } = useQuery({
    queryKey: ['councils'],
    queryFn: getCouncils
  })

  const zipCode = form.getTransformedValues().endereco.cep
  const { data: zipCodeData, error: zipCodeError } = useZipCode(zipCode)

  useEffect(() => {
    if (zipCodeError) {
      notifications.show({
        title: 'Erro ao buscar CEP',
        message: 'Não foi possível encontrar o endereço para este CEP',
        color: 'red'
      })
      return
    }

    if (zipCodeData) {
      form.setFieldValue('endereco.rua', zipCodeData.logradouro)
      form.setFieldValue('endereco.bairro', zipCodeData.bairro)
      form.setFieldValue('endereco.complemento', zipCodeData.complemento)

      if (zipCodeData.localidade && municipalities) {
        const municipality = municipalities.find(
          (city) =>
            city.nome.toLowerCase() === zipCodeData.localidade.toLowerCase()
        )
        if (municipality) {
          form.setFieldValue(
            'endereco.municipio_id',
            municipality.id.toString()
          )
        }
      }
    }
  }, [zipCodeData, zipCodeError, municipalities])

  const handleSubmit = async (values: FormValues) => {
    onSubmit?.()
    const formData = new FormData()

    formData.append('pessoa_id', person?.id || '')
    formData.append('rg', values.rg)
    formData.append('telefone', values.telefone)
    formData.append('email', values.email)
    formData.append(
      'data_nascimento',
      dayjs(values.data_nascimento).format('YYYY-MM-DD')
    )

    formData.append('endereco_tipo_zona', values.endereco.tipo_endereco)
    formData.append('endereco_cep', values.endereco.cep)
    formData.append('endereco_municipio', values.endereco.municipio_id)

    if (values.endereco.tipo_endereco === AddressType.URBAN) {
      formData.append('endereco_logradouro', values.endereco.rua)
      formData.append('endereco_numero', values.endereco.numero)
      formData.append('endereco_complemento', values.endereco.complemento || '')
      formData.append('endereco_bairro', values.endereco.bairro)
    }

    if (values.endereco.tipo_endereco === AddressType.RURAL) {
      formData.append('endereco_referencia', values.endereco.referencia)
    }

    formData.append('tipo_membro', values.tipo_membro)
    formData.append('conselho_id', values.conselho_id)
    formData.append(
      'poder_publico',
      values.tipo_conselho === 'PODER_PUBLICO' ? 'true' : 'false'
    )
    formData.append('ajuda_custo', values.ajuda_custo ? 'true' : 'false')

    if (values.ajuda_custo && values.tipo_conselho === 'SOCIEDADE_CIVIL') {
      formData.append('banco_id', values.banco_id || '')
      formData.append('banco_agencia', values.agencia || '')
      formData.append('banco_conta', values.conta || '')
      formData.append('banco_nome_titular', values.nome_titular || '')
      formData.append('banco_cpf_titular', person?.cpf || '')

      if (values.comprovante_residencia instanceof File) {
        formData.append('comprovante_residencia', values.comprovante_residencia)
      }
      if (values.comprovante_conselho instanceof File) {
        formData.append('comprovante_conselho', values.comprovante_conselho)
      }
      if (values.comprovante_bancario instanceof File) {
        formData.append('comprovante_bancario', values.comprovante_bancario)
      }
    }

    const result = await convertPersonToCounselor(formData)

    if (result?.error) {
      notifications.show({
        title: 'Erro ao cadastrar conselheiro',
        message: buildErrorMessage(result.error),
        color: 'red'
      })
      onComplete?.(false)
      return
    }

    notifications.show({
      title: 'Sucesso',
      message: 'Conselheiro cadastrado com sucesso',
      color: 'green'
    })
    onComplete?.(true)
  }

  const isSociedadeCivil = form.values.tipo_conselho === 'SOCIEDADE_CIVIL'

  return (
    <form id={id} onSubmit={form.onSubmit(handleSubmit)} className="space-y-8">
      <Section>
        <SectionHeader title="Dados Pessoais" />
        <TextInput
          label="Nome Completo"
          className="col-span-2"
          value={person?.nome}
          disabled
        />
        <Input.Wrapper label="CPF" className="col-span-2 sm:col-span-1">
          <Input
            component={IMaskInput}
            mask="000.000.000-00"
            placeholder="000.000.000-00"
            value={person?.cpf}
            disabled
          />
        </Input.Wrapper>
        <DateInput
          withAsterisk
          dateParser={dateParser}
          className="col-span-2 sm:col-span-1"
          label="Data de Nascimento"
          valueFormat="DD/MM/YYYY"
          key={form.key('data_nascimento')}
          {...form.getInputProps('data_nascimento')}
        />
        <TextInput
          label="Email"
          className="col-span-2"
          placeholder="seu@email.com"
          withAsterisk
          {...form.getInputProps('email')}
        />
        <TextInput
          withAsterisk
          label="RG"
          placeholder="00000000"
          className="col-span-2 sm:col-span-1"
          {...form.getInputProps('rg')}
        />
        <Input.Wrapper
          label="Telefone"
          error={form.errors.telefone}
          withAsterisk
        >
          <Input
            component={IMaskInput}
            unmask
            mask="(00) 00000-0000"
            placeholder="(00) 00000-0000"
            {...form.getInputProps('telefone')}
          />
        </Input.Wrapper>
      </Section>

      <Section>
        <SectionHeader title="Endereço" />
        <RadioGroup
          label="Reside em"
          withAsterisk
          className="col-span-2"
          {...form.getInputProps('endereco.tipo_endereco')}
        >
          <div className="flex space-x-3">
            <Radio value={AddressType.URBAN} label="Urbano" />
            <Radio value={AddressType.RURAL} label="Rural" />
          </div>
        </RadioGroup>

        <Input.Wrapper
          withAsterisk
          label="CEP"
          className="col-span-2 sm:col-span-1"
          error={form.errors['endereco.cep']}
        >
          <Input
            component={IMaskInput}
            unmask={false}
            mask="00000-000"
            placeholder="00000-000"
            {...form.getInputProps('endereco.cep')}
          />
        </Input.Wrapper>

        <Select
          filter={filterOptions}
          className="col-span-2 sm:col-span-1"
          searchable
          withAsterisk
          label="Município"
          disabled={isMunicipalitiesLoading}
          data={
            municipalities?.map((m) => ({
              value: m.id.toString(),
              label: m.nome
            })) || []
          }
          {...form.getInputProps('endereco.municipio_id')}
        />

        {form.values.endereco?.tipo_endereco === 'URBANA' ? (
          <>
            <TextInput
              withAsterisk
              label="Bairro"
              className="col-span-2"
              {...form.getInputProps('endereco.bairro')}
            />
            <TextInput
              withAsterisk
              label="Rua"
              className="col-span-2 sm:col-span-1"
              {...form.getInputProps('endereco.rua')}
            />
            <TextInput
              withAsterisk
              label="Número"
              className="col-span-2 sm:col-span-1"
              {...form.getInputProps('endereco.numero')}
            />

            <TextInput
              label="Complemento"
              className="col-span-2"
              {...form.getInputProps('endereco.complemento')}
            />
          </>
        ) : (
          <TextInput
            withAsterisk
            label="Referência"
            className="col-span-2"
            {...form.getInputProps('endereco.referencia')}
          />
        )}
      </Section>

      <Section>
        <SectionHeader title="Dados do Conselho" />
        <RadioGroup
          label="Representante de qual conselho?"
          withAsterisk
          className="col-span-2"
          {...form.getInputProps('conselho_id')}
        >
          <div className="grid grid-cols-2 gap-4">
            {councils?.map((council) => (
              <RadioCard
                key={council.id}
                value={council.id.toString()}
                label={council.nome}
              />
            ))}
          </div>
        </RadioGroup>

        <RadioGroup
          label="Composição no conselho"
          withAsterisk
          className="col-span-2"
          {...form.getInputProps('tipo_membro')}
        >
          <div className="flex space-x-3">
            <Radio value="NUCLEO_GESTOR" label="Núcleo Gestor" />
            <Radio value="MEMBRO" label="Membro" />
          </div>
        </RadioGroup>

        <RadioGroup
          label="Representação no conselho"
          withAsterisk
          className="col-span-2"
          {...form.getInputProps('tipo_conselho')}
        >
          <div className="flex space-x-3">
            <Radio value="PODER_PUBLICO" label="Poder Público" />
            <Radio value="SOCIEDADE_CIVIL" label="Sociedade Civil" />
          </div>
        </RadioGroup>

        {isSociedadeCivil && (
          <div className="col-span-2 !mt-2">
            <Checkbox.Card
              className="col-span-2 border-0"
              {...form.getInputProps('ajuda_custo', { type: 'checkbox' })}
            >
              <div className="flex space-x-4 border-0">
                <Checkbox.Indicator />
                <div className="flex flex-col space-y-2 text-sm">
                  <p className="leading-none">Preciso de ajuda de custo</p>
                  <InputDescription>
                    A ajuda de custo será fornecida exclusivamente aos
                    conselheiros que não residem na cidade onde o evento
                    ocorrerá.
                  </InputDescription>
                </div>
              </div>
            </Checkbox.Card>
          </div>
        )}
      </Section>

      {form.values.ajuda_custo && isSociedadeCivil && (
        <>
          <Section>
            <SectionHeader title="Dados Bancários" />
            <Select
              withAsterisk
              searchable
              filter={filterOptions}
              className="col-span-2"
              label="Banco"
              disabled={isBanksLoading}
              data={
                banks?.map((b) => ({
                  value: b.id.toString(),
                  label: `${b.code || 'N/A'} - ${b.full_name}`
                })) || []
              }
              {...form.getInputProps('banco_id')}
            />

            <Input.Wrapper
              label="Agência"
              error={form.errors.agencia}
              withAsterisk
              className="col-span-2 sm:col-span-1"
            >
              <Input type="number" {...form.getInputProps('agencia')} />
            </Input.Wrapper>

            <Input.Wrapper
              label="Conta corrente"
              error={form.errors.conta}
              withAsterisk
              className="col-span-2 sm:col-span-1"
            >
              <Input type="number" {...form.getInputProps('conta')} />
            </Input.Wrapper>

            <TextInput
              withAsterisk
              className="col-span-2"
              label="Nome do Titular"
              {...form.getInputProps('nome_titular')}
            />

            <Input.Wrapper label="CPF do Titular" className="col-span-2">
              <Input
                component={IMaskInput}
                mask="000.000.000-00"
                placeholder="000.000.000-00"
                value={person?.cpf}
                disabled
              />
            </Input.Wrapper>
          </Section>

          <Section>
            <SectionHeader title="Documentos" />
            <FileInput
              withAsterisk
              className="col-span-2"
              label="Comprovante de Residência"
              accept="image/jpg, image/png, image/jpeg, application/pdf"
              placeholder="Selecione o arquivo (jpg. jpeg, png, pdf)"
              {...form.getInputProps('comprovante_residencia')}
            />

            <FileInput
              withAsterisk
              className="col-span-2"
              label="Comprovante do Conselho"
              accept="image/jpg, image/png, image/jpeg, application/pdf"
              placeholder="Selecione o arquivo (jpg. jpeg, png, pdf)"
              {...form.getInputProps('comprovante_conselho')}
            />

            <FileInput
              withAsterisk
              className="col-span-2"
              label="Comprovante Bancário"
              accept="image/jpg, image/png, image/jpeg, application/pdf"
              placeholder="Selecione o arquivo (jpg. jpeg, png, pdf)"
              {...form.getInputProps('comprovante_bancario')}
            />
          </Section>
        </>
      )}
    </form>
  )
}
