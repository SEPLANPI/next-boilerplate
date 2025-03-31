import { UseFormReturnType } from '@mantine/form'
import { RegistrationType } from '../data/person-schema'
import { useQuery } from '@tanstack/react-query'
import { getWorkshopsOptions } from '@/features/register-counselor/api/client/get-workshops-options'
import { RadioGroup } from '@mantine/core'
import { FormValues } from './register-person-form'
import { RadioCard } from '@/components/ui/radio-card'

const REGISTRATION_TYPES = [
  {
    value: RegistrationType.OFICINA,
    label: 'Oficina',
    description:
      'Participe de uma oficina temática com discussões e atividades práticas em grupo'
  },
  {
    value: RegistrationType.PLENARIA,
    label: 'Plenária',
    description:
      'Participe da sessão plenária com apresentações e debates gerais'
  }
]

export function RegistrationStep({
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
    <>
      <RadioGroup
        label="Tipo de Inscrição"
        withAsterisk
        className="col-span-2"
        {...form.getInputProps('tipo_inscricao')}
      >
        <div className="flex flex-col gap-4">
          {REGISTRATION_TYPES.map((option) => (
            <RadioCard key={option.value} {...option} />
          ))}
        </div>
      </RadioGroup>

      {form.values.tipo_inscricao === RegistrationType.OFICINA && (
        <RadioGroup
          label="Selecione a oficina desejada"
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
      )}
    </>
  )
}
