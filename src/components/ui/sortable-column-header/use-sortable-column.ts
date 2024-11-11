import { useMemo } from 'react'

export const useSortableColumn = (column: string, sortKey: string | null) => {
  const sortConfig = useMemo(() => {
    if (!sortKey) return { column: null, isDescending: false }

    const isDescending = sortKey.startsWith('-')
    const sortColumn = isDescending ? sortKey.slice(1) : sortKey

    return {
      column: sortColumn,
      isDescending
    }
  }, [sortKey])

  const isSorted = sortConfig.column === column
  const isDescending = isSorted && sortConfig.isDescending

  return { isSorted, isDescending }
}
