import { ColumnHeaderProps } from './types'
import { useSortableColumn } from './use-sortable-column'
import { SortIcon } from './sort-icon'
import { TableTh } from '@mantine/core'
import { cn } from '@/utils'

export function SortableColumnHeader({
  column,
  title,
  sortKey,
  onSort,
  className
}: ColumnHeaderProps) {
  const { isSorted, isDescending } = useSortableColumn(column, sortKey)

  const handleSort = () => {
    if (!isSorted) {
      onSort(`-${column}`)
    } else if (isDescending) {
      onSort(column)
    } else {
      onSort(null)
    }
  }

  return (
    <TableTh
      onClick={handleSort}
      className={cn(
        'group flex h-full w-full cursor-pointer items-center text-left hover:bg-gray-200 focus:outline-none',
        className
      )}
      aria-label={`Ordenar por ${title}`}
    >
      {title}

      <SortIcon
        isSorted={isSorted}
        isDescending={isDescending}
        data-sorted={isSorted}
      />
    </TableTh>
  )
}
