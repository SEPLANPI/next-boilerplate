import { UseFormReturnType } from '@mantine/form'
import { NumberInput, Select, TextInput } from '@mantine/core'
import { AccountType } from '../types/counselor'
import { z } from 'zod'

export const bankDetailsSchema = z.object({
  banco_id: z.string().min(1, 'Banco é obrigatório'),
  agencia: z.number().min(1, 'Agência inválida'),
  conta: z.number().min(1, 'Conta inválida'),
  tipo_conta: z.nativeEnum(AccountType),
  cpf_titular: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
  nome_titular: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres')
})

export function BankDetailsStep({ form }: { form: UseFormReturnType<any> }) {
  return (
    <>
      <Select
        label="Banco"
        data={['Banco do Brasil', 'Bradesco', 'Caixa', 'Itaú', 'Santander']}
        {...form.getInputProps('banco_id')}
      />
      <NumberInput label="Agência" {...form.getInputProps('agencia')} />
      <NumberInput label="Conta" {...form.getInputProps('conta')} />
      <Select
        label="Tipo de Conta"
        data={Object.values(AccountType)}
        {...form.getInputProps('tipo_conta')}
      />
      <TextInput label="CPF Titular" {...form.getInputProps('cpf_titular')} />
      <TextInput label="Nome Titular" {...form.getInputProps('nome_titular')} />
    </>
  )
}
