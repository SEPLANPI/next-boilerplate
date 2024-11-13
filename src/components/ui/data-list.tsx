import { cn } from '@/lib/utils'
import React, { ReactNode, CSSProperties, HTMLAttributes } from 'react'

interface DataListRootProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

interface DataListItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  align?: 'start' | 'center' | 'end'
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
  ...props
}: DataListRootProps) {
  return (
    <dl className={cn(className)} {...props}>
      {children}
    </dl>
  )
}

export function DataListItem({
  children,
  align = 'start',
  className,
  ...props
}: DataListItemProps) {
  return (
    <div
      className={cn(`flex items-${align} justify-start py-2`, className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function DataListLabel({
  children,
  minWidth = '88px',
  className,
  ...props
}: DataListLabelProps) {
  return (
    <span
      className={cn('text-sm font-medium text-secondary-foreground', className)}
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

