'use client'

import { Tabs, TabsList, TabsTab } from '@mantine/core'
import { useEventTabs } from '../hooks/use-events-tabs'

type EventsTabsProps = {
  quantities: {
    all?: number
    pending?: number
    reviewed?: number
  }
}

export function EventsTabs({ quantities }: EventsTabsProps) {
  const { currentTab, handleTabChange } = useEventTabs()

  return (
    <Tabs defaultValue="reviewed" value={currentTab} onChange={handleTabChange}>
      <TabsList>
        <TabsTab value="reviewed">
          Revisados
          <span className="ml-2 inline-block rounded-sm font-medium text-muted-foreground">
            {quantities.reviewed}
          </span>
        </TabsTab>
        <TabsTab value="pending">
          Pendentes
          <span className="ml-2 inline-block rounded-sm font-medium text-muted-foreground">
            {quantities.pending}
          </span>
        </TabsTab>
        <TabsTab value="all">
          Todos
          <span className="ml-2 inline-block rounded-sm font-medium text-muted-foreground">
            {quantities.all}
          </span>
        </TabsTab>
      </TabsList>
    </Tabs>
  )
}
