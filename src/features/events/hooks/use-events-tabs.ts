import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

type TabValue = 'reviewed' | 'pending' | 'all'
const COOKIE_KEY = 'event-tab'

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

  useEffect(() => {
    if (!status) {
      const savedTab = Cookies.get(COOKIE_KEY) as TabValue | undefined
      if (savedTab) {
        setParams({ status: savedTab })
      }
    }
  }, [status, setParams])

  const handleTabChange = (value: string | null) => {
    const newValue = (value || 'reviewed') as TabValue

    Cookies.set(COOKIE_KEY, newValue, { expires: 365 })

    setParams({
      status: newValue,
      page: 1
    })
  }

  const currentTab = status || Cookies.get(COOKIE_KEY) || 'reviewed'
  console.table({ currentTab, status })

  return { currentTab, handleTabChange }
}
