import { UseFormReturnType } from '@mantine/form'
import { FileInput } from '@mantine/core'
import { FormValues } from './register-person-form'

export function DocumentsStep({
  form
}: {
  form: UseFormReturnType<FormValues>
}) {
  return (
    <>
      <FileInput
        withAsterisk
        className="col-span-2"
        label="Documento de Identificação (CNH ou RG) - Frente"
        accept="image/jpg, image/png, image/jpeg, application/pdf"
        placeholder="Selecione o arquivo (jpg, jpeg, png, pdf)"
        {...form.getInputProps('documento_identificacao_frente')}
      />
      <FileInput
        withAsterisk
        className="col-span-2"
        label="Documento de Identificação (CNH ou RG) - Verso"
        accept="image/jpg, image/png, image/jpeg, application/pdf"
        placeholder="Selecione o arquivo (jpg, jpeg, png, pdf)"
        {...form.getInputProps('documento_identificacao_verso')}
      />
    </>
  )
}
