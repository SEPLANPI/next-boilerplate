'use client'

import { Pagination } from '@mantine/core'

export function ControlledPaginationFooter({
  totalItems,
  itemsPerPage,
  onPageChange,
  page
}: {
  page: number
  initialPage?: number
  totalItems: number
  itemsPerPage: number
  onPageChange?: (page: number) => void
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startItem = (page - 1) * itemsPerPage + 1
  const endItem = Math.min(page * itemsPerPage, totalItems)

  return (
    <div className="mt-6 flex items-center justify-between">
      <span className="text-sm text-secondary-foreground">
        <span className="font-bold">
          {startItem} - {endItem}
        </span>{' '}
        de {totalItems} resultados
      </span>

      <Pagination
        defaultValue={page}
        total={totalPages}
        onChange={onPageChange}
        size="sm"
      />
    </div>
  )
}
