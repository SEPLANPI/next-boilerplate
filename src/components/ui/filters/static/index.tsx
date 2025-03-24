'use client'

import { Popover } from '@mantine/core'
import { DefaultOption } from '../common/types'
import { FilterButton } from '../common/filter-button'
import { SelectedItemsProvider } from '../common/selected-items-provider'
import { BaseContent } from '../common/content'
import { StaticFilterProps } from './types'

export function StaticFilter<T extends object = DefaultOption>({
  children,
  options,
  renderOption,
  getOptionId,
  getOptionLabel,
  isDisabled,
  searchParamKey = 'selectedItems',
  filterFn,
  showSearch = true,
  showSelectedOnTop = true
}: StaticFilterProps<T>) {
  const isDefaultOption = (option: T): option is T & DefaultOption =>
    'id' in option && 'label' in option

  const handlers = {
    getId: (option: T): string => {
      if (getOptionId) return getOptionId(option)
      if (isDefaultOption(option)) return option.id
      throw new Error('getOptionId is required for non-DefaultOption types')
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
        className={`flex-grow font-medium ${
          isDisabled?.(option) ? 'text-gray-400' : ''
        }`}
      >
        {handlers.getLabel(option)}
      </span>
    ))

  const finalFilterFn =
    filterFn ||
    ((option: T, search: string) =>
      handlers.getLabel(option).toLowerCase().includes(search.toLowerCase()))

  const finalIsDisabled = isDisabled || (() => false)

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
            getOptionId={handlers.getId}
            getOptionLabel={handlers.getLabel}
            isDisabled={finalIsDisabled}
            filterFn={finalFilterFn}
            showSearch={showSearch}
            showSelectedOnTop={showSelectedOnTop}
          />
        </Popover.Dropdown>
      </Popover>
    </SelectedItemsProvider>
  )
}
