'use client'

import { Pagination } from '@mantine/core'
import { parseAsInteger, useQueryState } from 'nuqs'

type SearchParamsPaginationProps = {
  totalItems: number
  perPage: number
}

export function SearchParamsPagination({
  totalItems,
  perPage
}: SearchParamsPaginationProps) {
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({
      shallow: false
    })
  )
  const totalPages = Math.ceil(totalItems / perPage)

  function handlePageChange(page: number) {
    setPage(page)
  }

  return (
    <Pagination
      total={totalPages}
      size="sm"
      onChange={handlePageChange}
      defaultValue={page}
    />
  )
}
