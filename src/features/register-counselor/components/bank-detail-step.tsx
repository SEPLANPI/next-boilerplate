import { UseFormReturnType } from '@mantine/form'
import { NumberInput, Select, TextInput } from '@mantine/core'
import { FormValues } from './register-counselor-form'

export function BankDetailsStep({
  form
}: {
  form: UseFormReturnType<FormValues>
}) {
  return (
    <>
      <Select
        withAsterisk
        searchable
        className="col-span-2"
        label="Banco"
        data={['Banco do Brasil', 'Bradesco', 'Caixa', 'Itaú', 'Santander']}
        {...form.getInputProps('banco_id')}
      />
      <NumberInput
        withAsterisk
        label="Agência"
        {...form.getInputProps('agencia')}
      />
      <NumberInput
        withAsterisk
        label="Conta corrente"
        {...form.getInputProps('conta')}
      />
      <TextInput
        withAsterisk
        className="col-span-2"
        label="CPF do Titular"
        {...form.getInputProps('cpf_titular')}
      />
      <TextInput
        withAsterisk
        className="col-span-2"
        label="Nome do Titular"
        {...form.getInputProps('nome_titular')}
      />
    </>
  )
}
