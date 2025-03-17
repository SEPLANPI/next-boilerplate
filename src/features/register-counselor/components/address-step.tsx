import { UseFormReturnType } from '@mantine/form'
import { TextInput, Select, RadioGroup, Radio } from '@mantine/core'
import { z } from 'zod'
import { useEffect } from 'react'

enum AddressType {
  URBAN = 'URBANA',
  RURAL = 'RURAL'
}

export function AddressStep({ form }: { form: UseFormReturnType<any> }) {
  return (
    <>
      <RadioGroup
        label="Reside em"
        className="col-span-2"
        {...form.getInputProps('endereco.tipo_endereco')}
      >
        <div className="flex space-x-3">
          <Radio value={AddressType.URBAN} label="Urbano" />
          <Radio value={AddressType.RURAL} label="Rural" />
        </div>
      </RadioGroup>

      {form.values.endereco?.tipo_endereco === AddressType.URBAN ? (
        <>
          <TextInput
            label="Rua/Avenida"
            {...form.getInputProps('endereco.rua')}
          />
          <TextInput
            label="Número"
            {...form.getInputProps('endereco.numero')}
          />
          <TextInput
            label="Complemento"
            className="col-span-2"
            {...form.getInputProps('endereco.complemento')}
          />
          <TextInput
            label="Bairro"
            className="col-span-2"
            {...form.getInputProps('endereco.bairro')}
          />
        </>
      ) : (
        <TextInput
          label="Referência"
          className="col-span-2"
          placeholder="Próximo à..."
          {...form.getInputProps('endereco.referencia')}
        />
      )}

      <Select
        label="Município"
        data={[]}
        {...form.getInputProps('endereco.municipio_id')}
      />
      <TextInput label="CEP" {...form.getInputProps('endereco.cep')} />
    </>
  )
}
