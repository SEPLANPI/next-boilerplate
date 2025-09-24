"use client"

import { Pagination } from "@mantine/core"
import { PAGINATION } from "@/constants/pagination"

interface ControlledPaginationFooterProps {
  page: number
  totalItems: number
  itemsPerPage?: number
  onPageChange?: (page: number) => void
}

export function ControlledPaginationFooter({
  page,
  totalItems,
  itemsPerPage = PAGINATION.DEFAULT_PAGE_SIZE,
  onPageChange,
}: ControlledPaginationFooterProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startItem = (page - 1) * itemsPerPage + 1
  const endItem = Math.min(page * itemsPerPage, totalItems)

  return (
    <div className="mt-6 flex items-center justify-between">
      <span className="text-sm">
        <span className="font-semibold">
          {startItem} - {endItem}
        </span>{" "}
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
