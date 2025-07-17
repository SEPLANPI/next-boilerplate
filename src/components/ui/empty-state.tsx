import React from 'react'
import Image from 'next/image'
import { cn } from '@/utils'

interface EmptyStateProps {
  children: React.ReactNode
  className?: string
  size?: 'narrow' | 'wide'
}

interface EmptyStateHeaderProps {
  children: React.ReactNode
  className?: string
}

interface EmptyStateDescriptionProps {
  children: React.ReactNode
  className?: string
}

interface EmptyStateIconProps {
  children: React.ReactNode
  className?: string
}

interface EmptyStateImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

interface EmptyStateActionsProps {
  children: React.ReactNode
  className?: string
}

function EmptyState({ children, className, size = 'narrow' }: EmptyStateProps) {
  const sizeClasses = {
    narrow: 'max-w-lg',
    wide: 'max-w-3xl'
  }

  return (
    <div
      className={cn(
        'mx-auto flex flex-col items-center justify-center p-12 text-center',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  )
}

function EmptyStateHeader({ children, className }: EmptyStateHeaderProps) {
  return (
    <h3
      className={cn(
        'mb-4 text-xl font-semibold text-content-emphasis',
        className
      )}
    >
      {children}
    </h3>
  )
}

function EmptyStateDescription({
  children,
  className
}: EmptyStateDescriptionProps) {
  return <p className={cn('mb-4 text-sm', className)}>{children}</p>
}

function EmptyStateIcon({ children, className }: EmptyStateIconProps) {
  return (
    <div
      className={cn(
        'mb-6 flex size-14 items-center justify-center rounded-lg border text-content-muted shadow-6',
        className
      )}
    >
      {children}
    </div>
  )
}

function EmptyStateImage({
  src,
  alt,
  width,
  height,
  className
}: EmptyStateImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn('mb-6 max-w-xs opacity-50', className)}
    />
  )
}

function EmptyStateActions({ children, className }: EmptyStateActionsProps) {
  return (
    <div
      className={cn(
        'flex flex-col justify-center gap-2 sm:flex-row',
        className
      )}
    >
      {children}
    </div>
  )
}

EmptyState.Header = EmptyStateHeader
EmptyState.Description = EmptyStateDescription
EmptyState.Icon = EmptyStateIcon
EmptyState.Image = EmptyStateImage
EmptyState.Actions = EmptyStateActions

export { EmptyState }
