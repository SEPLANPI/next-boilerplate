import { LucideImage } from 'lucide-react'
import { ComponentProps } from 'react'
import { cn } from '@/utils'

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
        'bg-muted flex h-20 w-full items-center justify-center rounded',
        className
      )}
      {...props}
    >
      <LucideImage className={cn('size-4 text-content-muted', iconClassName)} />
    </div>
  )
}
