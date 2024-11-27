import { PropsWithChildren } from 'react'

export type DefaultOption = {
  id: string
  label: string
}

export type SelectedItemsContextType = {
  selectedItems: Set<string>
  toggleItem: (value: string) => void
}

export type IsDefaultOption<T> = T extends DefaultOption ? true : false

export type AsyncFilterProps<T> = PropsWithChildren<
  {
    loadOptions: () => Promise<T[]>
    renderOption?: (option: T) => JSX.Element
    filterId: string
    searchParamKey?: string
    filterFn?: (option: T, search: string) => boolean
  } & (IsDefaultOption<T> extends true
    ? {
        getOptionValue?: (option: T) => string
        getOptionLabel?: (option: T) => string
      }
    : {
        getOptionValue: (option: T) => string
        getOptionLabel: (option: T) => string
      })
>
export type ContentProps<T> = {
  renderOption: (option: T) => JSX.Element
  loadOptions: () => Promise<T[]>
  getOptionValue: (option: T) => string
  getOptionLabel: (option: T) => string
  filterId: string
  filterFn: (option: T, search: string) => boolean
}
