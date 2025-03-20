import { UseFormReturnType } from '@mantine/form'
import { Radio, RadioGroup } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { CouncilRepresentativeType, MemberType } from '../types/counselor'
import { FormValues } from './register-counselor-form'
import { getCouncils } from '../api/client/get-councils'

export function CouncilInfoStep({
  form
}: {
  form: UseFormReturnType<FormValues>
}) {
  const { data: councils } = useQuery({
    queryKey: ['councils'],
    queryFn: getCouncils,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000
  })

  return (
    <>
      <RadioGroup
        label="Representante de qual conselho?"
        withAsterisk
        className="col-span-2"
        {...form.getInputProps('conselho')}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {councils?.map((council) => (
            <Radio.Card
              key={council.id}
              className="flex items-center space-x-3 rounded border p-3 text-sm text-gray-700"
              value={council.code}
            >
              <Radio.Indicator />
              <span>{council.nome}</span>
            </Radio.Card>
          ))}
        </div>
      </RadioGroup>

      <RadioGroup
        label="Representação no conselho"
        withAsterisk
        className="col-span-2"
        {...form.getInputProps('tipo_conselho')}
      >
        <div className="flex space-x-3">
          <Radio
            value={CouncilRepresentativeType.PODER_PUBLICO}
            label="Poder Público"
          />
          <Radio
            value={CouncilRepresentativeType.SOCIEDADE_CIVIL}
            label="Sociedade Civil"
          />
        </div>
      </RadioGroup>

      <RadioGroup
        label="Composição no conselho"
        withAsterisk
        className="col-span-2"
        {...form.getInputProps('tipo_membro')}
      >
        <div className="flex space-x-3">
          <Radio value={MemberType.NUCLEO_GESTOR} label="Núcleo Gestor" />
          <Radio value={MemberType.MEMBRO} label="Membro" />
        </div>
      </RadioGroup>
    </>
  )
}
