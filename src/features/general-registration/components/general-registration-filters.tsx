'use client'

import { AsyncFilter } from '@/components/ui/filters/async'
import { StaticFilter } from '@/components/ui/filters/static'
import { SearchInput } from '@/components/ui/search-input'
import { getEixosFilterOptions } from '@/features/registration-monitoring/api/client/get-eixos'

const REGISTRATION_STATUS_OPTIONS = [
  { label: 'Votante', id: 'votante' },
  { label: 'Ouvinte', id: 'ouvinte' }
]

export function GeneralRegistrationFilters() {
  return (
    <div className="flex flex-1 items-center space-x-4">
      <SearchInput
        className="max-w-full flex-1"
        placeholder="Pesquisar por nome ou CPF"
      />
      <StaticFilter
        showSearch={false}
        showSelectedOnTop={false}
        searchParamKey="tipo_inscricao"
        options={REGISTRATION_STATUS_OPTIONS}
      >
        Inscrição
      </StaticFilter>
      <AsyncFilter
        showSearch={false}
        showSelectedOnTop={false}
        loadOptions={getEixosFilterOptions}
        getOptionLabel={(option) => option.nome}
        getOptionId={(option) => option.id}
        filterId="eixos"
        searchParamKey="eixos"
      >
        Eixos
      </AsyncFilter>
    </div>
  )
}
