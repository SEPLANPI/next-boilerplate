import { UseFormReturnType } from '@mantine/form'
import { TextInput, Input, Select } from '@mantine/core'
import { DateInput, DateInputProps } from '@mantine/dates'
import { IMaskInput } from 'react-imask'
import { useQuery } from '@tanstack/react-query'
import { getMunicipalitiesFilterOptions } from '@/features/register-counselor/api/client/get-municipalities-filter-options'
import { filterOptions } from '@/utils/filter-options'
import { FormValues } from './register-person-form'
import { dayjs } from '@/lib/dayjs'

const dateParser: DateInputProps['dateParser'] = (input) => {
  return dayjs(input, 'DD/MM/YYYY').toDate()
}

export function PersonalDataStep({
  form
}: {
  form: UseFormReturnType<FormValues>
}) {
  const { data: municipalities, isLoading: isMunicipalitiesLoading } = useQuery(
    {
      queryKey: ['municipalities'],
      queryFn: getMunicipalitiesFilterOptions,
      staleTime: 24 * 60 * 60 * 1000,
      gcTime: 7 * 24 * 60 * 60 * 1000
    }
  )

  const municipalitiesOptions =
    municipalities?.map((city) => ({
      value: city.id.toString(),
      label: city.nome
    })) || []

  return (
    <>
      <TextInput
        withAsterisk
        label="Nome Completo"
        className="col-span-2"
        {...form.getInputProps('nome')}
      />
      <Input.Wrapper
        label="CPF"
        className="col-span-2 sm:col-span-1"
        withAsterisk
        error={form.errors.cpf}
      >
        <Input
          component={IMaskInput}
          unmask={true}
          mask="000.000.000-00"
          placeholder="000.000.000-00"
          {...form.getInputProps('cpf')}
          onAccept={form.getInputProps('cpf').onChange}
        />
      </Input.Wrapper>
      <DateInput
        dateParser={dateParser}
        className="col-span-2 sm:col-span-1"
        label="Data de Nascimento"
        valueFormat="DD/MM/YYYY"
        key={form.key('data_nascimento')}
        {...form.getInputProps('data_nascimento')}
        placeholder="DD/MM/YYYY"
      />
      <Input.Wrapper
        label="Telefone"
        withAsterisk
        className="col-span-2 sm:col-span-1"
        error={form.errors.telefone}
      >
        <Input
          component={IMaskInput}
          mask="(00) 00000-0000"
          unmask={true}
          placeholder="(00) 00000-0000"
          {...form.getInputProps('telefone')}
          onAccept={form.getInputProps('telefone').onChange}
        />
      </Input.Wrapper>
      <TextInput
        className="col-span-2 sm:col-span-1"
        label="Email"
        placeholder="email@exemplo.com"
        type="email"
        {...form.getInputProps('email')}
      />
      <Select
        withAsterisk
        searchable
        filter={filterOptions}
        className="col-span-2"
        label="Município"
        disabled={isMunicipalitiesLoading}
        data={municipalitiesOptions}
        {...form.getInputProps('municipio_id')}
      />
    </>
  )
}
