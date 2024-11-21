'use client'

import { pageParameterParser } from '@/features/events/lib/search-params'
import { useQueryState } from 'nuqs'
import { SearchParamsPagination } from './search-params-pagination'

interface PaginationFooterProps {
  totalItems: number
  perPage: number
  instanceId?: string
}

export function PaginationFooter({
  totalItems,
  perPage,
  instanceId
}: PaginationFooterProps) {
  const pageKey = instanceId ? `page-${instanceId}` : 'page'
  console.log(instanceId)
  const [page] = useQueryState(pageKey, pageParameterParser)
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
