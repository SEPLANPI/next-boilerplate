'use client'

import { createContext, useContext, PropsWithChildren } from 'react'
import { useLocalStorage } from '@mantine/hooks'

interface SidebarContextType {
  collapsed: boolean
  toggleCollapsed: () => void
}

const SidebarContext = createContext<SidebarContextType | null>(null)

export function SidebarProvider({ children }: PropsWithChildren) {
  const [collapsed, setCollapsed] = useLocalStorage({
    key: 'main-nav-collapsed',
    defaultValue: false
  })

  const toggleCollapsed = () => setCollapsed(!collapsed)

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
