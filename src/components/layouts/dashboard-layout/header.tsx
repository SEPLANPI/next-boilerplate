import { PropsWithChildren } from 'react'

export function DashboardHeader({ children }: PropsWithChildren) {
  return (
    <header className="flex h-12 w-full items-center gap-x-4 border-b-2 px-4">
      {children}
    </header>
  )
}

export function DashboardHeaderActions({ children }: PropsWithChildren) {
  return <div className="ml-auto">{children}</div>
}
