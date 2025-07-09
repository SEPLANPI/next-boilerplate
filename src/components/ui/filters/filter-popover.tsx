'use client'

import { Alert, Loader, Popover } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { BaseContent } from './components/base-content'
import { FilterButton } from './components/filter-button'
import { SelectedItemsProvider } from './providers/selected-items-provider'
import type { DefaultOption, FilterPopoverProps } from './types'

export const FilterPopover = <T extends object>({
  children,
  loadOptions,
  options,
  renderOption,
  getOptionValue,
  getOptionLabel,
  isDisabled,
  filterId,
  searchParamKey = 'selectedItems',
  filterFn,
  showSearch = true,
  showSelectedOnTop = true,
  position = 'bottom-end',
  width = 300
}: FilterPopoverProps<T>) => {
  const { data, error, isFetching } = useQuery({
    queryKey: [`filter-${filterId}`],
    queryFn: loadOptions,
    enabled: !!loadOptions
  })

  const isDefaultOption = (option: T): option is T & DefaultOption =>
    'id' in option && 'label' in option

  const handlers = {
    getValue: (option: T): string => {
      if (getOptionValue) return getOptionValue(option)
      if (isDefaultOption(option)) return String(option.id)
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
        className={`flex-grow ${isDisabled?.(option) ? 'text-gray-400' : ''}`}
      >
        {handlers.getLabel(option)}
      </span>
    ))

  const finalFilterFn =
    filterFn ||
    ((option: T, search: string) =>
      handlers.getLabel(option).toLowerCase().includes(search.toLowerCase()))

  const finalIsDisabled = isDisabled || (() => false)
  const finalOptions = options || data || []

  return (
    <SelectedItemsProvider searchParamKey={searchParamKey}>
      <Popover width={width} position={position} shadow="m5">
        <Popover.Target>
          <FilterButton>{children}</FilterButton>
        </Popover.Target>
        <Popover.Dropdown className="p-0">
          {isFetching ? (
            <div className="flex flex-col items-center space-y-4 p-6">
              <Loader size="sm" />
              <span className="text-sm font-semibold">Carregando...</span>
            </div>
          ) : error ? (
            <Alert color="red" title="Erro ao carregar opções" className="m-2">
              {error.message}
            </Alert>
          ) : (
            <BaseContent
              options={finalOptions}
              renderOption={finalRenderOption}
              getOptionValue={handlers.getValue}
              getOptionLabel={handlers.getLabel}
              isDisabled={finalIsDisabled}
              filterFn={finalFilterFn}
              showSearch={showSearch}
              showSelectedOnTop={showSelectedOnTop}
            />
          )}
        </Popover.Dropdown>
      </Popover>
    </SelectedItemsProvider>
  )
}
