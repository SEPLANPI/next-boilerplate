'use client'

import { AsyncFilter } from '@/components/ui/async-filter'
import { getUgs } from '../api/client/get-ugs'
import { DateRangeFilter } from '@/components/ui/date-range-filter'
import { EventsGroupFilter } from './events-group-filter'
import { Divider } from '@mantine/core'
import { getMunicipios } from '../api/client/get-municipios'
import { getDeputados } from '../api/client/get-deputados'
import { dayjs } from '@/lib/dayjs'

const dateShortcuts = [
  {
    label: 'Última semana',
    fn: () => ({
      fromDate: dayjs().subtract(7, 'day').startOf('day').toDate(),
      toDate: dayjs().endOf('day').toDate()
    })
  },
  {
    label: 'Último mês',
    fn: () => ({
      fromDate: dayjs().subtract(1, 'month').startOf('day').toDate(),
      toDate: dayjs().endOf('day').toDate()
    })
  },
  {
    label: 'Últimos 3 meses',
    fn: () => ({
      fromDate: dayjs().subtract(3, 'month').startOf('day').toDate(),
      toDate: dayjs().endOf('day').toDate()
    })
  },
  {
    label: 'Últimos 6 meses',
    fn: () => ({
      fromDate: dayjs().subtract(6, 'month').startOf('day').toDate(),
      toDate: dayjs().endOf('day').toDate()
    })
  },

  {
    label: 'Último 12 meses',
    fn: () => ({
      fromDate: dayjs().subtract(1, 'year').startOf('day').toDate(),
      toDate: dayjs().endOf('day').toDate()
    })
  },
  {
    label: 'Este ano',
    fn: () => ({
      fromDate: dayjs().startOf('year').toDate(),
      toDate: dayjs().endOf('day').toDate()
    })
  }
]

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
      <DateRangeFilter shortcuts={dateShortcuts} maxDate={dayjs().toDate()}>
        Data
      </DateRangeFilter>
    </>
  )
}
