import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

export function TitleBadge({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={cn(
        'text-xxs w-fit rounded-full border border-lime-600 bg-lime-100 px-2.5 py-1.5 font-semibold uppercase text-lime-600 sm:block',
        className
      )}
    >
      {children}
    </span>
  )
}
