import { PropsWithChildren } from 'react'

export function DashboardHeader({ children }: PropsWithChildren) {
  return (
    <header className="flex h-12 items-center border-b px-4">{children}</header>
  )
}
