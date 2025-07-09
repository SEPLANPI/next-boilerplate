import React from 'react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  children: React.ReactNode
  className?: string
}

/**
 * Main page header container
 * Stack multiple HeaderRow components as children
 */
export function PageHeader({ children, className }: PageHeaderProps) {
  return (
    <header className={cn('w-full space-y-4', className)}>{children}</header>
  )
}

interface HeaderRowProps {
  children: React.ReactNode
  className?: string
}

/**
 * Individual header row with consistent layout
 * Contains HeaderContent and HeaderActions
 */
export function HeaderRow({ children, className }: HeaderRowProps) {
  return (
    <div
      className={cn(
        'flex min-h-8 w-full items-center justify-between gap-x-4',
        className
      )}
    >
      {children}
    </div>
  )
}

interface HeaderContentProps {
  children: React.ReactNode
  className?: string
}

/**
 * Left-aligned content area
 * Automatically handles spacing between child elements
 */
export function HeaderContent({ children, className }: HeaderContentProps) {
  return (
    <div
      className={cn(
        'header-content flex min-w-0 flex-1 items-center gap-x-4',
        className
      )}
    >
      {children}
    </div>
  )
}

interface HeaderActionsProps {
  children: React.ReactNode
  className?: string
}

/**
 * Right-aligned actions area
 * Automatically handles spacing between action elements
 */
export function HeaderActions({ children, className }: HeaderActionsProps) {
  return (
    <div className={cn('flex shrink-0 items-center gap-x-2', className)}>
      {children}
    </div>
  )
}
