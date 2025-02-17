import { baseSearchParamsParsers } from '@/lib/search-params'
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsString
} from 'nuqs/server'

export const deputiesSearchParams = createSearchParamsCache({
  ...baseSearchParamsParsers,
  mandatos: parseAsArrayOf(parseAsString),
  partidos: parseAsArrayOf(parseAsString)
})
