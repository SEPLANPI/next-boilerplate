'use client'

import { Popover } from '@mantine/core'
import { DefaultOption, OptionHandlers } from '../common/types'
import { FilterButton } from '../common/filter-button'
import { SelectedItemsProvider } from '../common/selected-items-provider'
import { BaseContent } from '../common/content'
import { SyncFilterProps } from './types'

export function SyncFilter<T extends object = DefaultOption>({
  children,
  options,
  renderOption,
  getOptionValue,
  getOptionLabel,
  getOptionDisabled,
  searchParamKey = 'selectedItems',
  filterFn,
  showSearch = true
}: SyncFilterProps<T>) {
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
          <BaseContent
            options={options}
            renderOption={finalRenderOption}
            getOptionValue={handlers.getValue}
            getOptionLabel={handlers.getLabel}
            getOptionDisabled={finalGetOptionDisabled}
            filterFn={finalFilterFn}
            showSearch={showSearch}
          />
        </Popover.Dropdown>
      </Popover>
    </SelectedItemsProvider>
  )
}
