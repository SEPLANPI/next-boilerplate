'use client'

import { pageParameterParser } from '@/features/events/lib/search-params'
import { SearchParamsPagination } from './search-params-pagination'
import { useQueryState } from 'nuqs'

type PaginationFooterProps = {
  totalItems: number
  perPage: number
}

export function PaginationFooter({
  totalItems,
  perPage
}: PaginationFooterProps) {
  const [page] = useQueryState('page', pageParameterParser)

  const startItem = (page - 1) * perPage + 1
  const endItem = Math.min(page * perPage, totalItems)

  return (
    <div className="mt-6 flex items-center justify-between">
      <span className="text-sm text-secondary-foreground">
        <span className="font-bold">
          {startItem} - {endItem}
        </span>{' '}
        de {totalItems} resultados
      </span>
      <SearchParamsPagination totalItems={totalItems} perPage={perPage} />
    </div>
  )
}
