'use client'

import { AsyncFilter } from '@/components/ui/async-filter'
import { getUnitFilterOptions } from '../api/client/get-unit-options'
import { DateRangeFilter } from '@/components/ui/date-range-filter'
import { EventsGroupFilter } from './events-group-filter'
import { Divider } from '@mantine/core'
import { getCityFilterOptions } from '../api/client/get-city-options'
import { getDeputyFilterOptions } from '../api/client/get-deputy-options'
import { dayjs } from '@/lib/dayjs'

const dateShortcuts = [
  {
    label: 'Last week',
    fn: () => ({
      fromDate: dayjs().subtract(7, 'day').startOf('day').toDate(),
      toDate: dayjs().endOf('day').toDate()
    })
  },
  {
    label: 'Last month',
    fn: () => ({
      fromDate: dayjs().subtract(1, 'month').startOf('day').toDate(),
      toDate: dayjs().endOf('day').toDate()
    })
  },
  {
    label: 'Last 3 months',
    fn: () => ({
      fromDate: dayjs().subtract(3, 'month').startOf('day').toDate(),
      toDate: dayjs().endOf('day').toDate()
    })
  },
  {
    label: 'Last 6 months',
    fn: () => ({
      fromDate: dayjs().subtract(6, 'month').startOf('day').toDate(),
      toDate: dayjs().endOf('day').toDate()
    })
  },

  {
    label: 'Last 12 months',
    fn: () => ({
      fromDate: dayjs().subtract(1, 'year').startOf('day').toDate(),
      toDate: dayjs().endOf('day').toDate()
    })
  },
  {
    label: 'This year',
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
        loadOptions={getUnitFilterOptions}
        filterFn={(option, search) =>
          option.name.toLowerCase().includes(search) ||
          option.sigla.toLowerCase().includes(search)
        }
        getOptionValue={(option) => option.number.toString()}
        getOptionLabel={(option) => option.name}
        getOptionDisabled={(option) => !option.has_events}
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
        loadOptions={getCityFilterOptions}
        filterId="municipios"
        searchParamKey="municipios"
        getOptionLabel={(option) => option.nome}
        getOptionValue={(option) => option.id?.toString() || 'null'}
      >
        Município
      </AsyncFilter>

      <AsyncFilter
        loadOptions={getDeputyFilterOptions}
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
