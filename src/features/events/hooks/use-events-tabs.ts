import { useLocalStorage } from '@mantine/hooks'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { useEffect } from 'react'

type TabValue = 'reviewed' | 'pending' | 'all'

export function useEventTabs() {
  const [{ status }, setParams] = useQueryStates({
    status: parseAsString.withDefault('reviewed'),
    page: parseAsInteger.withDefault(1)
  })

  const [savedTab, setSavedTab] = useLocalStorage<TabValue>({
    key: 'event-tab',
    defaultValue: 'reviewed'
  })

  const currentTab = status || savedTab || 'reviewed'

  useEffect(() => {
    if (!status && savedTab) {
      setParams({ status: savedTab })
    }
  }, [status, savedTab, setParams])

  const handleTabChange = (value: string | null) => {
    const newValue = (value || 'reviewed') as TabValue
    setSavedTab(newValue)

    setParams({
      status: newValue,
      page: 1
    })
  }

  return { currentTab, handleTabChange }
}
