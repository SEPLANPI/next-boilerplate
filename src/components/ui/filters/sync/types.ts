import { PropsWithChildren } from 'react'
import { BaseFilterProps, BaseContentProps } from '../common/types'

export type SyncFilterProps<T> = PropsWithChildren<
  BaseFilterProps<T> & {
    options: T[]
  }
>

export type SyncContentProps<T> = BaseContentProps<T> & {
  options: T[]
}
