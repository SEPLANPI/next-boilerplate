import { UseFormReturnType } from '@mantine/form'
import { TextInput, Input } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { FormValues } from './register-counselor-form'
import { useSession } from 'next-auth/react'
import { dayjs } from '@/lib/dayjs'
import { IMaskInput } from 'react-imask'

export function PersonalDataStep({
  form
}: {
  form: UseFormReturnType<FormValues>
}) {
  const { data } = useSession()

  const birthDate = data?.user.birthDate
    ? dayjs(data?.user.birthDate, 'DD/MM/YYYY').toDate()
    : null

  return (
    <>
      <p className="col-span-2 text-sm">
        Os seus dados cadastrados no GovPI Cidadão serão importados
        automaticamente para esta etapa do formulário. Certifique-se de que as
        informações estão corretas. Caso necessário, atualize seu cadastro
        diretamente no GovPI antes de prosseguir.
      </p>
      <TextInput
        label="Nome Completo"
        className="col-span-2"
        disabled
        value={data?.user.fullName ?? ''}
      />

      <Input.Wrapper label="CPF" className="col-span-2 sm:col-span-1">
        <Input
          component={IMaskInput}
          mask="000.000.000-00"
          placeholder="000.000.000-00"
          disabled
          value={data?.user.cpf ?? ''}
        />
      </Input.Wrapper>
      <DateInput
        className="col-span-2 sm:col-span-1"
        label="Data de Nascimento"
        valueFormat="DD/MM/YYYY"
        disabled
        value={birthDate}
      />
      <TextInput
        className="col-span-2"
        label="Email"
        placeholder="seu@email.com"
        {...form.getInputProps('email')}
        disabled
        value={data?.user.email ?? ''}
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
        className="col-span-2 sm:col-span-1"
      >
        <Input
          component={IMaskInput}
          unmask={true}
          mask="(00) 00000-0000"
          placeholder="(00) 00000-0000"
          {...form.getInputProps('telefone')}
          onAccept={form.getInputProps('telefone').onChange}
          onChange={() => {}}
        />
      </Input.Wrapper>
    </>
  )
}
