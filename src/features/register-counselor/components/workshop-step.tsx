import { UseFormReturnType } from '@mantine/form'
import { Radio, RadioGroup } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { getWorkshopsFilterOptions } from '../api/client/get-workshops-filter-options'
import { FormValues } from './register-counselor-form'

export function WorkshopStep({
  form
}: {
  form: UseFormReturnType<FormValues>
}) {
  const { data: workshops } = useQuery({
    queryKey: ['workshops'],
    queryFn: getWorkshopsFilterOptions,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000
  })

  return (
    <RadioGroup
      label="Selecione abaixo em qual oficina gostaria de confirmar sua participação"
      withAsterisk
      className="col-span-2"
      {...form.getInputProps('eixo_id')}
    >
      <div className="flex flex-col gap-4">
        {workshops?.map((workshop) => (
          <Radio.Card
            key={workshop.id.toString()}
            className="flex items-center space-x-4 rounded border p-3 text-sm text-gray-700"
            value={workshop.id.toString()}
            disabled={workshop.esgotado}
          >
            <Radio.Indicator />
            <span>{workshop.nome}</span>
          </Radio.Card>
        ))}
      </div>
    </RadioGroup>
  )
}
