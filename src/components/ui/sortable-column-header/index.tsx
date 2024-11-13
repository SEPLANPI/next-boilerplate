import { Menu, TableTh } from '@mantine/core'
import { ColumnHeaderProps, SortOption } from './types'
import { useSortableColumn } from './use-sortable-column'
import { SortIcon } from './sort-icon'
import { ArrowDown, ArrowUp, X } from 'lucide-react'

const SORT_OPTIONS: SortOption[] = [
  {
    icon: ArrowUp,
    label: 'Crescente',
    key: 'column'
  },
  {
    icon: ArrowDown,

    label: 'Decrescente',
    key: '-column'
  },
  {
    icon: X,
    label: 'Sem ordenação',
    key: null
  }
]

export function SortableColumnHeader({
  column,
  title,
  sortKey,
  onSort
}: ColumnHeaderProps) {
  const { isSorted, isDescending } = useSortableColumn(column, sortKey)

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
    <TableTh className="p-0">
      <Menu position="bottom-start">
        <Menu.Target>
          <button
            className="group flex h-8 items-center rounded px-[10px] hover:bg-gray-100"
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
