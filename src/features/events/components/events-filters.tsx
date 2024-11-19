'use client'

import { AsyncFilter } from '@/components/ui/async-filter'
import { getUgs } from '../lib/fetchers/get-ugs'
import { DateRangeFilter } from '@/components/ui/date-range-filter'
import { EventsGroupFilter } from './events-group-filter'
import { Divider } from '@mantine/core'
import { getMunicipios } from '../lib/fetchers/get-municipios'
import { getDeputados } from '../lib/fetchers/get-deputados'

export function EventsFilters() {
  return (
    <>
      <EventsGroupFilter />
      <Divider orientation="vertical" />
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
      <AsyncFilter
        loadOptions={getMunicipios}
        filterId="municipios"
        searchParamKey="municipios"
        getOptionLabel={(option) => option.nome}
        getOptionValue={(option) => option.nome}
      >
        Município
      </AsyncFilter>

      <AsyncFilter
        loadOptions={getDeputados}
        filterId="deputados"
        searchParamKey="deputados"
        getOptionLabel={(option) => option.nome}
        getOptionValue={(option) => option.nome}
      >
        Deputado
      </AsyncFilter>
      <DateRangeFilter>Data</DateRangeFilter>
      {/* <ValueRangeFilter */}
      {/*   min={0} */}
      {/*   max={2000000} */}
      {/*   data={[ */}
      {/*     { value: 0, count: 15 }, */}
      {/*     { value: 100000, count: 27 }, */}
      {/*     { value: 200000, count: 36 }, */}
      {/*     { value: 300000, count: 41 }, */}
      {/*     { value: 400000, count: 48 }, */}
      {/*     { value: 500000, count: 54 }, */}
      {/*     { value: 600000, count: 59 }, */}
      {/*     { value: 700000, count: 64 }, */}
      {/*     { value: 800000, count: 68 }, */}
      {/*     { value: 900000, count: 71 }, */}
      {/*     { value: 1000000, count: 73 }, */}
      {/*     { value: 1100000, count: 76 }, */}
      {/*     { value: 1200000, count: 79 }, */}
      {/*     { value: 1300000, count: 81 }, */}
      {/*     { value: 1400000, count: 84 }, */}
      {/*     { value: 1500000, count: 85 }, */}
      {/*     { value: 1600000, count: 87 }, */}
      {/*     { value: 1700000, count: 90 }, */}
      {/*     { value: 1800000, count: 92 }, */}
      {/*     { value: 1900000, count: 93 }, */}
      {/*     { value: 2000000, count: 95 } */}
      {/*   ]} */}
      {/* > */}
      {/*   Valor */}
      {/* </ValueRangeFilter> */}
    </>
  )
}
