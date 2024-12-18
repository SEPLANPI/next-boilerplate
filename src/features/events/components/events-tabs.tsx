'use client'

import { Tabs, TabsList, TabsTab } from '@mantine/core'
import { useRouter, useSearchParams } from 'next/navigation'

export function EventsTabs() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentTab = searchParams.get('status') ?? 'reviewed'

  const handleTabChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams)
    params.set('status', value || '')
    router.push(`?${params.toString()}`)
  }

  return (
    <>
      <Tabs value={currentTab} onChange={handleTabChange}>
        <TabsList>
          <TabsTab value="reviewed">
            Revisados
            <span className="rounded-smp-1 ml-2 inline-block font-medium text-muted-foreground">
              937
            </span>
          </TabsTab>
          <TabsTab value="pending">
            Pendentes
            <span className="rounded-smp-1 ml-2 inline-block font-medium text-muted-foreground">
              44
            </span>
          </TabsTab>
        </TabsList>
      </Tabs>
    </>
  )
}
