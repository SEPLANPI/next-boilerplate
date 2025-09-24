"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTab } from "@mantine/core"
import { cn } from "@/utils"

interface NavigationTabsContextValue {
  activeTab: string
  handleTabChange: (value: string | null) => void
}

const NavigationTabsContext = createContext<
  NavigationTabsContextValue | undefined
>(undefined)

export function useNavigationTabsContext() {
  const context = useContext(NavigationTabsContext)
  if (!context) {
    throw new Error(
      "NavigationTabs components must be used within a NavigationTabsContainer provider",
    )
  }
  return context
}

interface NavigationTabsContainerProps {
  children: React.ReactNode
  className?: string
  basePath: string
}

/**
 * Main container that provides navigation context and handles routing
 * Contains both NavigationTabs and NavigationTabsActions as siblings
 */
export function NavigationTabsContainer({
  children,
  className,
  basePath,
}: NavigationTabsContainerProps) {
  const router = useRouter()
  const pathname = usePathname()

  function getActiveTabFromUrl(): string {
    // If current path starts with basePath, extract the tab value
    if (pathname.startsWith(basePath + "/")) {
      const tabPath = pathname.slice(basePath.length + 1)
      // Return the first segment after basePath as the tab value
      const tabValue = tabPath.split("/")[0]
      return tabValue
    }

    // If we're exactly at basePath, return empty string (no active tab)
    return ""
  }

  // Controlled state for Mantine tabs
  const [activeTab, setActiveTab] = useState<string | null>(() =>
    getActiveTabFromUrl(),
  )

  // Sync with URL changes
  useEffect(() => {
    const urlTab = getActiveTabFromUrl()
    setActiveTab(urlTab || null)
  }, [pathname, basePath])

  function handleTabChange(value: string | null) {
    if (!value) return

    setActiveTab(value)
    router.push(`${basePath}/${value}`)
  }

  const contextValue: NavigationTabsContextValue = {
    activeTab: activeTab || "",
    handleTabChange,
  }

  return (
    <NavigationTabsContext.Provider value={contextValue}>
      <div
        className={cn(
          "flex min-h-8 w-full items-center justify-between gap-x-4 border-b",
          className,
        )}
      >
        {children}
      </div>
    </NavigationTabsContext.Provider>
  )
}

interface NavigationTabsProps {
  children: React.ReactNode
  className?: string
}

/**
 * Navigation tabs component using Mantine Tabs
 * Gets state and handlers from context
 */
export function NavigationTabs({ children, className }: NavigationTabsProps) {
  const { activeTab, handleTabChange } = useNavigationTabsContext()

  return (
    <Tabs value={activeTab} onChange={handleTabChange} className={className}>
      <TabsList>{children}</TabsList>
    </Tabs>
  )
}

interface NavigationTabsItemProps {
  children: React.ReactNode
  value: string
  leftSection?: React.ReactNode
  rightSection?: React.ReactNode
  className?: string
}

/**
 * Individual navigation tab item
 * Uses Mantine TabsTab behind the hood with automatic active detection
 * Supports leftSection and rightSection for icons or other content
 */
export function NavigationTabsItem({
  children,
  value,
  leftSection,
  rightSection,
  className,
}: NavigationTabsItemProps) {
  return (
    <TabsTab
      value={value}
      className={className}
      leftSection={leftSection}
      rightSection={rightSection}
    >
      {children}
    </TabsTab>
  )
}

interface NavigationTabsActionsProps {
  children: React.ReactNode
  value: string
  className?: string
}

/**
 * Actions panel that renders only when its value matches the active tab
 * Sibling to NavigationTabs, not nested inside
 */
export function NavigationTabsActions({
  children,
  value,
  className,
}: NavigationTabsActionsProps) {
  const { activeTab } = useNavigationTabsContext()

  if (activeTab !== value) {
    return null
  }

  return (
    <div className={cn("flex shrink-0 items-center gap-x-2", className)}>
      {children}
    </div>
  )
}
