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
    <Tabs value={currentTab} onChange={handleTabChange}>
      <TabsList>
        <TabsTab value="reviewed">
          Revisados
          <span className="rounded-smp-1 ml-2 inline-block font-medium text-muted-foreground">
            {quantities.reviewed}
          </span>
        </TabsTab>
        <TabsTab value="pending">
          Pendentes
          <span className="rounded-smp-1 ml-2 inline-block font-medium text-muted-foreground">
            {quantities.pending}
          </span>
        </TabsTab>
        <TabsTab value="all">
          Todos
          <span className="rounded-smp-1 ml-2 inline-block font-medium text-muted-foreground">
            {quantities.all}
          </span>
        </TabsTab>
      </TabsList>
    </Tabs>
  )
}
