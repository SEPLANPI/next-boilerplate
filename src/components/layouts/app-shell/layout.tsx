"use client"
import { SidebarConfig } from "@/types/sidebar"
import React, { PropsWithChildren } from "react"
import { DashboardContent } from "./content"
import { SidebarProvider } from "./context"
import { MainNav } from "./main-nav"

interface AppShellProps extends PropsWithChildren {
  config: SidebarConfig
  workspaceSelect?: React.ReactNode
}

export function AppShell({ children, config, workspaceSelect }: AppShellProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-[100dvh] items-stretch">
        <div className="sticky top-0 h-[100dvh] overflow-y-auto">
          <MainNav config={config} workspaceSelect={workspaceSelect} />
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto">
          <DashboardContent>{children}</DashboardContent>
        </div>
      </div>
    </SidebarProvider>
  )
}
