import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'

function CardRoot({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn('flex flex-col gap-4 rounded-md p-6', className)}
      {...props}
    >
      {children}
    </div>
  )
}

function CardIcon({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      className={cn(
        'flex size-10 items-center justify-center rounded-full',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

function CardTitle({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'h4'>) {
  return (
    <h4 className={cn('font-bold', className)} {...props}>
      {children}
    </h4>
  )
}

function CardSubtitle({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'p'>) {
  return (
    <span className={cn(className)} {...props}>
      {children}
    </span>
  )
}

export const Card = {
  Root: CardRoot,
  Icon: CardIcon,
  Title: CardTitle,
  Subtitle: CardSubtitle
}
