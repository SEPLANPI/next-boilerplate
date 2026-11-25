"use client"

import { Popover } from "@mantine/core"
import { SelectedItemsProvider } from "../providers/selected-items-provider"
import type { DefaultOption } from "../types"
import { BaseContent } from "./base-content"
import { FilterButton } from "./filter-button"

export interface StaticFilterPopoverProps<T extends object> {
  children?: React.ReactNode
  options: T[]
  renderOption?: (option: T) => React.JSX.Element
  getOptionValue?: (option: T) => string
  getOptionLabel?: (option: T) => string
  isDisabled?: (option: T) => boolean
  searchParamKey?: string
  filterFn?: (option: T, search: string) => boolean
  showSearch?: boolean
  showSelectedOnTop?: boolean
  position?: "bottom-end" | "bottom-start" | "top-end" | "top-start"
  width?: number | string
}

export const StaticFilterPopover = <T extends object>({
  children,
  options,
  renderOption,
  getOptionValue,
  getOptionLabel,
  isDisabled,
  searchParamKey = "selectedItems",
  filterFn,
  showSearch = true,
  showSelectedOnTop = true,
  position = "bottom-start",
  width = 300,
}: StaticFilterPopoverProps<T>) => {
  const isDefaultOption = (option: T): option is T & DefaultOption =>
    "id" in option && "label" in option

  const handlers = {
    getValue: (option: T): string => {
      if (getOptionValue) return getOptionValue(option)
      if (isDefaultOption(option)) return String(option.id)
      throw new Error("getOptionValue is required for non-DefaultOption types")
    },
    getLabel: (option: T): string => {
      if (getOptionLabel) return getOptionLabel(option)
      if (isDefaultOption(option)) return option.label
      throw new Error("getOptionLabel is required for non-DefaultOption types")
    },
  }

  const finalRenderOption =
    renderOption ||
    ((option: T) => (
      <span
        className={`flex-grow ${isDisabled?.(option) ? "text-gray-400" : ""}`}
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
      <Popover width={width} position={position} shadow="m5">
        <Popover.Target>
          <FilterButton>{children}</FilterButton>
        </Popover.Target>
        <Popover.Dropdown className="p-0">
          <BaseContent
            options={options}
            renderOption={finalRenderOption}
            getOptionValue={handlers.getValue}
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
