'use client'
import { PropsWithChildren } from 'react'
import { MainNav } from './main-nav'
import { SidebarProvider } from '@/contexts/sidebar-context'
import { SidebarConfig } from '@/types/sidebar'

interface DashboardLayoutProps extends PropsWithChildren {
  config: SidebarConfig
}

export function DashboardLayout({ children, config }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-[100dvh] items-stretch">
        <div className="sticky top-0 h-[100dvh] overflow-y-auto">
          <MainNav config={config} />
        </div>
        <div className="flex-1 overflow-y-auto">
          <main className="p-5">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
