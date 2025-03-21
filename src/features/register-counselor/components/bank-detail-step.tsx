import { UseFormReturnType } from '@mantine/form'
import { Input, NumberInput, Select, TextInput } from '@mantine/core'
import { FormValues } from './register-counselor-form'
import { useQuery } from '@tanstack/react-query'
import { getBanksFilterOptions } from '../api/client/get-banks-filter-options'
import { filterOptions } from '@/utils/filter-options'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { IMaskInput } from 'react-imask'

export function BankDetailsStep({
  form
}: {
  form: UseFormReturnType<FormValues>
}) {
  const { data } = useSession()

  useEffect(() => {
    form.setFieldValue('nome_titular', data?.user.fullName || '')
  }, [data])

  const { data: banks, isLoading: isBanksLoading } = useQuery({
    queryKey: ['banks'],
    queryFn: getBanksFilterOptions,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000
  })

  const banksOptions =
    banks?.map((bank) => ({
      value: bank.id.toString(),
      label: `${bank.code || 'N/A'} - ${bank.full_name}`
    })) || []

  return (
    <>
      <Select
        withAsterisk
        searchable
        filter={filterOptions}
        className="col-span-2"
        label="Banco"
        disabled={isBanksLoading}
        data={banksOptions}
        {...form.getInputProps('banco_id')}
      />
      <Input.Wrapper label="Agência" error={form.errors.agencia} withAsterisk>
        <Input type="number" {...form.getInputProps('agencia')} />
      </Input.Wrapper>
      <Input.Wrapper
        label="Conta corrente"
        error={form.errors.conta}
        withAsterisk
      >
        <Input type="number" {...form.getInputProps('conta')} />
      </Input.Wrapper>
      <Input.Wrapper label="CPF do Titular" className="col-span-2" withAsterisk>
        <Input
          component={IMaskInput}
          mask="000.000.000-00"
          placeholder="000.000.000-00"
          disabled
          value={data?.user.cpf ?? ''}
        />
      </Input.Wrapper>
      <TextInput
        withAsterisk
        className="col-span-2"
        label="Nome do Titular"
        {...form.getInputProps('nome_titular')}
      />
    </>
  )
}
