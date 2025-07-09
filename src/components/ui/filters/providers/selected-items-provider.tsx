'use client'

import {
  createContext,
  useContext,
  PropsWithChildren,
  useMemo,
  useCallback
} from 'react'
import { parseAsString, parseAsArrayOf, useQueryState } from 'nuqs'

type SelectedItemsContextType = {
  selectedItems: Set<string>
  toggle: (value: string) => void
  clear: () => void
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
  searchParamKey = 'selected'
}: PropsWithChildren<{
  searchParamKey?: string
}>) {
  const [selectedItems, setSelectedItems] = useQueryState(
    searchParamKey,
    parseAsArrayOf(parseAsString).withDefault([]).withOptions({
      shallow: false
    })
  )

  const isSelected = useCallback(
    (item: string) => {
      return selectedItems.includes(item)
    },
    [selectedItems]
  )

  const toggle = useCallback(
    (value: string) => {
      if (isSelected(value)) {
        setSelectedItems((prev) => prev.filter((item) => item !== value))
      } else {
        setSelectedItems((prev) => [...prev, value])
      }
    },
    [setSelectedItems, isSelected]
  )

  const clear = useCallback(() => {
    setSelectedItems([])
  }, [setSelectedItems])

  const contextValue = useMemo(
    () => ({
      selectedItems: new Set(selectedItems),
      toggle,
      clear
    }),
    [selectedItems, toggle, clear]
  )

  return (
    <SelectedItemsContext.Provider value={contextValue}>
      {children}
    </SelectedItemsContext.Provider>
  )
}
