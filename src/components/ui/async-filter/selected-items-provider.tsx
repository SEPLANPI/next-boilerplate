import {
  createContext,
  useContext,
  PropsWithChildren,
  useMemo,
  useCallback
} from 'react'
import {
  parseAsInteger,
  parseAsString,
  parseAsArrayOf,
  useQueryStates
} from 'nuqs'

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
  const [{ selectedParam }, setSelectedParam] = useQueryStates(
    {
      selectedParam: parseAsArrayOf(parseAsString).withDefault([]),
      page: parseAsInteger.withDefault(1)
    },
    {
      shallow: false,
      urlKeys: {
        selectedParam: searchParamKey
      }
    }
  )

  const selectedItems = useMemo(() => {
    return new Set(selectedParam)
  }, [selectedParam])

  const toggle = useCallback(
    (value: string) => {
      setSelectedParam((prev) => {
        const currentSet = new Set(prev.selectedParam)

        if (currentSet.has(value)) {
          currentSet.delete(value)
        } else {
          currentSet.add(value)
        }

        const newArray = Array.from(currentSet)
        onSelectionChange?.(currentSet)
        return { selectedParam: newArray.length ? newArray : null, page: 1 }
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
