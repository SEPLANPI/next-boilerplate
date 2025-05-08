'use client'

import { Pagination } from '@mantine/core'
import { parseAsInteger, useQueryState } from 'nuqs'

export function UrlPaginationFooter({
  totalItems,
  itemsPerPage,
  queryKey = 'page',
  shallow = false,
  onPageChange
}: {
  totalItems: number
  itemsPerPage: number
  queryKey?: string
  shallow?: boolean
  onPageChange?: (page: number) => void
}) {
  const [page, setPage] = useQueryState(
    queryKey,
    parseAsInteger.withDefault(1).withOptions({
      shallow
    })
  )

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return

    setPage(newPage)
    onPageChange?.(newPage)
  }

  const startItem = (page - 1) * itemsPerPage + 1
  const endItem = Math.min(page * itemsPerPage, totalItems)

  return (
    <div className="mt-6 flex items-center justify-between">
      <span className="text-sm">
        <span className="font-bold">
          {startItem} - {endItem}
        </span>{' '}
        de {totalItems} resultados
      </span>

      <Pagination
        defaultValue={page}
        total={totalPages}
        onChange={handlePageChange}
        size="sm"
      />
    </div>
  )
}
