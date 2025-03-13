import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

export const Section = ({
  children,
  className,
  containerClassName
}: PropsWithChildren<{ className?: string; containerClassName?: string }>) => {
  return (
    <section className={cn('px-8 py-8 sm:py-16 md:px-0 md:py-36', className)}>
      <div className={cn('container mx-auto', containerClassName)}>
        {children}
      </div>
    </section>
  )
}
