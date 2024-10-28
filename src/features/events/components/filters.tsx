'use client'

import { AsyncFilter } from '@/components/ui/async-filter'
import { getUgs } from '../actions/get-ugs'

export function EventsFilters() {
  return (
    <>
      <AsyncFilter
        loadOptions={getUgs}
        filterFn={(option, search) =>
          option.name.toLowerCase().includes(search)
        }
        getOptionValue={(option) => option.number.toString()}
        getOptionLabel={(option) => option.name}
        filterId="ugs"
        searchParamKey="ugs"
      >
        Unidade Gestora
      </AsyncFilter>
    </>
  )
}
