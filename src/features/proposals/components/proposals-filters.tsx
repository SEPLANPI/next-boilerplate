'use client'

import { AsyncFilter } from '@/components/ui/filters/async'
import { StaticFilter } from '@/components/ui/filters/static'
import { SearchInput } from '@/components/ui/search-input'
import { getEixosFilterOptions } from '@/features/registration-monitoring/api/client/get-eixos'

type RegistrationStatus =
  | 'APROVADA'
  | 'REJEITADA'
  | 'PENDENTE'
  | 'EM_VOTACAO'
  | 'ELEITA'

const STATUS_OPTIONS = [
  { label: 'Pendente', id: 'PENDENTE' },
  { label: 'Rejeitado', id: 'REJEITADA' },
  { label: 'Aprovado', id: 'APROVADA' },
  { label: 'Em Votação', id: 'EM_VOTACAO' },
  { label: 'Eleita', id: 'ELEITA' }
]

const statusColors: Record<RegistrationStatus, string> = {
  APROVADA: 'bg-green-600',
  REJEITADA: 'bg-red-600',
  PENDENTE: 'bg-amber-600',
  EM_VOTACAO: 'bg-blue-600',
  ELEITA: 'bg-purple-600'
}

export function ProposalsFilters() {
  return (
    <div className="flex flex-1 items-center space-x-4">
      <SearchInput
        className="max-w-full flex-1"
        placeholder="Pesquisar por título"
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
