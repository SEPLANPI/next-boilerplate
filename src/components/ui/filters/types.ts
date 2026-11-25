import { PropsWithChildren, ReactNode } from "react"
import { PopoverProps, ModalProps } from "@mantine/core"

export type DefaultOption = {
  id: string
  label: string
}

export type IsDefaultOption<T> = T extends DefaultOption ? true : false

export type BaseFilterProps<T> = PropsWithChildren<
  {
    renderOption?: (option: T) => React.JSX.Element
    searchParamKey: string
    filterFn?: (option: T, search: string) => boolean
    isDisabled?: (option: T) => boolean
    showSearch?: boolean
    showSelectedOnTop?: boolean
    position?: PopoverProps["position"]
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

export type BaseContentProps<T> = {
  options: T[]
  renderOption: (option: T) => React.JSX.Element
  getOptionValue: (option: T) => string
  getOptionLabel: (option: T) => string
  isDisabled: (option: T) => boolean
  filterFn: (option: T, search: string) => boolean
  showSearch?: boolean
  showSelectedOnTop?: boolean
}

type FilterPopoverPropsBase<T> = PropsWithChildren<
  BaseFilterProps<T> & { width?: number | string }
>

export type FilterPopoverProps<T> = (
  | {
      options: T[]
      loadOptions?: never
      filterId?: string
    }
  | {
      options?: never
      loadOptions: () => Promise<T[]>
      filterId: string
    }
) &
  FilterPopoverPropsBase<T>

export type FilterGroupProps<T = DefaultOption> = {
  title: string
  searchParamKey: string
  showSearch?: boolean
  showSelectedOnTop?: boolean
  children?: ReactNode
} & (IsDefaultOption<T> extends true
  ? {
      getOptionValue?: (option: T) => string
      getOptionLabel?: (option: T) => string
      renderOption?: (option: T) => React.JSX.Element
      isDisabled?: (option: T) => boolean
      filterFn?: (option: T, search: string) => boolean
    }
  : {
      getOptionValue: (option: T) => string
      getOptionLabel: (option: T) => string
      renderOption?: (option: T) => React.JSX.Element
      isDisabled?: (option: T) => boolean
      filterFn?: (option: T, search: string) => boolean
    }) &
  (
    | {
        // Static data
        options: T[]
        loadOptions?: never
        filterId?: never
      }
    | {
        // Async data
        options?: never
        loadOptions: () => Promise<T[]>
        filterId: string
      }
  )

export type FiltersModalProps = {
  opened: boolean
  onClose: () => void
  onApply: () => void
  title?: string
  children: ReactNode
  modalProps?: Partial<ModalProps>
}

export type FilterManagerProps = {
  children?: ReactNode
  onApply?: () => void
  buttonText?: string
  groupKeys?: string[]
}

// Legacy type
export type LegacyFilterGroup<T> = {
  id: string
  title: string
  searchParamKey: string
  type: "static" | "async"
  options?: T[]
  loadOptions?: () => Promise<T[]>
  renderOption?: (option: T) => React.JSX.Element
  getOptionValue?: (option: T) => string
  getOptionLabel?: (option: T) => string
  isDisabled?: (option: T) => boolean
  filterFn?: (option: T, search: string) => boolean
  showSearch?: boolean
  showSelectedOnTop?: boolean
}
