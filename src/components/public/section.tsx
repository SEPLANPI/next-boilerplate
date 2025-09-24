import { cn } from '@/utils'
import { Container } from '@mantine/core'
import { PropsWithChildren } from 'react'

type SectionProps = PropsWithChildren<{
  className?: string
  containerClassName?: string
  layout?: 'grid' | 'stack'
  verticalPadding?: 'none' | 'compact' | 'comfortable' | 'spacious'
}>

export function Section({
  children,
  className,
  containerClassName,
  layout = 'stack',
  verticalPadding = 'comfortable'
}: SectionProps) {
  const layoutClasses = {
    grid: 'grid grid-cols-12 ',
    stack: 'flex flex-col'
  }

  const verticalPaddingClasses: Record<
    NonNullable<SectionProps['verticalPadding']>,
    string
  > = {
    none: 'py-0',
    compact: 'py-4 sm:py-6 md:py-8',
    comfortable: 'py-8 sm:py-12 md:py-20',
    spacious: 'py-12 sm:py-20 md:py-28'
  }

  return (
    <section className={cn(verticalPaddingClasses[verticalPadding], className)}>
      <Container
        className={cn(
          'w-full gap-8 md:gap-12',
          layoutClasses[layout],
          containerClassName
        )}
      >
        {children}
      </Container>
    </section>
  )
}
