import { UseFormReturnType } from '@mantine/form'
import { Radio, RadioGroup } from '@mantine/core'
import {
  CouncilLocation,
  CouncilRepresentativeType,
  MemberType
} from '../types/counselor'
import { FormValues } from './register-counselor-form'

export function CouncilInfoStep({
  form
}: {
  form: UseFormReturnType<FormValues>
}) {
  return (
    <>
      <RadioGroup
        label="Representante de qual conselho?"
        withAsterisk
        className="col-span-2"
        {...form.getInputProps('conselho')}
      >
        <div className="grid grid-cols-2 gap-4">
          <Radio.Card
            className="flex items-center space-x-3 rounded border p-3 text-sm text-gray-700"
            value={CouncilLocation.VALE_DO_SAMBITO}
          >
            <Radio.Indicator />
            <span>Vale do Sambito</span>
          </Radio.Card>
          <Radio.Card
            className="flex items-center space-x-3 rounded border p-3 text-sm text-gray-700"
            value={CouncilLocation.CARNAUBAIS}
          >
            <Radio.Indicator />
            <span>Carnaubais</span>
          </Radio.Card>
          <Radio.Card
            className="flex items-center space-x-3 rounded border p-3 text-sm text-gray-700"
            value={CouncilLocation.CHAPADAS_DAS_MANGABEIRAS}
          >
            <Radio.Indicator />
            <span>Chapada das Mangabeiras</span>
          </Radio.Card>
          <Radio.Card
            className="flex items-center space-x-3 rounded border p-3 text-sm text-gray-700"
            value={CouncilLocation.COCAIS}
          >
            <Radio.Indicator />
            <span>Cocais</span>
          </Radio.Card>
          <Radio.Card
            className="flex items-center space-x-3 rounded border p-3 text-sm text-gray-700"
            value={CouncilLocation.ENTRE_RIOS}
          >
            <Radio.Indicator />
            <span>Entre Rios</span>
          </Radio.Card>
          <Radio.Card
            className="flex items-center space-x-3 rounded border p-3 text-sm text-gray-700"
            value={CouncilLocation.PLANICIE_LITORANEA}
          >
            <Radio.Indicator />
            <span>Planície Litorânea</span>
          </Radio.Card>
          <Radio.Card
            className="flex items-center space-x-3 rounded border p-3 text-sm text-gray-700"
            value={CouncilLocation.SERRA_DA_CAPIVARA}
          >
            <Radio.Indicator />
            <span>Serra da Capivara</span>
          </Radio.Card>
          <Radio.Card
            className="flex items-center space-x-3 rounded border p-3 text-sm text-gray-700"
            value={CouncilLocation.TABULEIRO_DO_ALTO_PARNAIBA}
          >
            <Radio.Indicator />
            <span>Tabuleiro do Alto Parnaíba</span>
          </Radio.Card>
          <Radio.Card
            className="flex items-center space-x-3 rounded border p-3 text-sm text-gray-700"
            value={CouncilLocation.VALE_DO_RIO_GUARIBAS}
          >
            <Radio.Indicator />
            <span>Vale do Rio Guaribas</span>
          </Radio.Card>
          <Radio.Card
            className="flex items-center space-x-3 rounded border p-3 text-sm text-gray-700"
            value={CouncilLocation.VALE_DO_CANINDE}
          >
            <Radio.Indicator />
            <span>Vale do Canindé</span>
          </Radio.Card>
          <Radio.Card
            className="flex items-center space-x-3 rounded border p-3 text-sm text-gray-700"
            value={CouncilLocation.VALE_DO_ITAIM}
          >
            <Radio.Indicator />
            <span>Vale do Itaim</span>
          </Radio.Card>
          <Radio.Card
            className="flex items-center space-x-3 rounded border p-3 text-sm text-gray-700"
            value={CouncilLocation.VALE_DO_PIAUI_E_ITAUEIRA}
          >
            <Radio.Indicator />
            <span>Vale do Piauí e Itaueira</span>
          </Radio.Card>
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
