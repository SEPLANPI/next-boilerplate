import { ArrowDown, ArrowUp, X } from 'lucide-react'
import React from 'react'
import { Menu } from '@mantine/core'
import { useSortableColumn } from './use-sortable-column'
import { SortIcon } from './sort-icon'
import { ColumnHeaderProps, SortDirection, SortOption } from './types'

const SORT_OPTIONS: SortOption[] = [
  {
    icon: ArrowUp,
    label: 'Crescente',
    value: 'asc'
  },
  {
    icon: ArrowDown,
    label: 'Descrescente',
    value: 'desc'
  },
  {
    icon: X,
    label: 'Sem ordenação',
    value: null
  }
]

export function DataTableColumnHeader({
  column,
  title,
  sortKey,
  onSort
}: ColumnHeaderProps) {
  const { currentDirection } = useSortableColumn(column, sortKey)

  const handleSort = (direction: SortDirection) => {
    if (direction === null) {
      onSort(null)
      return
    }
    onSort(`${column}.${direction}`)
  }

  return (
    <div className="flex items-center space-x-2">
      <Menu position="bottom-start">
        <Menu.Target>
          <button
            className="group -ml-3 flex h-8 items-center rounded p-3 hover:bg-gray-100"
            aria-label={`Ordenar por ${title}`}
          >
            {title}
            <SortIcon
              direction={currentDirection}
              className="ml-2 h-4 w-4 transition-colors group-hover:text-gray-700"
            />
          </button>
        </Menu.Target>

        <Menu.Dropdown>
          {SORT_OPTIONS.map(({ icon: Icon, label, value }) => (
            <Menu.Item
              key={label}
              onClick={() => handleSort(value)}
              leftSection={<Icon className="size-4" />}
              className={value === currentDirection ? 'bg-gray-100' : ''}
            >
              {label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </div>
  )
}
