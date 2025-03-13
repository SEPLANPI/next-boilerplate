import { UseFormReturnType } from '@mantine/form'
import { TextInput, Checkbox, Select } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { MemberType } from '../types/counselor'
import { z } from 'zod'

export function PersonalDataStep({ form }: { form: UseFormReturnType<any> }) {
  return (
    <>
      <p className="col-span-2 text-sm text-gray-700">
        Os seus dados cadastrados no GovPI Cidadão serão importados
        automaticamente para esta etapa do formulário. Certifique-se de que as
        informações estão corretas. Caso necessário, atualize seu cadastro
        diretamente no GovPI antes de prosseguir.
      </p>
      <TextInput
        label="Nome Completo"
        placeholder="João da Silva"
        className="col-span-2"
        key={form.key('nome')}
        {...form.getInputProps('nome')}
      />
      <TextInput
        label="RG"
        placeholder="0000000-0"
        {...form.getInputProps('rg')}
      />
      <DateInput
        label="Data de Nascimento"
        valueFormat="DD/MM/YYYY"
        {...form.getInputProps('data_nascimento')}
      />

      <TextInput
        label="CPF"
        className="col-span-2"
        placeholder="000.000.000-00"
        {...form.getInputProps('cpf')}
      />
      <TextInput
        label="Email"
        placeholder="seu@email.com"
        {...form.getInputProps('email')}
      />
      <TextInput
        label="Telefone"
        placeholder="(00) 00000-0000"
        {...form.getInputProps('telefone')}
      />
    </>
  )
}
