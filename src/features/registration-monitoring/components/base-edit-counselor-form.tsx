'use client'

import { RadioCard } from '@/components/ui/radio-card'
import { editCounselorSchema } from '@/data/edit-counselor-schema'
import { CounselorInfo } from '@/features/counselors/types'
import { getBanksFilterOptions } from '@/features/register-counselor/api/client/get-banks-filter-options'
import { getCouncils } from '@/features/register-counselor/api/client/get-councils'
import { getMunicipalitiesFilterOptions } from '@/features/register-counselor/api/client/get-municipalities-filter-options'
import { getWorkshopsOptions } from '@/features/register-counselor/api/client/get-workshops-options'
import { useZipCode } from '@/features/register-counselor/hooks/use-zip-code'
import { AddressType } from '@/features/register-counselor/types/counselor'
import { dayjs } from '@/lib/dayjs'
import {
  createInitialFormValues,
  InitialFormValues
} from '@/lib/form-initial-values'
import { filterOptions } from '@/utils/filter-options'
import {
  Checkbox,
  FileInput,
  Input,
  InputDescription,
  Radio,
  RadioGroup,
  Select,
  TextInput
} from '@mantine/core'
import { DateInput, DateInputProps } from '@mantine/dates'
import { useForm, zodResolver } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useQuery } from '@tanstack/react-query'
import { PropsWithChildren, useEffect, useMemo } from 'react'
import { IMaskInput } from 'react-imask'

const dateParser: DateInputProps['dateParser'] = (input) => {
  return dayjs(input, 'DD/MM/YYYY').toDate()
}

interface Props {
  id?: string
  counselor: CounselorInfo | undefined
  isSubmitting?: boolean
  error?: string | null
  onSubmit: (values: FormValues) => void
  onComplete?: (success: boolean) => void
}

export type FormValues = Omit<
  InitialFormValues<typeof editCounselorSchema>,
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

export function BaseEditCounselorForm({
  id,
  counselor,
  onSubmit,
  isSubmitting,
  error,
  onComplete
}: Props) {
  const initialValues = useMemo(
    () => ({
      ...createInitialFormValues(editCounselorSchema),
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
    []
  )

  useEffect(() => {
    if (counselor) {
      form.reset()

      form.setFieldValue('nome', counselor.nome || '')
      form.setFieldValue(
        'cpf',
        counselor.cpf
          ? counselor.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
          : ''
      )
      form.setFieldValue('rg', counselor.rg || '')
      form.setFieldValue(
        'data_nascimento',
        counselor.data_nascimento ? new Date(counselor.data_nascimento) : null
      )
      form.setFieldValue(
        'telefone',
        counselor.telefone
          ? counselor.telefone.replace(
              /^(\d{2})(\d)(\d{4})(\d{4})$/,
              '($1) $2$3-$4'
            )
          : ''
      )
      form.setFieldValue('email', counselor.email || '')
      form.setFieldValue('poder_publico', counselor.poder_publico || false)
      form.setFieldValue('tipo_membro', counselor.tipo_membro || '')

      form.setFieldValue(
        'endereco.tipo_endereco',
        counselor.endereco.tipo_zona === 'RURAL' ||
          counselor.endereco.tipo_zona === 'URBANA'
          ? counselor.endereco.tipo_zona
          : AddressType.URBAN
      )

      if (counselor.endereco.tipo_zona === AddressType.URBAN) {
        form.setFieldValue('endereco.rua', counselor.endereco.logradouro || '')
        form.setFieldValue('endereco.numero', counselor.endereco.numero || '')

        form.setFieldValue('endereco.bairro', counselor.endereco.bairro || '')
      } else {
        form.setFieldValue(
          'endereco.referencia',
          counselor.endereco.referencia || ''
        )
      }
      form.setFieldValue('endereco.complemento', counselor.endereco.complemento)

      form.setFieldValue(
        'endereco.cep',
        counselor.endereco.cep
          ? counselor.endereco.cep.replace(/^(\d{5})(\d{3})$/, '$1-$2')
          : ''
      )
      form.setFieldValue(
        'endereco.municipio_id',
        counselor.endereco.municipio?.id?.toString() || ''
      )

      form.setFieldValue('conselho_id', counselor.conselho.id || '')
      form.setFieldValue('tipo_membro', counselor.poder_publico || false)
      form.setFieldValue('tipo_conselho', counselor.tipo_membro || '')

      if (counselor.ajuda_custo) {
        form.setFieldValue('ajuda_custo', counselor.ajuda_custo)
        form.setFieldValue(
          'banco_id',
          counselor.dados_bancarios.banco.id?.toString() || ''
        )
        form.setFieldValue('agencia', counselor.dados_bancarios.agencia || '')
        form.setFieldValue('conta', counselor.dados_bancarios.conta || '')
        form.setFieldValue(
          'nome_titular',
          counselor.dados_bancarios.nome_titular || ''
        )
      }
    }
  }, [counselor])

  const form = useForm<FormValues>({
    initialValues,
    validate: zodResolver(editCounselorSchema),
    transformValues: (values) => ({
      ...values,
      cpf: values.cpf.replace(/\D/g, ''),
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

  const isSociedadeCivil = form.values.tipo_conselho === 'SOCIEDADE_CIVIL'

  return (
    <form id={id} onSubmit={form.onSubmit(onSubmit)} className="space-y-8">
      <Section>
        <SectionHeader title="Dados Pessoais" />
        <TextInput
          label="Nome Completo"
          withAsterisk
          className="col-span-2"
          error={form.errors.nome}
          key={form.key('nome')}
          {...form.getInputProps('nome')}
        />
        <Input.Wrapper
          withAsterisk
          label="CPF"
          className="col-span-2 sm:col-span-1"
        >
          <Input
            component={IMaskInput}
            mask="000.000.000-00"
            placeholder="000.000.000-00"
            key={form.key('cpf')}
            {...form.getInputProps('cpf')}
            error={form.errors.cpf}
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
                value={counselor?.cpf}
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
