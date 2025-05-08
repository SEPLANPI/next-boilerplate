import { Menu, TableTh } from '@mantine/core'
import { ColumnHeaderProps, SortOption } from './types'
import { useSortableColumn } from './use-sortable-column'
import { SortIcon } from './sort-icon'
import { ArrowDown, ArrowUp, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SortableColumnHeader({
  column,
  title,
  sortKey,
  onSort,
  ascendingLabel = 'Crescente',
  descendingLabel = 'Decrescente',
  className
}: ColumnHeaderProps) {
  const { isSorted, isDescending } = useSortableColumn(column, sortKey)

  const SORT_OPTIONS: SortOption[] = [
    {
      icon: ArrowUp,
      label: ascendingLabel,
      key: 'column'
    },
    {
      icon: ArrowDown,
      label: descendingLabel,
      key: '-column'
    },
    {
      icon: X,
      label: 'Sem ordenação',
      key: null
    }
  ]

  const handleSort = (optionKey: string | null) => {
    if (optionKey === null) {
      onSort(null)
      return
    }

    const newSortKey = optionKey.replace('column', column)
    onSort(newSortKey)
  }

  function isActive(key: string | null) {
    if (!isSorted || !key) return false

    if (key.startsWith('-') && isDescending) {
      return true
    }

    if (!key.startsWith('-') && !isDescending) {
      return true
    }
    return false
  }

  return (
    <TableTh className={cn('p-0', className)}>
      <Menu position="bottom-start">
        <Menu.Target>
          <button
            className="group flex h-8 items-center rounded px-2.5 hover:bg-gray-100"
            aria-label={`Ordenar por ${title}`}
          >
            {title}

            <SortIcon
              isSorted={isSorted}
              isDescending={isDescending}
              className="ml-2 h-4 w-4 transition-colors group-hover:text-gray-700"
            />
          </button>
        </Menu.Target>
        <Menu.Dropdown>
          {SORT_OPTIONS.map(({ icon: Icon, label, key }) => (
            <Menu.Item
              key={label}
              onClick={() => handleSort(key)}
              leftSection={<Icon className="size-4" />}
              className={isActive(key) ? 'bg-gray-100' : ''}
            >
              {label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </TableTh>
  )
}
