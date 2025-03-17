import { UseFormReturnType } from '@mantine/form'
import { Select } from '@mantine/core'
import { z } from 'zod'

export const workshopSchema = z.object({
  oficina: z.string().min(3, 'Selecione uma oficina válida')
})

export function WorkshopStep({ form }: { form: UseFormReturnType<any> }) {
  return <Select label="Oficina" data={[]} {...form.getInputProps('oficina')} />
}
