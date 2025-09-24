"use client"

import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs"
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from "react"

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
      "useSelectedItems must be used within SelectedItemsContext.Provider",
    )
  }
  return context
}

export function SelectedItemsProvider({
  children,
  searchParamKey = "selected",
}: PropsWithChildren<{
  searchParamKey?: string
}>) {
  const [state, setState] = useQueryStates(
    {
      [searchParamKey]: parseAsArrayOf(parseAsString).withDefault([]),
      page: parseAsString.withDefault("1"),
    },
    {
      shallow: false,
    },
  )

  const selectedItems = state[searchParamKey] as string[]

  const toggle = useCallback(
    (value: string) => {
      if (selectedItems.includes(value)) {
        setState({
          [searchParamKey]: selectedItems.filter((item) => item !== value),
          page: "1",
        })
      } else {
        setState({
          [searchParamKey]: [...selectedItems, value],
          page: "1",
        })
      }
    },
    [setState, selectedItems, searchParamKey],
  )

  const clear = useCallback(() => {
    setState({
      [searchParamKey]: [],
      page: "1",
    })
  }, [setState, searchParamKey])

  const contextValue = useMemo(
    () => ({
      selectedItems: new Set(selectedItems),
      toggle,
      clear,
    }),
    [selectedItems, toggle, clear],
  )

  return (
    <SelectedItemsContext.Provider value={contextValue}>
      {children}
    </SelectedItemsContext.Provider>
  )
}
