'use client'

import { cn } from '@/lib/utils'
import React, {
  ReactNode,
  CSSProperties,
  HTMLAttributes,
  createContext,
  useContext
} from 'react'

interface DataListContextType {
  layout: 'row' | 'column'
  minWidth: string
}

const DataListContext = createContext<DataListContextType | undefined>(
  undefined
)

const sizeToSpace = {
  xs: {
    row: 'space-y-2',
    column: 'space-x-2'
  },
  sm: {
    row: 'space-y-3',
    column: 'space-x-4'
  },
  md: {
    row: 'space-y-4',
    column: 'space-x-6'
  },
  lg: {
    row: 'space-y-6',
    column: 'space-x-10'
  },
  xl: {
    row: 'space-y-8',
    column: 'space-x-14'
  }
} as const

interface DataListRootProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  layout?: 'row' | 'column'
  size?: keyof typeof sizeToSpace
  minWidth?: string
}

interface DataListItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

interface DataListLabelProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  minWidth?: string
}

interface DataListValueProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}

export function DataListRoot({
  children,
  className,
  layout = 'row',
  size = 'md',
  minWidth = '88px',
  ...props
}: DataListRootProps) {
  const spaceClass =
    layout === 'row' ? sizeToSpace[size].row : sizeToSpace[size].column

  return (
    <DataListContext.Provider value={{ layout, minWidth }}>
      <dl
        className={cn(
          'flex',
          layout === 'row' ? 'flex-col' : 'flex-row',
          spaceClass,
          className
        )}
        {...props}
      >
        {children}
      </dl>
    </DataListContext.Provider>
  )
}

export function DataListItem({
  children,
  className,
  ...props
}: DataListItemProps) {
  const context = useContext(DataListContext)
  const layout = context?.layout ?? 'row'

  return (
    <div
      className={cn(
        `flex justify-start gap-2`,
        layout === 'column' ? 'flex-col' : '',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function DataListLabel({
  children,
  className,
  ...props
}: DataListLabelProps) {
  const context = useContext(DataListContext)
  const minWidth = context?.minWidth ?? '88px'
  return (
    <span
      className={cn('text-sm font-medium text-muted-foreground', className)}
      style={{ minWidth } as CSSProperties}
      {...props}
    >
      {children}
    </span>
  )
}

export function DataListValue({
  children,
  className,
  ...props
}: DataListValueProps) {
  return (
    <span className={cn('text-sm', className)} {...props}>
      {children}
    </span>
  )
}
