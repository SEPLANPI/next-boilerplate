import { PropsWithChildren } from 'react'
import { BaseFilterProps, BaseContentProps } from '../common/types'

export type AsyncFilterProps<T> = PropsWithChildren<
  BaseFilterProps<T> & {
    loadOptions: () => Promise<T[]>
    filterId: string
  }
>

export type AsyncContentProps<T> = BaseContentProps<T> & {
  loadOptions: () => Promise<T[]>
  filterId: string
}
