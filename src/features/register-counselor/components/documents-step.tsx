import { UseFormReturnType } from '@mantine/form'
import { FileInput } from '@mantine/core'
import { z } from 'zod'
import { FormValues } from './register-counselor-form'

export const documentsSchema = z.object({
  rg_frente: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Arquivo obrigatório'),
  rg_verso: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Arquivo obrigatório'),
  comprovante_residencia: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Arquivo obrigatório'),
  comprovante_conselho: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Arquivo obrigatório'),
  comprovante_bancario: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Arquivo obrigatório')
})

export function DocumentsStep({
  form
}: {
  form: UseFormReturnType<FormValues>
}) {
  const isSociedadeCivil = form.values.tipo_conselho === 'SOCIEDADE_CIVIL'
  
  return (
    <>
      <p className="col-span-2 text-sm font-semibold text-gray-700">
        O participante deve anexar os seguintes arquivos:
      </p>
      <FileInput
        className="col-span-2"
        label="RG Frente"
        accept="image/jpg, image/png, image/jpeg ,application/pdf"
        placeholder="Selecione o arquivo (jpg. jpeg, png, pdf)"
        {...form.getInputProps('rg_frente')}
      />
      <FileInput
        className="col-span-2"
        label="RG Verso"
        accept="image/jpg, image/png, image/jpeg ,application/pdf"
        placeholder="Selecione o arquivo (jpg. jpeg, png, pdf)"
        {...form.getInputProps('rg_verso')}
      />
      <FileInput
        className="col-span-2"
        label="Comprovante de Residência"
        accept="image/jpg, image/png, image/jpeg ,application/pdf"
        placeholder="Selecione o arquivo (jpg. jpeg, png, pdf)"
        {...form.getInputProps('comprovante_residencia')}
      />
      <FileInput
        className="col-span-2"
        label="Comprovante do Conselho"
        accept="image/jpg, image/png, image/jpeg ,application/pdf"
        placeholder="Selecione o arquivo (jpg. jpeg, png, pdf)"
        {...form.getInputProps('comprovante_conselho')}
      />
      {isSociedadeCivil && (
        <FileInput
          className="col-span-2"
          label="Comprovante Bancário"
          accept="image/jpg, image/png, image/jpeg ,application/pdf"
          placeholder="Selecione o arquivo (jpg. jpeg, png, pdf)"
          {...form.getInputProps('comprovante_bancario')}
        />
      )}
    </>
  )
}
