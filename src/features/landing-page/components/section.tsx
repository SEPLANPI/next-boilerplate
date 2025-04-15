import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

type SpacingOption = 'sm' | 'lg'

export const Section = ({
  children,
  className,
  containerClassName,
  id,
  spacing = 'sm'
}: PropsWithChildren<{
  className?: string
  containerClassName?: string
  id?: string
  spacing?: SpacingOption
}>) => {
  const paddingClasses = {
    sm: 'py-16 md:py-[72px] lg:py-[100px]',
    lg: 'py-32 md:py-36 lg:py-[200px]'
  }

  return (
    <section id={id} className={cn('px-8', paddingClasses[spacing], className)}>
      <div className={cn('mx-auto max-w-[1120px]', containerClassName)}>
        {children}
      </div>
    </section>
  )
}
