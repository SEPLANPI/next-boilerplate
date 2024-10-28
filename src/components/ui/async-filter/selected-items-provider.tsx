import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren
} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type SelectedItemsContextType = {
  selectedItems: Set<string>
  toggleItem: (value: string) => void
  clearItems: () => void
}

const SelectedItemsContext = createContext<
  SelectedItemsContextType | undefined
>(undefined)

export function useSelectedItems() {
  const context = useContext(SelectedItemsContext)
  if (!context) {
    throw new Error(
      'useSelectedItems must be used within SelectedItemsContext.Provider'
    )
  }
  return context
}

export function SelectedItemsProvider({
  children,
  searchParamKey
}: PropsWithChildren<{ searchParamKey: string }>) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const selectedValues =
      searchParams.get(searchParamKey)?.split(',').filter(Boolean) || []
    setSelectedItems(new Set(selectedValues))
  }, [searchParams, searchParamKey])

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString())
    const values = Array.from(selectedItems)
    if (values.length > 0) {
      newParams.set(searchParamKey, values.join(','))
    } else {
      newParams.delete(searchParamKey)
    }
    router.push(`?${newParams.toString()}`)
  }, [selectedItems, searchParamKey, searchParams, router])

  const toggleItem = (value: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(value)) {
        newSet.delete(value)
      } else {
        newSet.add(value)
      }
      return newSet
    })
  }

  const clearItems = () => {
    setSelectedItems(new Set())
  }

  return (
    <SelectedItemsContext.Provider
      value={{ selectedItems, toggleItem, clearItems }}
    >
      {children}
    </SelectedItemsContext.Provider>
  )
}
