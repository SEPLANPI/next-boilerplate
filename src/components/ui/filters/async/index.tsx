'use client'

import { Popover, Loader, Alert } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { DefaultOption, OptionHandlers } from '../common/types'
import { FilterButton } from '../common/filter-button'
import { SelectedItemsProvider } from '../common/selected-items-provider'
import { BaseContent } from '../common/content'
import { AsyncFilterProps } from './types'

export function AsyncFilter<T extends object = DefaultOption>({
  children,
  loadOptions,
  renderOption,
  getOptionValue,
  getOptionLabel,
  getOptionDisabled,
  filterId,
  searchParamKey = 'selectedItems',
  filterFn,
  showSearch = true
}: AsyncFilterProps<T>) {
  const { data, error, isFetching } = useQuery({
    queryKey: [`async-filter-${filterId}`],
    queryFn: () => loadOptions()
  })

  const isDefaultOption = (option: T): option is T & DefaultOption =>
    'id' in option && 'label' in option

  const handlers: OptionHandlers<T> = {
    getValue: (option: T): string => {
      if (getOptionValue) return getOptionValue(option)
      if (isDefaultOption(option)) return option.id
      throw new Error('getOptionValue is required for non-DefaultOption types')
    },
    getLabel: (option: T): string => {
      if (getOptionLabel) return getOptionLabel(option)
      if (isDefaultOption(option)) return option.label
      throw new Error('getOptionLabel is required for non-DefaultOption types')
    }
  }

  const finalRenderOption =
    renderOption ||
    ((option: T) => (
      <span
        className={`flex-grow font-medium ${getOptionDisabled?.(option) ? 'text-gray-400' : ''}`}
      >
        {handlers.getLabel(option)}
      </span>
    ))

  const finalFilterFn =
    filterFn ||
    ((option: T, search: string) =>
      handlers.getLabel(option).toLowerCase().includes(search.toLowerCase()))

  const finalGetOptionDisabled = getOptionDisabled || (() => false)

  return (
    <SelectedItemsProvider searchParamKey={searchParamKey}>
      <Popover width={300} position="bottom-start" shadow="md">
        <Popover.Target>
          <FilterButton>{children}</FilterButton>
        </Popover.Target>
        <Popover.Dropdown className="p-0">
          {isFetching ? (
            <div className="flex flex-col items-center space-y-4 p-6">
              <Loader size="sm" />
              <span className="text-sm font-semibold text-secondary-foreground">
                Carregando...
              </span>
            </div>
          ) : error ? (
            <Alert color="red" title="Erro ao carregar opções" className="m-2">
              {error.message}
            </Alert>
          ) : (
            <BaseContent
              options={data || []}
              renderOption={finalRenderOption}
              getOptionValue={handlers.getValue}
              getOptionLabel={handlers.getLabel}
              getOptionDisabled={finalGetOptionDisabled}
              filterFn={finalFilterFn}
              showSearch={showSearch}
            />
          )}
        </Popover.Dropdown>
      </Popover>
    </SelectedItemsProvider>
  )
}
