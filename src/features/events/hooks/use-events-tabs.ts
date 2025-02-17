import { useLocalStorage } from '@mantine/hooks'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { useEffect } from 'react'

type TabValue = 'reviewed' | 'pending' | 'all'

export function useEventTabs() {
  const [{ status }, setParams] = useQueryStates(
    {
      status: parseAsString,
      page: parseAsInteger.withDefault(1)
    },
    {
      shallow: false
    }
  )

  const [savedTab, setSavedTab] = useLocalStorage<TabValue>({
    key: 'event-tab',
    defaultValue: 'reviewed'
  })

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

  const currentTab = status || savedTab || 'reviewed'

  return { currentTab, handleTabChange }
}
