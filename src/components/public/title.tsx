import { cn } from '@/utils'
import { PropsWithChildren } from 'react'

export function Title({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <h2
      className={cn(
        'text-2xl font-bold text-content-emphasis md:text-4xl',
        className
      )}
    >
      {children}
    </h2>
  )
}
