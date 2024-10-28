'use client'

import { forwardRef, PropsWithChildren } from 'react'
import { Button, Popover, Badge } from '@mantine/core'
import { ChevronDown } from 'lucide-react'
import { Content } from './content'
import {
  SelectedItemsProvider,
  useSelectedItems
} from './selected-items-provider'
import { DefaultOption, AsyncFilterProps } from './types'

export function AsyncFilter<T extends object = DefaultOption>({
  children,
  loadOptions,
  renderOption,
  getOptionValue,
  getOptionLabel,
  filterId,
  searchParamKey = 'selectedItems',
  filterFn
}: AsyncFilterProps<T>) {
  const isDefaultOption = (option: T): option is T & DefaultOption =>
    'id' in option && 'label' in option

  const handlers = {
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
      <span className="flex-grow font-medium">{handlers.getLabel(option)}</span>
    ))

  const finalFilterFn =
    filterFn ||
    ((option: T, search: string) =>
      handlers.getLabel(option).toLowerCase().includes(search.toLowerCase()))

  return (
    <SelectedItemsProvider searchParamKey={searchParamKey}>
      <Popover width={300} position="bottom-start" shadow="xl">
        <Popover.Target>
          <FilterButton>{children}</FilterButton>
        </Popover.Target>
        <Popover.Dropdown className="p-0">
          <Content
            {...{
              loadOptions,
              renderOption: finalRenderOption,
              getOptionValue: handlers.getValue,
              getOptionLabel: handlers.getLabel,
              filterId,
              filterFn: finalFilterFn
            }}
          />
        </Popover.Dropdown>
      </Popover>
    </SelectedItemsProvider>
  )
}

const FilterButton = forwardRef<HTMLButtonElement, PropsWithChildren>(
  ({ children, ...props }, ref) => {
    const { selectedItems } = useSelectedItems()
    return (
      <Button
        ref={ref}
        variant="default"
        classNames={{
          root: ''
        }}
        rightSection={<ChevronDown className="size-4" />}
        {...props}
      >
        {children}
        {selectedItems.size > 0 && (
          <Badge circle size="sm" variant="filled" className="ml-2">
            {selectedItems.size}
          </Badge>
        )}
      </Button>
    )
  }
)

FilterButton.displayName = 'FilterButton'
