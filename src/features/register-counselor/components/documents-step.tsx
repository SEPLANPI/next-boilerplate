import { UseFormReturnType } from '@mantine/form'
import { FileInput } from '@mantine/core'
import { z } from 'zod'
import { FormValues } from './register-counselor-form'

export function DocumentsStep({
  form
}: {
  form: UseFormReturnType<FormValues>
}) {
  return (
    <>
      <p className="col-span-2 text-sm font-semibold text-secondary-foreground">
        O participante deve anexar os seguintes arquivos:
      </p>
      <FileInput
        withAsterisk
        className="col-span-2"
        label="Comprovante de Residência"
        accept="image/jpg, image/png, image/jpeg ,application/pdf"
        placeholder="Selecione o arquivo (jpg. jpeg, png, pdf)"
        {...form.getInputProps('comprovante_residencia')}
      />
      <FileInput
        withAsterisk
        className="col-span-2"
        label="Comprovante do Conselho"
        accept="image/jpg, image/png, image/jpeg ,application/pdf"
        placeholder="Selecione o arquivo (jpg. jpeg, png, pdf)"
        {...form.getInputProps('comprovante_conselho')}
      />
      <FileInput
        withAsterisk
        className="col-span-2"
        label="Comprovante Bancário"
        accept="image/jpg, image/png, image/jpeg ,application/pdf"
        placeholder="Selecione o arquivo (jpg. jpeg, png, pdf)"
        {...form.getInputProps('comprovante_bancario')}
      />
    </>
  )
}
