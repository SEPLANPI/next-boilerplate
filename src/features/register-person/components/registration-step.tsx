import { UseFormReturnType } from '@mantine/form'
import { RegistrationType } from '../data/person-schema'
import { useQuery } from '@tanstack/react-query'
import { getWorkshopsOptions } from '@/features/register-counselor/api/client/get-workshops-options'
import { RadioGroup } from '@mantine/core'
import { FormValues } from './register-person-form'
import { RadioCard } from '@/components/ui/radio-card'

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
        label="Como deseja participar?"
        withAsterisk
        className="col-span-2"
        {...form.getInputProps('tipo_inscricao')}
      >
        <div className="flex flex-col gap-4">
          <RadioCard
            value={RegistrationType.PLENARIA}
            label="Participar apenas da plenária"
            description="Acompanhe a sessão da tarde, onde o governador comentará as propostas mais votadas."
          />
          <RadioCard
            value={RegistrationType.OFICINA}
            label="Participar de uma oficina e da plenária"
            description="Pela manhã, participe de uma oficina e ajude a escolher propostas. À tarde, acompanhe a plenária."
          />
        </div>
      </RadioGroup>

      {form.values.tipo_inscricao === RegistrationType.OFICINA && (
        <RadioGroup
          label="Escolha sua oficina da manhã"
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
