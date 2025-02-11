'use client'

import { AsyncFilter } from '@/components/ui/async-filter'
import { getTerritoryFilterOptions } from '../api/client/get-territory-options'

export function CitiesFilters() {
  return (
    <AsyncFilter
      loadOptions={getTerritoryFilterOptions}
      searchParamKey="territories"
      filterId="territories"
      getOptionLabel={(option) => option.nome}
      getOptionValue={(option) => option.id.toString()}
    >
      Territórios
    </AsyncFilter>
  )
}
