'use client'
import { PropsWithChildren } from 'react'
import { MainNav } from './main-nav'
import { SidebarProvider } from './context'
import { SidebarConfig } from '@/types/sidebar'
import { DashboardContent } from './content'

interface AppShellProps extends PropsWithChildren {
  config: SidebarConfig
}

export function AppShell({ children, config }: AppShellProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-[100dvh] items-stretch">
        <div className="sticky top-0 h-[100dvh] overflow-y-auto">
          <MainNav config={config} />
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto">
          <DashboardContent>{children}</DashboardContent>
        </div>
      </div>
    </SidebarProvider>
  )
}
