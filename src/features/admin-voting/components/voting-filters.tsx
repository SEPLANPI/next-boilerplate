'use client'

import { AsyncFilter } from '@/components/ui/filters/async'
import { SearchInput } from '@/components/ui/search-input'
import { getEixosFilterOptions } from '@/features/registration-monitoring/api/client/get-eixos'

export function VotingFilters() {
  return (
    <div className="flex flex-1 items-center space-x-4">
      <SearchInput className="max-w-full flex-1" />
      <AsyncFilter
        showSearch={false}
        showSelectedOnTop={false}
        loadOptions={getEixosFilterOptions}
        getOptionLabel={(option) => option.nome}
        getOptionId={(option) => option.id}
        filterId="eixo"
        searchParamKey="eixo"
      >
        Eixos
      </AsyncFilter>
    </div>
  )
}
