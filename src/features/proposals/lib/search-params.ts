import { baseSearchParamsParsers } from '@/lib/search-params'
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsString
} from 'nuqs/server'

export const proposalsSearchParams = createSearchParamsCache({
  ...baseSearchParamsParsers,
  status: parseAsArrayOf(parseAsString),
  eixos: parseAsArrayOf(parseAsString),
  search: parseAsString
})
