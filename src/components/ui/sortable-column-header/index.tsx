import { ColumnHeaderProps } from "./types"
import { useSortableColumn } from "./use-sortable-column"
import { SortIcon } from "./sort-icon"
import { TableTh } from "@mantine/core"
import { cn } from "@/utils"

export function SortableColumnHeader({
  column,
  title,
  sortKey,
  onSort,
  className,
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
        "group h-full w-full cursor-pointer text-right hover:bg-gray-200 focus:outline-none ",
        className,
      )}
      aria-label={`Ordenar por ${title}`}
    >
      <div className="flex items-center">
        {title}
        <SortIcon
          isSorted={isSorted}
          isDescending={isDescending}
          data-sorted={isSorted}
        />
      </div>
    </TableTh>
  )
}
