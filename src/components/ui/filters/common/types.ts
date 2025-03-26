import { PropsWithChildren } from 'react'

export type DefaultOption = {
  id: string
  label: string
}

export type IsDefaultOption<T> = T extends DefaultOption ? true : false

export type OptionHandlers<T> = {
  getId: (option: T) => string
  getLabel: (option: T) => string
}

export type BaseFilterProps<T> = PropsWithChildren<
  {
    renderOption?: (option: T) => JSX.Element
    searchParamKey: string
    filterFn?: (option: T, search: string) => boolean
    isDisabled?: (option: T) => boolean
    showSearch?: boolean
    showSelectedOnTop?: boolean
  } & (IsDefaultOption<T> extends true
    ? {
        getOptionId?: (option: T) => string
        getOptionLabel?: (option: T) => string
      }
    : {
        getOptionId: (option: T) => string
        getOptionLabel: (option: T) => string
      })
>

export type BaseContentProps<T> = {
  options: T[]
  renderOption: (option: T) => JSX.Element
  getOptionId: (option: T) => string
  getOptionLabel: (option: T) => string
  isDisabled: (option: T) => boolean
  filterFn: (option: T, search: string) => boolean
  showSearch?: boolean
  showSelectedOnTop?: boolean
}
