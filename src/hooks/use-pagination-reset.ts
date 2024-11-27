import { parseAsInteger, useQueryState } from 'nuqs'
import { useCallback } from 'react'

type UsePaginationResetParams = Partial<{
  shallow: boolean
}>

export function usePaginationReset({
  shallow = false
}: UsePaginationResetParams = {}) {
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({
      shallow
    })
  )

  const resetPagination = useCallback(() => {
    setPage(1)
  }, [setPage])

  return {
    page,
    resetPagination
  }
}
