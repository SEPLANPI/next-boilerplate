'use client'

import { cn } from '@/utils'

import React, {
  ReactNode,
  HTMLAttributes,
  createContext,
  useContext
} from 'react'

interface DataListContextType {
  orientation: 'vertical' | 'horizontal'
  minWidth?: string
  maxWidth?: string
}

const DataListContext = createContext<DataListContextType | undefined>(
  undefined
)

const spacingMap = {
  xs: 2, // 0.5rem
  sm: 3, // 0.75rem
  md: 4, // 1rem
  lg: 6, // 1.5rem
  xl: 8 // 2rem
} as const

type SpacingSize = keyof typeof spacingMap

interface DataListRootProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  orientation?: 'vertical' | 'horizontal'
  spacing?: SpacingSize
  minWidth?: string
  maxWidth?: string
}

interface DataListItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

interface DataListLabelProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}

interface DataListValueProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}

export function DataListRoot({
  children,
  className,
  orientation = 'horizontal',
  spacing = 'md',
  minWidth,
  maxWidth,
  ...props
}: DataListRootProps) {
  const spacingValue = spacingMap[spacing]

  return (
    <DataListContext.Provider value={{ orientation, minWidth, maxWidth }}>
      <dl
        className={cn(
          `overflow-wrap-anywhere flex flex-col space-y-${spacingValue}`,
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
  const orientation = context?.orientation ?? 'horizontal'

  const gridTemplateColumns =
    context?.minWidth && context?.maxWidth
      ? `minmax(${context.minWidth}, ${context.maxWidth}) 2fr`
      : context?.minWidth
        ? `minmax(${context.minWidth}, 1fr) 2fr`
        : context?.maxWidth
          ? `minmax(0, ${context.maxWidth}) 2fr`
          : '1fr 2fr'

  const style =
    orientation === 'horizontal' ? { gridTemplateColumns } : undefined

  return (
    <div
      className={cn(
        orientation === 'vertical'
          ? 'flex flex-col gap-2'
          : 'grid items-baseline',

        className
      )}
      style={style}
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
  return (
    <span className={cn('text-sm text-content-emphasis', className)} {...props}>
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
    <span className={cn('min-w-0 text-sm', className)} {...props}>
      {children}
    </span>
  )
}
