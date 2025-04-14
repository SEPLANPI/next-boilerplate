import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

export function DashboardContent({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn('flex flex-1 flex-col bg-gray-100 p-6 pb-0', className)}>
      {children}
    </div>
  )
}

export function DashboardMainSection({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn('flex-1 rounded-t-xl border bg-white p-6', className)}>
      {children}
    </div>
  )
}
