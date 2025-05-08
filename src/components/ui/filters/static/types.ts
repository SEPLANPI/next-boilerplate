import { BaseFilterProps, BaseContentProps } from '../common/types'

export type StaticFilterProps<T> = BaseFilterProps<T> & {
  options: T[]
}

export type StaticContentProps<T> = BaseContentProps<T>
