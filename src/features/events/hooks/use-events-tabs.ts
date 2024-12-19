import { useLocalStorage } from '@mantine/hooks'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

type TabValue = 'reviewed' | 'pending' | 'all'

export function useEventTabs() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [savedTab, setSavedTab] = useLocalStorage<TabValue>({
    key: 'event-tab',
    defaultValue: 'reviewed'
  })

  const urlTab = searchParams.get('status') as TabValue | null
  const currentTab = urlTab || savedTab || 'reviewed'

  useEffect(() => {
    if (!urlTab && savedTab) {
      const params = new URLSearchParams(searchParams)
      params.set('status', savedTab)
      router.push(`?${params.toString()}`)
    }
  }, [urlTab, savedTab, searchParams, router])

  const handleTabChange = (value: string | null) => {
    const newValue = (value || 'reviewed') as TabValue
    setSavedTab(newValue)

    const params = new URLSearchParams(searchParams)
    params.set('status', newValue)
    router.push(`?${params.toString()}`)
  }

  return { currentTab, handleTabChange }
}
