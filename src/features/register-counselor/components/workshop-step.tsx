import { UseFormReturnType } from '@mantine/form'
import { RadioGroup } from '@mantine/core'
import { RadioCard } from '@/components/ui/radio-card'
import { useQuery } from '@tanstack/react-query'
import { FormValues } from './register-counselor-form'
import { getWorkshopsOptions } from '../api/client/get-workshops-options'

export function WorkshopStep({
  form
}: {
  form: UseFormReturnType<FormValues>
}) {
  const { data: workshops } = useQuery({
    queryKey: ['workshops'],
    queryFn: getWorkshopsOptions,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000
  })

  const workshopOptions =
    workshops?.map((workshop) => ({
      value: workshop.id.toString(),
      label: workshop.nome,
      disabled: !workshop.vagas_disponiveis,
      disabledTooltip: 'Vagas esgotadas'
    })) || []

  return (
    <RadioGroup
      label="Selecione abaixo em qual oficina gostaria de confirmar sua participação"
      withAsterisk
      className="col-span-2"
      {...form.getInputProps('eixo_id')}
    >
      <div className="flex flex-col gap-4">
        {workshopOptions.map((option) => (
          <RadioCard key={option.value} {...option} />
        ))}
      </div>
    </RadioGroup>
  )
}
