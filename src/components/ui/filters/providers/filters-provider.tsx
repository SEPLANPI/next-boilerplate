'use client'

import { createContext, PropsWithChildren, useMemo, useCallback } from 'react'
import {
  parseAsArrayOf,
  parseAsString,
  useQueryStates,
  ParserBuilder,
  parseAsInteger,
  useQueryState
} from 'nuqs'

type FilterGroupState = {
  [key: string]: Set<string>
}

export type FiltersContextType = {
  filterGroups: FilterGroupState
  getGroupSelected: (groupKey: string) => Set<string>
  toggleOption: (groupKey: string, value: string) => void
  clearGroup: (groupKey: string) => void
  clearAll: () => void
  getTotalSelectedCount: () => number
  getGroupSelectedCount: (groupKey: string) => number
  page: number | null
}

export const FiltersContext = createContext<FiltersContextType | undefined>(
  undefined
)

export function FiltersProvider({
  children,
  groupKeys = []
}: PropsWithChildren<{
  groupKeys?: string[]
}>) {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

  const queryStateConfig = useMemo(() => {
    return groupKeys.reduce(
      (acc, key) => {
        acc[key] = parseAsArrayOf(parseAsString).withOptions({
          shallow: false
        })
        return acc
      },
      {} as Record<string, ParserBuilder<string[]>>
    )
  }, [groupKeys])

  const [queryStates, setQueryStates] = useQueryStates(queryStateConfig)

  const filterGroups = useMemo(() => {
    return groupKeys.reduce((acc, key) => {
      const value = queryStates[key]
      acc[key] = new Set(Array.isArray(value) ? value : [])
      return acc
    }, {} as FilterGroupState)
  }, [groupKeys, queryStates])

  const getGroupSelected = useCallback(
    (groupKey: string) => {
      return filterGroups[groupKey] || new Set()
    },
    [filterGroups]
  )

  const toggleOption = useCallback(
    (groupKey: string, value: string) => {
      setQueryStates((prev) => {
        const currentSelection = new Set(prev[groupKey] || [])
        if (currentSelection.has(value)) {
          currentSelection.delete(value)
        } else {
          currentSelection.add(value)
        }
        return { ...prev, [groupKey]: Array.from(currentSelection) }
      })
      setPage(1)
    },
    [setQueryStates, setPage]
  )

  const clearGroup = useCallback(
    (groupKey: string) => {
      setQueryStates({ [groupKey]: null })
      setPage(1)
    },
    [setQueryStates, setPage]
  )

  const clearAll = useCallback(() => {
    const clearedGroups = groupKeys.reduce(
      (acc, key) => {
        acc[key] = null
        return acc
      },
      {} as Record<string, null>
    )
    setQueryStates({ ...clearedGroups })
    setPage(1)
  }, [groupKeys, setQueryStates, setPage])

  const getTotalSelectedCount = useCallback(() => {
    return Object.values(filterGroups).reduce(
      (total, group) => total + group.size,
      0
    )
  }, [filterGroups])

  const getGroupSelectedCount = useCallback(
    (groupKey: string) => {
      return filterGroups[groupKey]?.size || 0
    },
    [filterGroups]
  )

  const contextValue = useMemo(
    () => ({
      filterGroups,
      getGroupSelected,
      toggleOption,
      clearGroup,
      clearAll,
      getTotalSelectedCount,
      getGroupSelectedCount,
      page
    }),
    [
      filterGroups,
      getGroupSelected,
      toggleOption,
      clearGroup,
      clearAll,
      getTotalSelectedCount,
      getGroupSelectedCount,
      page
    ]
  )

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  )
}
