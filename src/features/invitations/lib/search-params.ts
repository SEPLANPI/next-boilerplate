import {
  baseSearchParamsParsers,
  createBaseSearchParams
} from '@/lib/search-params'
import { createSearchParamsCache, parseAsString } from 'nuqs/server'

export const invitationsSearchParams = createSearchParamsCache({
  ...baseSearchParamsParsers,
  search: parseAsString
})
