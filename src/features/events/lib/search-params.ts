import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsString
} from 'nuqs/server'

export const eventsSearchParamsParsers = {
  search: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
  ugs: parseAsArrayOf(parseAsInteger),
  municipios: parseAsArrayOf(parseAsString),
  fromDate: parseAsIsoDateTime,
  toDate: parseAsIsoDateTime,
  fromValue: parseAsInteger,
  toValue: parseAsInteger,
  group: parseAsString,
  groupSort: parseAsString
}

export const eventsSearchParams = createSearchParamsCache(
  eventsSearchParamsParsers
)
