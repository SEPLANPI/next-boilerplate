import { UseFormReturnType } from '@mantine/form'
import { Radio, RadioGroup, Select } from '@mantine/core'
import {
  CouncilLocation,
  CouncilRepresentativeType,
  MemberType
} from '../types/counselor'
import { z } from 'zod'

export const councilInfoSchema = z.object({
  conselho: z.nativeEnum(CouncilLocation),
  tipo_conselho: z.enum(['PODER_PUBLICO', 'SOCIEDADE_CIVIL'])
})

export function CouncilInfoStep({ form }: { form: UseFormReturnType<any> }) {
  return (
    <>
      <RadioGroup
        label="Representante de qual conselho?"
        withAsterisk
        className="col-span-2"
        {...form.getInputProps('endereco.tipo_endereco')}
      >
        <div className="grid grid-cols-2 gap-4">
          <Radio
            className="rounded border p-3"
            value={CouncilLocation.VALE_DO_SAMBITO}
            label="Vale do Sambito"
          />
          <Radio
            className="rounded border p-3"
            value={CouncilLocation.CARNAUBAIS}
            label="Carnaubais"
          />
          <Radio
            className="rounded border p-3"
            value={CouncilLocation.CHAPADAS_DAS_MANGABEIRAS}
            label="Chapada das Mangabeiras"
          />
          <Radio
            className="rounded border p-3"
            value={CouncilLocation.COCAIS}
            label="Cocais"
          />
          <Radio
            className="rounded border p-3"
            value={CouncilLocation.ENTRE_RIOS}
            label="Entre Rios"
          />
          <Radio
            className="rounded border p-3"
            value={CouncilLocation.PLANICIE_LITORANEA}
            label="Planície Litorânea"
          />
          <Radio
            className="rounded border p-3"
            value={CouncilLocation.SERRA_DA_CAPIVARA}
            label="Serra da Capivara"
          />
          <Radio
            className="rounded border p-3"
            value={CouncilLocation.TABULEIRO_DO_ALTO_PARNAIBA}
            label="Tabuleiro do Alto Parnaíba"
          />
          <Radio
            className="rounded border p-3"
            value={CouncilLocation.VALE_DO_RIO_GUARIBAS}
            label="Vale do Rio Guaribas"
          />
          <Radio
            className="rounded border p-3"
            value={CouncilLocation.VALE_DO_CANINDE}
            label="Vale do Canindé"
          />
          <Radio
            className="rounded border p-3"
            value={CouncilLocation.VALE_DO_ITAIM}
            label="Vale do Itaim"
          />
          <Radio
            className="rounded border p-3"
            value={CouncilLocation.VALE_DO_PIAUI_E_ITAUEIRA}
            label="Vale do Piauí e Itaueira"
          />
        </div>
      </RadioGroup>

      <RadioGroup
        label="Representação no conselho"
        withAsterisk
        className="col-span-2"
        {...form.getInputProps('endereco.tipo_endereco')}
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
        {...form.getInputProps('endereco.tipo_endereco')}
      >
        <div className="flex space-x-3">
          <Radio value={MemberType.NUCLEO_GESTOR} label="Núcleo Gestor" />
          <Radio value={MemberType.MEMBRO} label="Membro" />
        </div>
      </RadioGroup>
    </>
  )
}
