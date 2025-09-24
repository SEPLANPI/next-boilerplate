"use client"

import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  ParserBuilder,
  useQueryState,
  useQueryStates,
} from "nuqs"
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"

type FilterGroupState = {
  [key: string]: Set<string>
}

export type FiltersContextType = {
  filterGroups: FilterGroupState
  getGroupSelected: (groupKey: string) => Set<string>
  toggleOption: (groupKey: string, value: string) => void
  clearGroup: (groupKey: string) => void
  clearAll: () => void
  applyFilters: () => void
  getTotalSelectedCount: () => number
  getTotalAppliedCount: () => number
  getGroupSelectedCount: (groupKey: string) => number
  page: number | null
}

export const FiltersContext = createContext<FiltersContextType | undefined>(
  undefined,
)

export function FiltersProvider({
  children,
  groupKeys = [],
}: PropsWithChildren<{
  groupKeys?: string[]
}>) {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))

  const queryStateConfig = useMemo(() => {
    return groupKeys.reduce(
      (acc, key) => {
        acc[key] = parseAsArrayOf(parseAsString).withOptions({
          shallow: false,
        })
        return acc
      },
      {} as Record<string, ParserBuilder<string[]>>,
    )
  }, [groupKeys])

  const [queryStates, setQueryStates] = useQueryStates(queryStateConfig)

  // Calculate applied filters based only on what's actually in the URL
  const appliedFilters = useMemo(() => {
    return Object.entries(queryStates).reduce((acc, [key, value]) => {
      if (value && Array.isArray(value) && value.length > 0) {
        acc[key] = new Set(value)
      }
      return acc
    }, {} as FilterGroupState)
  }, [queryStates])

  const [draftFilters, setDraftFilters] =
    useState<FilterGroupState>(appliedFilters)

  useEffect(() => {
    setDraftFilters(appliedFilters)
  }, [appliedFilters])

  const getGroupSelected = useCallback(
    (groupKey: string) => {
      return draftFilters[groupKey] || new Set()
    },
    [draftFilters],
  )

  const toggleOption = useCallback((groupKey: string, value: string) => {
    setDraftFilters((prev) => {
      const newDraft = { ...prev }
      const currentSelection = new Set(newDraft[groupKey] || [])

      if (currentSelection.has(value)) {
        currentSelection.delete(value)
      } else {
        currentSelection.add(value)
      }
      newDraft[groupKey] = currentSelection
      return newDraft
    })
  }, [])

  const clearGroup = useCallback((groupKey: string) => {
    setDraftFilters((prev) => ({
      ...prev,
      [groupKey]: new Set(),
    }))
  }, [])

  const clearAll = useCallback(() => {
    const clearedGroups = groupKeys.reduce((acc, key) => {
      acc[key] = new Set()
      return acc
    }, {} as FilterGroupState)
    setDraftFilters(clearedGroups)
  }, [groupKeys])

  const applyFilters = useCallback(() => {
    const newQueryStates = Object.entries(draftFilters).reduce(
      (acc, [key, valueSet]) => {
        acc[key] = valueSet.size > 0 ? Array.from(valueSet) : null
        return acc
      },
      {} as Record<string, string[] | null>,
    )
    setQueryStates(newQueryStates)
    setPage(1)
  }, [draftFilters, setQueryStates, setPage])

  const getTotalSelectedCount = useCallback(() => {
    return Object.values(draftFilters).reduce(
      (total, group) => total + group.size,
      0,
    )
  }, [draftFilters])

  const getTotalAppliedCount = useCallback(() => {
    return Object.values(appliedFilters).reduce(
      (total, group) => total + group.size,
      0,
    )
  }, [appliedFilters])

  const getGroupSelectedCount = useCallback(
    (groupKey: string) => {
      return draftFilters[groupKey]?.size || 0
    },
    [draftFilters],
  )

  const contextValue = useMemo(
    () => ({
      filterGroups: draftFilters,
      getGroupSelected,
      toggleOption,
      clearGroup,
      clearAll,
      applyFilters,
      getTotalSelectedCount,
      getGroupSelectedCount,
      getTotalAppliedCount,
      page,
    }),
    [
      draftFilters,
      getGroupSelected,
      toggleOption,
      clearGroup,
      clearAll,
      applyFilters,
      getTotalSelectedCount,
      getGroupSelectedCount,
      getTotalAppliedCount,
      page,
    ],
  )

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  )
}
