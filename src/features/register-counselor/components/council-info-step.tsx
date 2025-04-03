import { UseFormReturnType } from '@mantine/form'
import {
  Checkbox,
  Divider,
  InputDescription,
  InputLabel,
  Radio,
  RadioGroup
} from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { CouncilRepresentativeType, MemberType } from '../types/counselor'
import { FormValues } from './register-counselor-form'
import { getCouncils } from '../api/client/get-councils'
import { useEffect } from 'react'
import { RadioCard } from '@/components/ui/radio-card'

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

  const councilOptions =
    councils?.map((council) => ({
      value: council.id.toString(),
      label: council.nome
    })) || []

  // Reset bank fields when council type changes
  useEffect(() => {
    const currentType = form.values.tipo_conselho
    if (currentType !== CouncilRepresentativeType.SOCIEDADE_CIVIL) {
      form.setFieldValue('ajuda_custo', false)
      form.setFieldValue('banco_id', '')
      form.setFieldValue('agencia', '')
      form.setFieldValue('conta', '')
      form.setFieldValue('nome_titular', '')
      form.setFieldValue('comprovante_bancario', null)
    }
  }, [form.values.tipo_conselho])

  const isSociedadeCivil =
    form.values.tipo_conselho === CouncilRepresentativeType.SOCIEDADE_CIVIL

  return (
    <>
      <RadioGroup
        label="Representante de qual conselho?"
        withAsterisk
        className="col-span-2"
        {...form.getInputProps('conselho_id')}
      >
        <div className="grid grid-cols-2 gap-4">
          {councilOptions.map((option) => (
            <RadioCard key={option.value} {...option} />
          ))}
        </div>
      </RadioGroup>

      <RadioGroup
        label="Composição no conselho"
        withAsterisk
        className="col-span-2"
        {...form.getInputProps('tipo_membro')}
      >
        <div className="flex space-x-3">
          <Radio value={MemberType.NUCLEO_GESTOR} label="Núcleo Gestor" />
          <Radio value={MemberType.MEMBRO} label="Membro" />
        </div>
      </RadioGroup>

      <RadioGroup
        label="Representação no conselho"
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
      {isSociedadeCivil && (
        <div className="col-span-2 !mt-2">
          <Checkbox.Card
            className="col-span-2 border-0"
            {...form.getInputProps('ajuda_custo', { type: 'checkbox' })}
          >
            <div className="flex space-x-4 border-0">
              <Checkbox.Indicator />
              <div className="flex flex-col space-y-2 text-sm">
                <p className="leading-none">Preciso de ajuda de custo</p>
                <InputDescription>
                  A ajuda de custo será fornecida exclusivamente aos
                  conselheiros que não residem na cidade onde o evento ocorrerá.
                </InputDescription>
              </div>
            </div>
          </Checkbox.Card>
        </div>
      )}
    </>
  )
}
