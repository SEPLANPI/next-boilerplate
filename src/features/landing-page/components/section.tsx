import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

export const Section = ({
  children,
  className,
  containerClassName,
  id
}: PropsWithChildren<{
  className?: string
  containerClassName?: string
  id?: string
}>) => {
  return (
    <section id={id} className={cn('px-8 py-8 sm:py-16 md:py-28', className)}>
      <div className={cn('mx-auto max-w-[1120px]', containerClassName)}>
        {children}
      </div>
    </section>
  )
}
