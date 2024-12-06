import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString
} from 'nuqs/server'

export const baseSearchParamsParsers = {
  search: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
  sort: parseAsString
} as const

export function createBaseSearchParams() {
  return createSearchParamsCache(baseSearchParamsParsers)
}

export type BaseSearchParams = typeof baseSearchParamsParsers
