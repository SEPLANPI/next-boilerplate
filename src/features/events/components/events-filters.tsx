'use client'

import { AsyncFilter } from '@/components/ui/async-filter'
import { getUgs } from '../actions/get-ugs'

export function EventsFilters() {
  return (
    <>
      <AsyncFilter
        loadOptions={getUgs}
        filterFn={(option, search) =>
          option.name.toLowerCase().includes(search) ||
          option.sigla.toLowerCase().includes(search)
        }
        getOptionValue={(option) => option.number.toString()}
        getOptionLabel={(option) => option.name}
        filterId="ugs"
        searchParamKey="ugs"
        renderOption={(option) => (
          <span className="flex min-w-0 flex-col space-y-1 text-xs">
            <span className="font-semibold">{option.sigla}</span>
            <span className="min-w-0 truncate font-medium text-muted-foreground">
              {option.name}
            </span>
          </span>
        )}
      >
        Unidade Gestora
      </AsyncFilter>
    </>
  )
}
