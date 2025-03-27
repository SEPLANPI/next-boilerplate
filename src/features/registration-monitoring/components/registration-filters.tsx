'use client'

import { AsyncFilter } from '@/components/ui/filters/async'
import { StaticFilter } from '@/components/ui/filters/static'
import { SearchInput } from '@/components/ui/search-input'
import { getEixosFilterOptions } from '../api/client/get-eixos'

type RegistrationStatus = 'APROVADO' | 'REPROVADO' | 'PENDENTE'

const STATUS_OPTIONS = [
  { label: 'Aprovado', id: 'APROVADO' },
  { label: 'Reprovado', id: 'REPROVADO' },
  { label: 'Pendente', id: 'PENDENTE' }
]

const statusColors: Record<RegistrationStatus, string> = {
  APROVADO: 'bg-green-600',
  REPROVADO: 'bg-red-600',
  PENDENTE: 'bg-amber-600'
}

export function RegistrationFilters() {
  return (
    <div className="flex flex-1 items-center space-x-4">
      <SearchInput
        className="max-w-full flex-1"
        placeholder="Pesquisar por nome ou CPF"
      />
      <StaticFilter
        showSearch={false}
        showSelectedOnTop={false}
        searchParamKey="status"
        options={STATUS_OPTIONS}
        renderOption={(option) => (
          <div className="flex items-center gap-2">
            <div
              className={`size-3 rounded-sm ${statusColors[option.id as RegistrationStatus]}`}
            />
            <span className="flex-grow font-medium">{option.label}</span>
          </div>
        )}
      >
        Status
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
