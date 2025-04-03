'use client'

import { Tabs, TabsList, TabsTab } from '@mantine/core'
import { LucideIcon } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'

export interface TabItem {
  value: string
  icon: LucideIcon
  label: string
}

interface NavigationTabsProps {
  items: TabItem[]
  basePath: string
  defaultValue: string
}

/**
 * A reusable navigation tabs component that handles routing-based tabs
 */
export function NavigationTabs({
  items,
  basePath,
  defaultValue
}: NavigationTabsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const id = params.id as string

  function getActiveTab(): string {
    const segments = pathname.split('/')
    const lastSegment = segments[segments.length - 1]

    if (lastSegment === id) {
      return defaultValue
    }

    return lastSegment
  }

  const activeTab = getActiveTab()

  function handleTabChange(value: string | null) {
    if (!value) return
    router.push(`${basePath}/${value}`)
  }

  return (
    <Tabs
      value={activeTab}
      onChange={handleTabChange}
      unstyled
      classNames={{
        root: 'translate-y-[2px] h-12',
        list: ' flex h-full',
        tab: 'flex space-x-2 items-center h-full font-normal px-3 text-sm text-gray-700 data-[active=true]:font-bold data-[active=true]:text-govGreen-600 border-[transparent] border-b-2 data-[active=true]:border-govGreen-600',
        tabLabel: 'leading-[20px]'
      }}
    >
      <TabsList>
        {items.map((tab, index) => (
          <TabsTab
            key={index}
            value={tab.value}
            defaultValue={defaultValue}
            leftSection={
              <tab.icon
                className={`size-4 ${activeTab === tab.value ? 'text-govGreen-600' : ''}`}
              />
            }
          >
            {tab.label}
          </TabsTab>
        ))}
      </TabsList>
    </Tabs>
  )
}
