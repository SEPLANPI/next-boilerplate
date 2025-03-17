import { UseFormReturnType } from '@mantine/form'
import { TextInput, Select, RadioGroup, Radio, Input } from '@mantine/core'
import { useEffect } from 'react'
import { IMaskInput } from 'react-imask'
import { FormValues } from './register-counselor-form'
import { useQuery } from '@tanstack/react-query'
import { getMunicipalitiesFilterOptions } from '../api/client/get-municipalities-filter-options'
import { filterOptions } from '@/utils/filter-options'
import { notifications } from '@mantine/notifications'
import { useZipCode } from '../hooks/use-zip-code'

enum AddressType {
  URBAN = 'URBANA',
  RURAL = 'RURAL'
}

export function AddressStep({ form }: { form: UseFormReturnType<FormValues> }) {
  const { data: municipalities, isLoading: isMunicipalitiesLoading } = useQuery(
    {
      queryKey: ['municipalities'],
      queryFn: getMunicipalitiesFilterOptions,
      staleTime: 24 * 60 * 60 * 1000,
      gcTime: 7 * 24 * 60 * 60 * 1000
    }
  )

  const zipCode = form.getTransformedValues().endereco.cep
  const { data: zipCodeData, error: zipCodeError } = useZipCode(zipCode)

  useEffect(() => {
    if (zipCodeError) {
      notifications.show({
        id: 'zip-code-error',
        title: 'Erro ao buscar CEP',
        message: 'Não foi possível encontrar o endereço para este CEP',
        color: 'red'
      })
      return
    }

    if (zipCodeData) {
      form.setFieldValue('endereco.rua', zipCodeData.logradouro)
      form.setFieldValue('endereco.bairro', zipCodeData.bairro)
      form.setFieldValue('endereco.complemento', zipCodeData.complemento)

      if (zipCodeData.localidade && municipalities) {
        const municipality = municipalities.find(
          (city) =>
            city.nome.toLowerCase() === zipCodeData.localidade.toLowerCase()
        )
        if (municipality) {
          form.setFieldValue(
            'endereco.municipio_id',
            municipality.id.toString()
          )
        }
      }
    }
  }, [zipCodeData, zipCodeError, municipalities])

  const municipalititesOptions =
    municipalities
      ?.filter((city) => city.id != null)
      .map((city) => ({
        value: city.id.toString(),
        label: city.nome
      })) || []

  return (
    <>
      <RadioGroup
        withAsterisk
        label="Reside em"
        className="col-span-2"
        {...form.getInputProps('endereco.tipo_endereco')}
      >
        <div className="flex space-x-3">
          <Radio value={AddressType.URBAN} label="Urbano" />
          <Radio value={AddressType.RURAL} label="Rural" />
        </div>
      </RadioGroup>
      <Input.Wrapper withAsterisk label="CEP">
        <Input
          component={IMaskInput}
          mask="00000-000"
          placeholder="00000-000"
          {...form.getInputProps('endereco.cep')}
        />
      </Input.Wrapper>
      <Select
        filter={filterOptions}
        searchable
        withAsterisk
        label="Município"
        disabled={isMunicipalitiesLoading}
        data={municipalititesOptions}
        {...form.getInputProps('endereco.municipio_id')}
      />
      {form.values.endereco?.tipo_endereco === AddressType.URBAN ? (
        <>
          <TextInput
            withAsterisk
            className="col-span-2"
            label="Bairro"
            {...form.getInputProps('endereco.bairro')}
          />
          <TextInput
            withAsterisk
            label="Rua/Avenida"
            {...form.getInputProps('endereco.rua')}
          />
          <TextInput
            withAsterisk
            label="Número"
            {...form.getInputProps('endereco.numero')}
          />
          <TextInput
            label="Complemento"
            className="col-span-2"
            placeholder="Apto, Bloco, Casa, etc."
            {...form.getInputProps('endereco.complemento')}
          />
        </>
      ) : (
        <>
          <TextInput
            withAsterisk
            label="Referência"
            className="col-span-2"
            placeholder="Próximo à..."
            {...form.getInputProps('endereco.referencia')}
          />
        </>
      )}
    </>
  )
}
