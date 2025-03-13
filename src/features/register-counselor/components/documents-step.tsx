import { UseFormReturnType } from '@mantine/form'
import { FileInput } from '@mantine/core'
import { z } from 'zod'

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

export function DocumentsStep({ form }: { form: UseFormReturnType<any> }) {
  return (
    <>
      <FileInput
        label="RG Frente"
        accept="image/*,application/pdf"
        {...form.getInputProps('rg_frente')}
      />
      <FileInput
        label="RG Verso"
        accept="image/*,application/pdf"
        {...form.getInputProps('rg_verso')}
      />
      <FileInput
        label="Comprovante de Residência"
        accept="application/pdf"
        {...form.getInputProps('comprovante_residencia')}
      />
      <FileInput
        label="Comprovante do Conselho"
        accept="application/pdf"
        {...form.getInputProps('comprovante_conselho')}
      />
      <FileInput
        label="Comprovante Bancário"
        accept="application/pdf"
        {...form.getInputProps('comprovante_bancario')}
      />
    </>
  )
}
