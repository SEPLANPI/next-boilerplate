import { UseFormReturnType } from '@mantine/form'
import { Radio, RadioGroup, Tooltip } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { FormValues } from './register-counselor-form'
import { Info } from 'lucide-react'
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
            className="flex items-center space-x-4 rounded border p-3 text-sm text-gray-700 disabled:bg-gray-50 disabled:text-gray-500"
            value={workshop.id.toString()}
            disabled={!workshop.vagas_disponiveis}
          >
            <Radio.Indicator />
            <span className="w-full">{workshop.nome}</span>
            {!workshop.vagas_disponiveis && (
              <Tooltip label="Vagas esgotadas">
                <Info className="size-4" />
              </Tooltip>
            )}
          </Radio.Card>
        ))}
      </div>
    </RadioGroup>
  )
}
