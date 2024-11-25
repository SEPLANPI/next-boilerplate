import {
  createContext,
  useContext,
  PropsWithChildren,
  useMemo,
  useCallback
} from 'react'
import { parseAsString, useQueryState } from 'nuqs'

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
  searchParamKey,
  onSelectionChange
}: PropsWithChildren<{
  searchParamKey: string
  onSelectionChange?: (items: Set<string>) => void
}>) {
  const [selectedParam, setSelectedParam] = useQueryState(
    searchParamKey,
    parseAsString.withDefault('').withOptions({
      shallow: false
    })
  )

  const selectedItems = useMemo(() => {
    return new Set(selectedParam ? selectedParam.split(',') : [])
  }, [selectedParam])

  const toggle = useCallback(
    (value: string) => {
      setSelectedParam((prev) => {
        const currentSet = new Set(prev ? prev.split(',') : [])

        if (currentSet.has(value)) {
          currentSet.delete(value)
        } else {
          currentSet.add(value)
        }

        const newValue = Array.from(currentSet).join(',')
        onSelectionChange?.(new Set(currentSet))
        return newValue || null
      })
    },
    [setSelectedParam, onSelectionChange]
  )

  const clear = useCallback(() => {
    setSelectedParam(null)
    onSelectionChange?.(new Set())
  }, [setSelectedParam, onSelectionChange])

  const contextValue = useMemo(
    () => ({
      selectedItems,
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
