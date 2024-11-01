import { useMemo } from 'react'
import { SortConfig, SortDirection } from './types'

export const useSortableColumn = (column: string, sortKey: string | null) => {
  const sortConfig = useMemo((): SortConfig => {
    const [sortColumn, sortDirection] = sortKey?.split('.') ?? []
    return {
      column: sortColumn,
      direction: (sortDirection as SortDirection) || null
    }
  }, [sortKey])

  const isSorted = sortConfig.column === column
  const currentDirection = isSorted ? sortConfig.direction : null

  return { isSorted, currentDirection }
}
