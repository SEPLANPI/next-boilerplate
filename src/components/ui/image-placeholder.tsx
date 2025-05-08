import { LucideImage } from 'lucide-react'
import { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

interface ImagePlaceholderProps extends ComponentProps<'div'> {
  iconClassName?: string
}

export function ImagePlaceholder({
  iconClassName = 'size-8',
  className,
  ...props
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        'flex h-20 w-full items-center justify-center rounded bg-muted',
        className
      )}
      {...props}
    >
      <LucideImage className={cn('text-content-muted size-4', iconClassName)} />
    </div>
  )
}
