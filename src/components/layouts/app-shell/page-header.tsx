import React from 'react'
import { cn } from '@/utils'

interface PageHeaderProps {
  children: React.ReactNode
  className?: string
}

/**
 * Main page header container.
 * Use composition with `PageHeader.Row`, `PageHeader.Content`, and `PageHeader.Actions`.
 *
 * @example
 * <PageHeader>
 *   <PageHeader.Row>
 *     <PageHeader.Content>
 *       <Breadcrumbs items={[{ label: 'Home' }]} />
 *     </PageHeader.Content>
 *     <PageHeader.Actions>
 *       <Button>Action</Button>
 *     </PageHeader.Actions>
 *   </PageHeader.Row>
 * </PageHeader>
 */
export function PageHeader({ children, className }: PageHeaderProps) {
  return (
    <header className={cn('w-full space-y-4', className)}>{children}</header>
  )
}

interface RowProps {
  children: React.ReactNode
  className?: string
}

/**
 * A row within the PageHeader.
 * Contains `Content` and `Actions` components.
 */
function Row({ children, className }: RowProps) {
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

interface ContentProps {
  children: React.ReactNode
  className?: string
}

/**
 * Left-aligned content area within a `Row`.
 * Automatically handles spacing between child elements.
 */
function Content({ children, className }: ContentProps) {
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

interface ActionsProps {
  children: React.ReactNode
  className?: string
}

/**
 * Right-aligned actions area within a `Row`.
 * Automatically handles spacing between action elements.
 */
function Actions({ children, className }: ActionsProps) {
  return (
    <div className={cn('flex shrink-0 items-center gap-x-2', className)}>
      {children}
    </div>
  )
}

PageHeader.Row = Row
PageHeader.Content = Content
PageHeader.Actions = Actions
