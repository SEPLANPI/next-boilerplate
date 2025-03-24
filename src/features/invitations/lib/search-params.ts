import { baseSearchParamsParsers } from '@/lib/search-params'
import {
  createSearchParamsCache,
  parseAsBoolean,
  parseAsString
} from 'nuqs/server'

export const invitationsSearchParams = createSearchParamsCache({
  ...baseSearchParamsParsers,
  search: parseAsString,
  usado: parseAsBoolean
})
